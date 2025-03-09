
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import { useFavorites } from '../context/FavoritesContext';
import { Destination } from '../components/DestinationCard';

// Sample data - in a real app, this would come from an API
const destinations: Destination[] = [
  {
    id: 1,
    name: "Praia de Copacabana, Rio de Janeiro",
    description: "Desfrute de uma das praias mais famosas do mundo, com vista para o Pão de Açúcar.",
    contact: "(21) 9999-8888",
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=800&q=80",
    likes: 128
  },
  {
    id: 2,
    name: "Chapada Diamantina, Bahia",
    description: "Explore as cachoeiras, cavernas e trilhas deste paraíso natural no coração da Bahia.",
    contact: "(71) 9988-7766",
    image: "https://images.unsplash.com/photo-1586809326632-cc49a5096c77?auto=format&fit=crop&w=800&q=80",
    likes: 97
  },
  {
    id: 3,
    name: "Centro Histórico, Ouro Preto",
    description: "Visite as igrejas barrocas e ruas de paralelepípedos desta cidade histórica em Minas Gerais.",
    contact: "(31) 7766-5544",
    image: "https://images.unsplash.com/photo-1585735853774-b91dc8cf8150?auto=format&fit=crop&w=800&q=80",
    likes: 65
  },
  {
    id: 4,
    name: "Campos do Jordão, São Paulo",
    description: "A Suíça brasileira oferece clima frio, arquitetura europeia e ótima gastronomia.",
    contact: "(12) 5544-3322",
    image: "https://images.unsplash.com/photo-1533415168848-609e67c1df50?auto=format&fit=crop&w=800&q=80",
    likes: 84
  }
];

const Favorites = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const { favorites, toggleFavorite } = useFavorites();
  
  const favoriteDestinations = destinations.filter(
    destination => favorites.includes(destination.id)
  );
  
  return (
    <div className="relative min-h-screen pb-20">
      <Header toggleSideMenu={() => setIsSideMenuOpen(true)} />
      <SideMenu isOpen={isSideMenuOpen} onClose={() => setIsSideMenuOpen(false)} />
      
      <main className="container max-w-screen-xl mx-auto px-4 pt-24 pb-10">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft size={20} />
            <span>Voltar</span>
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold mb-8">Minhas Viagens Favoritas</h1>
        
        {favoriteDestinations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Heart className="text-gray-300 mb-4" size={64} />
            <h2 className="text-2xl font-medium mb-2">Você ainda não tem favoritos</h2>
            <p className="text-gray-600 mb-8 max-w-md">
              Adicione destinos aos seus favoritos clicando no ícone de coração nos cartões de destino.
            </p>
            <Link 
              to="/"
              className="bg-brand-blue text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-blue/90 transition-colors"
            >
              Explorar destinos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteDestinations.map((destination) => (
              <div
                key={destination.id}
                className="relative bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <button
                    onClick={() => toggleFavorite(destination.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-red-100 text-red-500"
                    aria-label="Remover dos favoritos"
                  >
                    <Heart size={18} className="fill-red-500" />
                  </button>
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium text-lg mb-2">{destination.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{destination.description}</p>
                  
                  <div className="flex items-center justify-between mt-4">
                    <Link
                      to={`/trip/${destination.id}`}
                      className="text-sm font-medium text-brand-blue hover:underline"
                    >
                      Ver detalhes
                    </Link>
                    
                    <Link
                      to={`/trip/${destination.id}`}
                      className="bg-brand-green text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-green/90 transition-colors"
                    >
                      Escolher este destino
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Favorites;
