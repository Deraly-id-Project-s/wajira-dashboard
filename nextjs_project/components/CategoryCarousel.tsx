'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

const categories = ['Naked', 'Sport', 'Maxi']

const motors = [
  { name: 'Yamaha Vixion', price: '24.000.000', img: '/motor/naked1.png', category: 'Naked' },
  { name: 'Honda CB150R', price: '26.000.000', img: '/motor/naked2.png', category: 'Naked' },
  { name: 'Yamaha R15', price: '39.000.000', img: '/motor/sport1.png', category: 'Sport' },
  { name: 'Suzuki GSX-R150', price: '35.000.000', img: '/motor/sport2.png', category: 'Sport' },
  { name: 'Yamaha NMAX', price: '32.000.000', img: '/motor/maxi1.png', category: 'Maxi' },
  { name: 'Honda PCX', price: '34.000.000', img: '/motor/maxi2.png', category: 'Maxi' },
]

export default function MotorListSlider() {
  const [selectedCategory, setSelectedCategory] = useState('Naked')
  
  // Casting ke any agar TS tidak error tipe
  const [emblaRef] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ active: true }) as any]
  )

  const filteredMotors = motors.filter((m) => m.category === selectedCategory)

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="flex justify-center gap-4 mb-8">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full border text-sm capitalize transition-all duration-300 ${
              selectedCategory === cat
                ? 'bg-black text-white scale-110'
                : 'bg-gray-100 text-gray-600 opacity-70'
            }`}
            whileHover={{ scale: 1.05 }}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {filteredMotors.map((motor, index) => (
            <motion.div
              key={index}
              className="relative min-w-[250px] max-w-[280px] bg-white rounded-xl shadow-lg overflow-visible flex-shrink-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.img
                src={motor.img}
                alt={motor.name}
                className="w-full h-40 object-contain absolute -top-16 left-1/2 -translate-x-1/2"
                whileHover={{ scale: 1.1, rotate: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              />
              <div className="pt-28 pb-4 px-4 text-center">
                <h3 className="font-semibold text-gray-800 text-sm mb-1">{motor.name}</h3>
                <p className="text-gray-500 text-xs">Rp {motor.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
