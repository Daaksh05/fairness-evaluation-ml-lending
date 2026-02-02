import { motion } from 'framer-motion';

const Section = ({ children, id, className = "" }) => {
  return (
    <motion.section
      id={id}
      className={`container ${className}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
};

export default Section;
