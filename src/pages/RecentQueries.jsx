import React, { useEffect, useState } from 'react';
import ProductsCard from './ProductsCard';
import axios from 'axios';

const RecentQueries = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/products', { withCredentials: true })
            .then((res) => {
                const sortedProducts = res.data
                    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                    .slice(0, 6);  // Get the most recent 6 products
                setProducts(sortedProducts);
            })
            .catch((err) => {
                console.error('Error fetching products:', err);
            });
    }, []);

    return (
        <div>
            <div className="text-center my-10">
                <h1 className="font-serif text-2xl md:text-5xl">
                    Help millions make the right choice
                </h1>
                <p className="font-medium text-gray-600">
                    Share your experience on QUERY HUNT, where real reviews make a difference.
                </p>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 lg:w-11/12 mx-auto my-10">
            {products.map((product) => (
                    <ProductsCard
                        key={product._id}
                        product={product}
                    />
                ))}
            </div>
        </div>
    );
};

export default RecentQueries;
