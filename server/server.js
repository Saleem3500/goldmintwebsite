require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Connect to MongoDB
// const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Define Product schema and model
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: false,
    },
    weight: {
        type: String,
        required: false,
    },
    finness: {
        type: String,
        required: false,
    },
    metal: {
        type: String,
        required: false,
    },
    percentage: {
        type: Number,
        required: true
    },
    inStock: {
        type: Boolean,
        default: true,
    },
    image: {
        type: String,
        required: false,
    },
});

const Product = mongoose.model('Product', productSchema);

// sell user schema and model
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    images: [{ type: String, required: true }],
    description: { type: String, required: true }, // New field for description
    goldKarat: { type: String, required: true },   // New field for gold karat
});


const User = mongoose.model('User', userSchema);

// Define Order schema and model
const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true },
    status: { type: String, default: 'Pending' },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    currency: { type: String, required: true }  // Currency field added
});

const Order = mongoose.model('Order', orderSchema);

// Helper function to map symbols to currency codes
const mapSymbolToCurrency = (symbol) => {
    const currencyMap = {
        '€': 'eur',
        '$': 'usd',
        '£': 'gbp'
    };
    return currencyMap[symbol] || null;
};

// Add the route to handle order creation and payment processing
app.post('/api/orders', async (req, res) => {
    try {
        const { userId, products, totalAmount, name, email, phone, address, city, country, paymentMethodId, currency } = req.body;

        // Validate required fields
        if (!userId || !products || products.length === 0 || !totalAmount || !name || !email || !phone || !address || !city || !country || !paymentMethodId || !currency) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Map symbol to currency code
        const mappedCurrency = mapSymbolToCurrency(currency);

        // If the currency is not valid, return an error
        if (!mappedCurrency) {
            return res.status(400).json({ error: 'Invalid currency symbol. Supported symbols are €, $, £.' });
        }

        // Create a PaymentIntent with the amount, mapped currency, and payment method
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount * 100,  // Stripe expects amounts in cents
            currency: mappedCurrency,   // Use the mapped currency code
            payment_method: paymentMethodId,
            confirm: true,              // Automatically confirm the payment
            return_url: 'https://your-website.com/payment-success',  // Update this with your actual return URL
            automatic_payment_methods: {
                enabled: true,
            },
        });

        // Save the order to the database
        const newOrder = new Order({
            userId,
            products,
            totalAmount,
            name,
            email,
            phone,
            address,
            city,
            country,
            currency: mappedCurrency,   // Save the mapped currency in the order
            status: 'Pending'           // Set initial status as 'Pending'
        });

        await newOrder.save();

        res.status(201).json({ message: 'Order created successfully', order: newOrder, paymentIntent });

    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});




// GET all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error('Error fetching products from MongoDB:', err);
        res.status(500).json({ error: 'Error fetching products from MongoDB' });
    }
});

// GET a single product by ID
app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST a new product with image upload to Cloudinary
app.post('/api/products', upload.single('image'), async (req, res) => {
    const { name, price, description, category, brand, weight, finness,percentage, metal, inStock } = req.body;
    const file = req.file;

    if (!name || !price || !description || !category) {
        return res.status(400).json({ error: 'Name, price, description, and category are required' });
    }

    let imageUrl = '';
    if (file) {
        try {
            const result = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: 'products' },
                    (error, result) => {
                        if (error) {
                            console.error('Error uploading image to Cloudinary:', error);
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                ).end(file.buffer);
            });
            imageUrl = result.secure_url;
        } catch (error) {
            console.error('Error uploading image to Cloudinary:', error);
            return res.status(500).json({ error: 'Error uploading image to Cloudinary' });
        }
    }

    try {
        const newProduct = new Product({ name, price, description, category, brand, weight, finness, metal, percentage, inStock, image: imageUrl });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        console.error('Error saving product to MongoDB:', err);
        res.status(500).json({ error: 'Error saving product to MongoDB' });
    }
});

// PUT (update) an existing product by ID
app.put('/api/products/:id', upload.single('image'), async (req, res) => {
    const { name, price, description, category, brand, weight, finness, metal, percentage, inStock } = req.body;
    const file = req.file;

    if (!name || !price || !description || !category) {
        return res.status(400).json({ error: 'Name, price, description, and category are required' });
    }

    let imageUrl = '';
    if (file) {
        try {
            const result = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: 'products' },
                    (error, result) => {
                        if (error) {
                            console.error('Error uploading image to Cloudinary:', error);
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                ).end(file.buffer);
            });
            imageUrl = result.secure_url;
        } catch (error) {
            console.error('Error uploading image to Cloudinary:', error);
            return res.status(500).json({ error: 'Error uploading image to Cloudinary' });
        }
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, price, description, category, brand, weight, finness, percentage, metal, inStock, image: imageUrl },
            { new: true }
        );
        if (updatedProduct) {
            res.json(updatedProduct);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (err) {
        console.error('Error updating product in MongoDB:', err);
        res.status(500).json({ error: 'Error updating product in MongoDB' });
    }
});

// DELETE a product by ID
app.delete('/api/products/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (deletedProduct) {
            res.json({ message: 'Product deleted successfully' });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST a new order
app.post('/api/orders', async (req, res) => {
    try {
        const { userId, products, totalAmount, name, email, phone, address, city, country } = req.body;

        // Validate required fields
        if (!userId || !products || products.length === 0 || !totalAmount || !name || !email || !phone || !address || !city || !country) {
            return res.status(400).json({ error: 'User ID, products, total amount, and all address fields are required' });
        }

        // Ensure each product in the array has a valid productId
        for (const item of products) {
            if (!item.productId) {
                return res.status(400).json({ error: 'Each product must have a productId' });
            }
        }

        const newOrder = new Order({ userId, products, totalAmount, name, email, phone, address, city, country });
        await newOrder.save();
        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

// GET a single order by ID
app.get('/api/orders/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('userId').populate('products.productId');
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

// GET all orders
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find().populate('userId').populate('products.productId');
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});


// Sell API
app.post('/api/users', upload.array('images', 3), async (req, res) => {
    try {
        const { name, mobile, email, description, goldKarat } = req.body;
        const imageUrls = await Promise.all(req.files.map(file => {
            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
                    if (error) reject(error);
                    else resolve(result.secure_url);
                });
                streamifier.createReadStream(file.buffer).pipe(uploadStream);
            });
        }));

        const newUser = new User({
            name,
            mobile,
            email,
            images: imageUrls,
            description,
            goldKarat
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

// Fetch all users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
