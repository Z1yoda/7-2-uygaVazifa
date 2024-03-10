import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { PuffLoader } from 'react-spinners';

function Index() {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [filteredProduct, setFilteredProduct] = useState(null);
    const { data, loading, error } = useFetch('https://strapi-store-server.onrender.com/api/products');

    useEffect(() => {
        if (data) {
            setProducts(data);
            const filteredProduct = data.filter(product => product.id === id);
            setFilteredProduct(filteredProduct);
        }
    }, [data, id]);

    return (
        <div>
            {loading ? (
                <div className="loader">
                    <PuffLoader color="#fff" />
                </div>
            ) : (
                <>
                    <div className="link-toback">
                        <h2>{filteredProduct ? '1 product' : 'No matching product found'}</h2>
                    </div>
                    {filteredProduct && (
                        <div className="card-wrapper">
                            <div key={filteredProduct.id} className="card">
                                <img src={filteredProduct.attributes.image} alt={filteredProduct.attributes.title} />
                                <div className="card-body">
                                    <h2>{filteredProduct.attributes.title}</h2>
                                    <span>${filteredProduct.attributes.price}</span>
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
