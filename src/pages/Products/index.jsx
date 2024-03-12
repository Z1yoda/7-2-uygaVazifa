import React, { useEffect, useState } from 'react';
import { PuffLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import './index.css';

function Products() {
    const [productsData, setProductsData] = useState([]);
    const [counter, setCounter] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const { data, loading, error } = useFetch(
        page === 1 ? 'https://strapi-store-server.onrender.com/api/products' : `https://strapi-store-server.onrender.com/api/products?page=${page}`
    );

    useEffect(() => {
        if (data) {
            setCounter(data.length);
            setProductsData(data);
            setIsLoading(false);
        }
    }, [data]);

    function handleClick(dataId) {
        navigate(`/details/${dataId}`);
    }

    function handlePageChange(newPage) {
        setPage(newPage);
    }

    return (
        <div>
            {isLoading ? (
                <div className="loader">
                    <PuffLoader color="#fff" />
                </div>
            ) : (
                <>
                    <div className="featured">
                        <h2>{counter} products</h2>
                    </div>
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
                    </div>
                    <div className="join">
                        <button className="join-item" onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
                            PREV
                        </button>
                        <button
                            className="join-item"
                            onClick={() => handlePageChange(1)}
                            disabled={page === 1}
                        >
                            1
                        </button>
                        <button className="join-item" onClick={() => handlePageChange(2)}>
                            2
                        </button>
                        <button className="join-item" onClick={() => handlePageChange(3)}>
                            3
                        </button>
                        <button
                            className="join-item"
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page === 3}
                        >
                            NEXT
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Products;
