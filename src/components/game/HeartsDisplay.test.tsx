import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { HeartsDisplay } from './HeartsDisplay';

describe('HeartsDisplay', () => {
  it('renders filled hearts equal to current hearts and dimmed hearts for the rest', () => {
    const { container } = render(<HeartsDisplay hearts={2} maxHearts={3} />);
    expect(container.textContent).toBe('❤️❤️🖤');
  });

  it('renders all dimmed hearts at 0', () => {
    const { container } = render(<HeartsDisplay hearts={0} maxHearts={3} />);
    expect(container.textContent).toBe('🖤🖤🖤');
  });
});
