import { motion } from 'framer-motion';
import { BookOpen, Target, Handshake, Award, ArrowRight } from 'lucide-react';
import AbstractBlobs from './AbstractBlobs';
import MeshGradient from './MeshGradient';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
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

export default function Benefits() {
  const benefits = [
    {
      icon: BookOpen,
      title: 'Expert Learning Support',
      desc: 'Get direct guidance from experienced tutors who understand your academic challenges and tailor their teaching to your learning style.',
      color: 'from-blue-400 to-blue-600',
      col: 'md:col-span-1',
    },
    {
      icon: Target,
      title: 'Career Development',
      desc: 'Beyond academics, develop soft skills, time management, and research abilities that will shape your professional future.',
      color: 'from-purple-400 to-purple-600',
      col: 'md:col-span-1',
    },
    {
      icon: Handshake,
      title: 'Community Network',
      desc: 'Build meaningful connections with peers and mentors who share your passion for learning and academic excellence.',
      color: 'from-emerald-400 to-emerald-600',
      col: 'md:col-span-1',
    },
    {
      icon: Award,
      title: 'Achievement Recognition',
      desc: 'Get your progress officially recognized with certificates and academic credits that boost your university profile.',
      color: 'from-amber-400 to-amber-600',
      col: 'md:col-span-1',
    },
  ];

  return (
    <section
      id="benefits"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-sky-50 relative overflow-hidden transition-colors duration-700"
    >
      {/* Visual Elements */}
      <AbstractBlobs count={3} opacity={0.10} />
      <MeshGradient opacity={0.05} />

      {/* Background Decoration */}
      <div className="absolute top-[-50%] left-[-20%] w-96 h-96 bg-cyan-100 rounded-full blur-3xl opacity-10 -z-10" />
      <div className="absolute bottom-0 right-[-10%] w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-15 -z-10" />

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
              Why Choose Us
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Comprehensive Benefits
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            More than just tutoring — a complete ecosystem for academic growth and personal development.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={item.col}
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group h-full p-8 rounded-2xl bg-white border border-slate-200 shadow-soft hover:shadow-soft-lg transition-all duration-300 relative overflow-hidden"
                >
                  {/* Icon Container */}
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${item.color} mb-6 text-white`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed min-h-[80px]">
                    {item.desc}
                  </p>

                  {/* Footer Action */}
                  <div className="flex items-center gap-2 text-primary-600 font-semibold mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>

                  {/* Gradient Bottom Border */}
                  <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-primary-600 to-transparent w-0 group-hover:w-full transition-all duration-500" />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Trust Badge Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-50 to-white rounded-2xl border border-primary-200 p-12 text-center"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-8">
            Trusted by Thousands of Students
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="text-4xl font-bold text-primary-600 mb-2">98%</p>
              <p className="text-slate-600">Student Satisfaction Rate</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary-600 mb-2">50K+</p>
              <p className="text-slate-600">Successful Sessions Completed</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary-600 mb-2">4.8★</p>
              <p className="text-slate-600">Average Tutor Rating</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}