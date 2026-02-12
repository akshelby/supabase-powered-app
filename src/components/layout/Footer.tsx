import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const quickLinks = [
  { name: 'Products', href: '/products' },
  { name: 'Services', href: '/services' },
  { name: 'Get Estimation', href: '/estimation' },
  { name: 'Catalogs', href: '/catalogs' },
  { name: 'Testimonials', href: '/testimonials' },
  { name: 'Contact Us', href: '/contact' },
];

const productLinks = [
  { name: 'Granite Countertops', href: '/products?category=countertops' },
  { name: 'Marble Flooring', href: '/products?category=flooring' },
  { name: 'Kitchen Slabs', href: '/products?category=kitchen' },
  { name: 'Bathroom Vanities', href: '/products?category=bathroom' },
  { name: 'Staircases', href: '/products?category=staircases' },
];

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com' },
];

export function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          {/* Company Info */}
          <div className="space-y-3 sm:space-y-4 col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-premium rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-lg">SP</span>
              </div>
              <div>
                <h3 className="font-display text-base sm:text-xl font-bold">SP Granites</h3>
                <p className="text-[10px] sm:text-xs text-gray-400">Premium Stone Works</p>
              </div>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Crafting premium granite and marble solutions for over 25 years.
            </p>
            <div className="flex gap-2 sm:gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm sm:text-lg mb-2 sm:mb-4">Quick Links</h4>
            <ul className="space-y-1 sm:space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-primary transition-colors text-xs sm:text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-sm sm:text-lg mb-2 sm:mb-4">Our Products</h4>
            <ul className="space-y-1 sm:space-y-2">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-primary transition-colors text-xs sm:text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-sm sm:text-lg mb-2 sm:mb-4">Contact Us</h4>
            <ul className="space-y-2 sm:space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  123 Stone Avenue, Industrial Area,<br />
                  Chennai, Tamil Nadu 600001
                </span>
              </li>
              <li>
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors text-sm"
                >
                  <Phone className="h-5 w-5 text-primary" />
                  +91 98765 43210
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@spgranites.com"
                  className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors text-sm"
                >
                  <Mail className="h-5 w-5 text-primary" />
                  info@spgranites.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-4 sm:py-6 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
          <p className="text-gray-400 text-xs sm:text-sm">
            © {new Date().getFullYear()} SP Granites. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
