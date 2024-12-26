import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";

const MyRecommendation = () => {
    const { user } = useContext(AuthContext);
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        // Fetch recommendations based on the user's email
        fetch(`http://localhost:5000/recommendation?email=${user?.email}`)
            .then((res) => res.json())
            .then((data) => {
                setRecommendations(data);
            });
    }, [recommendations,user?.email]);

    const handleDelete = (recommendationId, queryId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this recommendation?');
        if (confirmDelete) {
            fetch(`http://localhost:5000/recommendation/${recommendationId}?queryId=${queryId}`, {
                method: 'DELETE',
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        setRecommendations(recommendations.filter((rec) => rec._id !== recommendationId));
                        
                    } else {
                        alert('Failed to delete the recommendation');
                    }
                });
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-semibold mb-6">My Recommendations</h2>

            {recommendations.length > 0 ? (
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b">Product Name</th>
                            <th className="px-4 py-2 border-b">Recommendation Title</th>
                            <th className="px-4 py-2 border-b">Recommended Product</th>
                            <th className="px-4 py-2 border-b">Reason</th>
                            <th className="px-4 py-2 border-b">Date</th>
                            <th className="px-4 py-2 border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recommendations.map((recommendation) => (
                            <tr key={recommendation._id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border-b">{recommendation.productName}</td>
                                <td className="px-4 py-2 border-b">{recommendation.recommendationTitle}</td>
                                <td className="px-4 py-2 border-b">
                                    <img
                                        src={recommendation.recommendedProductImage}
                                        alt={recommendation.recommendedProductName}
                                        className="w-16 h-16 object-cover rounded-full"
                                    />
                                    <p>{recommendation.recommendedProductName}</p>
                                </td>
                                <td className="px-4 py-2 border-b">{recommendation.recommendationReason}</td>
                                <td className="px-4 py-2 border-b">
                                    {new Date(recommendation.timestamp).toLocaleString()}
                                </td>
                                <td className="px-4 py-2 border-b">
                                    <button
                                        onClick={() => handleDelete(recommendation._id, recommendation.queryId)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-500 text-sm">No recommendations available.</p>
            )}
        </div>
    );
};

export default MyRecommendation;
