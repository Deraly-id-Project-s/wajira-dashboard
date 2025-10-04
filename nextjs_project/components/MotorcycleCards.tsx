import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function MotorShowcase() {
  const categories = [
    { id: 1, name: 'Maxi', icon: '/assets/icons/maxi.png' },
    { id: 2, name: 'Sport', icon: '/assets/icons/sport.png' },
    { id: 3, name: 'Matic', icon: '/assets/icons/matic.png' },
  ];
  const [selected, setSelected] = useState('Sport');

  const motors = [
    { id: 1, name: 'Yamaha R25', slug: 'yamaha-r25', price: '32.500.000', img: '/assets/motorcycle/360/r25/034.png', category: 'Sport' },
    { id: 2, name: 'NMax 155', slug: 'nmax-155', price: '31.000.000', img: '/assets/motorcycle/360/nmax-turbo/034.png', category: 'Maxi' },
    { id: 3, name: 'XMAX Connected', slug: 'xmax-connected', price: '31.000.000', img: '/assets/motorcycle/360/xmax-connected/034.png', category: 'Maxi' },
    { id: 4, name: 'Aerox Alpha', slug: 'aerox-alpha', price: '29.000.000', img: '/assets/motorcycle/360/aerox-alpha/034.png', category: 'Matic' },
    { id: 5, name: 'Lexi LX 155', slug: 'lexi-lx-155', price: '19.000.000', img: '/assets/motorcycle/360/lexi-lx-155/034.png', category: 'Matic' },
    { id: 6, name: 'Grand Filano', slug: 'grand-filano', price: '39.000.000', img: '/assets/motorcycle/360/grand-filano/034.png', category: 'Matic' },
    { id: 7, name: 'XSR 155', slug: 'xsr-155', price: '39.000.000', img: '/assets/motorcycle/360/xsr-155/034.png', category: 'Sport' },
    { id: 8, name: 'All New NMAX 155', slug: 'all-new-nmax155-connected', price: '27.000.000', img: '/assets/motorcycle/360/all-new-nmax155-connected/034.png', category: 'Maxi' },
  ];  

  // Embla untuk kategori (masih digunakan)
  const [categoryRef, categoryApi] = useEmblaCarousel({ align: 'center' });

  const scrollToCategory = useCallback((index: number) => {
    if (categoryApi) categoryApi.scrollTo(index);
  }, [categoryApi]);

  useEffect(() => {
    const index = categories.findIndex((c) => c.name === selected);
    if (index !== -1) scrollToCategory(index);
  }, [selected, scrollToCategory]);

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 max-sm:px-1 relative">
      {/* Kategori Icon Slider */}
      <div className="overflow-hidden mb-10 p-5" ref={categoryRef}>
        <div className="flex items-center gap-6 px-10">
          {categories.map((category) => {
            const isSelected = selected === category.name;
            return (
              <motion.div
                key={category.id}
                className={clsx(
                  'flex-shrink-0 mx-4 text-center transition-all cursor-pointer',
                  isSelected ? 'scale-110 opacity-100' : 'scale-90 opacity-30'
                )}
                onClick={() => setSelected(category.name)}
                whileHover={{ scale: 1.15 }}
              >
                <div className={clsx(
                  'w-20 h-20 mx-auto flex items-center justify-center rounded-full border-2 bg-black',
                  isSelected ? 'border-red-600' : 'border-gray-300'
                )}>
                  <img
                    src={category.icon}
                    alt={category.name}
                    className="w-10 h-10 object-contain filter invert brightness-0 contrast-100"
                  />
                </div>
                <p className={clsx(
                  'mt-2 text-lg font-medium',
                  isSelected ? 'text-blue-600' : 'text-gray-600'
                )}>
                  {category.name}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Motor List Grid (Tanpa Slider) */}
      <div className="flex flex-wrap gap-6 max-sm:gap-3 justify-center px-4 max-sm:px-0">
        {motors
          .filter((motor) => motor.category === selected)
          .map((motor) => (
            <motion.a
              href={'/product/otomotif/' + motor.slug}
              key={motor.id}
              className="w-64 max-sm:w-5/12 bg-white rounded-xl shadow-md relative overflow-visible mt-32 max-sm:mt-36 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              {/* Gambar Motor */}
              <motion.div
                className="absolute -top-16 left-1/2 -translate-x-1/2 -translate-y-14 w-52 h-52"
              >
                <img
                  src={motor.img}
                  alt={motor.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Isi Card */}
              <div className="mt-20 p-4 text-start">
                <h3 className="font-semibold text-2xl">{motor.name}</h3>
                <p className="text-black flex flex-col mt-3">
                  <span className="text-sm">Mulai dari : </span>
                  <span className="text-lg max-sm:mb-7">Rp {motor.price}</span>
                </p>
              </div>

              <div className="absolute bottom-0 right-0 p-2 bg-black text-white rounded-br-xl rounded-tl-xl">
                Detail
              </div>
            </motion.a>
          ))}
      </div>
    </section>
  );
}
