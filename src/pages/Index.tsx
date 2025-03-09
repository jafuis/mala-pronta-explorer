
import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import DestinationCard, { Destination } from '../components/DestinationCard';
import SearchBar from '../components/SearchBar';
import TripList from '../components/TripList';
import { useFavorites } from '../context/FavoritesContext';

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

const Index = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [updatedDestinations, setUpdatedDestinations] = useState<Destination[]>(destinations);
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>(destinations);
  const sliderRef = useRef<HTMLDivElement>(null);
  const { isFavorite, toggleFavorite } = useFavorites();
  
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextCard();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentCardIndex, destinations.length]);
  
  const handlePrevCard = () => {
    setCurrentCardIndex((prev) => 
      prev === 0 ? destinations.length - 1 : prev - 1
    );
  };
  
  const handleNextCard = () => {
    setCurrentCardIndex((prev) => 
      prev === destinations.length - 1 ? 0 : prev + 1
    );
  };
  
  const handleLike = (id: number) => {
    setUpdatedDestinations(prev => 
      prev.map(destination => 
        destination.id === id 
          ? { ...destination, likes: destination.likes + 1 } 
          : destination
      )
    );
    
    // Update filtered destinations as well
    setFilteredDestinations(prev => 
      prev.map(destination => 
        destination.id === id 
          ? { ...destination, likes: destination.likes + 1 } 
          : destination
      )
    );
  };
  
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredDestinations(updatedDestinations);
      return;
    }
    
    const results = updatedDestinations.filter(
      destination => 
        destination.name.toLowerCase().includes(query.toLowerCase()) ||
        destination.description.toLowerCase().includes(query.toLowerCase())
    );
    
    setFilteredDestinations(results);
    
    if (results.length === 0) {
      toast.error('Nenhum destino encontrado', {
        description: 'Tente usar palavras-chave diferentes'
      });
    } else {
      toast.success(`${results.length} destinos encontrados`);
    }
  };
  
  return (
    <div className="relative min-h-screen pb-20">
      <Header toggleSideMenu={() => setIsSideMenuOpen(true)} />
      <SideMenu isOpen={isSideMenuOpen} onClose={() => setIsSideMenuOpen(false)} />
      
      <main className="container max-w-screen-xl mx-auto px-4 pt-24 pb-10">
        {/* Rotating Cards Section */}
        <section className="relative mb-16 overflow-hidden">
          <div 
            ref={sliderRef}
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentCardIndex * 100}%)` }}
          >
            {updatedDestinations.map((destination) => (
              <div 
                key={destination.id} 
                className="w-full flex-shrink-0 px-4"
              >
                <DestinationCard 
                  destination={destination} 
                  onLike={handleLike}
                  isFavorite={isFavorite(destination.id)}
                  onToggleFavorite={toggleFavorite}
                />
              </div>
            ))}
          </div>
          
          <div className="flex justify-center gap-1 mt-4">
            {updatedDestinations.map((_, index) => (
              <button 
                key={index}
                onClick={() => setCurrentCardIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentCardIndex === index ? 'w-6 bg-brand-blue' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={handlePrevCard}
            className="absolute top-1/2 left-4 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 shadow-md flex items-center justify-center hover:bg-white transition-colors"
            aria-label="Previous destination"
          >
            <ArrowLeft size={20} />
          </button>
          
          <button
            onClick={handleNextCard}
            className="absolute top-1/2 right-4 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 shadow-md flex items-center justify-center hover:bg-white transition-colors"
            aria-label="Next destination"
          >
            <ArrowRight size={20} />
          </button>
        </section>
        
        {/* Search Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-medium text-center mb-6">Encontre seu próximo destino</h2>
          <SearchBar onSearch={handleSearch} />
        </section>
        
        {/* Destinations List Section */}
        <section>
          <h2 className="text-2xl font-medium mb-8">Destinos populares</h2>
          <TripList destinations={filteredDestinations} />
        </section>
      </main>
    </div>
  );
};

export default Index;
