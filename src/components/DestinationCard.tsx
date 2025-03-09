
import { useState } from 'react';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';

export interface Destination {
  id: number;
  name: string;
  description: string;
  contact: string;
  image: string;
  likes: number;
}

interface DestinationCardProps {
  destination: Destination;
  onLike: (id: number) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

const DestinationCard = ({ 
  destination, 
  onLike, 
  isFavorite, 
  onToggleFavorite 
}: DestinationCardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLikeAnimating, setIsLikeAnimating] = useState(false);

  const handleLike = () => {
    onLike(destination.id);
    setIsLikeAnimating(true);
    setTimeout(() => setIsLikeAnimating(false), 1000);
  };

  const handleToggleFavorite = () => {
    onToggleFavorite(destination.id);
    toast(
      isFavorite ? 'Removido dos favoritos' : 'Adicionado aos favoritos',
      { description: destination.name }
    );
  };

  return (
    <div className="w-full max-w-md mx-auto overflow-hidden animate-scale-in glass-card rounded-2xl">
      <div className="relative aspect-[16/9] overflow-hidden">
        <div 
          className={`absolute inset-0 bg-gray-200 animate-pulse-subtle ${!isLoading ? 'hidden' : ''}`}
        />
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          onLoad={() => setIsLoading(false)}
          loading="lazy"
        />
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-semibold text-balance mb-2">{destination.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{destination.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">{destination.contact}</span>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={handleLike}
              className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors"
              aria-label="Curtir"
            >
              <Heart 
                size={20} 
                className={`transition-all ${isLikeAnimating ? 'scale-150 text-red-500 fill-red-500' : ''}`} 
              />
              <span>{destination.likes}</span>
            </button>
            
            <button
              onClick={handleToggleFavorite}
              className={`ml-2 p-2 rounded-full transition-colors ${
                isFavorite ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-400'
              }`}
              aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            >
              <Heart size={16} className={isFavorite ? 'fill-red-500' : ''} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
