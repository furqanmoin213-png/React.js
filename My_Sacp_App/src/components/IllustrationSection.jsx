import { motion } from 'framer-motion';
import illustrationImg from '../assets/illustration.png'; // Make sure to place your graphic here

export default function IllustrationSection() {
  return (
    <div className="illustration-wrapper">
      {/* Dynamic floating background element */}
      <motion.div 
        className="bg-blob"
        animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Main static/subtle entry for graphic */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="main-graphic"
      >
        <img src={illustrationImg} alt="Workspace Illustration" />
      </motion.div>
    </div>
  );
}