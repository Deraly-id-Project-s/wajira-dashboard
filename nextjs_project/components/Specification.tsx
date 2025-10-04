'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Specification = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const specsData = {
    mesin: [
      { key: 'Tipe Mesin', value: '4-Langkah, SOHC, 2-Katup' },
      { key: 'Kapasitas', value: '149.16 cc' },
      { key: 'Daya Maksimum', value: '9.65 kW (13.1 PS) / 8500 rpm' },
      { key: 'Torsi Maksimum', value: '13.8 Nm / 6000 rpm' },
      { key: 'Sistem Bahan Bakar', value: 'Fuel Injection' },
    ],
    rangka: [
      { key: 'Tipe Rangka', value: 'Tulang Punggung' },
      { key: 'Suspensi Depan', value: 'Teleskopik' },
      { key: 'Suspensi Belakang', value: 'Unit Swing' },
      { key: 'Rem Depan', value: 'Cakram Hidrolik' },
      { key: 'Rem Belakang', value: 'Drum' },
    ],
    dimensi: [
      { key: 'Panjang x Lebar x Tinggi', value: '1935 x 685 x 1075 mm' },
      { key: 'Jarak Sumbu Roda', value: '1280 mm' },
      { key: 'Jarak Terendah', value: '150 mm' },
      { key: 'Tinggi Tempat Duduk', value: '765 mm' },
      { key: 'Berat Isi', value: '115 kg' },
    ],
    kelistrikan: [
      { key: 'Sistem Pengapian', value: 'TCI' },
      { key: 'Baterai', value: '12V 3Ah' },
      { key: 'Lampu Depan', value: 'LED' },
      { key: 'Lampu Belakang', value: 'LED' },
      { key: 'Indikator', value: 'Digital' },
    ],
  };

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const sectionVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto' },
    exit: { opacity: 0, height: 0 },
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: { delay: i * 0.05 },
    }),
  };

  return (
    <div className="max-w-full mx-auto p-6 max-sm:p-2 bg-white rounded-xl shadow-lg">
      {Object.entries(specsData).map(([section, items]) => (
        <div key={section} className="mb-4 overflow-hidden">
          <motion.button
            onClick={() => toggleSection(section)}
            className="w-full flex justify-between items-center p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-lg hover:from-red-100 hover:to-red-50 transition-all duration-150"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <h3 className="text-lg font-semibold text-gray-700 capitalize">
              {section}
            </h3>
            {activeSection === section ? (
              <ChevronUp className="text-indigo-600" />
            ) : (
              <ChevronDown className="text-indigo-600" />
            )}
          </motion.button>

          <AnimatePresence>
            {activeSection === section && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={sectionVariants}
                className="bg-gray-50 rounded-b-lg overflow-hidden"
              >
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {items.map((item, i) => (
                    <motion.div
                      key={item.key}
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      variants={itemVariants}
                      className="bg-white p-3 rounded-lg shadow-sm border border-gray-100"
                    >
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-medium">{item.key}</span>
                        <span className="text-gray-800 font-semibold">{item.value}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default Specification;