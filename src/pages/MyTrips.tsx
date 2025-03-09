
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin } from 'lucide-react';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';

// Sample data for booked trips
const bookedTrips = [
  {
    id: 1,
    destination: "Praia de Copacabana, Rio de Janeiro",
    date: "15/08/2023",
    departureTime: "08:00",
    seat: 5,
    price: "R$ 350,00",
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=800&q=80",
    departureLocation: "Terminal Rodoviário, São Paulo",
    status: "confirmed" // confirmed, pending, completed, cancelled
  }
];

const tripStatusConfig = {
  confirmed: {
    label: "Confirmada",
    color: "bg-green-100 text-green-800"
  },
  pending: {
    label: "Pendente",
    color: "bg-yellow-100 text-yellow-800"
  },
  completed: {
    label: "Concluída",
    color: "bg-blue-100 text-blue-800"
  },
  cancelled: {
    label: "Cancelada",
    color: "bg-red-100 text-red-800"
  }
};

const MyTrips = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  
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
        
        <h1 className="text-3xl font-bold mb-8">Minhas Viagens</h1>
        
        {bookedTrips.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Calendar className="text-gray-300 mb-4" size={64} />
            <h2 className="text-2xl font-medium mb-2">Você ainda não possui viagens</h2>
            <p className="text-gray-600 mb-8 max-w-md">
              Reserve um assento em um de nossos destinos para começar a viajar.
            </p>
            <Link 
              to="/"
              className="bg-brand-blue text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-blue/90 transition-colors"
            >
              Explorar destinos
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {bookedTrips.map((trip) => {
              const statusConfig = tripStatusConfig[trip.status as keyof typeof tripStatusConfig];
              
              return (
                <div
                  key={trip.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 lg:w-1/4">
                      <div className="h-48 md:h-full">
                        <img
                          src={trip.image}
                          alt={trip.destination}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    <div className="p-6 md:w-2/3 lg:w-3/4">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <h3 className="text-xl font-semibold">{trip.destination}</h3>
                        <span 
                          className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${statusConfig.color}`}
                        >
                          {statusConfig.label}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-start gap-3">
                          <Calendar className="text-brand-blue mt-0.5" size={18} />
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Data e Hora</h4>
                            <p>{trip.date} às {trip.departureTime}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <MapPin className="text-brand-blue mt-0.5" size={18} />
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Local de partida</h4>
                            <p>{trip.departureLocation}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Assento: <span className="font-medium">{trip.seat}</span></p>
                          <p className="text-brand-blue font-semibold mt-1">{trip.price}</p>
                        </div>
                        
                        <div className="flex gap-3">
                          <Link
                            to={`/trip/${trip.id}`}
                            className="bg-brand-blue/10 text-brand-blue px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-blue/20 transition-colors"
                          >
                            Ver detalhes
                          </Link>
                          
                          {trip.status === "confirmed" && (
                            <button
                              className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                            >
                              Cancelar
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyTrips;
