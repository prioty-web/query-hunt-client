import { useEffect, useState } from "react";
import ProductsCard from "./ProductsCard";


const Products = () => {
    const [products, setProducts] = useState([]);


    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
            })
    }, [])
    return (
        <div>

            <div className="text-center my-10">
                <h1 className="font-serif text-2xl md:text-5xl ">Help millions make the right choice</h1>
                <p className="font-medium text-gray-600 ">Share your experience on QUERY HUNT, where real reviews make a difference.</p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:w-11/12 mx-auto my-10'>
                {products.map((product) => (
                    <ProductsCard
                        key={product._id}
                        product={product}
                    />
                ))}
            </div>
        </div>
    );
};

export default Products;