import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NavbarComponent from './components/Header/Navbar';
import MetalRatesComponent from './components/Live Rates/MetalRatesComponent';
import MainPageWrapper from './components/Main-Page/MainPageWrapper/MainPageWrapper';
import BuyPageWrapper from './components/Buy Page/BuyPageWrapper/BuyPageWrapper';
import Footer from './components/Footer/Footer';
import AdminPortal from './components/Admin Portal/AdminPortal';
import RefinaryPage from './components/Refinary Page/Refinary_page';
import SellPageWrapper from './components/Sell-Page/SellPageWrapper/SellPageWrapper';
import AboutUs from './components/About Us/AboutUs';
import WhatsappBtn from './components/Functions/Whatsapp/WhatsappBtn';
import Login from './components/Login/Login';
import { AuthProvider } from './components/Authorization/Auth';
import ProtectedRoute from './components/Protected Route/ProtectedRoute';
import ProductDetails from './components/Buy Page/Product Details/ProductDetails';
import Checkout from './components/CheckOut/Checkout';
import Cart from './components/Cart/Cart';
import ScrollToTop from './components/Scroll/Scroll';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <NavbarComponent />
        {/* <MetalRatesComponent /> */}
        <Routes>
          <Route path="/" element={<MainPageWrapper />} />
          <Route path="/buy" element={<BuyPageWrapper />} />
          <Route path="/refinary" element={<RefinaryPage />} />
          <Route path="/sellpage" element={<SellPageWrapper />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/admin" element={<ProtectedRoute element={<AdminPortal />} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
        <WhatsappBtn />
      </Router>
    </AuthProvider>
  );
}

export default App;
