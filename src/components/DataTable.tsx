'use client';

import { useState } from 'react';

interface Column<T> {
  header: string;
  accessor: (row: T) => string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchPlaceholder: string;
  getSearchText: (row: T) => string;
  rowKey: (row: T) => string;
}

export function DataTable<T>({ data, columns, searchPlaceholder, getSearchText, rowKey }: DataTableProps<T>) {
  const [query, setQuery] = useState('');
  const filtered = data.filter(row => getSearchText(row).toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder={searchPlaceholder}
        className="mb-4 w-full rounded border border-gray-300 px-3 py-2"
      />
      <table className="w-full border-collapse text-left">
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.header} className="border-b border-gray-300 px-3 py-2 font-semibold">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map(row => (
            <tr key={rowKey(row)}>
              {columns.map(col => (
                <td key={col.header} className="border-b border-gray-200 px-3 py-2">
                  {col.accessor(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
