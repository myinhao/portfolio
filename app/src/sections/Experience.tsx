import { useEffect, useRef, useState } from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

interface ExperienceItem {
  id: number;
  company: string;
  position: string;
  location: string;
  period: string;
  summary: string;
  technologies: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    company: '华为数字能源',
    position: '研发工程师',
    location: '深圳',
    period: '2024.05 - 至今',
    summary: '负责软件开发、工具开发、团队管理。开发日志管理系统、自动化测试工具、AI Agent项目。',
    technologies: ['C/C++', 'Python', 'Vue3', 'Gin', 'Dify'],
  },
  {
    id: 2,
    company: '大族视觉',
    position: 'C++开发工程师',
    location: '深圳',
    period: '2023.11 - 2024.03',
    summary: '开发工业视觉平台软件，使用Qt和OpenCV实现图像处理功能，优化性能提升40%。',
    technologies: ['C++', 'Qt', 'OpenCV', 'VisionPro'],
  },
  {
    id: 3,
    company: '瑞扬福网络',
    position: 'C++开发工程师',
    location: '武汉',
    period: '2022.09 - 2023.09',
    summary: '开发Linux文件管理系统，采用CS架构和Proactor模型，支持100+并发。',
    technologies: ['C/C++', 'Linux', 'MySQL', 'Redis'],
  },
];

export function Experience() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            experiences.forEach((_, i) => {
              setTimeout(() => {
                setVisibleItems((prev) => new Set([...prev, i]));
              }, i * 150);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="relative py-24 px-4 sm:px-6 lg:px-8" ref={sectionRef}>
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px]" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <Briefcase className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-400">职业历程</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-white">工作 </span>
            <span className="gradient-text">经历</span>
          </h2>
        </div>

        {/* Experience Cards - Horizontal Layout */}
        <div className="grid md:grid-cols-3 gap-6">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className={`glass-card p-6 transition-all duration-700 hover:bg-white/10 hover:scale-[1.02] ${
                visibleItems.has(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Header */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-white mb-1">{exp.position}</h3>
                <p className="text-blue-400 font-medium">{exp.company}</p>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {exp.period}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {exp.location}
                </span>
              </div>

              {/* Summary */}
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {exp.summary}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
