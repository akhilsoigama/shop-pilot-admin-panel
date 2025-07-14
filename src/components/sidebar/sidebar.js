'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Home,
  History,
} from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AddchartIcon from '@mui/icons-material/Addchart';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Button } from '@/components/ui/button';
import {
  sidebarVariants,
  mobileDrawerVariants,
  itemVariants,
  logoScaleVariants
} from '../motion/Motion';

const navItems = [
  { label: 'Home', icon: <Home fontSize="small" /> },
  { label: 'Add Product', icon: <AddIcon fontSize="small" /> },
  { label: 'Orders', icon: <LocalShippingIcon fontSize="small" /> },
  { label: 'Analytics', icon: <AddchartIcon fontSize="small" /> },
  { label: 'Mange Users', icon: <ManageAccountsIcon fontSize="small" /> },
  { label: 'History', icon: <History fontSize="small" /> },
];

export default function Sidebar() {
  const [isMobile, setIsMobile] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) setCollapsed(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const DesktopSidebar = () => (
    <motion.aside
      className="fixed left-0 top-0 h-screen border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900 z-40"
      initial={false}
      animate={collapsed ? 'collapsed' : 'open'}
      variants={sidebarVariants}
    >
      <div className="flex items-center px-4 py-4 h-16">
        <motion.div
          variants={logoScaleVariants}
          animate={collapsed ? 'collapsed' : 'open'}
          className="origin-left"
        >
          <span className="text-xl font-bold text-gray-800 dark:text-white">
            Shop<span className="text-red-500">Pilot</span>
          </span>
        </motion.div>
      </div>

      {/* Arrow Toggle */}
      <div
        className="absolute top-16 -right-3 hidden lg:flex items-center justify-center w-6 h-6 rounded-full bg-black text-white cursor-pointer shadow-md z-50"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronRightIcon fontSize="small" /> : <ChevronLeftIcon fontSize="small" />}
      </div>

      <nav className="space-y-1 mt-4">
        {navItems.map((item, index) => (
          <motion.a
            key={item.label}
            href="#"
            className="flex items-center gap-4 px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
            variants={itemVariants}
            custom={index}
            initial="hidden"
            animate="visible"
          >
            <span>{item.icon}</span>
            {!collapsed && <span className="text-sm">{item.label}</span>}
          </motion.a>
        ))}
      </nav>
    </motion.aside>
  )


  const MobileSidebar = () => (
    <AnimatePresence>
      {drawerOpen && (
        <motion.div
          className="fixed inset-y-0 left-0 z-50"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={mobileDrawerVariants}
        >
          <motion.div
            className="h-full bg-white dark:bg-zinc-900 rounded-r-lg shadow-xl px-4 py-6"
            style={{ minWidth: '12rem', maxWidth: '40vw' }}
            onClick={(e) => e.stopPropagation()}
            variants={mobileDrawerVariants}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xl font-bold text-gray-800 dark:text-white">
                Shop<span className="text-red-500">Pilot</span>
              </span>
              <Button variant="ghost" size="icon" onClick={() => setDrawerOpen(false)}>
                <CloseIcon />
              </Button>
            </div>

            <nav className="space-y-2">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href="#"
                  className="flex items-center gap-4 px-2 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                >
                  <span>{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                </motion.a>
              ))}
            </nav>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {isMobile ? (
        <>
          <div className="fixed top-4 left-4 z-50">
            <Button variant="ghost" size="icon" onClick={openDrawer}>
              <MenuIcon />
            </Button>
          </div>
          <MobileSidebar />
        </>
      ) : (
        <DesktopSidebar />
      )}
    </>
  );
}
