import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getDurationInMs, msToSeconds } from './scripts/animation.js';
import '../index.css';
import './styles/component.scss';
import './styles/animation.scss';
import tokens from './tokens/utils/tokenUtils';
import { useTokens } from './context/TokenContext';

const Component = ({
  title = 'Заголовок',
  subtitle = 'Подзаголовок',
  content = 'Это содержимое Bottom Sheet. Здесь может быть любая информация или интерактивные элементы. Вы можете закрыть этот Bottom Sheet, нажав на кнопку подтверждения, кликнув по затемненной области или просто смахнув его вниз.',
}) => {
  const { tokenValues: customTokens } = useTokens();
  const [isOpen, setIsOpen] = useState(false);
  const [isClickLocked, setIsClickLocked] = useState(false);
  const buttonTimeoutRef = useRef(null);
  
  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (buttonTimeoutRef.current) {
        clearTimeout(buttonTimeoutRef.current);
      }
    };
  }, []);

  // Safe duration conversion with fallback
  const getDuration = (tokenName, fallback = 0.3) => {
    const ms = getDurationInMs(tokenName, fallback * 1000);
    return msToSeconds(ms);
  };

  // Sheet animation variants
  const sheetVariants = {
    hidden: { y: "100%" },
    visible: { 
      y: 0,
      transition: { 
        duration: getDuration('BOTTOM_SHEET_ENTER_DURATION', 0.2),
        ease: "easeOut"
      } 
    },
    exit: { 
      y: "100%",
      transition: { 
        duration: getDuration('BOTTOM_SHEET_EXIT_DURATION', 0.1),
        ease: "easeOut"
      }
    }
  };

  // Overlay animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: getDuration('BOTTOM_SHEET_OVERLAY_ENTER_DURATION', 0.3),
        ease: "ease"
      } 
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: getDuration('BOTTOM_SHEET_OVERLAY_EXIT_DURATION', 0.25),
        ease: "easeOut"
      }
    }
  };

  const handleButtonClick = (action) => {
    // Prevent rapid clicking (internally only, no visual change)
    if (isClickLocked) return;
    
    // Lock clicks temporarily
    setIsClickLocked(true);
    
    // Perform action (open or close)
    if (action === 'open') {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
    
    // Calculate safe timeout duration - the longest animation plus buffer
    const maxDuration = Math.max(
      getDuration('BOTTOM_SHEET_ENTER_DURATION', 0.2),
      getDuration('BOTTOM_SHEET_EXIT_DURATION', 0.1),
      getDuration('BOTTOM_SHEET_OVERLAY_ENTER_DURATION', 0.3),
      getDuration('BOTTOM_SHEET_OVERLAY_EXIT_DURATION', 0.25)
    ) * 1000 + 500; // Add 500ms buffer
    
    // Clear any existing timeouts
    if (buttonTimeoutRef.current) {
      clearTimeout(buttonTimeoutRef.current);
    }
    
    // Set timeout to unlock clicks
    buttonTimeoutRef.current = setTimeout(() => {
      setIsClickLocked(false);
    }, maxDuration);
  };

  const openBottomSheet = () => handleButtonClick('open');
  const closeBottomSheet = () => handleButtonClick('close');

  return (
    <div className="_Gq5_ ql7Up" data-e2e-id="bottom-sheet-base">
      <div className="f_vB6">
        <div className="component-page">
          <h1>Bottom Sheet</h1>
          <div className="component-demo">
            <div className="component-demo-inner" style={{ textAlign: 'center', position: 'relative' }}>
              <button 
                className="btn-root-119-18-1-1 btn-primary-a30-18-1-1 btn-medium-fdc-18-1-1 btn-typeButtonReset-268-18-1-1"
                onClick={openBottomSheet}
              >
                <span className="btn-text-398-18-1-1">Открыть Bottom Sheet</span>
              </button>
              
              <AnimatePresence mode="wait">
                {isOpen && (
                  <div className="bottom-sheet-container in-demo">
                    <motion.div 
                      className="bottom-sheet-overlay"
                      variants={overlayVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      onClick={closeBottomSheet}
                    />
                    
                    <motion.div 
                      className="bottom-sheet"
                      variants={sheetVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      drag="y"
                      dragConstraints={{ top: 0 }}
                      dragElastic={0.1}
                      onDragEnd={(_, info) => {
                        if (info.offset.y > 100) {
                          closeBottomSheet();
                        }
                      }}
                    >
                      <div className="bottom-sheet-handle" />
                      
                      <div className="bottom-sheet-header">
                        <h2 className="bottom-sheet-title">{title}</h2>
                        <h3 className="bottom-sheet-subtitle">{subtitle}</h3>
                      </div>
                      
                      <div className="bottom-sheet-content">
                        <div style={{ padding: '0 24px 24px', color: '#333' }}>
                          {content}
                        </div>
                      </div>
                      
                      <div className="bottom-sheet-footer">
                        <button 
                          className="btn-root-119-18-1-1 btn-primary-a30-18-1-1 btn-medium-fdc-18-1-1 btn-typeButtonReset-268-18-1-1" 
                          onClick={closeBottomSheet}
                          style={{ margin: '0 auto' }}
                        >
                          <span className="btn-text-398-18-1-1">Подтвердить</span>
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Component;
