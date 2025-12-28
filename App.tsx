
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate, useParams, Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, BookOpen, ClipboardCheck, LayoutDashboard, ChevronLeft, 
  Search, Bell, User, Star, Award, TrendingUp, Clock, FileText, ChevronRight,
  CheckCircle2, AlertCircle, Bookmark, Share2, Download, Play, Info
} from 'lucide-react';
import { 
  specialties, examLevels, subspecialties, infectiousExams, 
  infectiousCourses, harrisonChapters, fungalTopics, candidiasisQuestions 
} from './mockData';
import { Specialty, ExamLevel, Subspecialty, Course, Chapter, Topic, Question } from './types';

// --- Utility ---
const ProgressBar = ({ progress, color = "bg-blue-600" }: { progress: number, color?: string }) => (
  <div className="w-full bg-gray-100 rounded-full h-2">
    <div className={`${color} h-2 rounded-full transition-all duration-1000`} style={{ width: `${progress}%` }}></div>
  </div>
);

// --- Global Components ---
const Navbar = () => (
  <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-black text-blue-600 tracking-tighter">آزمون‌یا<span className="text-emerald-500">ر</span></Link>
          <div className="hidden md:flex gap-6 text-gray-600 font-medium">
            <Link to="/" className="hover:text-blue-600 transition-colors">خانه</Link>
            <button className="hover:text-blue-600 transition-colors">آزمون‌ها</button>
            <button className="hover:text-blue-600 transition-colors">درسنامه</button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
            <Search size={20} />
          </button>
          <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border-2 border-white shadow-sm cursor-pointer">
            ن
          </div>
        </div>
      </div>
    </div>
  </nav>
);

// --- View Components ---

