import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { PuffLoader } from "react-spinners";
import "./index.css";

function Index() {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [filteredProduct, setFilteredProduct] = useState(null);
    const [count, setCount] = useState("");
    const [color, setColor] = useState("");
    const [active, setActive] = useState(0);
    const { data, loading, error } = useFetch(
        "https://strapi-store-server.onrender.com/api/products"
    );

    useEffect(() => {
        if (data.length > 0 && !error) {
            setProducts(data);
            const foundProduct = data.find((product) => product.id == id);
            setFilteredProduct(foundProduct);
        }
    }, [data]);

    function getData() {
        let data = []

        if (localStorage.getItem('products')) {
            data = JSON.parse(localStorage.getItem('products'))
        }

        return data
    }

    function handleClick(productId) {
        const cartProduct = products.find((product) => product.id === productId);

        const amount = count ? count : 1;

        const cartedProduct = {
            amount: amount,
            company: cartProduct.attributes.company,
            image: cartProduct.attributes.image,
            price: cartProduct.attributes.price,
            productColor: color,
            id: cartProduct.id,
            title: cartProduct.attributes.title,
        };

        let existingProducts = getData();

        if (existingProducts.length > 0) {
            let exist = existingProducts.find((el) => {
                return el.id === cartedProduct.id && el.productColor === cartedProduct.productColor;
            });

            if (exist) {
                existingProducts = existingProducts.map((el) => {
                    if (el.id === cartedProduct.id && el.productColor === cartedProduct.productColor) {
                        el.amount = Number(el.amount);
                        el.amount += +cartedProduct.amount;
                    }
                    return el;
                });
            } else {
                existingProducts.push(cartedProduct);
            }

            localStorage.setItem('products', JSON.stringify(existingProducts));
        } else {
            existingProducts.push(cartedProduct);
            localStorage.setItem('products', JSON.stringify(existingProducts));
        }
    }

    function handleChangeColor(color, index) {
        setColor(color);
        setActive(index)
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
                        <Link to={"/"}>
                            <p>Home</p>
                        </Link>
                        <span style={{ color: "white", opacity: "0.5" }}>{">"}</span>
                        <Link to={"/products"}>
                            <p>Products</p>
                        </Link>
                    </div>
                    {filteredProduct && (
                        <div className="cardd-wrapper">
                            <div key={filteredProduct.id} className="cardd">
                                <img
                                    src={filteredProduct.attributes.image}
                                    alt={filteredProduct.attributes.title}
                                />
                                <div className="cardd-right">
                                    <h1>{filteredProduct.attributes.title}</h1>
                                    <h4>{filteredProduct.attributes.company}</h4>
                                    <p>${filteredProduct.attributes.price}</p>
                                    <h5>{filteredProduct.attributes.description}</h5>
                                    <div className="colors">
                                        <h3>Colors</h3>
                                        <div className="circles">
                                            {filteredProduct.attributes.colors.map((color, index) => (
                                                <button
                                                    onClick={() => handleChangeColor(color, index)}
                                                    key={index}
                                                    className="color-btn"
                                                    style={{ cursor: "pointer", border: index == active ? "1.6px solid #bf95f9" : "none", backgroundColor: color }}
                                                ></button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="form-control">
                                        <label htmlFor="amount">
                                            <h6>Amount</h6>
                                        </label>
                                        <select
                                            id="amount"
                                            value={count}
                                            onChange={(e) => { setCount(e.target.value) }}
                                        >
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
                                        </select>
                                    </div>
                                    <button
                                        onClick={() => handleClick(filteredProduct.id)}
                                        className="btn" disabled={count <= 0 && !color ? true : false}
                                    >
                                        ADD TO BAG
                                    </button>
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
