import { Github, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-white bg-pattern">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid opacity-50" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        {/* Name */}
        <h1 className="text-5xl sm:text-6xl font-bold mb-4 tracking-tight text-gray-900">
          袁铭昊
        </h1>

        {/* Title */}
        <p className="text-xl text-gray-500 mb-6 font-light">
          C/C++ 软件工程师
        </p>

        {/* Info Tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-500 border border-gray-200 rounded-full">
            <MapPin className="w-4 h-4" />
            深圳
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-500 border border-gray-200 rounded-full">
            4年工作经验
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-500 border border-gray-200 rounded-full">
            27岁
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 max-w-xl mx-auto mb-10 leading-relaxed">
          专注于 C/C++ 开发，熟悉服务器架构、网络编程和视觉算法。
          热爱技术创新，善于用工具解决实际问题。
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <Button
            size="lg"
            className="bg-gray-900 hover:bg-gray-800 text-white px-8 rounded-full transition-all"
            onClick={() => document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })}
          >
            查看经历
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 rounded-full transition-all"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            联系我
          </Button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4">
          <a
            href="https://github.com/myinhao"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 text-gray-400 hover:text-gray-900 transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="mailto:superheroymh@Gmail.com"
            className="p-2.5 text-gray-400 hover:text-gray-900 transition-colors"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a
            href="tel:17665341414"
            className="p-2.5 text-gray-400 hover:text-gray-900 transition-colors"
          >
            <Phone className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
