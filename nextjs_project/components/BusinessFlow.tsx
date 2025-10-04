'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const cards = [
  {
    name: 'PT. WAJIRA JAGRATARA YANOTAMA',
    desc: 'Focus on the processing of vehicle documents both two-wheeled and four-wheeled from ATPM.',
  },
  {
    name: 'PT. WAJIRA JAGRATARA YANOTAMA',
    desc: 'Focus on the processing of vehicle documents both two-wheeled and four-wheeled from ATPM.',
  },
  {
    name: 'PT. WAJIRA JAGRATARA YANOTAMA',
    desc: 'Focus on the processing of vehicle documents both two-wheeled and four-wheeled from ATPM.',
  },
  {
    name: 'PT. WAJIRA JAGRATARA YANOTAMA',
    desc: 'Focus on the processing of vehicle documents both two-wheeled and four-wheeled from ATPM.',
  },
]

export default function BusinessFlow() {
  return (
    <section
      id="business_flow_section"
      className="py-12 max-w-6xl mx-auto px-4"
    >
      <div className="grid max-sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {cards.map((card, index) => {
          const ref = useRef(null)
          const isInView = useInView(ref, { once: true, margin: '-50px' })

          return (
            <motion.div
              key={index}
              ref={ref}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.2, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="relative rounded-xl overflow-hidden shadow-md bg-white border border-gray-100"
            >
              <div className="aspect-[4/3] relative">
                <img
                  src="/assets/business_flow.png"
                  alt={card.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: index * 0.2 }}
                className="p-4"
              >
                <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">{card.name}</h3>
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">{card.desc}</p>
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
