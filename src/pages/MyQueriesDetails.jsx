import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyQueriesDetails = ({ product, handleDelete }) => {
    const {
        _id,
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
        <div className="p-6 bg-white shadow-md rounded-lg flex flex-col items-center ">
            {/* Product Image */}
            <img
                src={product_image}
                alt={product_name}
                className="w-32 h-32 object-cover rounded-full mb-4"
            />

            {/* Product Info */}
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-gray-600">{product_name}</p>
            <p className="text-sm text-gray-500 mb-4">
                Added on: {new Date(timestamp).toLocaleString()}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-3 p-2">
                {/* View Details Button */}
                <Link to={`/query-details/${_id}`}>
                    <button className="bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded">
                        Details
                    </button>
                </Link>

                {/* Update Button */}
                <Link to={`/update-query/${_id}`}>
                    <button className="bg-yellow-500 hover:bg-yellow-400 text-black py-2 px-4 rounded">
                        Update
                    </button>
                </Link>

                {/* Delete Button */}
                <button
                    onClick={() =>
                        Swal.fire({
                            title: 'Are you sure?',
                            text: 'You will not be able to recover this query!',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonText: 'Yes, delete it!',
                            cancelButtonText: 'No, cancel!',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                handleDelete(_id);
                                Swal.fire('Deleted!', 'Your query has been deleted.', 'success');
                            }
                        })
                    }
                    className="bg-red-500 hover:bg-red-400 text-white py-2 px-4 rounded"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default MyQueriesDetails;
