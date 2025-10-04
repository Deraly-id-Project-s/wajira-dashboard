'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from '@/Components/ui/image';

const services = [
  {
    id: 'motorcycle',
    title: 'Motorcycle',
    icon: '🏍️',
    description:
      'Export various motorcycle brands like Honda, Yamaha, Suzuki, Vespa, and EV models.',
    image: 'https://images.unsplash.com/photo-1671354925315-229af5178a83?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'ownership',
    title: 'Ownership Transfer Fee',
    icon: '📄',
    description:
      'Ownership document processing and transfer services with complete support.',
    image: 'https://plus.unsplash.com/premium_photo-1678917827802-721b5f5b4bf0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'expedition',
    title: 'Expedition',
    icon: '🚚',
    description:
      'Domestic and international shipping with trusted logistic partners.',
    image: 'https://plus.unsplash.com/premium_photo-1683134585562-092298961f35?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'commodity',
    title: 'Commodity Export',
    icon: '📦',
    description:
      'Export local commodities globally with certified processes and FOB or C&F terms.',
    image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const ProductAndCategory = () => {
  const [activeTab, setActiveTab] = useState('motorcycle');

  const current = services.find((s) => s.id === activeTab);

  return (
    <section id="product_category_section" className="pb-12 pt-9 px-4 max-w-6xl mx-auto">
      <p className="text-center text-gray-600 mb-6 max-w-xl mx-auto">
        We are licensed to export various motorcycle brands. Competitive prices, excellent service, and ship on FOB or C&F terms.
      </p>

      {/* Tab Buttons */}
      <div className="flex flex-wrap justify-center mb-8 gap-2">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => setActiveTab(service.id)}
            className={`px-4 py-2 rounded-full font-semibold transition-all ${
              activeTab === service.id
                ? 'bg-yellow-400 text-black'
                : 'bg-red-700 text-white hover:bg-red-600'
            }`}
          >
            {service.title}
          </button>
        ))}
      </div>

      {/* Content Section */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current?.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="bg-gray-100 rounded-2xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6 min-h-[400px]"
        >
          <div className="flex-1 space-y-3">
            <div className="text-4xl">{current?.icon}</div>
            <h3 className="text-xl font-bold">{current?.title}</h3>
            <p className="text-gray-700">{current?.description}</p>
          </div>
          <div className="flex-1">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <Image
                src={current?.image || '/images/placeholder.jpg'}
                alt={current?.title || ''}
                width={500}
                height={300}
                className="object-cover w-full h-72"
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

export default ProductAndCategory;