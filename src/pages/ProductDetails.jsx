import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../auth/AuthProvider';
import { useContext } from 'react';

const ProductDetails = () => {
    const loadedProduct = useLoaderData();
    const [product] = useState(loadedProduct);
    const [reccomends , setReccomends] = useState([])
    const { user } = useContext(AuthContext);
    const {
        _id,
        product_name,
        product_image,
        recommendation_reason,
        provider_email,
        provider_name,
        provider_image,
        recommand_count,
        product_brand,
        product_boycot,
        timestamp,
    } = product;

    const handleAddRecommendation = (e) => {
        e.preventDefault();
        const recommendationData = {
            queryId: product._id,
            queryTitle: product?.title,
            productName: product.product_name,
            userEmail: product.provider_email,
            userName: product.provider_name,
            recommenderEmail: user?.email,
            recommenderName: user?.displayName,
            recommendationTitle: e.target.title.value,
            recommendedProductName: e.target.productName.value,
            recommendedProductImage: e.target.productImage.value,
            recommendationReason: e.target.reason.value,
            timestamp: new Date(),
        };
        console.log(recommendationData)

        fetch('http://localhost:5000/recommendation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(recommendationData),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                window.location.reload();
            });
    };

    useEffect(()=>{
        fetch(`http://localhost:5000/recommendation?id=${_id}`)
        .then(res=>res.json())
        .then(data=> setReccomends(data))
    },[_id])


console.log(reccomends)
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="flex flex-col md:flex-row items-center">
                    {/* Product Image */}
                    <img
                        src={product_image}
                        alt={`Image of ${product_name}`}
                        className="w-full md:w-1/3 h-64 object-cover"
                    />
                    <div className="p-6 w-full">
                        {/* Product Info */}
                        <h2 className="text-3xl font-bold text-gray-800">{product_name}</h2>
                        <p className="text-gray-600 mt-2">Brand: <span className="text-gray-900">{product_brand}</span></p>
                        <p className="text-gray-600 mt-2 italic">
                            Recommendation Reason: <span className="text-gray-900">{recommendation_reason}</span>
                        </p>
                        <p className="text-gray-600 mt-2">Boycott Reason: <span className="text-red-500">{product_boycot}</span></p>
                        <p className="text-gray-600 mt-2">Recommendations Count: <span className="text-blue-600">{recommand_count}</span></p>
                        <p className="text-gray-500 text-sm mt-4">
                            Posted On: {new Date(timestamp).toLocaleString()}
                        </p>

                        {/* Provider Info */}
                        <div className="flex items-center mt-4">
                            <img
                                src={provider_image}
                                alt={`Provider: ${provider_name}`}
                                className="w-10 h-10 rounded-full"
                            />
                            <p className="ml-3 text-gray-800">
                                By <span className="font-semibold">{provider_name}</span> ({provider_email})
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recommendation Section */}
            <div className="mt-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Add a Recommendation</h3>
                <form onSubmit={handleAddRecommendation} className="space-y-6">
                    {/* Title Field */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                            Recommendation Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Enter recommendation title"
                            className="w-full p-4 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Product Name Field */}
                    <div>
                        <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-2">
                            Recommended Product Name
                        </label>
                        <input
                            type="text"
                            id="productName"
                            name="productName"
                            placeholder="Enter product name"
                            className="w-full p-4 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Product Image URL Field */}
                    <div>
                        <label htmlFor="productImage" className="block text-sm font-medium text-gray-700 mb-2">
                            Recommended Product Image URL
                        </label>
                        <input
                            type="text"
                            id="productImage"
                            name="productImage"
                            placeholder="Enter image URL"
                            className="w-full p-4 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Recommendation Reason Field */}
                    <div>
                        <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                            Recommendation Reason
                        </label>
                        <textarea
                            id="reason"
                            name="reason"
                            placeholder="Describe why you're recommending this product"
                            className="w-full p-4 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition"
                        >
                            Submit Recommendation
                        </button>
                    </div>
                </form>
            </div>

            {/* Comment Section */}
            <div className="mt-6">
    {reccomends.length > 0 ? (
        reccomends.map((reccomend) => (
            <div
                key={reccomend._id}
                className="flex items-start gap-4 p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-md mb-4"
            >
                {/* Image Section */}
                <div>
                    <img
                        src={reccomend.recommendedProductImage}
                        alt={reccomend.recommendedProductName}
                        className="w-16 h-16 object-cover rounded-full"
                    />
                </div>

                {/* Details Section */}
                <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-800">
                        {reccomend.recommendationTitle}
                    </h4>
                    <p className="text-gray-600 text-sm">
                        <span className="font-semibold">Recommended Product:</span>{' '}
                        {reccomend.recommendedProductName}
                    </p>
                    <p className="text-gray-600 text-sm">
                        <span className="font-semibold">Reason:</span>{' '}
                        {reccomend.recommendationReason}
                    </p>
                    <p className="text-gray-600 text-sm">
                        <span className="font-semibold">Query Title:</span>{' '}
                        {reccomend.queryTitle}
                    </p>
                    <p className="text-gray-600 text-sm">
                        <span className="font-semibold">Recommended By:</span>{' '}
                        {reccomend.recommenderName} ({reccomend.recommenderEmail})
                    </p>
                    <p className="text-gray-600 text-sm">
                        <span className="font-semibold">Query By:</span>{' '}
                        {reccomend.userName} ({reccomend.userEmail})
                    </p>
                    <p className="text-gray-500 text-xs">
                        {new Date(reccomend.timestamp).toLocaleString()}
                    </p>
                </div>
            </div>
        ))
    ) : (
        <p className="text-gray-500 text-sm">No recommendations available for this query.</p>
    )}
</div>


        </div>
    );
};

export default ProductDetails;
