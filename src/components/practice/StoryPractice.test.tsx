import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider } from '@/i18n/LanguageContext';

const FIXTURE_STORY = {
  id: 'fixture-story',
  title: 'テストのおはなし',
  category: 'daily' as const,
  sentences: [{ jp: 'テストです。', th: 'นี่คือการทดสอบ', en: 'This is a test.' }],
  questions: [
    {
      questionJp: 'これは なんですか。',
      questionTh: 'นี่คืออะไร',
      questionEn: 'What is this?',
      choicesJp: ['テスト', 'ほん', 'ねこ', 'いぬ'],
      correctIndex: 0,
      explanationTh: 'เรื่องบอกว่า "テストです"',
      explanationEn: 'The story says "テストです".',
    },
  ],
};

vi.mock('@/data/stories', () => ({ stories: [FIXTURE_STORY] }));

const { StoryPractice } = await import('./StoryPractice');

function openStoryAndStartQuestions() {
  fireEvent.click(screen.getByText(FIXTURE_STORY.title));
  fireEvent.click(screen.getByText('ตอบคำถาม'));
}

describe('StoryPractice question feedback', () => {
  it('shows the question translation and explanation when answered correctly', () => {
    render(
      <LanguageProvider>
        <StoryPractice mode="reading" />
      </LanguageProvider>
    );
    openStoryAndStartQuestions();
    fireEvent.click(screen.getByRole('button', { name: 'テスト' }));

    expect(screen.getByText('นี่คืออะไร')).toBeInTheDocument();
    expect(screen.getByText('เรื่องบอกว่า "テストです"')).toBeInTheDocument();
  });

  it('shows the correct answer, translation, and explanation when answered incorrectly', () => {
    render(
      <LanguageProvider>
        <StoryPractice mode="reading" />
      </LanguageProvider>
    );
    openStoryAndStartQuestions();
    fireEvent.click(screen.getByRole('button', { name: 'ねこ' }));

    expect(screen.getByTestId('correct-answer').textContent).toContain('テスト');
    expect(screen.getByText('นี่คืออะไร')).toBeInTheDocument();
    expect(screen.getByText('เรื่องบอกว่า "テストです"')).toBeInTheDocument();
  });
});
