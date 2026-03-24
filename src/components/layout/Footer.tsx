'use client';

import { Zap, Share2, Camera, Play, Music2, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const serviceLinks = [
  'Polish Exterior',
  'Detailing Interior',
  'Ceramic Coating',
  'PPF Wrapping',
  'Leather Restoration',
  'Wheel Painting',
];

const quickLinks = [
  { label: 'About Us', href: '#why-us' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

const socials = [
  { icon: Camera, label: 'Instagram', href: '#' },
  { icon: Share2, label: 'Facebook', href: '#' },
  { icon: Play, label: 'YouTube', href: '#' },
  { icon: Music2, label: 'TikTok', href: '#' },
];

export default function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer className="relative" style={{ background: 'var(--carbon-950)' }}>
      {/* Top gold border */}
      <div className="gold-divider" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #C9A84C, #FFD700)' }}>
                <Zap className="w-3.5 h-3.5 text-black fill-black" />
              </div>
              <span className="text-lg font-black tracking-widest uppercase"
                style={{ fontFamily: 'var(--font-orbitron)' }}>
                <span style={{ color: '#C9A84C' }}>APEX</span>
                <span className="text-white ml-1">DETAIL</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
              Precision auto detailing that transforms vehicles into works of art. Every detail matters.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded flex items-center justify-center transition-all duration-300"
                  style={{
                    background: 'var(--carbon-800)',
                    border: '1px solid rgba(201,168,76,0.1)',
                    color: 'var(--text-secondary)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = '#C9A84C';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.5)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 12px rgba(201,168,76,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.1)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase mb-5"
              style={{ color: '#C9A84C', fontFamily: 'var(--font-orbitron)' }}>
              Services
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="text-sm transition-colors duration-200 flex items-center gap-1.5 group"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#C9A84C')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)')}
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all duration-200" />
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase mb-5"
              style={{ color: '#C9A84C', fontFamily: 'var(--font-orbitron)' }}>
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm transition-colors duration-200 flex items-center gap-1.5 group"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#C9A84C')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)')}
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all duration-200" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase mb-5"
              style={{ color: '#C9A84C', fontFamily: 'var(--font-orbitron)' }}>
              Contact
            </h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#C9A84C' }} />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>+40 700 000 000</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#C9A84C' }} />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>contact@apexdetail.ro</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#C9A84C' }} />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Str. Exemplu nr. 1, București</span>
              </li>
            </ul>
            {/* Newsletter */}
            <div className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 px-3 py-2 text-sm outline-none rounded-l"
                style={{
                  background: 'var(--carbon-800)',
                  border: '1px solid rgba(201,168,76,0.2)',
                  borderRight: 'none',
                  color: 'white',
                }}
              />
              <button
                className="px-3 py-2 rounded-r transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, #C9A84C, #FFD700)',
                  color: '#070709',
                }}
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="gold-divider mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            © 2026 Apex Detail. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'ANPC'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs transition-colors duration-200"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#C9A84C')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
