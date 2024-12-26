import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import axios from "axios";

const RecomandationForMe = () => {
  const { user } = useContext(AuthContext);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (user?.email) {
      // Fetch recommendations based on the user's email
      axios
        .get(`https://query-hunt-server.vercel.app/recommendation?usermail=${user?.email}`, { withCredentials: true })
        .then((res) => {
          setRecommendations(res.data);
        });
    }
  }, [user?.email]); // Re-fetch if the user's email changes

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-center mb-4 sm:mb-6">
        Recommendations for Your Queries
      </h1>

      {/* If there are no recommendations */}
      {recommendations.length === 0 ? (
        <p className="text-center text-sm sm:text-base text-gray-500">No recommendations for you</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm lg:text-base">Product Name</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm lg:text-base">Recommender</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm lg:text-base">Recommendation Title</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm lg:text-base">Reason</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm lg:text-base">Recommended Product</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm lg:text-base">Date</th>
              </tr>
            </thead>
            <tbody>
              {recommendations.map((recommendation) => (
                <tr key={recommendation._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm lg:text-base">{recommendation.productName}</td>
                  <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm lg:text-base">{recommendation.recommenderName}</td>
                  <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm lg:text-base">{recommendation.recommendationTitle}</td>
                  <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm lg:text-base">
                    {recommendation.recommendationReason}
                  </td>
                  <td className="px-4 sm:px-6 py-4 flex items-center gap-2">
                    <img
                      src={recommendation.recommendedProductImage}
                      alt={recommendation.recommendedProductName}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded"
                    />
                    <span className="text-xs sm:text-sm lg:text-base">{recommendation.recommendedProductName}</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm lg:text-base">
                    {new Date(recommendation.timestamp).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecomandationForMe;
