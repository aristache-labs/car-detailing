'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Quote } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    name: 'Alexandru M.',
    car: 'BMW M4 Competition',
    rating: 5,
    text: 'Absolutely incredible work on my M4. The paint correction removed years of swirl marks — the car looks better than the day I bought it. Professional team, outstanding results.',
  },
  {
    name: 'Andreea P.',
    car: 'Porsche Cayenne',
    rating: 5,
    text: 'Had ceramic coating applied and I cannot believe how water just beads off the surface. Three months later and it still looks freshly waxed. Best investment for the car.',
  },
  {
    name: 'Mihai D.',
    car: 'Mercedes-Benz GLE',
    rating: 5,
    text: 'The interior detailing transformed my car. Stains that I thought were permanent are completely gone. The leather conditioning made the seats feel brand new. Highly recommend.',
  },
  {
    name: 'Cristian V.',
    car: 'Audi RS6',
    rating: 5,
    text: 'Full PPF wrap on the entire front. The work is flawless — no bubbles, no visible edges. These guys clearly take pride in what they do and it shows in every single detail.',
  },
  {
    name: 'Elena S.',
    car: 'Tesla Model S',
    rating: 5,
    text: 'Brought in my white Tesla for a full exterior detail and paint protection. The team was transparent about the process and the result speaks for itself. Will be back for sure.',
  },
  {
    name: 'Radu T.',
    car: 'Lamborghini Huracán',
    rating: 5,
    text: 'These are the only people I trust with my Huracán. Top-tier products, meticulous care, and they actually explain what they are doing at each stage. Exceptional service.',
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4" style={{ color: '#FFD700' }}>
          <path d="M8 1l1.85 3.75L14 5.5l-3 2.92.71 4.14L8 10.5l-3.71 1.96L5 8.42 2 5.5l4.15-.75L8 1z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const swiperRef = useRef<{ swiper: { autoplay: { stop: () => void; start: () => void } } } | null>(null);

  return (
    <section
      id="testimonials"
      className="relative py-28 px-6"
      style={{ background: 'var(--carbon-950)' }}
    >
      <div className="absolute top-0 left-0 right-0 gold-divider" />

      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(ellipse 60% 40% at 50% 100%, rgba(201,168,76,0.04) 0%, transparent 70%)`,
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        <SectionHeading
          eyebrow="Client Reviews"
          title="Words From Our"
          highlight="Satisfied Clients"
          subtitle="Over 500 vehicles detailed — here is what the owners have to say."
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            loop
            autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-14"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.name}>
                <div
                  className="h-full rounded-xl p-7 flex flex-col gap-4 transition-all duration-300"
                  style={{
                    background: 'var(--carbon-800)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderLeft: '3px solid rgba(201,168,76,0.4)',
                  }}
                >
                  {/* Quote icon */}
                  <Quote className="w-7 h-7 opacity-30" style={{ color: '#C9A84C' }} />

                  {/* Stars */}
                  <StarRating count={t.rating} />

                  {/* Text */}
                  <p
                    className="text-sm leading-relaxed flex-1 italic"
                    style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
                  >
                    &ldquo;{t.text}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="font-semibold text-sm" style={{ color: 'white', fontFamily: 'var(--font-inter)' }}>
                      {t.name}
                    </div>
                    <div className="text-xs mt-0.5 tracking-wide" style={{ color: '#C9A84C', fontFamily: 'var(--font-inter)' }}>
                      {t.car}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Trust note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-3 mt-4"
        >
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <svg key={i} viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4" style={{ color: '#FFD700' }}>
                <path d="M8 1l1.85 3.75L14 5.5l-3 2.92.71 4.14L8 10.5l-3.71 1.96L5 8.42 2 5.5l4.15-.75L8 1z" />
              </svg>
            ))}
          </div>
          <span className="text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
            5.0 average rating from 200+ Google reviews
          </span>
        </motion.div>
      </div>
    </section>
  );
}
