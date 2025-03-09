
import { Heart, Home, LogOut, Map, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu = ({ isOpen, onClose }: SideMenuProps) => {
  const menuItems = [
    { icon: Home, label: 'Início', link: '/' },
    { icon: Map, label: 'Minhas Viagens', link: '/my-trips' },
    { icon: Heart, label: 'Favoritas', link: '/favorites' },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      <div
        className={`fixed top-0 left-0 bottom-0 w-72 bg-white shadow-xl z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Fechar menu"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.link}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={onClose}
                >
                  <item.icon size={20} className="text-brand-blue" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <button
            className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <LogOut size={20} className="text-gray-500" />
            <span>Sair</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
