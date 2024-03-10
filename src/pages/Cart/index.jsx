import "./index.css";
import { useEffect, useState } from "react";

function Cart() {
    const [cartedItems, setCartedItems] = useState([]);
    const [isEmpty, setIsEmpty] = useState(null);

    useEffect(() => {
        const existingCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

        if (existingCartItems.length > 0) {
            setCartedItems(existingCartItems);
        } else {
            setIsEmpty("Your Cart Is Empty");
        }
    }, []);

    function handleRemove(cartItemId) {
        const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const updatedCartItems = existingCartItems.filter(item => item.cartId !== cartItemId);

        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        setCartedItems(updatedCartItems); // Update state to reflect the removal

        // You might want to check if the cart is empty after removal
        if (updatedCartItems.length === 0) {
            setIsEmpty("Your Cart Is Empty");
        }
    }

    return (
        <>
            <div className="empty-card featured">
                <h1>{isEmpty ? isEmpty : 'Shopping Cart'}</h1>
            </div>
            <div className="cart-card-wrapper">
                {cartedItems.map((item) => (
                    <div key={item.cartId} className="cart-card">
                        <img src={item.image} alt="" />
                        <div className="title-company">
                            <h3>{item.title}</h3>
                            <h4>{item.company}</h4>
                            <div className="span-btn">
                                <span className="color-span">Color</span>
                                <button
                                    className="color-btn"
                                    style={{ backgroundColor: `${item.productColor}` }}
                                ></button>
                            </div>
                        </div>
                        <div className="cart-form">
                            <label htmlFor="amount">
                                <h6>Amount</h6>
                            </label>
                            <select id="amount" className="amount">
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
                            <p onClick={() => handleRemove(item.cartId)}>remove</p>
                        </div>
                        <div className="price">
                            <p>${item.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Cart;
