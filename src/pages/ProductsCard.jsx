/* eslint-disable no-unused-vars */

import { Link } from "react-router-dom";

const ProductsCard = ({product}) => {
  const {_id,
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
    <div className="flex flex-col items-center p-5 lg:m-3 bg-gradient-to-r from-slate-300 to-slate-500 text-white shadow-xl rounded-xl hover:scale-105 transition-transform duration-300 ease-in-out">
      {/* Product Image */}
      <img
        src={product_image}
        alt={`Image of ${product_name}`}
        className="w-32 h-32 object-cover rounded-full border-4 border-white mb-4"
      />

      {/* Title and Name */}
      <h2 className="text-2xl font-serif mb-2">{title}</h2>
      <p className="text-lg font-mono">{product_name}</p>

      {/* Recommendation Reason */}
      <p className="text-sm italic mb-3">{recommendation_reason}</p>

      {/* Recommendation Count */}
      <p className="text-sm bg-white text-gray-800 px-3 py-1 rounded-full font-medium mb-4">
        Recommendations: {recommand_count}
      </p>

      {/* Timestamp */}
      <p className="text-sm mb-4">{new Date(timestamp).toLocaleString()}</p>

      {/* Provider Information */}
      <div className="flex items-center gap-3">
        <img
          src={provider_image}
          alt={`Provider: ${provider_name}`}
          className="w-10 h-10 rounded-full border-2 border-white"
        />
        <p className="text-sm italic">By: {provider_name}</p>
      </div>

      {/* Recommend Button */}
      <Link to={`/products/${_id}`}>
        <button className="bg-yellow-500 hover:bg-yellow-400 text-gray-800 font-bold py-2 px-4 rounded-full shadow-md hover:shadow-lg hover:animate-bounce transition-all mt-4">
          Recommend
        </button>
      </Link>
    </div>
  );
};

export default ProductsCard;
