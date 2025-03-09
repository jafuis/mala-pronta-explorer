
import { Heart, Home, Map, X, History } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu = ({ isOpen, onClose }: SideMenuProps) => {
  const menuItems = [
    { icon: Home, label: 'Início', link: '/' },
    { icon: Map, label: 'Minhas Viagens', link: '/my-trips' },
    { icon: Heart, label: 'Favoritos', link: '/favorites' },
    { icon: History, label: 'Histórico de Viagens', link: '/history' },
  ];

  return (
    <>
      {/* Mobile overlay - only visible on mobile */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Sidebar - fixed on desktop, sliding on mobile */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-64 bg-white shadow-xl z-50 transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col`}
      >
        {/* Mobile close button - only visible on mobile */}
        <div className="flex items-center justify-between p-4 border-b md:hidden">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Fechar menu"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Device info at bottom */}
        <div className="mt-4 px-4 py-2 text-xs text-gray-500 mt-auto border-t">
          <p>ID do dispositivo: device_m...</p>
          <p>Seus dados estão salvos neste dispositivo</p>
        </div>

        {/* Main navigation */}
        <nav className="p-4 flex-1">
          <ul className="space-y-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.link}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={onClose}
                >
                  <item.icon size={20} className="text-brand-green" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default SideMenu;
