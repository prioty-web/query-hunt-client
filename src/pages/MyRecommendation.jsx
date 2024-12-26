import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const MyRecommendation = () => {
    const { user } = useContext(AuthContext);
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
       
        axios.get(`https://query-hunt-server.vercel.app/recommendation?email=${user?.email}`, { withCredentials: true })
            .then((response) => {
                setRecommendations(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the recommendations:", error);
            });
    }, [user?.email]);

    const handleDelete = (recommendationId, queryId) => {
        axios.delete(`https://query-hunt-server.vercel.app/recommendation/${recommendationId}?queryId=${queryId}`, { withCredentials: true })
            .then((response) => {
                if (response.data.success) {
                    setRecommendations((prevRecommendations) =>
                        prevRecommendations.filter((rec) => rec._id !== recommendationId)
                    );
                } else {
                    alert("Failed to delete the recommendation");
                }
            });
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">My Recommendations</h2>

            {recommendations.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-xs sm:text-sm lg:text-base border-b">Product Name</th>
                                <th className="px-4 py-2 text-xs sm:text-sm lg:text-base border-b">Recommendation Title</th>
                                <th className="px-4 py-2 text-xs sm:text-sm lg:text-base border-b">Recommended Product</th>
                                <th className="px-4 py-2 text-xs sm:text-sm lg:text-base border-b">Reason</th>
                                <th className="px-4 py-2 text-xs sm:text-sm lg:text-base border-b">Date</th>
                                <th className="px-4 py-2 text-xs sm:text-sm lg:text-base border-b">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recommendations.map((recommendation) => (
                                <tr key={recommendation._id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border-b text-sm sm:text-base truncate">
                                        {recommendation.productName}
                                    </td>
                                    <td className="px-4 py-2 border-b text-sm sm:text-base truncate">
                                        {recommendation.recommendationTitle}
                                    </td>
                                    <td className="px-4 py-2 border-b flex flex-col items-center sm:flex-row sm:gap-2">
                                        <img
                                            src={recommendation.recommendedProductImage}
                                            alt={recommendation.recommendedProductName}
                                            className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-full mb-2 sm:mb-0"
                                        />
                                        <p className="text-sm sm:text-base truncate">{recommendation.recommendedProductName}</p>
                                    </td>
                                    <td className="px-4 py-2 border-b text-sm sm:text-base whitespace-normal">
                                        {recommendation.recommendationReason}
                                    </td>
                                    <td className="px-4 py-2 border-b text-sm sm:text-base">
                                        {new Date(recommendation.timestamp).toLocaleString()}
                                    </td>
                                    <td className="px-4 py-2 border-b">
                                        <button
                                            onClick={() =>
                                                Swal.fire({
                                                    title: "Are you sure?",
                                                    text: "You will not be able to recover this recommendation!",
                                                    icon: "warning",
                                                    showCancelButton: true,
                                                    confirmButtonText: "Yes, delete it!",
                                                    cancelButtonText: "No, cancel!",
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        handleDelete(recommendation._id, recommendation.queryId);
                                                        Swal.fire("Deleted!", "Your recommendation has been deleted.", "success");
                                                    }
                                                })
                                            }
                                            className="bg-red-500 text-white text-xs sm:text-sm lg:text-base px-2 sm:px-4 py-1 sm:py-2 rounded-lg hover:bg-red-600 transition"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-500 text-sm sm:text-base">No recommendations available.</p>
            )}
        </div>
    );
};

export default MyRecommendation;
