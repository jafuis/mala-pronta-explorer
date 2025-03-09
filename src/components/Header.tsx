
import { useEffect, useState } from 'react';
import { Menu, Bus } from 'lucide-react';
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled ? 'py-2 bg-white shadow-sm' : 'py-2 bg-white'
      } md:ml-64`}
    >
      <div className="container max-w-screen-xl mx-auto px-4 flex items-center justify-between">
        <button 
          onClick={toggleSideMenu}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors md:hidden"
          aria-label="Open menu"
        >
          <Menu className="text-brand-dark" size={24} />
        </button>
        
        <Link to="/" className="flex items-center gap-2 text-brand-dark mx-auto md:mx-0">
          <h1 className="text-xl font-semibold">Viagem Pronta</h1>
          <Bus className="text-brand-green" size={24} />
        </Link>
        
        <div className="w-10 md:hidden"></div> {/* Spacer for mobile to center title */}
      </div>
    </header>
  );
};

export default Header;
