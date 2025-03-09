
import { Link } from 'react-router-dom';
import { Destination } from './DestinationCard';

interface TripListProps {
  destinations: Destination[];
}

const TripList = ({ destinations }: TripListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {destinations.map((destination) => (
        <div
          key={destination.id}
          className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          
          <div className="p-4">
            <h3 className="font-medium text-lg mb-2">{destination.name}</h3>
            
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
  );
};

export default TripList;
