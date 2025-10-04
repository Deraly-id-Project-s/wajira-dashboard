

import { motion } from 'framer-motion';
import Image from '@/Components/ui/image';

const cards = [
    {
        title: 'Vehicle Documentation',
        content: 'Comprehensive processing of STNK, BPKB, and ownership transfer for two-wheeled and four-wheeled vehicles, fully integrated with ATPM standards.',
        image: '/assets/business_affiliated/document.png',
    },
    {
        title: 'Motorcycle Distribution',
        content: 'Specialized in the trading and distribution of motorcycles and automotive spare parts, serving dealers and export markets across Indonesia.',
        image: '/assets/business_affiliated/motorcycle.png',
    },
    {
        title: 'Freight & Logistics',
        content: 'Providing domestic and international freight solutions, including fleet leasing, cargo forwarding, and end-to-end transport coordination.',
        image: '/assets/business_affiliated/logistic.png',
    },
    {
        title: 'International Trade',
        content: 'Focus on the processing of vehicle documents both two-wheeled and four-wheeled from ATPM.',
        image: '/assets/business_affiliated/trade.png',
    },
];

export default function Affiliated() {
    return (
        <section id="affiliated_section" className="w-full py-16 px-4 bg-[#FFF8E7]">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-6">
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className={`flex h-[162px] bg-yellow-400 rounded-xl shadow-lg overflow-hidden ${index % 2 !== 0 ? 'md:mt-[81px]' : ''
                                }`}
                        >
                            <motion.div
                                whileHover={{
                                    scale: 1.08,
                                    rotate: 6,
                                    boxShadow: "0 8px 24px rgba(0,0,0,0.18)"
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="aspect-square md:w-40 md:h-40 object-cover rounded-l-xl"
                            >
                                <Image
                                    src={card.image}
                                    alt={card.title}
                                    width={128}
                                    height={128}
                                    className="w-full h-full object-cover rounded-l-xl"
                                />
                            </motion.div>
                            <div className="p-4">
                                <h2 className="text-lg font-semibold mb-2">{card.title}</h2>
                                <p className="text-sm text-gray-800">{card.content}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
