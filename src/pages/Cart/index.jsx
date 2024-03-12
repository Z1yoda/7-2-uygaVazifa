import "./index.css";
import { useEffect, useState } from "react";

function Cart() {
    const [cartedItems, setCartedItems] = useState([]);
    const [isEmpty, setIsEmpty] = useState(null);
    const [selectValue, setSelectValue] = useState();

    useEffect(() => {
        const existingCartItems =
            JSON.parse(localStorage.getItem("products")) || [];

        if (existingCartItems.length > 0) {
            setCartedItems(existingCartItems);
        } else {
            setIsEmpty("Your Cart Is Empty");
        }
    }, []);

    function handleRemove(ItemId) {
        const isDelete = confirm('Are you sure?')

        if (isDelete) {
            const existingCartItems =
                JSON.parse(localStorage.getItem("products")) || [];
            const updatedCartItems = existingCartItems.filter(
                (item) => item.id !== ItemId
            );

            localStorage.setItem("products", JSON.stringify(updatedCartItems));
            setCartedItems(updatedCartItems);

            if (updatedCartItems.length === 0) {
                setIsEmpty("Your Cart Is Empty");
            }
        }

    }

    // useEffect(() => {
    //     const existingCartItems = JSON.parse(localStorage.getItem("products")) || [];
    //     let filteredCard = existingCartItems.filter((card) => {
    //         return card.id == id;
    //     });
    //     // setSelectValue(filteredCard[0].amount);
    //     console.log(filteredCard);
    // }, [])

    return (
        <>
            <div className="empty-card featured">
                <h1>{isEmpty ? isEmpty : "Shopping Cart"}</h1>
            </div>
            <div className="cart-card-wrapper">
                {cartedItems.map((item) => (
                    <div key={item.id} className="cart-card">
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
                            <select
                                id="amount"
                                onChange={() => setSelectValue(item.amount)}
                                value={selectValue}
                                className="amount"
                            >
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                                <option value={9}>9</option>
                                <option value={10}>10</option>
                            </select>
                            <p onClick={() => handleRemove(item.id)}>remove</p>
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
