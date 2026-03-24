import { useState } from 'react';
import { Mail, MapPin, Send, Github, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.message || '发送失败，请稍后重试');
      }
      
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => setIsSubmitted(false), 5000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : '发送失败，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (error) setError(null);
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white bg-pattern">
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="max-w-4xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-gray-900">
            联系我
          </h2>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Contact Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Mail className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">邮箱</h3>
                <a 
                  href="mailto:superheroymh@Gmail.com"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  superheroymh@Gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Phone className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">电话</h3>
                <a 
                  href="tel:17665341414"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  176-6534-1414
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <MapPin className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">位置</h3>
                <p className="text-sm text-gray-500">深圳</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Github className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">GitHub</h3>
                <a 
                  href="https://github.com/myinhao"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  github.com/myinhao
                </a>
              </div>
            </div>

            {/* Status */}
            <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-sm text-gray-600">寻找新机会</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">期望：12-17K · 深圳</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-3">
            <div className="p-6 bg-white border border-gray-100 rounded-xl card-shadow">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-3">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">消息已发送</h3>
                  <p className="text-sm text-gray-500">我会尽快回复你</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="text-sm text-gray-700">名字</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="any name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="bg-gray-50 border-gray-200 focus:bg-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-sm text-gray-700">邮箱</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="bg-gray-50 border-gray-200 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="message" className="text-sm text-gray-700">留言</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="any word"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      rows={4}
                      className="bg-gray-50 border-gray-200 focus:bg-white resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        发送中...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        发送消息
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
