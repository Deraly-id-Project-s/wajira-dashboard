import { ArrowRight } from "lucide-react";

const Commodities = () => {
    const commodities = [
        {
            name: "Batik",
            image: "/assets/products/commodities/batik.png",
            description:
                "Step into the world of rich cultural heritage with our authentic Kain Batik fabrics. Each piece is carefully handcrafted using traditional wax-resist dyeing techniques, resulting in vibrant and intricate patterns that embody Indonesia’s timeless art. Perfect for fashion, gifts, or elegant home décor, our Kain Batik brings warmth and cultural depth to every setting.",
        },
        {
            name: "Briquette",
            image: "/assets/products/commodities/briquette.png",
            description:
                "Make a sustainable choice with our premium eco-friendly briquettes crafted from natural and renewable materials. These briquettes offer a clean, efficient, and cost-effective fuel source, ideal for cooking, heating, and reducing environmental impact. Experience the perfect balance of practicality and environmental responsibility in your daily life.",
        },
        {
            name: "Dupalo Incense",
            image: "/assets/products/commodities/duppalo.png",
            description:
                "Create an inviting and serene atmosphere with DUPALO incense, renowned for its natural and long-lasting fragrances. Perfect for meditation, relaxation, or enhancing your living or workspace, DUPALO incense brings tranquility and a touch of luxury to your environment through its expertly blended scents.",
        },
        {
            name: "Handcraft Pottery",
            image: "/assets/products/commodities/handcraft.png",
            description:
                "Bring artistry and tradition into your home with our exquisite handcraft pottery collection. Handcrafted by skilled artisans using high-quality local clay, these pieces marry beauty and functionality. From decorative vases to practical tableware, each item reflects a timeless craftsmanship ideal for collectors and those who appreciate genuine art.",
        },
        {
            name: "Woodcraft",
            image: "/assets/products/commodities/woodcraft.png",
            description:
                "Add warmth and sophistication with our finely crafted teak wood products. From stunning teak root tables to sturdy teak doors, each item showcases masterful workmanship and natural beauty.",
        },
    ];

    return (
        <section className="max-w-7xl mx-auto flex flex-col items-center justify-center py-12 space-y-16 px-[16px] md:px-0">
            {commodities.map((commodity, index) => (
                <div
                    key={index}
                    className="flex flex-col md:flex-row items-start gap-8"
                >
                    {/* Left: Image */}
                    <div className="relative w-full md:w-1/3 h-[232px] md:h-[320px] overflow-hidden shadow-lg flex-shrink-0">
                        <img
                            src={commodity.image}
                            alt={commodity.name}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />

                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                        {/* Title centered */}
                        <div className="absolute inset-0 flex items-end justify-center">
                            <h2 className="text-[32px] md:text-[32px] font-light text-white drop-shadow-md text-center mb-[10px]">
                                {commodity.name}
                            </h2>
                        </div>
                    </div>


                    {/* Right: Description + Button */}
                    <div className="w-full md:w-2/3 text-[#1A1A1A]">
                        <p className="text-[16px] md:text-base leading-relaxed opacity-90 mb-6 text-justify">
                            {commodity.description}
                        </p>

                        <button className="text-[14px] w-[150px] items-center gap-2 bg-[#1D3B56] text-white px-5 py-2.5 hover:bg-[#284c6e] flex justify-between transition-all shadow-md">
                            Contact Us
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default Commodities;
