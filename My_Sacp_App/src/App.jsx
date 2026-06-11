import { useState } from 'react';
import { motion } from 'framer-motion';
import RoleToggle from './components/RoleToggle';
import FormInput from './components/FormInput';
import IllustrationSection from './components/IllustrationSection';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { y: 15, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.35, ease: 'easeOut' } }
};

export default function App() {
  const [activeRole, setActiveRole] = useState('Student');

  return (
    <div className="app-container">
      {/* Left Column: Form */}
      <div className="form-column">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={activeRole} // Re-runs entry animation gracefully when switching tabs
          className="form-content-wrapper"
        >
          {/* Brand Header */}
          <motion.div variants={itemVariants} className="brand">
            <span className="brand-icon">🎓</span> <strong>SACP</strong>
          </motion.div>

          <motion.h1 variants={itemVariants}>Create an Account</motion.h1>
          <motion.p variants={itemVariants} className="subtitle">
            Join the Smart Academic Communication Platform workspace.
          </motion.p>

          {/* Tab Switcher */}
          <motion.div variants={itemVariants}>
            <RoleToggle activeRole={activeRole} setActiveRole={setActiveRole} />
          </motion.div>

          {/* Conditional Form Fields based on Selected Role */}
          <div className="form-fields-container">
            {activeRole === 'Administrator' && (
              <>
                <FormInput label="Username" placeholder="e.g. admin_jdoe" />
                <FormInput label="Organization Name" placeholder="e.g. University of Science" />
                <FormInput label="Email Address" type="email" placeholder="admin@university.edu" />
              </>
            )}

            {activeRole === 'Faculty' && (
              <>
                <div className="form-row">
                  <FormInput label="Username" placeholder="Enter username" />
                  <FormInput label="Email Address" type="email" placeholder="academic@university.edu" />
                </div>
                <div className="form-row">
                  <FormInput label="Department" placeholder="Select Department" />
                  <FormInput label="Role Title" placeholder="e.g. Associate Professor" optional />
                </div>
                <FormInput label="Access Code (Given by Admin)" placeholder="Enter alphanumeric code" />
              </>
            )}

            {activeRole === 'Student' && (
              <>
                <FormInput label="Username" placeholder="Name RollNo" />
                <div className="form-row">
                  <FormInput label="Degree / Certificate" placeholder="Select program..." />
                  <FormInput label="Registration Number" placeholder="e.g. STU-2024-082" />
                </div>
                <FormInput label="Institutional Email" type="email" placeholder="student@university.edu" />
              </>
            )}

            {/* Shared Password Fields for all roles */}
            <div className="form-row">
              <FormInput label="Password" type="password" placeholder="••••••••" />
              <FormInput label="Confirm Password" type="password" placeholder="••••••••" />
            </div>
          </div>

          {/* Dynamic Action Button Text */}
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="submit-button"
          >
            Create {activeRole} Account &rarr;
          </motion.button>

          <motion.p variants={itemVariants} className="signin-prompt">
            Already have an account? <a href="#signin">Sign in</a>
          </motion.p>

          <motion.p variants={itemVariants} className="legal-text">
            By registering, you agree to the SACP Terms of Service and Privacy Policy.
          </motion.p>
        </motion.div>
      </div>

      {/* Right Column: Dynamic Full-Bleed Section */}
      <div className="visual-column">
        <IllustrationSection />
      </div>
    </div>
  );
}