import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";




const AddProducts = () => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate();
    const currentDateTime = new Date(Date.now());
    const formattedDateTime = `${currentDateTime.toLocaleDateString()} ${currentDateTime.toLocaleTimeString()}`;

    const handleAddProducts = e => {
        e.preventDefault();

        const title = e.target.title.value;
        const product_name = e.target.product_name.value;
        const product_image = e.target.product_image.value;
        const recommendation_reason = e.target.recommendation_reason.value;
        const timestamp = formattedDateTime;
        const provider_email = user.email;
        const provider_name = user.displayName;
        const provider_image = user.photoURL;
        const recommand_count = 0
        const product_brand = e.target.product_brand.value;
        const product_boycot = e.target.product_boycot.value;




        const newProduct = {
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
        console.log(newProduct)

        // send data to the server and database
        axios.post('http://localhost:5000/products', newProduct, { withCredentials: true })
            .then(response => {
                const data = response.data;
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Product added successfully',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    });
                    e.target.reset(); // Reset the form after submission
                    navigate('/all-products'); // Navigate to the product listing page
                }
            })
            .catch(error => {
                console.error("There was an error adding the product:", error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to add product',
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                });
            });

    }

    return (

        <div className='lg:w-3/4 mx-auto mt-14  rounded-md'>
            <div className="text-center p-10">
                <h1 className="text-5xl font-bold text-slate-600 ">Add Product!</h1>

            </div>
            <div className="card w-full shrink-0 shadow-2xl bg-[#f2f0e6] lg:p-8">
                <form onSubmit={handleAddProducts} className="card-body">
                    {/* form first row */}
                    <div className='flex flex-col lg:flex-row gap-5'>
                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text">Product Name</span>
                            </label>
                            <input type="text" name='product_name' placeholder="Product name" className="input input-bordered" required />
                        </div>

                    </div>
                    {/* form first row */}
                    <div className='flex flex-col lg:flex-row gap-5'>
                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text">Product Brand</span>
                            </label>
                            <input type="text" name='product_brand' placeholder="Product Brand" className="input input-bordered" required />
                        </div>

                    </div>
                    {/* form first row */}
                    <div className='flex flex-col lg:flex-row gap-5'>
                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text">Product Boycot</span>
                            </label>
                            <input type="text" name='product_boycot' placeholder="Product Bnoycot" className="input input-bordered" required />
                        </div>

                    </div>
                    {/* form second row */}
                    <div className='flex flex-col lg:flex-row gap-5'>
                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text">Title</span>
                            </label>
                            <input type="text" name='title' placeholder="product title" className="input input-bordered" required />
                        </div>

                    </div>



                    {/* form third row */}

                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text">Details</span>
                        </label>
                        <input type="text" name='recommendation_reason' placeholder="" className="input input-bordered" required />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input type="url" name='product_image' placeholder="Upload a image link here" className="input input-bordered" required />

                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-slate-600 text-white ">Add Product</button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default AddProducts;