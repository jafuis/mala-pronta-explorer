
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Users, Heart } from 'lucide-react';
import { toast } from 'sonner';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import SeatSelection from '../components/SeatSelection';
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

const TripDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [destination, setDestination] = useState<Destination | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isFavorite, toggleFavorite } = useFavorites();
  
  // Simulating fetching from an API
  useEffect(() => {
    const fetchDestination = () => {
      setIsLoading(true);
      
      setTimeout(() => {
        const foundDestination = destinations.find(
          dest => dest.id === parseInt(id || '0', 10)
        ) || null;
        
        setDestination(foundDestination);
        setIsLoading(false);
      }, 800);
    };
    
    if (id) {
      fetchDestination();
    }
  }, [id]);
  
  const handleSeatSelect = (seatId: number) => {
    setSelectedSeat(seatId === selectedSeat ? null : seatId);
  };
  
  const handleBookTrip = () => {
    if (!selectedSeat) {
      toast.error('Selecione um assento para continuar');
      return;
    }
    
    toast.success('Viagem reservada com sucesso!', {
      description: `Destino: ${destination?.name}, Assento: ${selectedSeat}`
    });
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin" />
      </div>
    );
  }
  
  if (!destination) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-semibold mb-4">Destino não encontrado</h2>
        <p className="text-gray-600 mb-8">O destino que você está procurando não existe ou foi removido.</p>
        <Link 
          to="/"
          className="flex items-center gap-2 bg-brand-blue text-white px-6 py-3 rounded-lg font-medium"
        >
          <ArrowLeft size={20} />
          Voltar para a página inicial
        </Link>
      </div>
    );
  }
  
  // Mock data for trip details
  const tripDetails = {
    dates: ["10/08/2023", "15/08/2023", "20/08/2023"],
    duration: "3 dias",
    price: "R$ 350,00",
    departureLocation: "Terminal Rodoviário, São Paulo",
    unavailableSeats: [3, 7, 12, 18]
  };
  
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="relative aspect-video overflow-hidden rounded-xl shadow-md mb-6">
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => toggleFavorite(destination.id)}
                className={`absolute top-4 right-4 p-3 rounded-full transition-colors ${
                  isFavorite(destination.id) 
                    ? 'bg-red-100 text-red-500' 
                    : 'bg-white/80 text-gray-700 hover:bg-red-50 hover:text-red-400'
                }`}
                aria-label={isFavorite(destination.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
              >
                <Heart size={20} className={isFavorite(destination.id) ? 'fill-red-500' : ''} />
              </button>
            </div>
            
            <h1 className="text-3xl font-bold mb-4">{destination.name}</h1>
            <p className="text-gray-700 mb-6">{destination.description}</p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Detalhes da viagem</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="text-brand-blue mt-0.5" size={20} />
                  <div>
                    <h3 className="font-medium">Datas disponíveis</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tripDetails.dates.map((date, index) => (
                        <span 
                          key={index}
                          className="inline-block bg-white border border-gray-200 rounded-full px-3 py-1 text-sm"
                        >
                          {date}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="text-brand-blue mt-0.5" size={20} />
                  <div>
                    <h3 className="font-medium">Local de partida</h3>
                    <p className="text-gray-600 mt-1">{tripDetails.departureLocation}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Users className="text-brand-blue mt-0.5" size={20} />
                  <div>
                    <h3 className="font-medium">Contato</h3>
                    <p className="text-gray-600 mt-1">{destination.contact}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-100">
              <h2 className="text-xl font-semibold mb-4">Escolha seu assento</h2>
              
              <SeatSelection 
                totalSeats={20}
                unavailableSeats={tripDetails.unavailableSeats}
                onSeatSelect={handleSeatSelect}
              />
              
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Valor da passagem</span>
                  <span className="font-medium">{tripDetails.price}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Duração</span>
                  <span className="font-medium">{tripDetails.duration}</span>
                </div>
                {selectedSeat && (
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Assento selecionado</span>
                    <span className="font-medium">{selectedSeat}</span>
                  </div>
                )}
              </div>
              
              <button
                onClick={handleBookTrip}
                disabled={!selectedSeat}
                className={`
                  w-full mt-6 py-3 rounded-lg text-white font-medium transition-colors
                  ${selectedSeat 
                    ? 'bg-brand-green hover:bg-brand-green/90' 
                    : 'bg-gray-300 cursor-not-allowed'
                  }
                `}
              >
                {selectedSeat ? 'Reservar viagem' : 'Selecione um assento'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TripDetails;
