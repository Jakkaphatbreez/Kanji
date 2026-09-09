'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/i18n/LanguageContext';
import { studyPlan } from '@/data/studyPlan';
import { setQuizAutostart } from '@/lib/quiz/autostart';
import type { QuizCategory, QuizMode } from '@/lib/quiz/types';

export default function StudyPlanPage() {
  const { t, language } = useLanguage();
  const router = useRouter();

  function startExercise(category: QuizCategory, mode: QuizMode) {
    setQuizAutostart({ category, mode });
    router.push('/quiz');
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-indigo-900">{t.studyPlan.title}</h1>
      <p className="mt-2 text-gray-600">{t.studyPlan.subtitle}</p>

      <div className="mt-6 space-y-6">
        {studyPlan.map(month => (
          <section key={month.month} className="rounded border border-pink-200 bg-white p-4">
            <h2 className="text-lg font-semibold text-indigo-900">
              {t.studyPlan.monthLabel} {month.month}: {language === 'th' ? month.titleTh : month.titleEn}
            </h2>
            <p className="mt-1 text-sm text-gray-600">{language === 'th' ? month.summaryTh : month.summaryEn}</p>

            <div className="mt-4 space-y-3">
              {month.weeks.map(week => (
                <div key={week.weekLabelTh} className="rounded border border-pink-100 p-3">
                  <div className="font-semibold text-pink-600">{language === 'th' ? week.weekLabelTh : week.weekLabelEn}</div>
                  <div className="mt-1 text-sm text-gray-700">{language === 'th' ? week.goalTh : week.goalEn}</div>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600">
                    {week.tasks.map((task, i) => (
                      <li key={i}>
                        {task.href ? (
                          <Link href={task.href} className="text-pink-600 underline hover:text-pink-700">
                            {language === 'th' ? task.labelTh : task.labelEn}
                          </Link>
                        ) : language === 'th' ? (
                          task.labelTh
                        ) : (
                          task.labelEn
                        )}
                      </li>
                    ))}
                  </ul>
                  {week.exercise ? (
                    <button
                      onClick={() => startExercise(week.exercise!.category, week.exercise!.mode)}
                      className="mt-3 rounded bg-pink-500 px-3 py-1 text-sm font-semibold text-white hover:bg-pink-600"
                    >
                      {t.studyPlan.exerciseButton}
                    </button>
                  ) : (
                    <Link
                      href="/quiz"
                      className="mt-3 inline-block rounded border border-pink-300 px-3 py-1 text-sm text-indigo-900 hover:border-pink-400"
                    >
                      {t.studyPlan.generalExerciseButton}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
