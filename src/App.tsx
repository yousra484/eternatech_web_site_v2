import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Solutions from './components/Solutions';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Toaster } from 'sonner';

function App() {
    return (
        <div className="min-h-screen bg-darker text-white">
            <Header />
            <main>
                <Hero />
                <Services />
                <Solutions />
                <About />
                <Contact />
            </main>
            <Footer />
            <Toaster position="top-right" richColors />
        </div>
    );
}

export default App;
