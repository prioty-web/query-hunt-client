import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../auth/AuthProvider';
import MyQueriesDetails from './MyQueriesDetails';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MyQueries = () => {
    const [products, setProducts] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        axios.get(`http://localhost:5000/my-quries?email=${user?.email}`, { withCredentials: true })
            .then(response => {
                const data = response.data;
                // Sort the data based on timestamp
                const sortedData = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                setProducts(sortedData);
            })
            .catch(error => {
                console.error("There was an error fetching the data:", error);
            });
    }, [user?.email]);

    return (
        <div className=''>
            <div className="bg-gradient-to-r from-slate-300 to-slate-500 text-white py-10 px-5 text-center rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold mb-5">Welcome to My Queries</h1>
                <p className="text-lg mb-8">Manage and track your queries effortlessly.</p>
                <Link
                    to={'/add-products'}
                    className="bg-white text-blue-500 font-semibold py-2 px-5 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300"
                >
                    Add Queries
                </Link>
            </div>
            <h2 className="text-3xl font-bold text-center text-gray-700 my-5">
                My Queries: <span className="text-blue-500">{products.length}</span>
            </h2>

            {products.length === 0 ? (
                <div className="text-center mt-10">
                    <p className="text-lg text-gray-600 mb-5">No queries found. Add your first query now!</p>
                    <Link
                        to={'/add-products'}
                        className="bg-blue-500 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Add Queries
                    </Link>
                </div>
            ) : (
                <div className="grid md:grid-cols-3 gap-3">
                    {products.map(product => (
                        <MyQueriesDetails key={product._id} product={product}></MyQueriesDetails>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyQueries;