const HomeView = () => {
  const navigate = useNavigate();
  return (
    <div className="py-12 px-4 animate-in fade-in duration-700">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
          مسیر حرفه‌ای <span className="text-blue-600 underline decoration-blue-100 underline-offset-8">پزشکی</span> خود را هوشمندانه مدیریت کنید
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          دسترسی به بزرگترین بانک سوالات آزمون‌های دستیاری، پره و بورد تخصصی به همراه درسنامه‌های خلاصه و نموداری
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {specialties.map((spec) => (
          <button
            key={spec.slug}
            onClick={() => navigate(`/${spec.slug}`)}
            className="group relative bg-white rounded-3xl p-8 border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 text-right overflow-hidden border-b-8 border-b-blue-500"
          >
            <div className="absolute top-0 left-0 w-32 h-32 bg-blue-50 rounded-br-full -translate-x-12 -translate-y-12 transition-transform group-hover:scale-125"></div>
            <div className="relative flex justify-between items-start">
              <div>
                <span className="text-5xl mb-6 block drop-shadow-sm">{spec.icon}</span>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{spec.name_fa}</h3>
                <p className="text-gray-500 font-medium">{spec.name_en}</p>
              </div>
              <div className="bg-blue-600 text-white p-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronLeft size={24} />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

const SpecialtyLevelsView = () => {
  const { specialtySlug } = useParams();
  const navigate = useNavigate();
  const spec = specialties.find(s => s.slug === specialtySlug);
  const levels = examLevels.filter(l => l.specialty_id === spec?.id);

  if (!spec) return <div className="p-20 text-center text-gray-400">یافت نشد</div>;

  return (
    <div className="py-12 px-4 max-w-6xl mx-auto animate-in slide-in-from-right duration-500">
      <div className="flex items-center gap-4 mb-12">
        <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
          <ChevronRight size={24} />
        </button>
        <h2 className="text-3xl font-black text-gray-900">انتخاب مقطع آزمون - {spec.name_fa}</h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {levels.map(level => (
          <button
            key={level.slug}
            onClick={() => {
              if (level.requires_subspecialty) {
                navigate(`/${specialtySlug}/${level.slug}/subspecialties`);
              } else {
                navigate(`/${specialtySlug}/${level.slug}/dashboard`);
              }
            }}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg hover:border-blue-300 transition-all text-right group"
          >
            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:bg-blue-50 transition-colors">
              {level.icon}
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-1">{level.name_fa}</h4>
            <p className="text-sm text-gray-400">{level.name_en}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

const SubspecialtiesView = () => {
  const { specialtySlug, levelSlug } = useParams();
  const navigate = useNavigate();
  const level = examLevels.find(l => l.slug === levelSlug);
  const subs = subspecialties.filter(s => s.exam_level_id === level?.id);

  return (
    <div className="py-12 px-4 max-w-6xl mx-auto animate-in slide-in-from-bottom duration-500">
      <div className="flex items-center gap-4 mb-12">
        <button onClick={() => navigate(`/${specialtySlug}`)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
          <ChevronRight size={24} />
        </button>
        <h2 className="text-3xl font-black text-gray-900">انتخاب تخصص - {level?.name_fa}</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {subs.map(sub => (
          <button
            key={sub.slug}
            onClick={() => navigate(`/${specialtySlug}/${levelSlug}/${sub.slug}/dashboard`)}
            className="bg-white p-6 rounded-2xl border border-gray-200 text-center hover:border-emerald-400 hover:bg-emerald-50/30 transition-all group"
          >
            <div className="text-emerald-600 mb-2 group-hover:scale-110 transition-transform">
              <Star size={24} className="mx-auto" />
            </div>
            <span className="font-bold text-gray-800">{sub.name_fa}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const DashboardView = () => {
  const { specialtySlug, levelSlug, subspecialtySlug } = useParams();
  const navigate = useNavigate();
  const sub = subspecialties.find(s => s.slug === subspecialtySlug);

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900">پنل مطالعه {sub?.name_fa || 'پزشکی'}</h1>
          <p className="text-gray-500 font-medium">امروز بهترین زمان برای یادگیری است</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white px-4 py-2 rounded-xl border flex items-center gap-2 shadow-sm">
            <TrendingUp size={18} className="text-emerald-500" />
            <span className="text-gray-700 font-bold">سطح پیشرفت: ۸۴٪</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="grid sm:grid-cols-2 gap-6">
            <button 
              onClick={() => navigate(`/${specialtySlug}/${levelSlug}/${subspecialtySlug}/exams`)}
              className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 rounded-3xl text-white text-right relative overflow-hidden group shadow-xl"
            >
              <ClipboardCheck size={80} className="absolute -bottom-4 -left-4 opacity-10 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-black mb-2">آزمون‌های جامع</h3>
              <p className="text-blue-100">بیش از ۵۰۰۰ تست شناسنامه‌دار</p>
              <div className="mt-8 bg-white/20 w-fit px-4 py-1 rounded-full text-sm">مشاهده لیست</div>
            </button>

            <button 
              onClick={() => navigate(`/${specialtySlug}/${levelSlug}/${subspecialtySlug}/courses`)}
              className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-8 rounded-3xl text-white text-right relative overflow-hidden group shadow-xl"
            >
              <BookOpen size={80} className="absolute -bottom-4 -left-4 opacity-10 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-black mb-2">درسنامه تخصصی</h3>
              <p className="text-emerald-100">خلاصه هاریسون و منابع مرجع</p>
              <div className="mt-8 bg-white/20 w-fit px-4 py-1 rounded-full text-sm">شروع مطالعه</div>
            </button>
          </div>

          <div className="bg-white rounded-3xl border p-6 shadow-sm">
            <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Clock className="text-blue-500" />
              ادامه مطالعه اخیر
            </h4>
            <div className="space-y-4">
              <div 
                onClick={() => navigate(`/topics/candidiasis/study`)}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-200 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl border flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <FileText />
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">عفونت‌های قارچی - کاندیدیازیس</div>
                    <div className="text-sm text-gray-500">هاریسون - فصل سوم</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-sm font-bold text-gray-400">۴۰٪ کامل شده</div>
                  <ChevronLeft size={18} className="text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-3xl border p-6 shadow-sm">
            <h4 className="text-lg font-bold mb-4">آمار عملکرد</h4>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-2xl">
                <div className="text-blue-600 font-black text-2xl mb-1">۷۵.۴</div>
                <div className="text-blue-800 text-sm font-bold">میانگین نمره کل</div>
              </div>
              <div className="p-4 bg-amber-50 rounded-2xl">
                <div className="text-amber-600 font-black text-2xl mb-1">۱,۴۵۰</div>
                <div className="text-amber-800 text-sm font-bold">تست‌های پاسخ داده شده</div>
              </div>
            </div>
          </div>

          <div className="bg-indigo-600 rounded-3xl p-6 text-white text-right shadow-lg shadow-indigo-100">
            <Award className="mb-4 text-amber-400" size={32} />
            <h4 className="text-xl font-bold mb-2">رتبه شما در کشور</h4>
            <div className="text-3xl font-black mb-1">۱۸۵</div>
            <p className="text-indigo-200 text-sm">از میان ۲,۴۰۰ داوطلب عفونی</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExamsListView = () => {
  const navigate = useNavigate();
  return (
    <div className="py-8 px-4 max-w-5xl mx-auto animate-in slide-in-from-left duration-500">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
          <ChevronRight size={24} />
        </button>
        <h2 className="text-2xl font-black text-gray-900">لیست آزمون‌های جامع</h2>
      </div>

      <div className="space-y-8">
        <section>
          <h3 className="text-lg font-bold mb-4 text-blue-600 border-r-4 border-blue-600 pr-3">آزمون‌های سال‌های قبل</h3>
          <div className="grid gap-4">
            {infectiousExams.filter(e => e.type === 'past_year').map(exam => (
              <div key={exam.id} className="bg-white p-6 rounded-2xl border hover:shadow-md transition-shadow flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-gray-800 text-lg">{exam.title}</h4>
                  <div className="flex gap-4 text-sm text-gray-500 mt-1">
                    <span className="flex items-center gap-1"><ClipboardCheck size={14}/> {exam.questions_count} سوال</span>
                    <span className="flex items-center gap-1"><Clock size={14}/> {exam.duration} دقیقه</span>
                  </div>
                </div>
                <button 
                  onClick={() => navigate(`/exam/${exam.id}/take`)}
                  className="bg-blue-600 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100 w-full sm:w-auto"
                >
                  شروع آزمون
                </button>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-lg font-bold mb-4 text-emerald-600 border-r-4 border-emerald-600 pr-3">آزمون‌های تألیفی و جامع</h3>
          <div className="grid gap-4">
            <div className="bg-white p-6 rounded-2xl border border-dashed border-gray-300 flex items-center justify-between group cursor-pointer hover:border-emerald-500 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Menu />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">ساخت آزمون ترکیبی (سفارشی)</h4>
                  <p className="text-sm text-gray-400">انتخاب سوالات بر اساس سال، درس و موضوع</p>
                </div>
              </div>
              <ChevronLeft size={20} className="text-gray-300 group-hover:text-emerald-500" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const CoursesListView = () => {
  const navigate = useNavigate();
  const { specialtySlug, levelSlug, subspecialtySlug } = useParams();
  
  return (
    <div className="py-8 px-4 max-w-5xl mx-auto animate-in slide-in-from-right duration-500">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
          <ChevronRight size={24} />
        </button>
        <h2 className="text-2xl font-black text-gray-900">لیست درسنامه‌ها</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {infectiousCourses.map(course => (
          <div key={course.id} className="bg-white rounded-3xl border border-gray-100 p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                <BookOpen size={28} />
              </div>
              <div className="text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-full">{course.main_reference}</div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{course.name_fa}</h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">این درسنامه شامل مباحث کلیدی و آپدیت‌های رفرنس جدید می‌باشد.</p>
            
            <div className="mb-6">
              <div className="flex justify-between text-xs font-bold mb-2">
                <span>میزان پیشرفت</span>
                <span className="text-emerald-600">۳۵٪</span>
              </div>
              <ProgressBar progress={35} color="bg-emerald-500" />
            </div>

            <button 
              onClick={() => navigate(`/courses/${course.slug}/chapters`)}
              className="w-full bg-emerald-600 text-white py-3 rounded-2xl font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-100"
            >
              مشاهده سرفصل‌ها
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const ChaptersListView = () => {
  const { courseSlug } = useParams();
  const navigate = useNavigate();
  const course = infectiousCourses.find(c => c.slug === courseSlug);

  return (
    <div className="py-8 px-4 max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
          <ChevronRight size={24} />
        </button>
        <div>
          <h2 className="text-2xl font-black text-gray-900">{course?.name_fa}</h2>
          <p className="text-gray-400 font-medium text-sm">لیست فصل‌های آموزشی</p>
        </div>
      </div>

      <div className="space-y-4">
        {harrisonChapters.map((chapter, idx) => (
          <div 
            key={chapter.id}
            className="bg-white border p-5 rounded-2xl flex items-center justify-between group hover:border-blue-500 transition-all cursor-pointer"
            onClick={() => navigate(`/chapters/${chapter.slug}/topics`)}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                {idx + 1}
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-lg">{chapter.name_fa}</h4>
                <p className="text-sm text-gray-400">{chapter.topics_count} موضوع آموزشی</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {idx === 0 && <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full font-bold">تکمیل شده</span>}
              <ChevronLeft size={20} className="text-gray-300 group-hover:text-blue-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TopicsListView = () => {
  const { chapterSlug } = useParams();
  const navigate = useNavigate();
  const chapter = harrisonChapters.find(c => c.slug === chapterSlug);

  return (
    <div className="py-8 px-4 max-w-4xl mx-auto animate-in slide-in-from-bottom duration-500">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
          <ChevronRight size={24} />
        </button>
        <div>
          <h2 className="text-2xl font-black text-gray-900">{chapter?.name_fa}</h2>
          <p className="text-gray-400 font-medium text-sm">انتخاب موضوع برای مطالعه</p>
        </div>
      </div>

      <div className="grid gap-4">
        {fungalTopics.map((topic, idx) => (
          <div 
            key={topic.id}
            onClick={() => navigate(`/topics/${topic.slug}/study`)}
            className="bg-white border-2 border-transparent p-6 rounded-3xl hover:border-blue-500 hover:shadow-xl transition-all cursor-pointer flex justify-between items-center group shadow-sm"
          >
            <div className="flex items-center gap-6">
              <div className="text-3xl opacity-20 group-hover:opacity-100 transition-opacity">0{idx + 1}</div>
              <div>
                <h4 className="font-bold text-xl text-gray-800 mb-1">{topic.name_fa}</h4>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <span className="flex items-center gap-1"><Clock size={14}/> ۲۵ دقیقه</span>
                  <span className="flex items-center gap-1"><FileText size={14}/> جزوه کامل</span>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Play size={20} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TopicStudyView = () => {
  const { topicSlug } = useParams();
  const navigate = useNavigate();
  const topic = fungalTopics.find(t => t.slug === topicSlug);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 animate-in fade-in duration-500">
      <div className="bg-white rounded-3xl border shadow-xl overflow-hidden mb-8">
        <div className="bg-gray-900 text-white p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-lg">
              <ChevronRight size={24} />
            </button>
            <h2 className="text-xl font-black">{topic?.name_fa}</h2>
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-white/10 rounded-lg"><Bookmark size={20}/></button>
            <button className="p-2 hover:bg-white/10 rounded-lg"><Share2 size={20}/></button>
          </div>
        </div>
        
        <div className="p-8 md:p-12 prose prose-lg max-w-none text-right leading-loose text-gray-800 rtl">
          <div dangerouslySetInnerHTML={{ __html: topic?.content || '' }} />
          
          <div className="mt-12 p-6 bg-blue-50 rounded-2xl border-r-8 border-blue-500">
            <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
              <Info size={20} /> نکته بورد تخصصی
            </h4>
            <p className="text-blue-800 text-sm">در بیماران نوتروپنیک، آمفوتریسین B لیپوزومال ارجحیت دارد.</p>
          </div>
        </div>

        <div className="p-8 bg-gray-50 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
          <button className="flex items-center gap-2 text-gray-600 font-bold hover:text-gray-900">
            <Download size={20} /> دریافت فایل PDF
          </button>
          <button 
            onClick={() => navigate(`/topics/${topicSlug}/quiz`)}
            className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 flex items-center gap-3"
          >
            شروع تست موضوعی <ChevronLeft size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const TopicQuizView = () => {
  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userSelections, setUserSelections] = useState<Record<number, number | null>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const questions = candidiasisQuestions;
  const currentQ = questions[currentIdx];

  const handleSelect = (idx: number) => {
    if (userSelections[currentIdx] !== undefined) return;
    
    setUserSelections(prev => ({ ...prev, [currentIdx]: idx }));
    setShowExplanation(true);
    
    if (idx === currentQ.correctIndex) {
      setCorrectCount(c => c + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(i => i + 1);
      setShowExplanation(false);
    } else {
      // End of quiz
      navigate('/exam/1/results/attempt-topic');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-10 px-4">
      <div className="max-w-3xl w-full">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black text-gray-900">تست موضوعی: کاندیدیازیس</h2>
          <div className="text-lg font-bold text-gray-400">سوال {currentIdx + 1} از {questions.length}</div>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-2xl border-4 border-white p-8 md:p-12 mb-8 animate-in zoom-in duration-300">
          <h3 className="text-2xl font-bold text-gray-900 mb-12 leading-relaxed">{currentQ.text}</h3>
          
          <div className="space-y-4">
            {currentQ.options.map((opt, i) => {
              const isSelected = userSelections[currentIdx] === i;
              const isCorrect = i === currentQ.correctIndex;
              const hasAnswered = userSelections[currentIdx] !== undefined;
              
              let variantClasses = "border-gray-100 bg-gray-50 text-gray-700 hover:border-blue-300";
              if (hasAnswered) {
                if (isCorrect) variantClasses = "border-emerald-500 bg-emerald-50 text-emerald-900";
                else if (isSelected) variantClasses = "border-red-500 bg-red-50 text-red-900";
                else variantClasses = "border-gray-100 bg-gray-50 text-gray-300";
              } else if (isSelected) {
                variantClasses = "border-blue-600 bg-blue-50 text-blue-900";
              }

              return (
                <button
                  key={i}
                  disabled={hasAnswered}
                  onClick={() => handleSelect(i)}
                  className={`w-full p-5 rounded-2xl border-2 text-right transition-all flex items-center justify-between group ${variantClasses}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center font-bold text-sm">
                      {i + 1}
                    </span>
                    <span className="text-lg font-medium">{opt}</span>
                  </div>
                  {hasAnswered && isCorrect && <CheckCircle2 className="text-emerald-500" />}
                  {hasAnswered && isSelected && !isCorrect && <AlertCircle className="text-red-500" />}
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div className="mt-12 animate-in slide-in-from-top duration-500">
              <div className={`p-6 rounded-3xl border-2 ${userSelections[currentIdx] === currentQ.correctIndex ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
                <div className="flex items-center gap-2 mb-4">
                  {userSelections[currentIdx] === currentQ.correctIndex ? (
                    <span className="text-emerald-700 font-black text-xl">آفرین! صحیح است</span>
                  ) : (
                    <span className="text-red-700 font-black text-xl">پاسخ اشتباه بود</span>
                  )}
                </div>
                <p className="text-gray-800 leading-relaxed mb-6">{currentQ.explanation}</p>
                <div className="flex justify-between items-center text-sm font-bold opacity-60">
                  <span>منبع: {currentQ.source}</span>
                  <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                    <Bookmark size={16}/> ذخیره تست
                  </button>
                </div>
              </div>
              
              <button 
                onClick={nextQuestion}
                className="mt-8 w-full bg-gray-900 text-white py-5 rounded-3xl font-black text-xl hover:bg-black transition-all flex items-center justify-center gap-4 group"
              >
                سوال بعدی <ChevronLeft className="group-hover:-translate-x-2 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ExamInterfaceView = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({});
  const navigate = useNavigate();

  const questions = [
    {
      id: 1,
      text: "شایع‌ترین عامل عفونت خون بیمارستانی کدام است؟",
      options: ["استافیلوکوکوس اورئوس", "استرپتوکوکوس پنومونیه", "اشرشیا کلی", "سودوموناس آئروژینوزا"],
      correct: 0
    },
    {
      id: 2,
      text: "کدام آنتی‌بیوتیک برای درمان اولیه کاندیدیازیس دهانی در بیمار HIV+ ارجح است؟",
      options: ["نیستاتین", "فلوکونازول", "آمفوتریسین B", "کاسپوفونژین"],
      correct: 1
    }
  ];

  const handleFinish = () => {
    navigate('/exam/1/results/attempt1');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white border-b p-4 shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h2 className="font-black text-xl text-gray-800">آزمون ارتقا عفونی ۱۴۰۳</h2>
            <div className="text-sm text-gray-400">سوال {currentQuestion + 1} از {questions.length}</div>
          </div>
          <div className="bg-red-50 text-red-600 px-6 py-2 rounded-2xl font-mono text-2xl font-bold shadow-inner">
            118:45
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 max-w-4xl mx-auto w-full">
        <div className="bg-white rounded-[3rem] p-10 md:p-14 shadow-xl border-4 border-white mb-8 min-h-[450px] animate-in slide-in-from-bottom duration-500">
          <div className="mb-10 flex justify-between items-center">
            <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-black">پایه - سطح متوسط</span>
            <button className="text-gray-300 hover:text-amber-500 transition-colors"><Bookmark size={24}/></button>
          </div>
          <h3 className="text-3xl font-black text-gray-900 mb-16 leading-tight">
            {questions[currentQuestion].text}
          </h3>
          <div className="space-y-4">
            {questions[currentQuestion].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedOptions({...selectedOptions, [currentQuestion]: idx})}
                className={`w-full p-6 rounded-2xl border-2 text-right text-xl font-bold transition-all ${
                  selectedOptions[currentQuestion] === idx 
                    ? 'border-blue-600 bg-blue-50 text-blue-800 scale-[1.02]' 
                    : 'border-gray-50 hover:border-gray-200 text-gray-700'
                }`}
              >
                <div className="flex items-center gap-5">
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm ${
                    selectedOptions[currentQuestion] === idx ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-200 text-gray-400'
                  }`}>
                    {idx + 1}
                  </div>
                  {opt}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pb-10">
          <button 
            disabled={currentQuestion === 0}
            onClick={() => setCurrentQuestion(q => q - 1)}
            className="w-full sm:w-auto px-10 py-4 rounded-2xl font-black border-2 border-gray-200 hover:bg-gray-100 disabled:opacity-20 flex items-center justify-center gap-3 transition-all"
          >
            <ChevronRight size={24} /> مرحله قبلی
          </button>
          
          <div className="flex gap-4 w-full sm:w-auto">
            {currentQuestion === questions.length - 1 ? (
              <button onClick={handleFinish} className="w-full sm:w-auto px-14 py-4 rounded-2xl font-black bg-emerald-600 text-white hover:bg-emerald-700 shadow-xl shadow-emerald-100 transition-all scale-105">
                تأیید و پایان آزمون
              </button>
            ) : (
              <button 
                onClick={() => setCurrentQuestion(q => q + 1)}
                className="w-full sm:w-auto px-14 py-4 rounded-2xl font-black bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center gap-3 shadow-xl shadow-blue-100 transition-all"
              >
                سوال بعدی <ChevronLeft size={24} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ResultsView = () => {
  const navigate = useNavigate();
  return (
    <div className="py-12 px-4 max-w-4xl mx-auto animate-in zoom-in duration-500">
      <div className="bg-white rounded-[40px] p-12 shadow-2xl border text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 via-blue-500 to-emerald-500"></div>
        <Award size={80} className="mx-auto text-emerald-500 mb-6 drop-shadow-md" />
        <h1 className="text-4xl font-black text-gray-900 mb-2">تبریک! آزمون به پایان رسید</h1>
        <p className="text-gray-500 mb-12">تحلیل دقیق عملکرد شما بر اساس استانداردهای بورد تخصصی</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
            <div className="text-3xl font-black text-emerald-600">۷۵</div>
            <div className="text-sm text-gray-500 font-bold">صحیح</div>
          </div>
          <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
            <div className="text-3xl font-black text-red-500">۲۰</div>
            <div className="text-sm text-gray-500 font-bold">غلط</div>
          </div>
          <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
            <div className="text-3xl font-black text-gray-400">۵</div>
            <div className="text-sm text-gray-500 font-bold">بی‌پاسخ</div>
          </div>
          <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
            <div className="text-3xl font-black text-blue-600">۷۵٪</div>
            <div className="text-sm text-blue-800 font-bold">درصد کل</div>
          </div>
        </div>

        <div className="space-y-6 text-right mb-12">
          <h3 className="text-xl font-bold text-gray-800 pr-4 border-r-4 border-blue-500">تحلیل موضوعی</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm font-bold mb-1">
                <span>عفونت‌های باکتریال</span>
                <span className="text-emerald-600">۸۵٪</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[85%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-bold mb-1">
                <span>عفونت‌های ویروسی</span>
                <span className="text-amber-500">۶۰٪</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 w-[60%]"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => navigate('/')} className="px-10 py-4 rounded-2xl bg-gray-900 text-white font-bold hover:bg-black transition-all">
            بازگشت به داشبورد
          </button>
          <button className="px-10 py-4 rounded-2xl border-2 border-blue-600 text-blue-600 font-bold hover:bg-blue-50 transition-all">
            مرور سوالات اشتباه
          </button>
        </div>
      </div>
    </div>
  );
};

// Fixed: Explicitly defining Layout props to include optional children for better TS compatibility in JSX
const Layout = ({ children }: { children?: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col font-vazir rtl">
    <Navbar />
    <main className="flex-1 bg-slate-50">
      {children}
    </main>
    <footer className="bg-white border-t py-12 px-4 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-right">
          <h4 className="text-xl font-black text-gray-900 mb-2">آزمون‌یار پزشکی</h4>
          <p className="text-gray-500 text-sm">همراه شما در تمام مراحل تخصص و فوق‌تخصص</p>
        </div>
        <div className="flex gap-8 text-gray-400 font-medium">
          <button className="hover:text-blue-600">درباره ما</button>
          <button className="hover:text-blue-600">تماس با پشتیبانی</button>
          <button className="hover:text-blue-600">شرایط و قوانین</button>
        </div>
        <div className="text-gray-400 text-sm">© تمامی حقوق برای آزمون‌یار محفوظ است</div>
      </div>
    </footer>
  </div>
);

// --- Router ---
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><HomeView /></Layout>} />
        <Route path="/:specialtySlug" element={<Layout><SpecialtyLevelsView /></Layout>} />
        <Route path="/:specialtySlug/:levelSlug/subspecialties" element={<Layout><SubspecialtiesView /></Layout>} />
        <Route path="/:specialtySlug/:levelSlug/:subspecialtySlug/dashboard" element={<Layout><DashboardView /></Layout>} />
        <Route path="/:specialtySlug/:levelSlug/:subspecialtySlug/dashboard/exams" element={<Layout><ExamsListView /></Layout>} />
        
        {/* Course Path */}
        <Route path="/:specialtySlug/:levelSlug/:subspecialtySlug/courses" element={<Layout><CoursesListView /></Layout>} />
        <Route path="/courses/:courseSlug/chapters" element={<Layout><ChaptersListView /></Layout>} />
        <Route path="/chapters/:chapterSlug/topics" element={<Layout><TopicsListView /></Layout>} />
        <Route path="/topics/:topicSlug/study" element={<Layout><TopicStudyView /></Layout>} />
        <Route path="/topics/:topicSlug/quiz" element={<TopicQuizView />} />

        {/* Exams Path */}
        <Route path="/exam/:examId/take" element={<ExamInterfaceView />} />
        <Route path="/exam/:examId/results/:attemptId" element={<Layout><ResultsView /></Layout>} />
      </Routes>
    </Router>
  );
};

export default App;
