import { motion } from 'framer-motion';
import {
  Zap,
  Video,
  PenTool,
  BarChart3,
  ArrowRight,
  Check,
} from 'lucide-react';
import { useState } from 'react';
import AbstractBlobs from './AbstractBlobs';
import GridPattern from './GridPattern';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function Features() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const features = [
    {
      icon: Zap,
      title: 'Smart Matching',
      desc: 'AI-powered algorithm pairs you with the perfect tutor based on your learning style, goals, and schedule preferences.',
      benefits: ['Personalized matches', 'Real-time availability', 'Skill alignment'],
      color: 'from-amber-400 to-amber-600',
    },
    {
      icon: Video,
      title: 'Instant Video Classroom',
      desc: 'High-quality HD video sessions with screen sharing, chat, and real-time collaboration tools built-in.',
      benefits: ['Crystal-clear video', 'Screen sharing', 'Session recording'],
      color: 'from-emerald-400 to-emerald-600',
    },
    {
      icon: PenTool,
      title: 'Collaborative Whiteboard',
      desc: 'Interactive digital whiteboard for drawing, writing equations, and working through problems together in real-time.',
      benefits: ['Live annotations', 'Infinite canvas', 'Export notes'],
      color: 'from-blue-400 to-blue-600',
    },
    {
      icon: BarChart3,
      title: 'Session Recording',
      desc: 'Automatically recorded sessions allow you to review concepts anytime, anywhere at your own pace.',
      benefits: ['Full HD recording', 'Lifetime access', 'Searchable transcripts'],
      color: 'from-purple-400 to-purple-600',
    },
  ];

  return (
    <section
      id="features"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden transition-colors duration-700"
    >
      {/* Visual Elements */}
      <AbstractBlobs count={3} opacity={0.12} />
      <GridPattern opacity={0.04} size={45} />

      {/* Soft Blue Blobs in Corners */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-8 -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-100 rounded-full blur-3xl opacity-10 -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-primary-50 border border-primary-200 rounded-full text-sm font-semibold text-primary-700">
              Powerful Tools
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Everything You Need to Learn Better
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Advanced features designed to make tutoring sessions productive, engaging, and effective.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="group h-full p-8 rounded-2xl bg-gradient-to-br from-white to-slate-50 border border-slate-200 hover:border-primary-300 shadow-soft hover:shadow-soft-lg transition-all duration-300 relative overflow-hidden cursor-pointer">
                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} mb-6 text-white group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Number */}
                  <div className="absolute top-6 right-6 text-4xl font-bold text-slate-100 group-hover:text-primary-100 transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 mb-6 min-h-[60px] leading-relaxed">
                    {feature.desc}
                  </p>

                  {/* Benefits - Shown on hover */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: isHovered ? 1 : 0,
                      height: isHovered ? 'auto' : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2 mb-6 overflow-hidden"
                  >
                    {feature.benefits.map((benefit, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-sm text-primary-700"
                      >
                        <Check className="w-4 h-4 flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </motion.div>

                  {/* Learn More Link */}
                  <div className="flex items-center gap-2 text-primary-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm">Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>

                  {/* Bottom Border Animation */}
                  <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-primary-600 to-transparent w-0 group-hover:w-full transition-all duration-500" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-600 to-primary-500 rounded-3xl p-12 md:p-16 text-center text-white"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Learning?
          </h3>
          <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are achieving their academic goals with personalized mentorship.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-white text-primary-600 font-bold rounded-xl shadow-soft-lg hover:shadow-soft-xl transition-all duration-300 inline-flex items-center gap-2"
          >
            Start Your Journey Today
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}