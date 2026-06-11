import { motion } from 'framer-motion';

const roles = ['Administrator', 'Faculty', 'Student'];

export default function RoleToggle({ activeRole, setActiveRole }) {
  return (
    <div className="role-toggle-container">
      {roles.map((role) => (
        <button
          key={role}
          type="button"
          className={`role-btn ${activeRole === role ? 'active' : ''}`}
          onClick={() => setActiveRole(role)}
        >
          {role}
          {activeRole === role && (
            <motion.div
              layoutId="active-pill"
              className="active-pill-bg"
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}