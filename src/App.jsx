import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/index.jsx';
import Products from './pages/Products';
import Cart from './pages/Cart';
import About from './pages/About';
import Details from './pages/Details';
import MainLayout from './layouts/MainLayout.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='/products' element={<Products />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/details/:id' element={<Details />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
