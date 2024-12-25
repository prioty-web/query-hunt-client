

const QueriesSection = () => {
    const items = [
        {
            title: "Efficient Query Management",
            description: "Track and manage your queries seamlessly with advanced tools.",
        },
        {
            title: "Real-Time Updates",
            description: "Stay updated with the latest recommendations and responses.",
        },
        {
            title: "Comprehensive Insights",
            description: "Get detailed insights and analytics for your submitted queries.",
        },
    ];

    return (
        <section className="overflow-hidden bg-gradient-to-r from-slate-800 via-slate-600 to-slate-400 py-16 px-6">
            <h2 className="text-4xl font-serif text-center mb-10 text-white animate-fade-in">
                Explore Our Query Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="relative p-8 bg-white rounded-lg shadow-lg border border-gray-300 hover:shadow-2xl transition-all transform hover:scale-110 hover:-translate-y-2 duration-500 animate-slide-up"
                    >
                        {/* Subtle background animation */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-100 rounded-lg opacity-50 blur-md -z-10"></div>
                        
                        <p className="text-2xl font-semibold text-slate-800 mb-4">{item.title}</p>
                        <p className="text-gray-600">{item.description}</p>

                        {/* Decorative animation on hover */}
                        <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-slate-500 to-slate-300 rounded-full transform scale-0 group-hover:scale-150 transition-transform duration-700 -z-10"></div>
                        <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-gradient-to-r from-slate-500 to-slate-300 rounded-full transform scale-0 group-hover:scale-150 transition-transform duration-700 -z-10"></div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default QueriesSection;
