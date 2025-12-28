
import { Specialty, ExamLevel, Subspecialty, Exam, Course, Chapter, Topic, Question } from './types';

export const specialties: Specialty[] = [
  { id: 1, slug: 'medicine', name_fa: 'پزشکی', name_en: 'Medicine', icon: '🩺' },
  { id: 2, slug: 'dentistry', name_fa: 'دندانپزشکی', name_en: 'Dentistry', icon: '🦷' }
];

export const examLevels: ExamLevel[] = [
  { id: 1, specialty_id: 1, slug: 'pre_residency', name_fa: 'آزمون پره', name_en: 'Pre-Residency', icon: '📚', requires_subspecialty: false },
  { id: 2, specialty_id: 1, slug: 'residency', name_fa: 'آزمون دستیاری', name_en: 'Residency', icon: '🎓', requires_subspecialty: false },
  { id: 3, specialty_id: 1, slug: 'board_promotion', name_fa: 'بورد / ارتقا', name_en: 'Board/Promotion', icon: '📊', requires_subspecialty: true },
  { id: 4, specialty_id: 2, slug: 'dental_residency', name_fa: 'دستیاری دندانپزشکی', name_en: 'Dental Residency', icon: '🎓', requires_subspecialty: false },
];

export const subspecialties: Subspecialty[] = [
  { id: 1, specialty_id: 1, exam_level_id: 3, slug: 'infectious', name_fa: 'عفونی', name_en: 'Infectious Diseases' },
  { id: 2, specialty_id: 1, exam_level_id: 3, slug: 'cardiology', name_fa: 'قلب و عروق', name_en: 'Cardiology' },
  { id: 3, specialty_id: 1, exam_level_id: 3, slug: 'gastroenterology', name_fa: 'گوارش', name_en: 'Gastroenterology' },
];

export const infectiousExams: Exam[] = [
  { id: 1, title: 'آزمون ارتقا عفونی ۱۴۰۳', slug: 'inf-1403', year: 1403, questions_count: 100, duration: 120, type: 'past_year' },
  { id: 2, title: 'آزمون ارتقا عفونی ۱۴۰۲', slug: 'inf-1402', year: 1402, questions_count: 100, duration: 120, type: 'past_year' },
  { id: 3, title: 'آزمون جامع تألیفی عفونی - مباحث نوین', slug: 'inf-authored-1', questions_count: 50, duration: 60, type: 'authored' },
];

export const infectiousCourses: Course[] = [
  { id: 1, specialty_id: 1, exam_level_id: 3, subspecialty_id: 1, slug: 'harrison-inf', name_fa: 'بیماری‌های عفونی - هاریسون', main_reference: "Harrison's Principles" },
  { id: 2, specialty_id: 1, exam_level_id: 3, subspecialty_id: 1, slug: 'mandell-anti', name_fa: 'آنتی‌بیوتیک‌ها - مندل', main_reference: "Mandell Principles" },
];

export const harrisonChapters: Chapter[] = [
  { id: 1, course_id: 1, slug: 'bacterial', name_fa: 'عفونت‌های باکتریال', topics_count: 12 },
  { id: 2, course_id: 1, slug: 'viral', name_fa: 'عفونت‌های ویروسی', topics_count: 10 },
  { id: 3, course_id: 1, slug: 'fungal', name_fa: 'عفونت‌های قارچی', topics_count: 8 },
];

export const fungalTopics: Topic[] = [
  { id: 1, chapter_id: 3, slug: 'candidiasis', name_fa: 'کاندیدیازیس', content: `
    ## کاندیدیازیس (Candidiasis)
    عفونت قارچی ناشی از گونه‌های کاندیدا، شایع‌ترین آنها Candida albicans است.
    
    ### اپیدمیولوژی
    - شایع‌ترین عفونت قارچی در انسان
    - عامل مهم عفونت در بیماران immunocompromised
    
    ### تظاهرات بالینی
    1. کاندیدیازیس مخاطی (دهان، مری، واژن)
    2. کاندیدمی و عفونت سیستمیک
    
    ### تشخیص
    - کشت خون
    - تست (1,3)-β-D-glucan
    
    ### درمان
    - Fluconazole (اولین خط)
    - Echinocandins (موارد شدید)
  `},
  { id: 2, chapter_id: 3, slug: 'aspergillosis', name_fa: 'آسپرژیلوزیس', content: 'محتوای آموزشی مربوط به آسپرژیلوزیس...' },
  { id: 3, chapter_id: 3, slug: 'mucormycosis', name_fa: 'موکورمیکوزیس', content: 'محتوای آموزشی مربوط به موکورمیکوزیس...' },
];

export const candidiasisQuestions: Question[] = [
  {
    id: 101,
    text: "بیمار 45 ساله HIV+ با لکوپلاکی سفید دهان مراجعه کرده. محتمل‌ترین تشخیص؟",
    options: ["لوکوپلاکی خوش‌خیم", "کاندیدیازیس دهانی", "کارسینوم سلول سنگفرشی", "لیکن پلان"],
    correctIndex: 1,
    explanation: "کاندیدیازیس دهانی (Oral Thrush) شایع‌ترین عفونت قارچی دهان در بیماران HIV+ است.",
    source: "Harrison's Chapter 213, p.1543"
  },
  {
    id: 102,
    text: "اولین خط درمان در کاندیدیازیس سیستمیک غیرنوتروپنیک کدام است؟",
    options: ["آمفوتریسین B", "فلوکونازول", "کاسپوفونژین", "وریکونازول"],
    correctIndex: 2,
    explanation: "اکینوکاندین‌ها (مانند کاسپوفونژین) در حال حاضر به عنوان خط اول در موارد شدید و سیستمیک توصیه می‌شوند.",
    source: "Mandell Principles"
  }
];
