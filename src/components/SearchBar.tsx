
import { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-md mx-auto"
    >
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar destinos, cidades, tipos de viagem..."
          className="w-full py-3 pl-12 pr-4 bg-white border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue/50 transition-all"
        />
        <Search 
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" 
          size={20}
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-brand-blue text-white rounded-full px-4 py-1.5 text-sm font-medium hover:bg-brand-blue/90 transition-colors"
        >
          Buscar
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
