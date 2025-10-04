'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from '@/Components/ui/image';

// Gambar dummy
const images = {
  types: '/assets/particles/box_car1.png',
  monitoring: 'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?q=80&w=2121&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  security: 'https://images.unsplash.com/photo-1493946740644-2d8a1f1a6aff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FyZ298ZW58MHx8MHx8fDA%3D',
};

const LogisticBusiness = () => {
  const [selected, setSelected] = useState<'types' | 'monitoring' | 'security'>('types');

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* Layout utama */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Gambar */}
        <motion.div
          key={selected}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="md:w-1/2 w-full"
        >
          <Image
            src={images[selected]}
            alt="Selected image"
            width={800}
            height={600}
            className="rounded-xl object-cover w-full h-auto"
          />
        </motion.div>

        {/* Card-container */}
        <div className="grid grid-cols-1 gap-4 w-full md:w-1/2">
          {/* Card 1 */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelected('types')}
            className={`cursor-pointer p-5 rounded-xl shadow-lg transition-colors duration-300 ${
              selected === 'types' ? 'bg-yellow-300' : 'bg-yellow-100'
            }`}
          >
            <h3 className="font-semibold text-lg mb-2">Types of Logistics Services</h3>
            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
              <li>Domestic Delivery: Door-to-door cargo shipping</li>
              <li>International Shipping: Export support</li>
              <li>Dealer-to-Dealer Transport: Specialized transport</li>
            </ul>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelected('monitoring')}
            className={`cursor-pointer p-5 rounded-xl shadow-lg transition-colors duration-300 ${
              selected === 'monitoring' ? 'bg-gray-300' : 'bg-gray-100'
            }`}
          >
            <h3 className="font-semibold text-lg mb-2">Fleet Monitoring Made Simple</h3>
            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
              <li>Manual check-in/out status</li>
              <li>Location updates on request</li>
              <li>Daily logs for mileage, deliveries</li>
            </ul>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelected('security')}
            className={`cursor-pointer p-5 rounded-xl shadow-lg transition-colors duration-300 ${
              selected === 'security' ? 'bg-blue-300' : 'bg-blue-100'
            }`}
          >
            <h3 className="font-semibold text-lg mb-2">Security and Safety Measures</h3>
            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
              <li>Verified & trained drivers</li>
              <li>Sealed cargo for long distance</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LogisticBusiness;
