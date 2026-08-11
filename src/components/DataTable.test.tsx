import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DataTable } from './DataTable';

interface Row {
  id: string;
  name: string;
}

const rows: Row[] = [
  { id: '1', name: 'Apple' },
  { id: '2', name: 'Banana' },
];

describe('DataTable', () => {
  it('renders all rows by default', () => {
    render(
      <DataTable
        data={rows}
        columns={[{ header: 'Name', accessor: r => r.name }]}
        searchPlaceholder="Search..."
        getSearchText={r => r.name}
        rowKey={r => r.id}
      />
    );
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
  });

  it('filters rows by the search query, case-insensitively', () => {
    render(
      <DataTable
        data={rows}
        columns={[{ header: 'Name', accessor: r => r.name }]}
        searchPlaceholder="Search..."
        getSearchText={r => r.name}
        rowKey={r => r.id}
      />
    );
    fireEvent.change(screen.getByPlaceholderText('Search...'), { target: { value: 'ban' } });
    expect(screen.queryByText('Apple')).not.toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
  });
});
