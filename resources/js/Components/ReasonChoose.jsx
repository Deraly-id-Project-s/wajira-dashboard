import { motion } from "framer-motion";

export default function ReasonChoose({ lang }) {
  const reasons = [
    {
      title: (lang?.content?.[0]?.title) ?? "Unmatched expertise",
      desc: (lang?.content?.[0]?.desc) ?? "Our team combines years of industry experience with innovative problem-solving, ensuring outstanding results each time.",
      img: "/assets/reason_illustrations/a.png",
      reverse: false,
    },
    {
      title: (lang?.content?.[1]?.title) ?? "Trusted by clients",
      desc: (lang?.content?.[1]?.desc) ?? "We build lasting relationships and our clients trust us for consistency, transparency, and integrity in everything we do.",
      img: "/assets/reason_illustrations/b.png",
      reverse: true,
    },
    {
      title: (lang?.content?.[2]?.title) ?? "Proven results",
      desc: (lang?.content?.[2]?.desc) ?? "Our projects deliver measurable impact, helping businesses thrive with reliable, real-world outcomes.",
      img: "/assets/reason_illustrations/c.png",
      reverse: false,
    },
  ];

  return (
    <div className="w-full bg-white py-20 px-6">
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-16 text-[32px]">
        <h2 className="text-black font-semibold mb-2">
          {lang?.title ?? "Why Choose Us"}
        </h2>
        <p className="font-bold text-[#858585] leading-snug">
          {lang?.desc ?? "Discover what sets us apart and why we're your best choice."}
        </p>
      </div>

      {/* Reason list */}
      <div className="flex flex-col gap-24 max-w-6xl mx-auto">
        {reasons.map((item, index) => (
          <motion.div
            key={index}
            className={`flex flex-col md:flex-row ${
              item.reverse ? "md:flex-row-reverse" : ""
            } items-center gap-10`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.2 }}
          >
            {/* Gambar */}
            <div className="overflow-hidden shadow-md">
              <img
                src={item.img}
                alt={item.title}
                className="w-[480px] aspect-square object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Teks */}
            <div className="md:w-1/2 w-full">
              <h3 className="text-[32px] font-semibold text-gray-800 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-[22px]">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
