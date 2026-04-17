import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Sparkles, BrainCircuit } from "lucide-react";
import GenerateModal from "../../features/roadmap/components/GenerateModal";
import Roadmap from '../../features/roadmap/components/Roadmap';

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const headerVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

function StudentAIpage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-400 p-10 md:pl-10 font-sans selection:bg-emerald-500/30 overflow-x-hidden relative">
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-500/[0.03] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-5%] w-[400px] h-[400px] bg-emerald-500/[0.02] blur-[100px] rounded-full pointer-events-none" />

      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        animate="visible"
        className="relative z-10 max-w-[1300px] mx-auto py-8 md:py-12"
      >
        {/* Header Section */}
        <motion.div variants={headerVariants} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-black text-slate-100 tracking-tight uppercase">
                Lộ trình học tập cá nhân hóa
              </h1>
            </div>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.15em] flex items-center gap-2">
              AI-Personalized Roadmap (CSE Faculty Optimized)
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(79, 70, 229, 0.2)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-md font-black text-[11px] uppercase tracking-widest flex items-center gap-3 transition-all border border-indigo-400/30 shadow-xl"
          >
            <Plus className="w-4 h-4" />
            Tạo Lộ Trình Mới
          </motion.button>
        </motion.div>

        {/* Roadmap Content */}
        <motion.div variants={headerVariants} className="bg-white/[0.01] border border-white/[0.05] rounded-md p-1">
           <Roadmap />
        </motion.div>
      </motion.div>

      <GenerateModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}

export default StudentAIpage;