import React, { useContext } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthProvider';
import Swal from 'sweetalert2';

const UpdateQuery = () => {
    const navigate = useNavigate();

    const product = useLoaderData();
    const { user } = useContext(AuthContext)
    const currentDateTime = new Date(Date.now());
    const formattedDateTime = `${currentDateTime.toLocaleDateString()} ${currentDateTime.toLocaleTimeString()}`;

    const count = product.recommand_count;


    const handleUpdateProducts = e => {
        e.preventDefault();

        const title = e.target.title.value;
        const product_name = e.target.product_name.value;
        const product_image = e.target.product_image.value;
        const recommendation_reason = e.target.recommendation_reason.value;
        const timestamp = formattedDateTime;
        const provider_email = user.email;
        const provider_name = user.displayName;
        const provider_image = user.photoURL;
        const recommand_count = count;
        const product_brand = e.target.product_brand.value;
        const product_boycot = e.target.product_boycot.value;




        const updateProduct = {
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
        }
        console.log(updateProduct)

        // send data to the server and database
        fetch(`http://localhost:5000/my-quries/${product._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateProduct)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    console.log(data);
                    Swal.fire({
                        title: 'Success!',
                        text: 'Product update successfully',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    });
                    navigate('/my-quries')

                    e.target.reset();
                }
            })

    }
    return (
        <div className='lg:w-3/4 mx-auto mt-14  rounded-md'>
            <div className="text-center p-10">
                <h1 className="text-5xl font-bold text-slate-600 ">Update Product!</h1>

            </div>
            <div className="card w-full shrink-0 shadow-2xl bg-[#f2f0e6] lg:p-8">
                <form onSubmit={handleUpdateProducts} className="card-body">
                    {/* form first row */}
                    <div className='flex flex-col lg:flex-row gap-5'>
                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text">Product Name</span>
                            </label>
                            <input type="text" name='product_name' placeholder="Product name" className="input input-bordered" defaultValue={product.product_name} required />
                        </div>

                    </div>
                    {/* form first row */}
                    <div className='flex flex-col lg:flex-row gap-5'>
                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text">Product Brand</span>
                            </label>
                            <input type="text" name='product_brand' placeholder="Product Brand" className="input input-bordered" defaultValue={product.product_brand} required />
                        </div>

                    </div>
                    {/* form first row */}
                    <div className='flex flex-col lg:flex-row gap-5'>
                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text">Product Boycot</span>
                            </label>
                            <input type="text" name='product_boycot' placeholder="Product Bnoycot" className="input input-bordered" defaultValue={product.product_boycot} required />
                        </div>

                    </div>
                    {/* form second row */}
                    <div className='flex flex-col lg:flex-row gap-5'>
                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text">Title</span>
                            </label>
                            <input type="text" name='title' placeholder="product title" className="input input-bordered" defaultValue={product.title} required />
                        </div>

                    </div>



                    {/* form third row */}

                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text">Details</span>
                        </label>
                        <input type="text" name='recommendation_reason' placeholder="" className="input input-bordered" defaultValue={product.recommendation_reason} required />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input type="url" name='product_image' placeholder="Upload a image link here" className="input input-bordered" defaultValue={product.product_image} required />

                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-slate-600 text-white ">Add Product</button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default UpdateQuery;