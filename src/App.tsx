import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Nav } from './Nav';
import { LandingPage } from './components/view/LandingPage';
import { LoginPage } from './components/view/LoginPage';
import { RegistrationPage } from './components/view/RegistrationPage';
import { StorageProvider } from './components/context/storage-context';
import OrderSubmit from './components/view/OrderSubmit';
import OrderPayment from './components/view/OrderPayment';

import OrderProducts from './components/view/OrderProducts';
import { PlaceSelectionPage } from './components/view/placeSelectionPage';

import { AdminPage } from './components/view/AdminPage';
import { AdminPageList } from './components/view/AdminPageList';
import OrderRecommend from './components/view/OrderRecommend';

function App() {
  return (
    <BrowserRouter>
      <StorageProvider>
        <Nav />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/placeselection' element={<PlaceSelectionPage />} />

          <Route path='/register' element={<RegistrationPage />} />
          <Route path='/order/products' element={<OrderProducts />} />
          <Route path='/order/payment' element={<OrderPayment />} />
          <Route path='/order/submit' element={<OrderSubmit />} />
          <Route path='/order/recommendation' element={<OrderRecommend />} />
          <Route path='/order/payment' element={<OrderPayment />} />
          <Route path='/admin/*' element={<AdminPage />}>
            {/* <Route index element={<AdminPageList />} /> */}
            <Route path=':category' element={<AdminPageList />} />
          </Route>
        </Routes>
      </StorageProvider>
    </BrowserRouter>
  );
}

export default App;
