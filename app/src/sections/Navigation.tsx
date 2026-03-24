import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavLink {
  name: string;
  href: string;
  isExternal?: boolean;
}

const navLinks: NavLink[] = [
  { name: '首页', href: 'index.html' },
  { name: '经历', href: 'index.html#timeline' },
  { name: '项目', href: 'project.html', isExternal: true },
  { name: '技能', href: 'index.html#skills' },
  { name: '联系', href: 'index.html#contact' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Only check sections if we're on the main page
      if (window.location.pathname.includes('index') || window.location.pathname === '/') {
        const sections = ['home', 'timeline', 'skills', 'contact'];
        for (const section of sections.reverse()) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: NavLink) => {
    if (link.isExternal) {
      // Let the default behavior handle external links
      return;
    }
    
    e.preventDefault();
    const href = link.href;
    
    // Check if we need to navigate to index page first
    if (href.startsWith('index.html')) {
      const hash = href.replace('index.html', '');
      if (window.location.pathname.includes('project')) {
        // We're on project page, navigate to index
        window.location.href = href;
        return;
      }
      // We're on index page, just scroll
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
    
    setIsMobileMenuOpen(false);
  };

  const isProjectPage = typeof window !== 'undefined' && window.location.pathname.includes('project');

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-gray-100'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <a
              href="index.html"
              className="text-lg font-semibold text-gray-900"
            >
              myinhao
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = !isProjectPage && activeSection === link.href.replace('index.html#', '').replace('index.html', 'home');
                
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                      isActive
                        ? 'text-gray-900 bg-gray-100'
                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button
                onClick={() => {
                  if (isProjectPage) {
                    window.location.href = 'index.html#contact';
                  } else {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-gray-900 hover:bg-gray-800 text-white text-sm rounded-full px-4"
              >
                联系我
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-white/95 backdrop-blur-md"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <div className="absolute top-14 left-0 right-0 p-4">
          <div className="bg-white border border-gray-100 rounded-xl shadow-lg p-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={`block px-4 py-3 rounded-lg text-sm transition-all ${
                  !isProjectPage && activeSection === link.href.replace('index.html#', '').replace('index.html', 'home')
                    ? 'text-gray-900 bg-gray-100'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 mt-2 border-t border-gray-100">
              <Button
                onClick={() => {
                  if (isProjectPage) {
                    window.location.href = 'index.html#contact';
                  } else {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-lg"
              >
                联系我
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
