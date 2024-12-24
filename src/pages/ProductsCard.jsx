

const ProductsCard = (product) => {
    const {_id, title,
        product_name, product_image, recommendation_reason,recommendation_count , timestamp} = product
    return (
        <div className="flex flex-col items-center p-5 lg:m-3 bg-gradient-to-r from-slate-300 to-slate-500 text-white shadow-xl rounded-xl hover:scale-105 transition-transform duration-300 ease-in-out">
        <img
          src={product.product_image}
          alt={product.product_name}
          className="w-32 h-32 object-cover rounded-full border-4 border-white mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
        <p className="text-lg font-semibold">{product.product_name}</p>
        <p className="text-sm italic mb-3">{product.recommendation_reason}</p>
        <p className="text-sm bg-white text-gray-800 px-3 py-1 rounded-full font-medium mb-4">
          Recommendations: {product.recommendation_count}
        </p>
        <p className="text-sm mb-4">{new Date(product.timestamp).toLocaleString()}</p>
        <button className="bg-yellow-500 hover:bg-yellow-400 text-gray-800 font-bold py-2 px-4 rounded-full shadow-md hover:shadow-lg hover:animate-bounce transition-all">
          Recommend
        </button>
      </div>
    );
};

export default ProductsCard;