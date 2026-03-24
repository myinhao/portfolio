import { useEffect, useRef, useState } from 'react';
import { Briefcase, ExternalLink } from 'lucide-react';

interface WorkItem {
  id: number;
  company: string;
  position: string;
  period: string;
  description: string;
}

interface ProjectItem {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  period: string;
  companyId: number;
}

const workItems: WorkItem[] = [
  {
    id: 1,
    company: '华为数字能源',
    position: '研发工程师',
    period: '2024.05 - 至今',
    description: '软件开发、工具开发、团队管理',
  },
  {
    id: 2,
    company: '大族视觉',
    position: 'C++开发工程师',
    period: '2023.11 - 2024.03',
    description: '工业视觉平台软件开发',
  },
  {
    id: 3,
    company: '瑞扬福网络',
    position: 'C++开发工程师',
    period: '2022.09 - 2023.09',
    description: 'Linux文件管理系统开发',
  },
];

const projectItems: ProjectItem[] = [
  {
    id: 1,
    title: '日志统筹管理系统',
    description: '基于Vue3+Gin的Web端日志管理系统，配合Dify实现AI Agent自动定位环境问题',
    tags: ['Vue3', 'Gin', 'Dify'],
    period: '2024',
    companyId: 1,
    link: 'https://github.com/myinhao',
  },
  {
    id: 2,
    title: '安卓自动化测试工具',
    description: '基于MAA Framework搭建的安卓端自动化测试工具',
    tags: ['MAA', 'Python'],
    period: '2024',
    companyId: 1,
    link: 'https://github.com/myinhao',
  },
  {
    id: 3,
    title: '视觉流程平台',
    description: '工业生产流水线视觉流程平台，实现自动对焦、找点找线找圆',
    tags: ['Qt', 'OpenCV'],
    period: '2023',
    companyId: 2,
    link: 'https://github.com/myinhao',
  },
  {
    id: 4,
    title: 'Linux文件管理系统',
    description: 'CS架构文件系统，支持用户管理、文件上传下载、断点续传',
    tags: ['Linux', 'Socket', 'MySQL'],
    period: '2023',
    companyId: 3,
    link: 'https://github.com/myinhao',
  },
  {
    id: 5,
    title: '文件查询模块',
    description: '基于Redis和LRU算法的快速查询系统',
    tags: ['Redis', 'LRU'],
    period: '2023',
    companyId: 3,
    link: 'https://github.com/myinhao',
  },
  {
    id: 6,
    title: '游戏自动化工具',
    description: '使用Python+OpenCV开发的自动化工具，通过图像识别完成任务',
    tags: ['Python', 'OpenCV'],
    period: '2024',
    companyId: 0,
    link: 'https://github.com/myinhao',
  },
];

export function Timeline() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            workItems.forEach((_, i) => {
              setTimeout(() => {
                setVisibleItems((prev) => new Set([...prev, i]));
              }, i * 100);
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

  const getProjectsByCompany = (companyId: number) => {
    return projectItems.filter(p => p.companyId === companyId);
  };

  return (
    <section id="timeline" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-gray-900">
            经历与项目
          </h2>
          <p className="text-gray-500">
            工作历程与技术积累
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left: Timeline */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-6">
                工作经历
              </h3>
              
              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-3 top-2 bottom-2 w-px bg-gray-200" />
                
                {/* Work Items */}
                <div className="space-y-8">
                  {workItems.map((work, index) => (
                    <div
                      key={work.id}
                      className={`relative pl-10 transition-all duration-500 ${
                        visibleItems.has(index)
                          ? 'opacity-100 translate-x-0'
                          : 'opacity-0 -translate-x-4'
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      {/* Dot */}
                      <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-gray-900 border-4 border-white shadow-sm" />
                      
                      {/* Content */}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Briefcase className="w-4 h-4 text-gray-400" />
                          <span className="text-xs text-gray-400">{work.period}</span>
                        </div>
                        <h4 className="font-semibold text-gray-900">{work.company}</h4>
                        <p className="text-sm text-gray-500">{work.position}</p>
                        <p className="text-sm text-gray-400 mt-1">{work.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Projects */}
          <div className="lg:col-span-8">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-6">
              项目作品
            </h3>
            
            <div className="space-y-8">
              {/* Huawei Projects */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded">2024</span>
                  <span className="text-sm text-gray-500">华为数字能源期间</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {getProjectsByCompany(1).map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>

              {/* Han's Projects */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded">2023</span>
                  <span className="text-sm text-gray-500">大族视觉期间</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {getProjectsByCompany(2).map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>

              {/* Ruiyangfu Projects */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded">2023</span>
                  <span className="text-sm text-gray-500">瑞扬福网络期间</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {getProjectsByCompany(3).map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>

              {/* Personal Projects */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded">个人学习</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {getProjectsByCompany(0).map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <div className="group p-5 bg-white border border-gray-100 rounded-xl card-shadow hover:card-shadow-hover transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
          {project.title}
        </h4>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-900 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
      
      <p className="text-sm text-gray-600 leading-relaxed mb-4">
        {project.description}
      </p>
      
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 text-xs text-gray-500 bg-gray-50 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
