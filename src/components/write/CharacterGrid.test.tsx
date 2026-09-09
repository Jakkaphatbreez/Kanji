import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CharacterGrid } from './CharacterGrid';

const ITEMS = [
  { char: 'あ', searchText: 'あ a' },
  { char: 'い', searchText: 'い i' },
];

describe('CharacterGrid', () => {
  it('renders a button for every item by default', () => {
    render(<CharacterGrid items={ITEMS} selected="あ" onSelect={() => {}} searchPlaceholder="Search..." />);
    expect(screen.getByRole('button', { name: 'あ' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'い' })).toBeInTheDocument();
  });

  it('filters by search text, case-insensitively', () => {
    render(<CharacterGrid items={ITEMS} selected="あ" onSelect={() => {}} searchPlaceholder="Search..." />);
    fireEvent.change(screen.getByPlaceholderText('Search...'), { target: { value: 'I' } });
    expect(screen.queryByRole('button', { name: 'あ' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'い' })).toBeInTheDocument();
  });

  it('calls onSelect with the clicked character', () => {
    const onSelect = vi.fn();
    render(<CharacterGrid items={ITEMS} selected="あ" onSelect={onSelect} searchPlaceholder="Search..." />);
    fireEvent.click(screen.getByRole('button', { name: 'い' }));
    expect(onSelect).toHaveBeenCalledWith('い');
  });

  it('visually distinguishes the selected character', () => {
    render(<CharacterGrid items={ITEMS} selected="い" onSelect={() => {}} searchPlaceholder="Search..." />);
    expect(screen.getByRole('button', { name: 'い' }).className).toContain('border-pink-500');
    expect(screen.getByRole('button', { name: 'あ' }).className).not.toContain('border-pink-500');
  });
});
