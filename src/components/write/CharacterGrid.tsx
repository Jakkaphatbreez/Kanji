'use client';

import { useState } from 'react';

interface CharacterGridItem {
  char: string;
  searchText: string;
}

interface CharacterGridProps {
  items: CharacterGridItem[];
  selected: string;
  onSelect: (char: string) => void;
  searchPlaceholder: string;
}

export function CharacterGrid({ items, selected, onSelect, searchPlaceholder }: CharacterGridProps) {
  const [query, setQuery] = useState('');
  const filtered = items.filter(item => item.searchText.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder={searchPlaceholder}
        className="mb-4 w-full rounded border border-pink-300 bg-white px-3 py-2 focus:border-pink-500 focus:outline-none"
      />
      <div className="flex max-h-96 flex-wrap gap-2 overflow-y-auto">
        {filtered.map(item => (
          <button
            key={item.char}
            onClick={() => onSelect(item.char)}
            className={
              item.char === selected
                ? 'h-12 w-12 rounded border-2 border-pink-500 bg-pink-100 text-xl font-bold text-indigo-900'
                : 'h-12 w-12 rounded border border-pink-200 bg-white text-xl text-indigo-900 hover:border-pink-400'
            }
          >
            {item.char}
          </button>
        ))}
      </div>
    </div>
  );
}
