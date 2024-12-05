import { loadStripe } from '@stripe/stripe-js';
import './App.css';
import CheckoutForm from './components/CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Cart from './components/Cart';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './hooks/ProtectedRoute';
import AdminDashboard from './components/adminDashboard';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loginSuccess } from './context/loginContext/authActions';
const stripePromise = loadStripe('pk_test_51MwPQuSBD8MtMZAoDOk33CGs935GKRdxMeR3HN4Rro4g8HIuIPOMfDRLHoEYWPFPHIpK0RfN5Gc9zbKOhqcMzMPn00z8zgZCFw');
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(loginSuccess(null, token));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
}

function MainApp() {
  const location = useLocation();

  // Conditionally render Header if not on /adminDashboard
  const showHeader = location.pathname !== '/adminDashboard';

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path='/adminDashboard' element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        } />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
