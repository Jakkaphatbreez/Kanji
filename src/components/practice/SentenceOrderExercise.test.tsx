import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SentenceOrderExercise } from './SentenceOrderExercise';

const ITEM = {
  id: 'so-test',
  segments: ['わたしは', 'がくせいです。'],
  translationTh: 'ฉันเป็นนักเรียน',
  translationEn: 'I am a student.',
};

describe('SentenceOrderExercise', () => {
  it('renders a button for every segment in the pool', () => {
    render(<SentenceOrderExercise item={ITEM} checkLabel="Check" onResult={() => {}} />);
    expect(screen.getByRole('button', { name: 'わたしは' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'がくせいです。' })).toBeInTheDocument();
  });

  it('moves a clicked pool segment into the built sentence area', () => {
    render(<SentenceOrderExercise item={ITEM} checkLabel="Check" onResult={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: 'わたしは' }));
    expect(screen.getByTestId('built-sentence').textContent).toContain('わたしは');
  });

  it('clicking a built segment returns it to the pool (undo)', () => {
    render(<SentenceOrderExercise item={ITEM} checkLabel="Check" onResult={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: 'わたしは' }));
    fireEvent.click(screen.getByTestId('built-segment-0'));
    expect(screen.getByTestId('built-sentence').textContent).toBe('');
    expect(screen.getByRole('button', { name: 'わたしは' })).toBeInTheDocument();
  });

  it('calls onResult(true) when segments are placed in the correct order and checked', () => {
    const onResult = vi.fn();
    render(<SentenceOrderExercise item={ITEM} checkLabel="Check" onResult={onResult} />);
    fireEvent.click(screen.getByRole('button', { name: 'わたしは' }));
    fireEvent.click(screen.getByRole('button', { name: 'がくせいです。' }));
    fireEvent.click(screen.getByText('Check'));
    expect(onResult).toHaveBeenCalledWith(true);
  });

  it('calls onResult(false) when segments are placed in the wrong order and checked', () => {
    const onResult = vi.fn();
    render(<SentenceOrderExercise item={ITEM} checkLabel="Check" onResult={onResult} />);
    fireEvent.click(screen.getByRole('button', { name: 'がくせいです。' }));
    fireEvent.click(screen.getByRole('button', { name: 'わたしは' }));
    fireEvent.click(screen.getByText('Check'));
    expect(onResult).toHaveBeenCalledWith(false);
  });

  it('does not show the check button until every segment has been placed', () => {
    render(<SentenceOrderExercise item={ITEM} checkLabel="Check" onResult={() => {}} />);
    expect(screen.queryByText('Check')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'わたしは' }));
    expect(screen.queryByText('Check')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'がくせいです。' }));
    expect(screen.getByText('Check')).toBeInTheDocument();
  });
});
