
export const sidebarVariants = {
  open: {
    width: 240,
    transition: { type: 'spring', stiffness: 160, damping: 20 },
  },
  collapsed: {
    width: 72,
    transition: { type: 'spring', stiffness: 160, damping: 20 },
  },
};

export const mobileDrawerVariants = {
  hidden: {
    x: '-100%',
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 200, damping: 24 },
  },
  exit: {
    x: '-100%',
    opacity: 0,
    transition: { type: 'spring', stiffness: 200, damping: 22 },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.07 },
  }),
};

export const logoScaleVariants = {
  collapsed: {
    scale: 0.5,
    transition: { duration: 0.3, ease: 'easeInOut' }
  },
  open: {
    scale: 1,
    transition: { duration: 0.3, ease: 'easeInOut' }
  }
};

