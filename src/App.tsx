import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Nav } from './Nav';
import { LandingPage } from './components/view/LandingPage';
import { LoginPage } from './components/view/LoginPage';
import { Order } from './components/view/OrderPage';
import { RegistrationPage } from './components/view/RegistrationPage';
import { StorageProvider } from './components/context/storage-context';
import { PlaceSelectionPage } from './components/view/placeSelectionPage';
import { AdminOrder } from './components/view/AdminOrder';

function App() {
  return (
    <StorageProvider>
      <Nav />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/placeselection' element={<PlaceSelectionPage />} />
        <Route path='/order' element={<Order />} />
        <Route path='/register' element={<RegistrationPage />} />
        <Route path='/admin/order' element={<AdminOrder />} />
      </Routes>
    </StorageProvider>
  );
}

export default App;
