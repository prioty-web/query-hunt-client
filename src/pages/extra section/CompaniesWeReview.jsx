
import Marquee from 'react-fast-marquee';

const CompaniesWeReview = () => {
    const companies = [
        { name: "Company A", logo: "https://images.seeklogo.com/logo-png/52/1/walton-logo-png_seeklogo-528885.png?v=1958562176462840528" },
        { name: "Company B", logo: "https://cdn-icons-png.freepik.com/256/5969/5969254.png?semt=ais_hybrid" },
        { name: "Company C", logo: "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/102019/captura_de_pantalla_2019-10-22_a_las_12.41.43_0.png?Wj91xfy5qHRnydcm_6xeXzJlQuxRjqDC&itok=jwsE5orY" },
        { name: "Company D", logo: "https://img.freepik.com/free-psd/google-icon-isolated-3d-render-illustration_47987-9777.jpg" },
        { name: "Company E", logo: "https://seeklogo.com/images/M/minister-logo-EAE9D44953-seeklogo.com.png" },
        { name: "Company F", logo: "https://images.seeklogo.com/logo-png/25/1/rfl-logo-png_seeklogo-250040.png?v=1958568534104881616" },
        { name: "Company G", logo: "https://seeklogo.com/images/M/marcel-logo-44DF800726-seeklogo.com.png" },
        { name: "Company H", logo: "https://cdn.iconscout.com/icon/free/png-256/free-hitachi-logo-icon-download-in-svg-png-gif-file-formats--company-brand-world-logos-vol-12-pack-icons-283255.png" },
        { name: "Company I", logo: "https://cdn-icons-png.freepik.com/512/5969/5969287.png" },
        { name: "Company J", logo: "https://cdn-icons-png.freepik.com/512/5969/5969071.png" },
    ];

    return (
        <section className="bg-gradient-to-r from-slate-800 via-slate-600 to-slate-400 py-16 px-6">
            <h2 className="text-4xl font-serif text-center mb-10 text-white animate-fade-in">
                Companies We Review
            </h2>
            <div className="overflow-hidden">
                <Marquee speed={50} gradient={false} className="mt-6">
                    {companies.map((company, index) => (
                        <div
                            key={index}
                            className="flex justify-center items-center mx-6 p-4 bg-white rounded-lg shadow-lg hover:scale-110 transition-transform duration-300"
                        >
                            <img
                                src={company.logo}
                                alt={`${company.name} logo`}
                                className="h-20 w-auto object-contain"
                            />
                        </div>
                    ))}
                </Marquee>
            </div>
        </section>
    );
};

export default CompaniesWeReview;
