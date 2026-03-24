import { Github, Mail, Phone } from 'lucide-react';

const navLinks = [
  { name: '首页', href: '#home' },
  { name: '经历', href: '#timeline' },
  { name: '技能', href: '#skills' },
  { name: '联系', href: '#contact' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-100">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="text-lg font-semibold text-gray-900">
              袁铭昊
            </a>
            <p className="text-sm text-gray-500 mt-1">C/C++ 软件工程师</p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex gap-3">
            <a
              href="https://github.com/myinhao"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-gray-900 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="mailto:superheroymh@Gmail.com"
              className="p-2 text-gray-400 hover:text-gray-900 transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="tel:17665341414"
              className="p-2 text-gray-400 hover:text-gray-900 transition-colors"
            >
              <Phone className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-400">
            © {currentYear} 袁铭昊. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
