import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PensShop from './pages/PensShop';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import PenBuilder from './pages/PenBuilder';
import Contact from './pages/Contact';
import InfoPage from './pages/InfoPage';
import OrderSuccess from './pages/OrderSuccess';
import ScrollToTop from './components/ScrollToTop';
import ScrollTopButton from './components/ScrollTopButton';
import CartDrawer from './components/CartDrawer';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AdminOrders from './pages/admin/Orders';
import AdminCustomers from './pages/admin/Customers';
import AdminSettings from './pages/admin/Settings';

function App() {
    return (
        <ThemeProvider>
            <CartProvider>
            <Router>
                <ScrollToTop />
                <ScrollTopButton />
                <CartDrawer />
                <Routes>
                    {/* Main Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/pens" element={<PensShop />} />
                    <Route path="/pens/:id" element={<ProductDetail />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/pen-builder" element={<PenBuilder />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/info/:slug" element={<InfoPage />} />

                    {/* Admin Routes */}
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/products" element={<AdminProducts />} />
                    <Route path="/admin/orders" element={<AdminOrders />} />
                    <Route path="/admin/customers" element={<AdminCustomers />} />
                    <Route path="/admin/settings" element={<AdminSettings />} />
                    <Route path="/order-success" element={<OrderSuccess />} />
                </Routes>
            </Router>
            </CartProvider>
        </ThemeProvider>
    );
}

export default App;
