import React from 'react';
import { useLoaderData } from 'react-router-dom'; // Import useLoaderData

const MyQuery = () => {
    // Fetch the product data using useLoaderData
    const product = useLoaderData();

    // Destructure product data
    const {
        title,
        product_name,
        product_image,
        recommendation_reason,
        timestamp,
        provider_email,
        provider_name,
        provider_image,
        recommand_count,
        product_brand,
        product_boycot,
    } = product;

    return (
        <div className="p-5">
            {/* Display the query details */}
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-lg mt-2">{product_name}</p>
            <img 
                src={product_image} 
                alt={`Image of ${product_name}`} 
                className="w-32 h-32 object-cover rounded-full mt-4" 
            />
            <p className="mt-2">{recommendation_reason}</p>
            <p className="mt-2 text-sm text-gray-500">
                Recommended: {recommand_count} times
            </p>
            <p className="mt-2 text-sm text-gray-500">Brand: {product_brand}</p>
            <p className="mt-2 text-sm text-gray-500">Boycot: {product_boycot}</p>
            <p className="mt-2 text-sm text-gray-500">Provider: {provider_name}</p>
            <img 
                src={provider_image} 
                alt={`Provider: ${provider_name}`} 
                className="w-10 h-10 rounded-full mt-2"
            />
            <p className="mt-2 text-sm text-gray-500">{new Date(timestamp).toLocaleString()}</p>
            <p className="mt-2 text-sm text-gray-500">Provider Email: {provider_email}</p>
        </div>
    );
};

export default MyQuery;
