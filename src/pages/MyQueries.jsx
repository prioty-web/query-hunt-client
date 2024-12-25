import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../auth/AuthProvider';
import MyQueriesDetails from './MyQueriesDetails';

const MyQueries = () => {
    const [products, setProducts] = useState([]);
    const {user} = useContext(AuthContext)
    
    
        useEffect(() => {
            fetch(`http://localhost:5000/my-quries?email=${user?.email}`)
                .then(res => res.json())
                .then(data => {
                    setProducts(data);
                })
        }, [user?.email])
    return (
        <div className=''>
            <h2>Your Quries : {products.length}</h2>
            <div className='grid md:grid-cols-3 gap-3'>
            {
                products.map(product =><MyQueriesDetails key={product._id} product={product}></MyQueriesDetails>)
            }
            </div>
        </div>
    );
};

export default MyQueries;