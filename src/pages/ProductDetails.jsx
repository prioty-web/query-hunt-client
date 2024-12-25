import { useLoaderData } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../auth/AuthProvider";



const ProductDetails = () => {
    const product = useLoaderData();

    const { user } = useContext(AuthContext)
    const { _id, title, product_name, product_image, recommendation_reason, recommendation_count } = product;

    const [recommendations, setRecommendations] = useState([]);
    const [formData, setFormData] = useState({
        recommendation_title: '',
        recommended_product_name: '',
        recommended_product_image: '',
        recommendation_reason: '',
    });

    // Fetch recommendations for this query
    useEffect(() => {
        fetch(`http://localhost:5000/recommendations/${_id}`)
            .then(res => res.json())
            .then(data => setRecommendations(data));
    }, [_id]);

    // Handle form submission
    const handleSubmit = (e) => {
        
        e.preventDefault();
        const recommender_email = user?.email; 
        const recommender_name = user?.displayName; 
        const recommendationData = {
            ...formData,
            queryId: _id,
            queryTitle: title,
            productName: product_name,
            userEmail: user?.email, 
            userName: user?.displayName, 
            recommenderEmail: recommender_email,
            recommenderName: recommender_name,
            timestamp: new Date().toISOString(),
        };

        fetch('http://localhost:5000/recommendations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(recommendationData),
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your comment has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    window.location.reload();
                }
            });
    };

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold text-center mb-5">{title}</h1>
            <div className="flex flex-col items-center">
                <img src={product_image} alt={product_name} className="w-64 h-64 object-cover mb-4" />
                <h2 className="text-2xl font-serif">{product_name}</h2>
                <p className="italic text-gray-600 mb-4">{recommendation_reason}</p>
                <p className="text-sm bg-yellow-100 text-gray-800 px-3 py-1 rounded-full font-medium">
                    Recommendations: {recommendation_count}
                </p>
            </div>

            <div className="mt-10">
                <h2 className="text-xl font-semibold mb-4">Add a Recommendation</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                    <input
                        type="text"
                        placeholder="Recommendation Title"
                        value={formData.recommendation_title}
                        onChange={(e) => setFormData({ ...formData, recommendation_title: e.target.value })}
                        className="input input-bordered w-full"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Recommended Product Name"
                        value={formData.recommended_product_name}
                        onChange={(e) => setFormData({ ...formData, recommended_product_name: e.target.value })}
                        className="input input-bordered w-full"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Recommended Product Image URL"
                        value={formData.recommended_product_image}
                        onChange={(e) => setFormData({ ...formData, recommended_product_image: e.target.value })}
                        className="input input-bordered w-full"
                        required
                    />
                    <textarea
                        placeholder="Recommendation Reason"
                        value={formData.recommendation_reason}
                        onChange={(e) => setFormData({ ...formData, recommendation_reason: e.target.value })}
                        className="textarea textarea-bordered w-full"
                        required
                    />
                    <button type="submit" className="btn bg-gradient-to-r from-slate-300 to-slate-500">Add Recommendation</button>
                </form>
            </div>

            <div className="mt-10">
                <h2 className="text-xl font-semibold mb-4">All Recommendations</h2>
                {recommendations.length > 0 ? (
                    <div className="space-y-4">
                        {recommendations.map((rec, index) => (
                            <div key={index} className="p-4 bg-gray-100 rounded-lg shadow">
                                <h3 className="text-lg font-bold">{rec.recommendation_title}</h3>
                                <p className="text-gray-600">{rec.recommendation_reason}</p>
                                <p className="text-sm text-gray-500">
                                    Recommended by: {rec.recommenderName} on {new Date(rec.timestamp).toLocaleString()} <br />
                                    {rec.recommenderEmail}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No recommendations yet.</p>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;
