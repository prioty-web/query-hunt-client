import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import axios from "axios";

const RecomandationForMe = () => {
  const { user } = useContext(AuthContext);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (user?.email) {
      // Fetch recommendations based on the user's email
      axios.get(`https://query-hunt-server.vercel.app/recommendation?usermail=${user?.email}`, { withCredentials: true })
                .then((res) => {
                    setRecommendations(res.data);
                })
    }
  }, [user?.email]); // Re-fetch if the user's email changes

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Recommendations for Your Queries</h1>
      
      {/* If there are no recommendations */}
      {recommendations.length === 0 ? (
        <p className="text-center text-gray-500">No recommendation for you</p>
      ) : (
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left">Product Name</th>
              <th className="px-6 py-3 text-left">Recommender</th>
              <th className="px-6 py-3 text-left">Recommendation Title</th>
              <th className="px-6 py-3 text-left">Reason</th>
              <th className="px-6 py-3 text-left">Recommended Product</th>
              <th className="px-6 py-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {recommendations.map((recommendation) => (
              <tr key={recommendation._id} className="border-b">
                <td className="px-6 py-4">{recommendation.productName}</td>
                <td className="px-6 py-4">{recommendation.recommenderName}</td>
                <td className="px-6 py-4">{recommendation.recommendationTitle}</td>
                <td className="px-6 py-4">{recommendation.recommendationReason}</td>
                <td className="px-6 py-4">
                  <img
                    src={recommendation.recommendedProductImage}
                    alt={recommendation.recommendedProductName}
                    className="w-16 h-16 object-cover"
                  />
                  <span>{recommendation.recommendedProductName}</span>
                </td>
                <td className="px-6 py-4">
                  {new Date(recommendation.timestamp).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RecomandationForMe;
