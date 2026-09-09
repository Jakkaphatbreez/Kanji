import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '@/i18n/LanguageContext';
import { Nav } from './Nav';

describe('Nav', () => {
  it('renders a link for every main section in the active language', () => {
    render(
      <LanguageProvider>
        <Nav />
      </LanguageProvider>
    );
    expect(screen.getByText('หน้าแรก')).toBeInTheDocument();
    expect(screen.getByText('คะนะ')).toBeInTheDocument();
    expect(screen.getByText('คำศัพท์')).toBeInTheDocument();
    expect(screen.getByText('คันจิ')).toBeInTheDocument();
    expect(screen.getByText('เขียน')).toBeInTheDocument();
    expect(screen.getByText('ไวยากรณ์')).toBeInTheDocument();
    expect(screen.getByText('แผนเรียน')).toBeInTheDocument();
    expect(screen.getByText('แบบทดสอบ')).toBeInTheDocument();
    expect(screen.getByText('เกม')).toBeInTheDocument();
  });
});
