import { Navigation } from './sections/Navigation';
import { Hero } from './sections/Hero';
import { Timeline } from './sections/Timeline';
import { Projects } from './sections/Projects';
import { Skills } from './sections/Skills';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navigation />
      <main>
        <Hero />
        <Timeline />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
