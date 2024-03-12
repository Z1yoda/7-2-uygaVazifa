import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/index.jsx';
import Products from './pages/Products';
import Cart from './pages/Cart';
import About from './pages/About';
import Details from './pages/Details';
import MainLayout from './layouts/MainLayout.jsx';
import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext()

function App() {
  const [countCard, setCounCard] = useState(0)

  useEffect(() => {
    if (localStorage.getItem('products')) {
      let products = JSON.parse(localStorage.getItem('products'))
      let sum = 0;
      products.forEach((pr) => {
        sum += Number(pr.amount)
      });
      setCounCard(sum)
    }
  }, [])

  return (
    <CartContext.Provider value={{ countCard, setCounCard }}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='/products' element={<Products />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/details/:id' element={<Details />}></Route>
        </Route>
      </Routes>
    </CartContext.Provider>
  );
}

export default App;
