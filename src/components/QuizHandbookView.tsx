import React, { useState } from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  Volume2, 
  ChevronRight, 
  AlertTriangle,
  Play,
  Flame,
  PhoneCall,
  UserCheck,
  Sparkles
} from 'lucide-react';
import { QUIZ_QUESTIONS, SECURITY_ARTICLES, INTERACTIVE_DRILLS } from '../data/mockData';
import { ElderSettings, InteractiveDrill } from '../types';

interface QuizHandbookViewProps {
  settings?: ElderSettings;
}

export const QuizHandbookView: React.FC<QuizHandbookViewProps> = ({ settings }) => {
  const [activeTab, setActiveTab] = useState<'drills' | 'handbook' | 'quiz'>('drills');
  
  // Interactive Drill State
  const [selectedDrill, setSelectedDrill] = useState<InteractiveDrill>(INTERACTIVE_DRILLS[0]);
  const [drillChosenOptionIdx, setDrillChosenOptionIdx] = useState<number | null>(null);

  // Quiz State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Voice player
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'vi-VN';
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    }
  };

  const handleSelectQuizOption = (optionId: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionId(optionId);
  };

  const handleSubmitQuizAnswer = () => {
    if (!selectedOptionId) return;
    setIsAnswerSubmitted(true);

    const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
    const chosen = currentQuestion.options.find(o => o.id === selectedOptionId);
    if (chosen?.isCorrect) {
      setScore(prev => prev + 1);
    }

    if (currentQuestion.elderTip) {
      speak(currentQuestion.elderTip);
    }
  };

  const handleNextQuizQuestion = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className={`p-4 space-y-4 pb-24 ${settings?.isElderMode ? 'text-base' : 'text-sm'}`}>
      {/* ------------------------------------------------------------- */}
      {/* 3 CORE TABS: THỰC HÀNH TÌNH HUỐNG / CẨM NANG / TRẮC NGHIỆM    */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-900 rounded-2xl border border-slate-800">
        <button
          onClick={() => setActiveTab('drills')}
          className={`py-2 px-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'drills'
              ? 'bg-rose-500 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Tình Huống Thực Chiến</span>
        </button>

        <button
          onClick={() => setActiveTab('handbook')}
          className={`py-2 px-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'handbook'
              ? 'bg-cyan-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Cẩm Nang 3 Không</span>
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`py-2 px-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'quiz'
              ? 'bg-emerald-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Trắc Nghiệm 2 Phút</span>
        </button>
      </div>

      {/* ============================================================= */}
      {/* 1. INTERACTIVE DRILLS (MÔ PHỎNG TÌNH HUỐNG THỰC TẾ)           */}
      {/* ============================================================= */}
      {activeTab === 'drills' && (
        <div className="space-y-4">
          <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Flame className="w-5 h-5 text-rose-400 animate-bounce" />
                  Phòng Luyện Tập Phản Xạ An Toàn Số
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Chọn 1 kịch bản để luyện tập phản xạ khi kẻ lừa đảo gọi điện thoại:
                </p>
              </div>
            </div>

            {/* Drill Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {INTERACTIVE_DRILLS.map((drill) => (
                <button
                  key={drill.id}
                  onClick={() => {
                    setSelectedDrill(drill);
                    setDrillChosenOptionIdx(null);
                  }}
                  className={`p-2.5 rounded-2xl border text-left transition-all ${
                    selectedDrill.id === drill.id
                      ? 'bg-rose-950/60 border-rose-500 text-rose-200 shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <span className="text-[10px] font-bold block opacity-75">{drill.category}</span>
                  <span className="text-xs font-bold line-clamp-1">{drill.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Drill Card */}
          <div className="p-4 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-rose-500/50 shadow-xl space-y-4">
            {/* Incoming Call Simulation UI */}
            <div className="p-3.5 rounded-2xl bg-rose-950/40 border border-rose-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400 font-bold text-xs">
                    <PhoneCall className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">{selectedDrill.callerName}</h3>
                    <span className="text-[10px] text-rose-300 font-mono">{selectedDrill.callerPhone}</span>
                  </div>
                </div>
                <button
                  onClick={() => speak(selectedDrill.initialDialogue)}
                  className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold flex items-center gap-1 border border-slate-700"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe giọng nói</span>
                </button>
              </div>

              {/* Dialogue Bubble */}
              <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-slate-200 leading-relaxed italic">
                "{selectedDrill.initialDialogue}"
              </div>
            </div>

            {/* Question prompt */}
            <div>
              <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                👉 Nếu là Bác, Bác sẽ làm gì trong tình huống này?
              </h3>
            </div>

            {/* Options */}
            <div className="space-y-2">
              {selectedDrill.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDrillChosenOptionIdx(idx);
                    speak(opt.elderAdvice);
                  }}
                  className={`w-full p-3 rounded-2xl border text-left text-xs font-semibold transition-all ${
                    drillChosenOptionIdx === idx
                      ? opt.isSafe
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                        : 'bg-rose-950/60 border-rose-500 text-rose-200'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-[10px]">
                      {idx + 1}
                    </span>
                    <span>{opt.text}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Feedback result */}
            {drillChosenOptionIdx !== null && (
              <div className={`p-3.5 rounded-2xl border-2 space-y-2 animate-in fade-in ${
                selectedDrill.options[drillChosenOptionIdx].isSafe
                  ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200'
                  : 'bg-rose-950/50 border-rose-500 text-rose-200'
              }`}>
                <div className="flex items-center gap-2 font-bold text-xs">
                  {selectedDrill.options[drillChosenOptionIdx].isSafe ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span>{selectedDrill.options[drillChosenOptionIdx].feedback}</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-5 h-5 text-rose-400" />
                      <span>{selectedDrill.options[drillChosenOptionIdx].feedback}</span>
                    </>
                  )}
                </div>

                <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-amber-300 flex items-start gap-2">
                  <Volume2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{selectedDrill.options[drillChosenOptionIdx].elderAdvice}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* 2. HANDBOOK: QUY TẮC 3 KHÔNG & 30 PHÚT VÀNG                    */}
      {/* ============================================================= */}
      {activeTab === 'handbook' && (
        <div className="space-y-4">
          {SECURITY_ARTICLES.map((art) => (
            <div key={art.id} className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white">{art.title}</h2>
                    <span className="text-[10px] text-cyan-400">{art.category} • {art.readTime}</span>
                  </div>
                </div>
                <button
                  onClick={() => speak(art.content.join('. '))}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs flex items-center gap-1 font-bold border border-slate-700"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Đọc to</span>
                </button>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {art.summary}
              </p>

              <div className="space-y-2 pt-1 border-t border-slate-800">
                {art.content.map((p, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    {p}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {art.keyRules.map((rule, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 font-semibold text-[11px] border border-cyan-500/20">
                    ✓ {rule}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ============================================================= */}
      {/* 3. TRẮC NGHIỆM AN TOÀN SỐ 2 PHÚT                              */}
      {/* ============================================================= */}
      {activeTab === 'quiz' && (
        <div className="space-y-4">
          {!quizFinished ? (
            <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400">
                  Câu hỏi {currentQuestionIndex + 1} / {QUIZ_QUESTIONS.length}
                </span>
                <span className="text-xs text-slate-400 font-semibold">
                  Điểm: {score}
                </span>
              </div>

              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-400 h-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>

              <h2 className="text-sm font-bold text-white leading-snug">
                {QUIZ_QUESTIONS[currentQuestionIndex].question}
              </h2>

              {/* Options */}
              <div className="space-y-2 pt-1">
                {QUIZ_QUESTIONS[currentQuestionIndex].options.map((opt) => {
                  let btnStyle = 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700';

                  if (selectedOptionId === opt.id) {
                    btnStyle = 'bg-cyan-950/60 border-cyan-400 text-cyan-200';
                  }

                  if (isAnswerSubmitted) {
                    if (opt.isCorrect) {
                      btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200';
                    } else if (selectedOptionId === opt.id) {
                      btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectQuizOption(opt.id)}
                      className={`w-full p-3 rounded-2xl border text-left text-xs font-medium transition-all ${btnStyle}`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center shrink-0 font-bold text-[10px]">
                          {opt.id.toUpperCase()}
                        </span>
                        <span>{opt.text}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Explanation when submitted */}
              {isAnswerSubmitted && (
                <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5 animate-in fade-in">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Giải thích chuyên gia:</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    {QUIZ_QUESTIONS[currentQuestionIndex].explanation}
                  </p>
                </div>
              )}

              {/* Action Button */}
              {!isAnswerSubmitted ? (
                <button
                  disabled={!selectedOptionId}
                  onClick={handleSubmitQuizAnswer}
                  className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs disabled:opacity-40 transition-all"
                >
                  XÁC NHẬN CÂU TRẢ LỜI
                </button>
              ) : (
                <button
                  onClick={handleNextQuizQuestion}
                  className="w-full py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all"
                >
                  CÂU HỎI TIẾP THEO
                </button>
              )}
            </div>
          ) : (
            <div className="p-6 rounded-3xl bg-slate-900 border border-emerald-500/50 text-center space-y-4">
              <Award className="w-16 h-16 text-amber-400 mx-auto animate-bounce" />
              <div>
                <h2 className="text-lg font-black text-white">HOÀN THÀNH BÀI KIỂM TRA!</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Bác đã trả lời đúng <strong>{score} / {QUIZ_QUESTIONS.length}</strong> câu hỏi.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300">
                🎉 Bác đã trang bị cho mình chiếc lá chắn vững chắc trước các chiêu trò lừa đảo qua mạng!
              </div>

              <button
                onClick={handleRestartQuiz}
                className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Làm Lại Bài Kiểm Tra</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
