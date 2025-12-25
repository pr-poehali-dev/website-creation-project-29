import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface SearchHeaderProps {
  onSearch: (query: string) => void;
}

const SearchHeader = ({ onSearch }: SearchHeaderProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast.error('Введите запрос для поиска');
      return;
    }
    
    onSearch(searchQuery);
    toast.success(`Поиск: "${searchQuery}"`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center gap-2">
      {isSearchOpen ? (
        <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Поиск по сайту..."
            className="px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm w-40 md:w-64"
            autoFocus
          />
          <Button
            size="sm"
            onClick={handleSearch}
            className="px-2 md:px-3"
          >
            <Icon name="Search" size={16} />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setIsSearchOpen(false);
              setSearchQuery('');
            }}
            className="px-2"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>
      ) : (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setIsSearchOpen(true)}
          className="px-2"
        >
          <Icon name="Search" size={18} />
        </Button>
      )}
    </div>
  );
};

export default SearchHeader;
