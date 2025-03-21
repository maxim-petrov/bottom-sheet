import React, { useState } from 'react';
import { motion, AnimatePresence, easeInOut, easeOut } from 'framer-motion';
import '../index.css';
import './styles/bottom-sheet.scss';
import './styles/animation.scss';
import tokens from './tokens/utils/tokenUtils';

const BottomSheet = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openBottomSheet = () => setIsOpen(true);
  const closeBottomSheet = () => setIsOpen(false);
  
  // Запасная функция для преобразования длительности
  const msToSeconds = (duration) => {
    if (typeof duration === 'string') {
      const match = duration.match(/^(\d+)ms$/);
      if (match && match[1]) {
        return parseFloat(match[1]) / 1000;
      }
    }
    return 0.3; // Значение по умолчанию если ничего не сработало
  };
  
  // Безопасное использование функции преобразования времени
  const convertDuration = (duration) => {
    try {
      if (tokens.durationToSeconds && typeof tokens.durationToSeconds === 'function') {
        return tokens.durationToSeconds(duration);
      }
      return msToSeconds(duration);
    } catch (e) {
      console.error('Error converting duration:', e);
      return 0.3; // Значение по умолчанию
    }
  };

  // Варианты анимации для bottom sheet
  const sheetVariants = {
    hidden: { y: "100%" },
    visible: { 
      y: 0,
      transition: { 
        duration: convertDuration(tokens.BOTTOM_SHEET_ENTER_DURATION),
        ease: easeInOut
      } 
    },
    exit: { 
      y: "100%",
      transition: { 
        duration: convertDuration(tokens.BOTTOM_SHEET_EXIT_DURATION),
        ease: easeOut
      }
    }
  };

  // Варианты анимации для overlay
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: convertDuration(tokens.BOTTOM_SHEET_OVERLAY_ENTER_DURATION),
        ease: easeInOut
      } 
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: convertDuration(tokens.BOTTOM_SHEET_OVERLAY_EXIT_DURATION),
        ease: easeOut
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
                  
                  <div className="bottom-sheet-header">
                    <h2 className="bottom-sheet-title">Заголовок</h2>
                    <h3 className="bottom-sheet-subtitle">Подзаголовок</h3>
                  </div>
                  
                  <div className="bottom-sheet-content">
                    <div style={{ padding: '0 24px 24px', color: '#333' }}>
                      <p>Это содержимое Bottom Sheet. Здесь может быть любая информация или интерактивные элементы.</p>
                      <p>Вы можете закрыть этот Bottom Sheet, нажав на кнопку подтверждения, кликнув по затемненной области или просто смахнув его вниз.</p>
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
  );
};

export default BottomSheet; 