import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../index.css';
import './styles/bottom-sheet.scss';
import './styles/animation.scss';

const BottomSheet = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openBottomSheet = () => setIsOpen(true);
  const closeBottomSheet = () => setIsOpen(false);

  // Варианты анимации для bottom sheet
  const sheetVariants = {
    hidden: { y: "100%" },
    visible: { 
      y: 0,
      transition: { 
        type: "spring", 
        damping: 22, 
        stiffness: 230 
      } 
    },
    exit: { 
      y: "100%",
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Варианты анимации для overlay
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.3,
        ease: "easeInOut"
      } 
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  return (
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
          
          <AnimatePresence>
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
                  
                  <button className="bottom-sheet-close" onClick={closeBottomSheet}>
                    <span className="bottom-sheet-close-icon">×</span>
                  </button>
                  
                  <div className="bottom-sheet-header">
                    <h2 className="bottom-sheet-title">Заголовок</h2>
                    <h3 className="bottom-sheet-subtitle">Подзаголовок</h3>
                  </div>
                  
                  <div className="bottom-sheet-content">
                    <div style={{ padding: '0 24px 24px', color: '#333' }}>
                      <p>Это содержимое Bottom Sheet. Здесь может быть любая информация или интерактивные элементы.</p>
                      <p>Вы можете закрыть этот Bottom Sheet, нажав на одну из кнопок внизу, кликнув по затемненной области или просто смахнув его вниз.</p>
                    </div>
                  </div>
                  
                  <div className="bottom-sheet-footer">
                    <button 
                      className="btn-root-119-18-1-1 btn-primary-a30-18-1-1 btn-medium-fdc-18-1-1 btn-typeButtonReset-268-18-1-1" 
                      onClick={closeBottomSheet}
                    >
                      <span className="btn-text-398-18-1-1">Подтвердить</span>
                    </button>
                    
                    <button 
                      className="btn-root-119-18-1-1 btn-secondary-f3f-18-1-1 btn-medium-fdc-18-1-1 btn-typeButtonReset-268-18-1-1" 
                      onClick={closeBottomSheet}
                    >
                      <span className="btn-text-398-18-1-1">Отменить</span>
                    </button>
                    
                    <button 
                      className="btn-root-119-18-1-1 btn-tertiary-a1c-18-1-1 btn-medium-fdc-18-1-1 btn-typeButtonReset-268-18-1-1" 
                      onClick={closeBottomSheet}
                    >
                      <span className="btn-text-398-18-1-1">Отложить</span>
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default BottomSheet; 