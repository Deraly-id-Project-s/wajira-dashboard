

import Marquee from 'react-fast-marquee'
import Image from '@/Components/ui/image'

const logos = [
  '/assets/companies/logo-deraly-b.png',
  '/assets/companies/yamaha.png',
  '/assets/companies/honda.png',
  '/assets/companies/polytron.png',
  '/assets/companies/yadea.png',
  '/assets/companies/kawasaki.png',
  '/assets/companies/suzuki.png',
  '/assets/companies/vespa.png',
  '/assets/companies/pindad.png',
  '/assets/companies/viar.png',
]

const SponsorSlider = () => {
  return (
    <section id="sponsor_slider_section" className="relative max-w-6xl py-6 overflow-hidden bg-white max-sm:w-screen">
      <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <Marquee
        speed={30}
        pauseOnHover={true}
        gradient={false}
      >
        <div className="flex items-center gap-12 px-4">
          {logos.map((logo, index) => (
            <Image
              key={index}
              src={logo}
              alt={`Logo ${index}`}
              width={100}
              height={50}
              className="object-contain grayscale hover:grayscale-0 transition duration-300 max-sm:w-20 max-sm:h-10"
            />
          ))}
        </div>
      </Marquee>
    </section>
  )
}

export default SponsorSlider;