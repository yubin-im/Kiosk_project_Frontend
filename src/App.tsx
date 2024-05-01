import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Nav } from './Nav';
import { LandingPage } from './components/view/LandingPage';
import { LoginPage } from './components/view/LoginPage';
import { Order } from './components/view/OrderPage';
import { RegistrationPage } from './components/view/RegistrationPage';
import { StorageProvider } from './components/context/storage-context';

function App() {
  return (
    <StorageProvider>
      <div>
        <Nav />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/order' element={<Order />} />
          <Route path='/register' element={<RegistrationPage />} />
        </Routes>
      </div>
    </StorageProvider>
  );
}

export default App;
