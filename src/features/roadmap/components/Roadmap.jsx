import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Sparkles, Clock, Target, CheckCircle2, ChevronDown, BookOpen, Lightbulb } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchAPI } from '../../../utils/fetchAPI';
import { LoadingModal } from '../../../components/LoadingModal';
import { TutorList } from './TutorList';
import { API_ENDPOINTS, buildAPIUrl } from '../../../config/api.config';

// --- Animation Variants ---
const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

function Roadmap() {
  const url = buildAPIUrl(API_ENDPOINTS.ROADMAP.GET_ROADMAP);
  const { data, isLoading } = useQuery({
    queryKey: ['roadmap'],
    queryFn: async () => fetchAPI(url, 'GET', null, true)
  });

  const [expandedStage, setExpandedStage] = useState(null);

  if (isLoading) return <LoadingModal />;

  if (!data?.roadmap) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-white/[0.05] rounded-lg mt-8">
        <div className="w-16 h-16 bg-white/[0.02] rounded-full flex items-center justify-center mb-4 border border-white/[0.05]">
          <Sparkles className="w-8 h-8 text-slate-600" />
        </div>
        <h2 className="text-xl font-bold text-slate-300 mb-2 uppercase tracking-tight">Chưa có lộ trình học tập</h2>
        <p className="text-slate-500 text-sm max-w-xs text-center">
          Bắt đầu hành trình bằng cách tạo lộ trình cá nhân hóa bởi AI ngay phía trên.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-10 mt-8">
      <motion.div variants={itemVariants} className="bg-white/[0.02] border border-white/[0.05] rounded-md p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Target size={120} />
        </div>
        
        <div className="relative z-10">
          <h1 className="text-2xl font-black text-slate-100 uppercase tracking-tight mb-6">
            {data.roadmap.title}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-sm bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                <Target size={18} className="text-indigo-400" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Thời gian hoàn thành</p>
                <p className="text-lg font-mono text-slate-200">{data.roadmap.overview.totalDuration}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-sm bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <Clock size={18} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Cường độ học tập</p>
                <p className="text-lg font-mono text-slate-200">{data.roadmap.overview.hoursPerWeek} / tuần</p>
              </div>
            </div>
          </div>

          <div className="bg-white/[0.01] border border-white/[0.03] rounded p-5">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <Calendar size={14} className="text-blue-500/60" /> Tóm tắt tiến trình
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.roadmap.overallTimeline.map((item, index) => (
                <div key={index} className="flex items-start gap-3 text-[12px] text-slate-400 italic">
                   <div className="w-1 h-1 rounded-full bg-blue-500/50 mt-1.5 shrink-0" />
                   {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="space-y-6">
        <div className="flex items-center gap-3 px-2">
          <BookOpen size={18} className="text-indigo-500" />
          <h2 className="text-lg font-black text-slate-200 uppercase tracking-widest">Các giai đoạn học tập</h2>
        </div>

        {data.roadmap.stages.map((stage) => (
          <motion.div key={stage.id} variants={itemVariants} className="bg-white/[0.01] border border-white/[0.05] rounded-md overflow-hidden transition-all hover:border-white/[0.1]">
            <div className="p-6 flex flex-col md:flex-row gap-6 items-start">
              <div className="w-12 h-12 bg-slate-800 border border-white/[0.05] flex items-center justify-center text-lg font-mono font-bold text-indigo-400 shrink-0">
                {String(stage.id).padStart(2, '0')}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-200 uppercase tracking-tight">{stage.name}</h3>
                    <p className="text-[11px] font-mono text-slate-500 mt-1 uppercase tracking-widest italic">{stage.duration}</p>
                  </div>
                  <button 
                    onClick={() => setExpandedStage(expandedStage === stage.id ? null : stage.id)}
                    className="p-2 hover:bg-white/[0.05] rounded-full transition-colors"
                  >
                    <ChevronDown size={20} className={`text-slate-500 transition-transform ${expandedStage === stage.id ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {stage.objectives.map((obj, i) => (
                    <div key={i} className="flex items-start gap-2 text-[11px] text-emerald-500/80 bg-emerald-500/[0.03] border border-emerald-500/10 p-2 rounded-sm font-bold uppercase tracking-tight">
                      <CheckCircle2 size={12} className="mt-0.5 shrink-0" />
                      <span>{obj}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <AnimatePresence>
              {expandedStage === stage.id && (
                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-white/[0.005] border-t border-white/[0.03]">
                  <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div>
                      <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Nội dung học tập</h4>
                      <ul className="space-y-3">
                        {stage.topics.map((topic, i) => (
                          <li key={i} className="text-sm text-slate-400 flex items-start gap-3">
                             <div className="w-1 h-1 bg-indigo-500/40 rounded-full mt-2 shrink-0" />
                             {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Tài liệu tham khảo</h4>
                      <ul className="space-y-3">
                        {stage.resources?.map((res, i) => (
                          <li key={i} className="text-sm text-indigo-400 hover:underline cursor-pointer flex items-start gap-3">
                             <div className="w-1 h-1 bg-slate-700 rounded-full mt-2 shrink-0" />
                             {res}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-indigo-500/[0.02] border border-indigo-500/10 p-6 rounded-sm">
                      <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">Dự án thực hành</h4>
                      <p className="text-sm text-slate-300 font-bold mb-2 italic">"{stage.project.title || stage.project}"</p>
                      <p className="text-xs text-slate-500 leading-relaxed">Áp dụng kiến thức vào thực tế để củng cố kỹ năng đã học.</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <motion.div variants={itemVariants} className="bg-amber-500/[0.01] border border-amber-500/10 rounded-md p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-2 bg-amber-500/10 rounded border border-amber-500/20">
            <Lightbulb size={20} className="text-amber-500" />
          </div>
          <h2 className="text-lg font-black text-slate-200 uppercase tracking-widest">Lời khuyên</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.roadmap.tips.map((tip, index) => (
            <div key={index} className="text-[11px] text-slate-400 p-4 border border-white/[0.03] bg-white/[0.01] uppercase tracking-wide leading-relaxed">
              {tip}
            </div>
          ))}
        </div>
      </motion.div>

        
      <TutorList tutorsId={data.roadmap.tutors}/>
      
    </div>
  );
}

export default Roadmap;