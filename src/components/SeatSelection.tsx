
import { useState } from 'react';
import { Check } from 'lucide-react';

interface SeatProps {
  id: number;
  isAvailable: boolean;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

const Seat = ({ id, isAvailable, isSelected, onSelect }: SeatProps) => {
  return (
    <button
      disabled={!isAvailable}
      onClick={() => isAvailable && onSelect(id)}
      className={`
        flex items-center justify-center w-12 h-12 rounded-md transition-all
        ${isAvailable 
          ? isSelected 
            ? 'bg-brand-blue text-white' 
            : 'bg-white border border-gray-200 hover:border-brand-blue/70 hover:bg-brand-blue/10' 
          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }
      `}
      aria-label={`Assento ${id} ${isAvailable ? 'disponível' : 'indisponível'}`}
    >
      {isSelected ? <Check size={20} /> : id}
    </button>
  );
};

interface SeatSelectionProps {
  totalSeats: number;
  unavailableSeats: number[];
  onSeatSelect: (seatId: number) => void;
}

const SeatSelection = ({ totalSeats, unavailableSeats, onSeatSelect }: SeatSelectionProps) => {
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);

  const handleSeatSelect = (seatId: number) => {
    setSelectedSeat(seatId === selectedSeat ? null : seatId);
    onSeatSelect(seatId);
  };

  const renderSeats = () => {
    const seats = [];
    for (let i = 1; i <= totalSeats; i++) {
      seats.push(
        <Seat
          key={i}
          id={i}
          isAvailable={!unavailableSeats.includes(i)}
          isSelected={selectedSeat === i}
          onSelect={handleSeatSelect}
        />
      );
    }
    return seats;
  };

  // Grid layout for seats with aisle in the middle
  // Typical layout for Brazilian buses
  const leftSeats = [];
  const rightSeats = [];
  
  for (let i = 1; i <= totalSeats; i++) {
    const seat = (
      <Seat
        key={i}
        id={i}
        isAvailable={!unavailableSeats.includes(i)}
        isSelected={selectedSeat === i}
        onSelect={handleSeatSelect}
      />
    );
    
    // Odd seats on the left, even on the right
    if (i % 2 === 1) {
      leftSeats.push(seat);
    } else {
      rightSeats.push(seat);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-10 border-2 border-brand-blue rounded-t-xl flex items-center justify-center text-sm text-brand-blue font-medium">
            Motorista
          </div>
        </div>
        
        <div className="flex gap-4 justify-center">
          <div className="flex flex-col gap-2">
            {leftSeats}
          </div>
          
          <div className="w-4" /> {/* Aisle */}
          
          <div className="flex flex-col gap-2">
            {rightSeats}
          </div>
        </div>
      </div>
      
      <div className="flex justify-center items-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white border border-gray-200 rounded"></div>
          <span className="text-sm">Disponível</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-brand-blue rounded"></div>
          <span className="text-sm">Selecionado</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-100 rounded"></div>
          <span className="text-sm">Ocupado</span>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
