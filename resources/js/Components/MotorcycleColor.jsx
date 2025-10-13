import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';
import clsx from 'clsx';

function getMotorcycleVariants(slug) {
    switch (slug) {
        case 'aerox-alpha':
            return [
                {
                    name: 'Premium Black',
                    color: '#000000',
                    price: 'Rp 67.965.000',
                    image: '/assets/products/motorcycles/aerox1/colors/black.png',
                },
                {
                    name: 'Dark Blue Venom',
                    color: '#0000A0',
                    price: 'Rp 67.965.000',
                    image: '/assets/products/motorcycles/aerox1/colors/darkblue.png',
                },
                {
                    name: 'Luxury Red',
                    color: '#FF0000',
                    price: 'Rp 67.965.000',
                    image: '/assets/products/motorcycles/aerox1/colors/red.png',
                },
                {
                    name: 'Prestige Silver',
                    color: '#C0C0C0',
                    price: 'Rp 67.965.000',
                    image: '/assets/products/motorcycles/aerox1/colors/silver.png',
                },
            ];
            break;
        case 'lexi-lx-155':
            return [
                {
                    name: 'Matte Grey',
                    color: '#000000',
                    price: 'Rp 47.965.000',
                    image: '/assets/motorcycle/360/lexi-lx-155/colors/matte_grey.png',
                },
                {
                    name: 'Metallic Black',
                    color: '#1a1a1a',
                    price: 'Rp 47.965.000',
                    image: '/assets/motorcycle/360/lexi-lx-155/colors/metalic_black.png',
                },
                {
                    name: 'Metalic Red',
                    color: '#FF0000',
                    price: 'Rp 47.965.000',
                    image: '/assets/motorcycle/360/lexi-lx-155/colors/metalic_red.png',
                },
            ];
            break;
        case 'xmax-connected':
            return [
                {
                    name: 'Luxury Red',
                    color: '#FF0000',
                    price: 'Rp 67.965.000',
                    image: '/assets/motorcycle/360/xmax-connected/colors/luxury_black.png',
                },
                {
                    name: 'Premium Black',
                    color: '#000000',
                    price: 'Rp 67.965.000',
                    image: '/assets/motorcycle/360/xmax-connected/colors/premium_black.png',
                },
                {
                    name: 'Prestige Silver',
                    color: '#C0C0C0',
                    price: 'Rp 67.965.000',
                    image: '/assets/motorcycle/360/xmax-connected/colors/silver.png',
                },
            ];
            break;
        case 'grand-filano':
            return [
                {
                    name: 'Green',
                    color: '#00FF00',
                    price: 'Rp 27.965.000',
                    image: '/assets/motorcycle/360/grand-filano/colors/green.png',
                },
                {
                    name: 'Pink Mauve',
                    color: '#FFC0CB',
                    price: 'Rp 27.965.000',
                    image: '/assets/motorcycle/360/grand-filano/colors/pink_mauve.png',
                },
                {
                    name: 'Dull Blue',
                    color: '#0000A0',
                    price: 'Rp 27.965.000',
                    image: '/assets/motorcycle/360/grand-filano/colors/dull_blue.png',
                },
                {
                    name: 'White',
                    color: '#FFFFFF',
                    price: 'Rp 27.965.000',
                    image: '/assets/motorcycle/360/grand-filano/colors/white.png',
                },
            ];
        case 'all-new-nmax155-connected':
            return [
                {
                    name: 'Red',
                    color: '#000000',
                    price: 'Rp 33.965.000',
                    image: '/assets/motorcycle/360/all-new-nmax155-connected/colors/red.png',
                },
                {
                    name: 'Matte Green',
                    color: '#008000',
                    price: 'Rp 33.965.000',
                    image: '/assets/motorcycle/360/all-new-nmax155-connected/colors/matte_green.png',
                },
                {
                    name: 'Prestige Silver',
                    color: '#C0C0C0',
                    price: 'Rp 33.965.000',
                    image: '/assets/motorcycle/360/all-new-nmax155-connected/colors/prestige_silver.png',
                },
                {
                    name: 'Maxi Signature',
                    color: 'black',
                    price: 'Rp 33.965.000',
                    image: '/assets/motorcycle/360/all-new-nmax155-connected/colors/maxi_signature.png',
                },
            ];    
        case 'nmax-155':
            return [
                {
                    name: 'Matte Green',
                    color: '#000000',
                    price: 'Rp 33.965.000',
                    image: '/assets/motorcycle/360/nmax-turbo/colors/matte_green.png',
                },
                {
                    name: 'Maxi Signature',
                    color: '#000000',
                    price: 'Rp 33.965.000',
                    image: '/assets/motorcycle/360/nmax-turbo/colors/maxi_signature.png',
                },
                {
                    name: 'White',
                    color: '#FFFFFF',
                    price: 'Rp 33.965.000',
                    image: '/assets/motorcycle/360/nmax-turbo/colors/white.png',
                },
            ];
        case 'yamaha-r25':
            return [
                {
                    name: 'Metalic Black',
                    color: '#000000',
                    price: 'Rp 33.965.000',
                    image: '/assets/motorcycle/360/r25/colors/metallic_black.png',
                },
                {
                    name: 'Racing Blue',
                    color: '#0000FF',
                    price: 'Rp 33.965.000',
                    image: '/assets/motorcycle/360/r25/colors/racing_blue.png',
                },
            ];
        case 'xsr-155':
            return [
                {
                    name: 'Black',
                    color: '#000000',
                    price: 'Rp 33.965.000',
                    image: '/assets/motorcycle/360/xsr-155/colors/black.png',
                },
                {
                    name: 'Matte Silver',
                    color: '#C0C0C0',
                    price: 'Rp 33.965.000',
                    image: '/assets/motorcycle/360/xsr-155/colors/matte_silver.png',
                },
                {
                    name: 'Brown Metalic',
                    color: '#8B4513',
                    price: 'Rp 33.965.000',
                    image: '/assets/motorcycle/360/xsr-155/colors/brown_metalic.png',
                },
            ];
            default:
            return [];
    }
}

