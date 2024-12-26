import { useEffect, useState } from "react";
import ProductsCard from "./ProductsCard";
import axios from "axios";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // State for search input
    const [gridColumns, setGridColumns] = useState(3); // State for controlling grid layout (1, 2, 3 columns)

    // Fetch products on mount
    useEffect(() => {
        axios.get('https://query-hunt-server.vercel.app/products', { withCredentials: true })
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => {
                console.error('Error fetching products:', err);
            });
    }, []);

    // Filter products based on search query
    const filteredProducts = products.filter(product =>
        product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Handle grid layout toggle
    const handleGridLayout = (columns) => {
        setGridColumns(columns);
    };

    return (
        <div>
            <div className="text-center my-10">
                <h1 className="font-serif text-2xl md:text-5xl">Help millions make the right choice</h1>
                <p className="font-medium text-gray-600">Share your experience on QUERY HUNT, where real reviews make a difference.</p>
            </div>

            {/* Search bar */}
            <div className="text-center my-4">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                    className="p-3 border border-gray-400 rounded-md"
                />
            </div>

            {/* Grid layout toggle buttons */}
            <div className=" hidden lg:flex justify-center space-x-4 mb-6">
                
                <button
                    onClick={() => handleGridLayout(2)} // 2 columns
                    className={`p-3 border ${gridColumns === 2 ? 'bg-blue-500 text-white' : 'bg-white'}`}
                >
                    2 Columns
                </button>
                <button
                    onClick={() => handleGridLayout(3)} // 3 columns
                    className={`p-3 border ${gridColumns === 3 ? 'bg-blue-500 text-white' : 'bg-white'}`}
                >
                    3 Columns
                </button>
            </div>

            {/* Display filtered products */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${gridColumns} gap-4 lg:w-11/12 mx-auto my-10`}>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ProductsCard
                            key={product._id}
                            product={product}
                        />
                    ))
                ) : (
                    <div className="text-center col-span-full text-lg text-gray-500">No products found matching your search.</div>
                )}
            </div>
        </div>
    );
};

export default Products;
