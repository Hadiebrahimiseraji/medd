
export interface Specialty {
  id: number;
  slug: string;
  name_fa: string;
  name_en: string;
  icon: string;
}

export interface ExamLevel {
  id: number;
  specialty_id: number;
  slug: string;
  name_fa: string;
  name_en: string;
  icon: string;
  requires_subspecialty: boolean;
}

export interface Subspecialty {
  id: number;
  specialty_id: number;
  exam_level_id: number;
  slug: string;
  name_fa: string;
  name_en: string;
}

export interface Course {
  id: number;
  specialty_id: number;
  exam_level_id: number;
  subspecialty_id?: number;
  slug: string;
  name_fa: string;
  main_reference: string;
}

export interface Chapter {
  id: number;
  course_id: number;
  slug: string;
  name_fa: string;
  topics_count: number;
}

export interface Topic {
  id: number;
  chapter_id: number;
  slug: string;
  name_fa: string;
  content: string;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  source: string;
}

export interface Exam {
  id: number;
  title: string;
  slug: string;
  year?: number;
  questions_count: number;
  duration: number;
  type: 'past_year' | 'authored' | 'comprehensive';
}