const MotorcycleColor = ({ slug }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const motorcycleVariants = getMotorcycleVariants(slug ?? 'aerox-alpha');

    if (!motorcycleVariants.length) return null;

    const [emblaRef, emblaApi] = useEmblaCarousel(
        { 
            loop: true, 
            align: 'center',
            skipSnaps: false
        }
        // Remove Autoplay temporarily for debugging
        // [Autoplay({ delay: 3000 })]
    );

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
                    {motorcycleVariants.map((motor, index) => {
                        const isActive = selectedIndex === index;

                        return (
                            <motion.div
                                initial={{ opacity: 0, y: 30, scale: 0.8, filter: 'brightness(0.7)' }}
                                animate={{ opacity: 1, y: 0, scale: 1, filter: 'brightness(1)' }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                className={clsx(
                                    'flex-[0_0_100%] flex justify-center transition-all duration-500 ease-in-out transform',
                                    getSlideClass(index)
                                )}
                                key={index}
                            >
                                <img
                                    src={motor?.image}
                                    alt={motor?.name}
                                    className="w-96 h-auto object-contain mx-auto"
                                />
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Color Selector */}
            <div className="flex justify-center gap-4 mt-8">
                {motorcycleVariants.map((motor, index) => (
                    <button
                        key={index}
                        onClick={() => scrollToIndex(index)}
                        className={clsx(
                            'w-10 h-6 rounded-sm border-2 transition',
                            selectedIndex === index
                                ? 'border-black scale-110'
                                : 'border-gray-300 scale-100'
                        )}
                        style={{ backgroundColor: motor.color }}
                    />
                ))}
            </div>

            {/* Info */}
            <div className="mt-6">
                <h3 className="text-lg font-semibold">{motorcycleVariants[selectedIndex]?.name}</h3>
                {/* <p className="text-2xl font-bold">{motorcycleVariants[selectedIndex]?.price}</p>
                <p className="text-sm text-black mt-1">Harga Rekomendasi OTR Jakarta</p> */}
            </div>
        </section>
    );
};

export default MotorcycleColor;