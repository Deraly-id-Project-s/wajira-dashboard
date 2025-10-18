import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const MotorcycleColor = ({ data = [] }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const motorcycleVariants = data.map((item) => ({
        name: item.color_name,
        color: item.color_code,
        image: `/storage/${item.image}`,
        stock: item.stock,
    }));

    if (!motorcycleVariants.length) return null;

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'center',
        skipSnaps: false,
    });

    const scrollToIndex = useCallback(
        (index) => {
            if (emblaApi) emblaApi.scrollTo(index);
        },
        [emblaApi]
    );

    useEffect(() => {
        if (!emblaApi) return;
        const onSelect = () => {
            setSelectedIndex(emblaApi.selectedScrollSnap());
        };
        emblaApi.on('select', onSelect);
        onSelect();
    }, [emblaApi]);

    const getSlideClass = (index) => {
        const total = motorcycleVariants.length;
        const prev = (selectedIndex - 1 + total) % total;
        const next = (selectedIndex + 1) % total;

        if (index === selectedIndex) return 'opacity-100 scale-100 z-10';
        if (index === prev || index === next) return 'opacity-40 scale-95 z-0';
        return 'opacity-10 scale-90 z-0';
    };

    return (
        <section
            className="relative w-full mx-auto py-16 px-4 text-center"
            id="motorcycle-color-select"
            style={{
                backgroundImage: 'url("/assets/particles/showroom.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            {/* Embla Viewport */}
            <div className="overflow-hidden relative" ref={emblaRef}>
                <div className="flex">
                    {motorcycleVariants.map((motor, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30, scale: 0.8, filter: 'brightness(0.7)' }}
                            animate={{ opacity: 1, y: 0, scale: 1, filter: 'brightness(1)' }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className={clsx(
                                'flex-[0_0_100%] flex justify-center transition-all duration-500 ease-in-out transform',
                                getSlideClass(index)
                            )}
                        >
                            <img
                                src={motor.image}
                                alt={motor.name}
                                className="w-96 h-auto object-contain mx-auto"
                                loading="lazy"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Color Selector */}
            <div className="flex justify-center gap-2 mt-8">
                {motorcycleVariants.map((motor, index) => (
                    <button
                        key={index}
                        onClick={() => scrollToIndex(index)}
                        className={clsx(
                            'relative w-10 h-6 border-2 transition-all duration-300 transform skew-x-[-20deg]',
                            selectedIndex === index
                                ? 'border-gray-300 scale-110 shadow-md'
                                : 'border-black opacity-80 hover:opacity-100 hover:scale-105'
                        )}
                        style={{ backgroundColor: motor.color }}
                    >
                        {/* optional inner highlight */}
                        <span className="absolute inset-0 opacity-0 hover:opacity-20 bg-white transition rounded-sm"></span>
                    </button>
                ))}
            </div>


            {/* Info */}
            <div className="mt-6">
                <h3 className="text-lg font-semibold">
                    {motorcycleVariants[selectedIndex]?.name}
                </h3>
                {motorcycleVariants[selectedIndex]?.stock !== undefined && (
                    <p className="text-sm text-gray-600 mt-1">
                        Stok: {motorcycleVariants[selectedIndex].stock}
                    </p>
                )}
            </div>
        </section>
    );
};

export default MotorcycleColor;
