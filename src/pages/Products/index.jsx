import React, { useEffect, useState } from 'react';
import { PuffLoader } from 'react-spinners';
import { useFetch } from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';

function Products() {
    const [productsData, setProductsData] = useState([]);
    const [counter, setCounter] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate()

    const { data, loading, error } = useFetch('https://strapi-store-server.onrender.com/api/products');

    useEffect(() => {
        if (data) {
            setCounter(data.length)
            setProductsData(data);
            setIsLoading(false);
        }
    }, [data]);

    function handleClick(dataId) {
        navigate(`/details/${dataId}`)
    }

    return (
        <div>
            {isLoading ? (
                <div className="loader"> <PuffLoader color="#fff" /></div>
            ) : (
                < ><div className="featured"><h2>{counter} products</h2></div>
                    <div className="card-wrapper">
                        {productsData.map(product => (
                            <div key={product.id} className="card" onClick={() => handleClick(product.id)}>
                                <img src={product.attributes.image} alt={product.attributes.title} />
                                <div className="card-body">
                                    <h2>{product.attributes.title}</h2>
                                    <span>${product.attributes.price}</span>
                                </div>
                            </div>
                        ))}
                    </div></>
            )}
        </div>
    );
}

export default Products;
