import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Nav } from './Nav';
import { LandingPage } from './components/view/LandingPage';
import { LoginPage } from './components/view/LoginPage';
import { Order } from './components/view/OrderPage';
import { RegistrationPage } from './components/view/RegistrationPage';
import { StorageProvider } from './components/context/storage-context';
import OrderSubmit from './components/view/OrderSubmit';
import OrderPayment from './components/view/OrderPayment';
import OrderRecommend from './components/view/OrderRecommend';
import OrderDetail from './components/view/OrderDetail';
import OrderProducts from './components/view/OrderProducts';
import { PlaceSelectionPage } from './components/view/placeSelectionPage';

function App() {
  return (
    <StorageProvider>
      <div>
        <Nav />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/placeselection' element={<PlaceSelectionPage />} />
          <Route path='/order' element={<Order />} />
          <Route path='/register' element={<RegistrationPage />} />
          <Route path='/order/submit' element={<OrderSubmit />} />
          <Route path='/order/payment' element={<OrderPayment />} />
          <Route path='/order/recommend' element={<OrderRecommend />} />
          <Route path='/order/detail' element={<OrderDetail />} />
          <Route path='/order/products' element={<OrderProducts />} />
        </Routes>
      </div>
    </StorageProvider>
  );
}

export default App;
