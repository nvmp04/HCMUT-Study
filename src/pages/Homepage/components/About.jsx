import { motion } from 'framer-motion';
import { CheckCircle, Zap, Shield, BookOpen } from 'lucide-react';
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

export default function About() {
  const features = [
    {
      icon: CheckCircle,
      title: 'Verified Tutors',
      description: 'Carefully vetted educators with proven academic excellence and mentoring expertise.',
      color: 'from-emerald-400 to-emerald-600',
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Safe, transparent transactions with multiple payment methods and buyer protection.',
      color: 'from-blue-400 to-blue-600',
    },
    {
      icon: Zap,
      title: 'University-Sync',
      description: 'Seamlessly align sessions with your university schedule and academic calendar.',
      color: 'from-amber-400 to-amber-600',
    },
    {
      icon: BookOpen,
      title: 'Quality Content',
      description: 'Structured learning materials and personalized study plans tailored to your needs.',
      color: 'from-purple-400 to-purple-600',
    },
  ];

  return (
    <section
      id="about"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden transition-colors duration-700"
    >
      {/* Visual Elements */}
      <AbstractBlobs count={2} opacity={0.08} />
      <GridPattern opacity={0.03} size={50} />

      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-50 rounded-full blur-3xl opacity-40 -z-10" />

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
              How It Works
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Our Mission & Values
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We're committed to transforming education by connecting passionate learners with expert mentors, fostering meaningful relationships that drive academic success.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="h-full p-8 rounded-2xl bg-gradient-to-br from-white to-slate-50 border border-slate-200 hover:border-primary-200 shadow-soft hover:shadow-soft-lg transition-all duration-300">
                  {/* Icon Background */}
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-6`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Hover Effect Line */}
                  <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary-600 to-primary-400 rounded-full w-0 group-hover:w-full transition-all duration-300" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 pt-20 border-t border-slate-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h4 className="text-3xl font-bold text-primary-600 mb-2">Custom Matching</h4>
              <p className="text-slate-600">Our AI algorithm pairs you with the perfect tutor based on your learning style and academic goals.</p>
            </div>
            <div className="text-center">
              <h4 className="text-3xl font-bold text-primary-600 mb-2">Flexible Scheduling</h4>
              <p className="text-slate-600">Book sessions around your university timetable with our intelligent availability matching system.</p>
            </div>
            <div className="text-center">
              <h4 className="text-3xl font-bold text-primary-600 mb-2">Progress Tracking</h4>
              <p className="text-slate-600">Monitor your growth with detailed analytics and personalized feedback from your tutor.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}