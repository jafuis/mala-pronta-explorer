
import { useEffect, useState } from 'react';
import { Menu, Suitcase } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  toggleSideMenu: () => void;
}

const Header = ({ toggleSideMenu }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2 bg-white/90 shadow-md backdrop-blur-sm' : 'py-4 bg-transparent'
      }`}
    >
      <div className="container max-w-screen-xl mx-auto px-4 flex items-center justify-between">
        <button 
          onClick={toggleSideMenu}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="text-brand-dark" size={24} />
        </button>
        
        <Link to="/" className="flex items-center gap-2 text-brand-dark">
          <h1 className="text-xl font-semibold">Mala Pronta</h1>
          <Suitcase className="animate-float" size={24} />
        </Link>
      </div>
    </header>
  );
};

export default Header;
