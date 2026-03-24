import { useEffect, useRef, useState } from 'react';
import { Code2, Terminal, Cpu, Globe } from 'lucide-react';

interface SkillCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    id: 'cpp',
    name: 'C/C++ 开发',
    icon: Code2,
    skills: ['C/C++', 'STL', 'Qt', 'MFC', 'Socket', '多线程'],
  },
  {
    id: 'system',
    name: '系统与网络',
    icon: Terminal,
    skills: ['Linux', 'TCP/IP', 'HTTP', 'Shell', 'Proactor模型'],
  },
  {
    id: 'vision',
    name: '视觉与算法',
    icon: Cpu,
    skills: ['OpenCV', 'VisionPro', '图像处理', '算法优化'],
  },
  {
    id: 'fullstack',
    name: '其他技术',
    icon: Globe,
    skills: ['Python', 'Vue3', 'Gin', 'MySQL', 'Redis', 'Git'],
  },
];

export function Skills() {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            skillCategories.forEach((cat, i) => {
              setTimeout(() => {
                setVisibleItems((prev) => new Set([...prev, cat.id]));
              }, i * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gray-50" ref={sectionRef}>
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-gray-900">
            技术栈
          </h2>
          <p className="text-gray-500">
            日常工作中使用的技术
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {skillCategories.map((category) => {
            const Icon = category.icon;
            const isVisible = visibleItems.has(category.id);

            return (
              <div
                key={category.id}
                className={`p-5 bg-white border border-gray-100 rounded-xl card-shadow transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Icon className="w-5 h-5 text-gray-700" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{category.name}</h3>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm text-gray-600 bg-gray-50 rounded-lg"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
