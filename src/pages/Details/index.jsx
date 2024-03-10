import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { PuffLoader } from 'react-spinners';
import './index.css'

function Index() {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [filteredProduct, setFilteredProduct] = useState(null);
    const selectRef = useRef()
    const { data, loading, error } = useFetch('https://strapi-store-server.onrender.com/api/products');

    useEffect(() => {
        if (data) {
            setProducts(data);
            const foundProduct = products.find(product => product.id == id)
            setFilteredProduct(foundProduct)
        }
    }, [data, id]);

    function handleClick(productId) {
        const cartProduct = products.find(product => product.id == productId);

        const amount = selectRef.current ? selectRef.current.value : 1;

        const cartedProduct = {
            amount,
            cartId: cartProduct.id + cartProduct.attributes.colors[0],
            company: cartProduct.attributes.company,
            image: cartProduct.attributes.image,
            price: cartProduct.attributes.price,
            productColor: cartProduct.attributes.colors[0],
            productID: cartProduct.id,
            title: cartProduct.attributes.title,
        };

        const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        if (existingCartItems.length > 0) {
            const updatedCartItems = [...existingCartItems, cartedProduct];

            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
            alert("Successfully saved!")
        } else {

            localStorage.setItem('cartItems', JSON.stringify([cartedProduct]));
        }
    }


    return (
        <div>
            {loading ? (
                <div className="loader">
                    <PuffLoader color="#fff" />
                </div>
            ) : (
                <>
                    <div className="link-toback">
                        <Link to={'/'}><p>Home</p></Link>
                        <span style={{ color: 'white', opacity: '0.5' }}>{'>'}</span>
                        <Link to={'/products'}><p>Products</p></Link>
                    </div>
                    {filteredProduct && (
                        <div className="cardd-wrapper">
                            <div key={filteredProduct.id} className="cardd">
                                <img src={filteredProduct.attributes.image} alt={filteredProduct.attributes.title} />
                                <div className="cardd-right">
                                    <h1>{filteredProduct.attributes.title}</h1>
                                    <h4>{filteredProduct.attributes.company}</h4>
                                    <p>${filteredProduct.attributes.price}</p>
                                    <h5>{filteredProduct.attributes.description}</h5>
                                    <div className="colors">
                                        <h3>Colors</h3>
                                        <div className="circles">
                                            {filteredProduct.attributes.colors.map((color, index) => (
                                                <button key={index} className='color-btn' style={{ backgroundColor: color }}></button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="form-control">
                                        <label htmlFor="amount">
                                            <h6>Amount</h6>
                                        </label>
                                        <select id='amount' ref={selectRef}>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                            <option value="13">13</option>
                                            <option value="14">14</option>
                                            <option value="15">15</option>
                                            <option value="16">16</option>
                                            <option value="17">17</option>
                                            <option value="18">18</option>
                                            <option value="19">19</option>
                                            <option value="20">20</option>
                                        </select>
                                    </div>
                                    <button onClick={() => handleClick(filteredProduct.id)} className='btn'>ADD TO BAG</button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Index;
