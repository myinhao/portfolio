import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChevronRight, FileText, Loader2 } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  file: string;
  period: string;
  company: string;
}

const projects: Project[] = [
  {
    id: 'log-system',
    title: '日志统筹管理系统',
    file: './projects/log-system.md',
    period: '2024',
    company: '华为数字能源',
  },
  {
    id: 'android-test',
    title: '安卓自动化测试工具',
    file: './projects/android-test.md',
    period: '2024',
    company: '华为数字能源',
  },
  {
    id: 'vision-platform',
    title: '视觉流程平台',
    file: './projects/vision-platform.md',
    period: '2023',
    company: '大族视觉',
  },
  {
    id: 'file-system',
    title: 'Linux文件管理系统',
    file: './projects/file-system.md',
    period: '2023',
    company: '瑞扬福网络',
  },
  {
    id: 'search-module',
    title: '文件查询模块',
    file: './projects/search-module.md',
    period: '2023',
    company: '瑞扬福网络',
  },
  {
    id: 'game-bot',
    title: '游戏自动化工具',
    file: './projects/game-bot.md',
    period: '2024',
    company: '个人学习',
  },
];

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project>(projects[0]);
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProject(selectedProject.file);
  }, [selectedProject]);

  const loadProject = async (filePath: string) => {
    setLoading(true);
    try {
      const response = await fetch(filePath);
      if (response.ok) {
        const text = await response.text();
        setContent(text);
      } else {
        setContent('# 加载失败\n\n请检查文件是否存在。');
      }
    } catch (error) {
      setContent('# 加载失败\n\n网络错误，请稍后重试。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="projects" className="relative min-h-[calc(100vh-3.5rem)] bg-white">
      <div className="flex h-[calc(100vh-3.5rem)]">
        {/* Left Sidebar - Project List */}
        <div className="w-72 border-r border-gray-100 bg-gray-50/50 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
              项目列表
            </h3>
            
            <div className="space-y-1">
              {projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedProject.id === project.id
                      ? 'bg-white border border-gray-200 shadow-sm'
                      : 'hover:bg-white hover:border hover:border-gray-100'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <FileText className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                      selectedProject.id === project.id ? 'text-gray-900' : 'text-gray-400'
                    }`} />
                    <div className="min-w-0">
                      <p className={`text-sm font-medium truncate ${
                        selectedProject.id === project.id ? 'text-gray-900' : 'text-gray-600'
                      }`}>
                        {project.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {project.period} · {project.company}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Add New Project Hint */}
            <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-xs text-blue-600">
                💡 提示：在 <code className="bg-blue-100 px-1 rounded">public/projects/</code> 目录下添加 .md 文件即可新增项目
              </p>
            </div>
          </div>
        </div>

        {/* Right Content - Markdown Display */}
        <div className="flex-1 overflow-y-auto bg-white">
          <div className="max-w-3xl mx-auto py-8 px-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
              <a href="index.html" className="hover:text-gray-900 transition-colors">首页</a>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900">{selectedProject.title}</span>
            </div>

            {/* Content */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
              </div>
            ) : (
              <article className="prose prose-gray max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {content}
                </ReactMarkdown>
              </article>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
