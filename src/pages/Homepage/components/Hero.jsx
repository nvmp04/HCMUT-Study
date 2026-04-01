import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../features/auth/hooks/useAuth';
import { ArrowRight, BookOpen, Calendar, Users } from 'lucide-react';
import AbstractBlobs from './AbstractBlobs';
import MeshGradient from './MeshGradient';

export default function Hero() {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-white via-blue-50 to-cyan-50 overflow-hidden transition-colors duration-700">
      {/* Visual Elements */}
      <AbstractBlobs count={4} opacity={0.12} />
      <MeshGradient opacity={0.06} />

      {/* Background Gradient Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-br from-cyan-200 to-blue-100 rounded-full blur-3xl opacity-20"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-200 to-cyan-100 rounded-full blur-3xl opacity-15"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-block"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-200 rounded-full w-fit">
                <span className="w-2 h-2 bg-primary-600 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-primary-700">
                  Welcome to Premium Tutoring
                </span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="block text-slate-900">Master Your Major</span>
                <span className="block bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                  with 1-on-1 Mentorship
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-slate-600 leading-relaxed max-w-md"
            >
              Connect with verified tutors aligned with your university schedule. Get personalized guidance, build meaningful relationships, and accelerate your academic growth.
            </motion.p>

            {/* Smart Search Bar */}
            <motion.div
              variants={itemVariants}
              className="space-y-3"
            >
              <div className="flex gap-3 bg-white p-2 rounded-2xl shadow-soft border border-slate-100 hover:shadow-soft-lg transition-shadow duration-300">
                <input
                  type="text"
                  placeholder="What subject do you need help with?"
                  className="flex-1 px-4 py-2 bg-transparent text-slate-900 placeholder-slate-400 outline-none text-sm"
                />
                <button
                  onClick={() => navigate('/student/schedule')}
                  className="px-6 py-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold rounded-xl hover:shadow-soft-lg transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
                >
                  Search
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-slate-500">Try: "Mathematics", "Physics", "Programming"</p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex gap-4 flex-wrap pt-4"
            >
              {!auth.token && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/login')}
                    className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold rounded-xl shadow-soft hover:shadow-soft-lg transition-all duration-300 flex items-center gap-2"
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 border-2 border-primary-600 text-primary-600 font-semibold rounded-xl hover:bg-primary-50 transition-colors duration-300"
                  >
                    Learn More
                  </motion.button>
                </>
              )}
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 pt-4"
            >
              <div className="space-y-1">
                <p className="text-2xl font-bold text-slate-900">500+</p>
                <p className="text-sm text-slate-600">Verified Tutors</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-slate-900">2K+</p>
                <p className="text-sm text-slate-600">Active Students</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-slate-900">95%</p>
                <p className="text-sm text-slate-600">Success Rate</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Floating UI Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-full hidden lg:flex items-center justify-center"
          >
            {/* Main Card - Tutor Profile */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute top-0 left-0 w-72 bg-white rounded-3xl p-6 shadow-soft-lg border border-slate-100"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-2xl font-bold">
                  SA
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Sarah Anderson</h3>
                  <p className="text-sm text-slate-600">Mathematics Expert</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm text-slate-700">Available Now</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-primary-600">★★★★★</span>
                  <span className="text-sm text-slate-600">4.9 rating</span>
                </div>
              </div>
            </motion.div>

            {/* Schedule Card */}
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 6, repeat: Infinity, delay: 0.5 }}
              className="absolute top-64 right-0 w-72 bg-white rounded-3xl p-6 shadow-soft-lg border border-slate-100"
            >
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-primary-600" />
                <h3 className="font-bold text-slate-900">Next Session</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-600">Tuesday, 2:00 PM</p>
                  <p className="font-semibold text-slate-900">Calculus Review</p>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-gradient-to-r from-primary-600 to-primary-400" />
                </div>
                <p className="text-xs text-slate-600">45 minutes remaining</p>
              </div>
            </motion.div>

            {/* Features Card */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 bg-white rounded-3xl p-6 shadow-soft-lg border border-slate-100"
            >
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Smart Matching</p>
                    <p className="text-xs text-slate-600">AI-powered tutor recommendations</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <p className="text-sm text-slate-500 mb-2">Scroll to explore</p>
        <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center p-2">
          <div className="w-1 h-2 bg-slate-400 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}