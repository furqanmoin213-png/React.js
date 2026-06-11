import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } }
};

export default function FormInput({ label, type = 'text', placeholder, optional = false }) {
  return (
    <motion.div variants={itemVariants} className="input-group">
      <label>
        {label} {optional && <span className="optional">(Optional)</span>}
      </label>
      <input type={type} placeholder={placeholder} />
    </motion.div>
  );
}