import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Nav } from './Nav';
import { LandingPage } from './components/view/LandingPage';
import { LoginPage } from './components/view/LoginPage';
import { Order } from './components/view/OrderPage';

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/order' element={<Order />} />
      </Routes>
    </div>
  );
}

export default App;
