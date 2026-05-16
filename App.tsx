
import React, { useState } from 'react';
import { 
  transformNews, 
  generateSatiricalStory, 
  breakdownReality, 
  deconstructOfficialLanguage, 
  generateManMonologue, 
  generateCitizenTest,
  generateUncomfortableQuestion,
  generateSocialDialogue
} from './services/geminiService';
import { 
  TransformationResult, 
  SatiricalStoryResult, 
  BreakdownResult, 
  OfficialResult, 
  ManResult, 
  CitizenTestResult,
  QuestionResult,
  DialogueResult,
  HistoryItem, 
  AppMode 
} from './types';
import { Button } from './components/Button';
import { StoryCard } from './components/StoryCard';
import { ShortStoryCard } from './components/ShortStoryCard';
import { BreakdownCard } from './components/BreakdownCard';
import { OfficialCard } from './components/OfficialCard';
import { ManCard } from './components/ManCard';
import { CitizenTestCard } from './components/CitizenTestCard';
import { QuestionCard } from './components/QuestionCard';
import { DialogueCard } from './components/DialogueCard';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>('news');
  const [inputText, setInputText] = useState('');
  const [category, setCategory] = useState('عبث يومي');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  
  const [currentNewsResult, setCurrentNewsResult] = useState<TransformationResult | null>(null);
  const [currentStoryResult, setCurrentStoryResult] = useState<SatiricalStoryResult | null>(null);
  const [currentBreakdownResult, setCurrentBreakdownResult] = useState<BreakdownResult | null>(null);
  const [currentOfficialResult, setCurrentOfficialResult] = useState<OfficialResult | null>(null);
  const [currentManResult, setCurrentManResult] = useState<ManResult | null>(null);
  const [currentCitizenResult, setCurrentCitizenResult] = useState<CitizenTestResult | null>(null);
  const [currentQuestionResult, setCurrentQuestionResult] = useState<QuestionResult | null>(null);
  const [currentDialogueResult, setCurrentDialogueResult] = useState<DialogueResult | null>(null);

  const handleAction = async () => {
    if (!inputText.trim()) {
      let msg = 'يرجى إدخال نص الخبر أولاً';
      if (mode === 'stories') msg = 'يرجى إدخال فكرة القصة أولاً';
      if (mode === 'breakdown') msg = 'يرجى وصف الموقف اليومي أولاً';
      if (mode === 'official') msg = 'يرجى إدخال الجملة الرسمية أولاً';
      if (mode === 'man') msg = 'يرجى وصف الوضعية اليومية أولاً';
      if (mode === 'citizenTest') msg = 'يرجى وصف السلوك العبثي أولاً';
      if (mode === 'uncomfortableQuestion') msg = 'يرجى إدخال الفكرة أولاً';
      if (mode === 'socialDialogue') msg = 'يرجى إدخال الموضوع الاجتماعي أولاً';
      setError(msg);
      return;
    }

    setLoading(true);
    setError(null);
    setCurrentNewsResult(null);
    setCurrentStoryResult(null);
    setCurrentBreakdownResult(null);
    setCurrentOfficialResult(null);
    setCurrentManResult(null);
    setCurrentCitizenResult(null);
    setCurrentQuestionResult(null);
    setCurrentDialogueResult(null);

    try {
      if (mode === 'news') {
        const result = await transformNews(inputText);
        setCurrentNewsResult(result);
        setHistory(prev => [{
          id: Date.now().toString(),
          originalText: inputText,
          transformed: result,
          timestamp: Date.now(),
          type: 'news'
        }, ...prev].slice(0, 20) as HistoryItem[]);
      } else if (mode === 'stories') {
        const result = await generateSatiricalStory(inputText, category);
        setCurrentStoryResult(result);
        setHistory(prev => [{
          id: Date.now().toString(),
          idea: inputText,
          transformed: result,
          timestamp: Date.now(),
          type: 'story'
        }, ...prev].slice(0, 20) as HistoryItem[]);
      } else if (mode === 'breakdown') {
        const result = await breakdownReality(inputText);
        setCurrentBreakdownResult(result);
        setHistory(prev => [{
          id: Date.now().toString(),
          situation: inputText,
          transformed: result,
          timestamp: Date.now(),
          type: 'breakdown'
        }, ...prev].slice(0, 20) as HistoryItem[]);
      } else if (mode === 'official') {
        const result = await deconstructOfficialLanguage(inputText);
        setCurrentOfficialResult(result);
        setHistory(prev => [{
          id: Date.now().toString(),
          officialText: inputText,
          transformed: result,
          timestamp: Date.now(),
          type: 'official'
        }, ...prev].slice(0, 20) as HistoryItem[]);
      } else if (mode === 'man') {
        const result = await generateManMonologue(inputText);
        setCurrentManResult(result);
        setHistory(prev => [{
          id: Date.now().toString(),
          situation: inputText,
          transformed: result,
          timestamp: Date.now(),
          type: 'man'
        }, ...prev].slice(0, 20) as HistoryItem[]);
      } else if (mode === 'citizenTest') {
        const result = await generateCitizenTest(inputText);
        setCurrentCitizenResult(result);
        setHistory(prev => [{
          id: Date.now().toString(),
          situation: inputText,
          transformed: result,
          timestamp: Date.now(),
          type: 'citizenTest'
        }, ...prev].slice(0, 20) as HistoryItem[]);
      } else if (mode === 'uncomfortableQuestion') {
        const result = await generateUncomfortableQuestion(inputText);
        setCurrentQuestionResult(result);
        setHistory(prev => [{
          id: Date.now().toString(),
          input: inputText,
          transformed: result,
          timestamp: Date.now(),
          type: 'uncomfortableQuestion'
        }, ...prev].slice(0, 20) as HistoryItem[]);
      } else if (mode === 'socialDialogue') {
        const result = await generateSocialDialogue(inputText);
        setCurrentDialogueResult(result);
        setHistory(prev => [{
          id: Date.now().toString(),
          topic: inputText,
          transformed: result,
          timestamp: Date.now(),
          type: 'socialDialogue'
        }, ...prev].slice(0, 20) as HistoryItem[]);
      }
    } catch (err: any) {
      console.error(err);
      setError("حدث خطأ أثناء المعالجة. يرجى المحاولة ثانية.");
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    'سخرية وجودية',
    'رمزية سياسية',
    'عبث يومي',
    'قصة قصيرة جداً',
    'نهاية صادمة'
  ];

  const copyResult = () => {
    let text = '';
    if (currentNewsResult) {
      text = `${currentNewsResult.opening}\n\n${currentNewsResult.expansion}\n\n${currentNewsResult.irony}\n\n${currentNewsResult.conclusion}`;
    } else if (currentStoryResult) {
      text = `${currentStoryResult.title}\n\n${currentStoryResult.content}\n\n${currentStoryResult.conclusion}`;
    } else if (currentBreakdownResult) {
      text = `${currentBreakdownResult.opening}\n\n${currentBreakdownResult.deconstruction}\n\n${currentBreakdownResult.conclusion}`;
    } else if (currentOfficialResult) {
      text = `${currentOfficialResult.rephrasing}\n\n${currentOfficialResult.hiddenMeaning}\n\n${currentOfficialResult.satiricalConclusion}`;
    } else if (currentManResult) {
      text = `${currentManResult.monologue}\n\n${currentManResult.conclusion}`;
    } else if (currentCitizenResult) {
      text = `${currentCitizenResult.complaint}\n\n${currentCitizenResult.complicity}\n\n${currentCitizenResult.reveal}\n\n${currentCitizenResult.absurdConclusion}`;
    } else if (currentQuestionResult) {
      text = currentQuestionResult.question;
    } else if (currentDialogueResult) {
      text = `${currentDialogueResult.title}\n\n` + currentDialogueResult.lines.map(l => `${l.speaker}: ${l.text}`).join('\n');
    }
    if (text) {
      navigator.clipboard.writeText(text);
      alert('تم النسخ!');
    }
  };

  const getPlaceholder = () => {
    switch (mode) {
      case 'news': return "مثال: أعلنت الحكومة عن زيادة في الأسعار...";
      case 'stories': return "مثال: طابور طويل أمام فرن الخبز في فجر شتوي...";
      case 'breakdown': return "مثال: الموظف الذي يطلب صورة طبق الأصل عن ملف موجود أمامه بالفعل...";
      case 'official': return "مثال: في إطار تحسين جودة الخدمات المقدمة للمواطنين...";
      case 'man': return "مثال: التحديق في لافتة (مغلق للصلاة) لمدة 40 دقيقة...";
      case 'citizenTest': return "مثال: الوقوف 3 ساعات في طابور تسديد فاتورة رغم وجود تطبيق إلكتروني...";
      case 'uncomfortableQuestion': return "أدخل فكرة أو سلوكاً (مثال: الشغف بالعمل، طقوس الصباح، وعود الانتخابات...)";
      case 'socialDialogue': return "أدخل موضوعاً اجتماعياً (مثال: النفاق، العادات، التباهي بالثراء...)";
      default: return "";
    }
  };

  const getLabel = () => {
    switch (mode) {
      case 'news': return "أدخل الخبر الصحفي";
      case 'stories': return "أدخل فكرة أو وضعية يومية";
      case 'breakdown': return "صف الموقف اليومي (اجتماع، طابور، مكالمة...)";
      case 'official': return "أدخل الجملة الرسمية أو البيروقراطية";
      case 'man': return "صف وضعية يومية عبثية (مونولوغ داخلي)";
      case 'citizenTest': return "نقد العبث: صف سلوكاً يومياً غير منطقي";
      case 'uncomfortableQuestion': return "سؤال لا يريد جواباً: فكك الفكرة بسؤال واحد";
      case 'socialDialogue': return "حوار ساخر: موضوع اجتماعي شائع";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen dark-gradient selection:bg-red-900 selection:text-white pb-20">
      {/* Header */}
      <header className="container mx-auto px-4 py-12 text-center">
        <div className="inline-block mb-4 p-2 border-y-2 border-red-700">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white uppercase italic">
            Dark News <span className="text-red-600">Satirizer</span>
          </h1>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {[
            { id: 'news', label: 'مشرّح الأخبار', color: 'bg-red-700' },
            { id: 'stories', label: 'مختبر القصص', color: 'bg-red-700' },
            { id: 'breakdown', label: 'تفكيك الواقع', color: 'bg-amber-800' },
            { id: 'official', label: 'اللغة الرسمية', color: 'bg-blue-800' },
            { id: 'man', label: 'المواطن: المونولوغ', color: 'bg-neutral-600' },
            { id: 'citizenTest', label: 'نقد اللامنطق', color: 'bg-emerald-800' },
            { id: 'uncomfortableQuestion', label: 'سؤال لا يريد جواباً', color: 'bg-indigo-700' },
            { id: 'socialDialogue', label: 'حوار ساخر', color: 'bg-violet-800' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => { setMode(tab.id as AppMode); setInputText(''); }}
              className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold transition-all ${mode === tab.id ? `${tab.color} text-white` : 'bg-neutral-900 text-neutral-500 hover:text-neutral-300'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      <main className="container mx-auto px-4 max-w-4xl">
        {/* Input Section */}
        <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-2xl p-6 mb-12 shadow-inner">
          <label className="block text-xs font-bold text-neutral-500 uppercase mb-3 mr-1">
            {getLabel()}
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={getPlaceholder()}
            className="w-full h-48 bg-neutral-950 border border-neutral-800 rounded-xl p-4 text-neutral-200 focus:ring-2 focus:ring-red-900 focus:border-red-700 outline-none transition-all resize-none mb-4 leading-relaxed serif-news text-xl"
          />
          
          {mode === 'stories' && (
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1 text-xs rounded-md border transition-all ${category === cat ? 'bg-red-900/40 border-red-600 text-white' : 'border-neutral-800 text-neutral-500 hover:border-neutral-600'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
          
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <Button 
              onClick={handleAction} 
              loading={loading}
              variant={mode === 'news' || mode === 'stories' ? 'primary' : 'secondary'}
              className="w-full md:w-auto min-w-[200px]"
            >
              {mode === 'news' ? 'تشريح الخبر' : 
               mode === 'stories' ? 'توليد القصة' : 
               mode === 'breakdown' ? 'تفكيك العبث' : 
               mode === 'official' ? 'تفكيك اللغة' : 
               mode === 'man' ? 'توليد المونولوغ' :
               mode === 'citizenTest' ? 'نقد اللامنطق' :
               mode === 'uncomfortableQuestion' ? 'طرح السؤال' :
               'توليد الحوار'}
            </Button>
            
            {error && (
              <span className="text-red-500 text-sm font-medium animate-pulse">
                {error}
              </span>
            )}
          </div>
        </div>

        {/* Results Section */}
        {mode === 'news' && currentNewsResult && (
          <div className="mb-16">
            <StoryCard result={currentNewsResult} onCopy={copyResult} />
          </div>
        )}

        {mode === 'stories' && currentStoryResult && (
          <div className="mb-16">
            <ShortStoryCard result={currentStoryResult} onCopy={copyResult} />
          </div>
        )}

        {mode === 'breakdown' && currentBreakdownResult && (
          <div className="mb-16">
            <BreakdownCard result={currentBreakdownResult} onCopy={copyResult} />
          </div>
        )}

        {mode === 'official' && currentOfficialResult && (
          <div className="mb-16">
            <OfficialCard result={currentOfficialResult} onCopy={copyResult} />
          </div>
        )}

        {mode === 'man' && currentManResult && (
          <div className="mb-16">
            <ManCard result={currentManResult} onCopy={copyResult} />
          </div>
        )}

        {mode === 'citizenTest' && currentCitizenResult && (
          <div className="mb-16">
            <CitizenTestCard result={currentCitizenResult} onCopy={copyResult} />
          </div>
        )}

        {mode === 'uncomfortableQuestion' && currentQuestionResult && (
          <div className="mb-16">
            <QuestionCard result={currentQuestionResult} onCopy={copyResult} />
          </div>
        )}

        {mode === 'socialDialogue' && currentDialogueResult && (
          <div className="mb-16">
            <DialogueCard result={currentDialogueResult} onCopy={copyResult} />
          </div>
        )}

        {/* History Items */}
        {history.length > 0 && (
          <div className="mt-20">
            <h3 className="text-neutral-600 text-xs font-bold uppercase mb-8 text-center flex items-center justify-center gap-4">
              <span className="h-px w-12 bg-neutral-800"></span>
              سجل العبث
              <span className="h-px w-12 bg-neutral-800"></span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {history.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => {
                    setMode(item.type);
                    // Clear all results first
                    setCurrentNewsResult(null);
                    setCurrentStoryResult(null);
                    setCurrentBreakdownResult(null);
                    setCurrentOfficialResult(null);
                    setCurrentManResult(null);
                    setCurrentCitizenResult(null);
                    setCurrentQuestionResult(null);
                    setCurrentDialogueResult(null);
                    
                    if (item.type === 'news') setCurrentNewsResult(item.transformed);
                    else if (item.type === 'story') setCurrentStoryResult(item.transformed);
                    else if (item.type === 'breakdown') setCurrentBreakdownResult(item.transformed);
                    else if (item.type === 'official') setCurrentOfficialResult(item.transformed);
                    else if (item.type === 'man') setCurrentManResult(item.transformed);
                    else if (item.type === 'citizenTest') setCurrentCitizenResult(item.transformed);
                    else if (item.type === 'uncomfortableQuestion') setCurrentQuestionResult(item.transformed);
                    else if (item.type === 'socialDialogue') setCurrentDialogueResult(item.transformed);
                  }}
                  className="bg-neutral-900/30 border border-neutral-800/50 p-4 rounded-lg cursor-pointer hover:bg-neutral-800/40 hover:border-neutral-700 transition-all group"
                >
                  <div className="flex flex-col gap-1">
                    <p className="text-neutral-400 text-sm truncate font-bold">
                      {item.type === 'news' ? item.transformed.opening : 
                       item.type === 'story' ? item.transformed.title : 
                       item.type === 'breakdown' ? item.transformed.opening :
                       item.type === 'official' ? item.transformed.rephrasing :
                       item.type === 'man' ? 'مونولوغ داخلي' :
                       item.type === 'citizenTest' ? item.transformed.complaint :
                       item.type === 'uncomfortableQuestion' ? item.transformed.question :
                       item.transformed.title}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className={`text-[10px] uppercase tracking-tighter font-bold ${
                        item.type === 'news' ? 'text-red-500' : 
                        item.type === 'story' ? 'text-neutral-500' : 
                        item.type === 'breakdown' ? 'text-amber-600' :
                        item.type === 'official' ? 'text-blue-500' :
                        item.type === 'man' ? 'text-neutral-400' :
                        item.type === 'citizenTest' ? 'text-emerald-500' :
                        item.type === 'uncomfortableQuestion' ? 'text-indigo-500' :
                        'text-violet-500'
                      }`}>
                        {item.type === 'news' ? 'خبر ساخر' : 
                         item.type === 'story' ? 'قصة رمزية' : 
                         item.type === 'breakdown' ? 'تفكيك واقع' : 
                         item.type === 'official' ? 'لغة رسمية' : 
                         item.type === 'man' ? 'مونولوغ' :
                         item.type === 'citizenTest' ? 'نقد اللامنطق' :
                         item.type === 'uncomfortableQuestion' ? 'سؤال مزعج' :
                         'حوار ساخر'}
                      </span>
                      <span className="text-[10px] text-neutral-600">
                        {new Date(item.timestamp).toLocaleTimeString('ar-EG')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="mt-20 text-center text-neutral-700 text-[10px] uppercase tracking-widest pb-10">
        DarkNews Satirizer &copy; {new Date().getFullYear()} — الواقع أكثر سخرية من الخيال
      </footer>
    </div>
  );
};

export default App;
