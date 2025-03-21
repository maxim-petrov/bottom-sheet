import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import '../index.css';
import './styles/bottom-sheet.scss';
import './styles/animation.scss';
import tokens from './tokens/utils/tokenUtils';

// Компонент содержимого BottomSheet
const BottomSheetContent = ({ 
  isOpen, 
  onClose, 
  title, 
  subtitle, 
  children, 
  primaryButtonText, 
  secondaryButtonText, 
  tertiaryButtonText, 
  onPrimaryButtonClick, 
  onSecondaryButtonClick, 
  onTertiaryButtonClick, 
  containInDemoContainer 
}) => {
  const sheetRef = useRef(null);
  
  // Преобразование длительности в секунды для Framer Motion
  const msToSeconds = (msValue) => {
    if (typeof msValue === 'string') {
      const match = msValue.match(/^(\d+)ms$/);
      if (match && match[1]) {
        return parseFloat(match[1]) / 1000;
      }
    }
    return msValue;
  };
  
  // Анимация для bottom sheet с использованием spring
  const variants = {
    open: {
      y: 0,
      transition: {
        type: 'spring',
        stiffness: tokens.SPRING_STIFFNESS_MEDIUM,
        damping: tokens.SPRING_DAMPING_HIGH,
        mass: tokens.SPRING_MASS_DEFAULT,
      }
    },
    closed: {
      y: '100%',
      transition: {
        duration: msToSeconds(tokens.BOTTOM_SHEET_EXIT_DURATION),
        ease: tokens.BOTTOM_SHEET_EXIT_EASING,
      }
    }
  };
  
  // Анимация для overlay
  const overlayVariants = {
    open: {
      opacity: 1,
      transition: {
        duration: msToSeconds(tokens.BOTTOM_SHEET_OVERLAY_ENTER_DURATION),
        ease: tokens.BOTTOM_SHEET_OVERLAY_ENTER_EASING
      }
    },
    closed: {
      opacity: 0,
      transition: {
        duration: msToSeconds(tokens.BOTTOM_SHEET_OVERLAY_EXIT_DURATION),
        ease: tokens.BOTTOM_SHEET_OVERLAY_EXIT_EASING
      }
    }
  };
  
  // Обработчик drag события для закрытия по свайпу вниз
  const handleDragEnd = (event, info) => {
    if (info.offset.y > 100) {
      onClose();
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className={`bottom-sheet-container ${containInDemoContainer ? 'in-demo' : ''}`}>
      <motion.div 
        className="bottom-sheet-overlay"
        initial="closed"
        animate="open"
        exit="closed"
        variants={overlayVariants}
        onClick={onClose}
      />
      
      <motion.div 
        className="bottom-sheet"
        ref={sheetRef}
        initial="closed"
        animate="open"
        exit="closed"
        variants={variants}
        drag="y"
        dragConstraints={{ top: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
      >
        <div className="bottom-sheet-handle" />
        
        <button className="bottom-sheet-close" onClick={onClose}>
          <span className="bottom-sheet-close-icon">×</span>
        </button>
        
        {(title || subtitle) && (
          <div className="bottom-sheet-header">
            {title && <h2 className="bottom-sheet-title">{title}</h2>}
            {subtitle && <h3 className="bottom-sheet-subtitle">{subtitle}</h3>}
          </div>
        )}
        
        <div className="bottom-sheet-content">
          {children}
        </div>
        
        {(primaryButtonText || secondaryButtonText || tertiaryButtonText) && (
          <div className="bottom-sheet-footer">
            {primaryButtonText && (
              <button 
                className="btn-root-119-18-1-1 btn-primary-a30-18-1-1 btn-medium-fdc-18-1-1 btn-typeButtonReset-268-18-1-1" 
                onClick={onPrimaryButtonClick}
              >
                <span className="btn-text-398-18-1-1">{primaryButtonText}</span>
              </button>
            )}
            
            {secondaryButtonText && (
              <button 
                className="btn-root-119-18-1-1 btn-secondary-f3f-18-1-1 btn-medium-fdc-18-1-1 btn-typeButtonReset-268-18-1-1" 
                onClick={onSecondaryButtonClick}
              >
                <span className="btn-text-398-18-1-1">{secondaryButtonText}</span>
              </button>
            )}
            
            {tertiaryButtonText && (
              <button 
                className="btn-root-119-18-1-1 btn-tertiary-a1c-18-1-1 btn-medium-fdc-18-1-1 btn-typeButtonReset-268-18-1-1" 
                onClick={onTertiaryButtonClick}
              >
                <span className="btn-text-398-18-1-1">{tertiaryButtonText}</span>
              </button>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

const BottomSheet = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const openBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  const closeBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  return (
    <motion.div 
      className="component-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Bottom Sheet</h1>
      <div className="component-demo">
        <div className="component-demo-inner" style={{ textAlign: 'center', position: 'relative' }}>
          <button 
            className="btn-root-119-18-1-1 btn-primary-a30-18-1-1 btn-medium-fdc-18-1-1 btn-typeButtonReset-268-18-1-1" 
            onClick={openBottomSheet}
          >
            <span className="btn-text-398-18-1-1">Открыть Bottom Sheet</span>
          </button>
          
          <BottomSheetContent 
            isOpen={isBottomSheetOpen}
            onClose={closeBottomSheet}
            title="Заголовок"
            subtitle="Подзаголовок"
            primaryButtonText="Подтвердить"
            secondaryButtonText="Отменить"
            tertiaryButtonText="Отложить"
            onPrimaryButtonClick={closeBottomSheet}
            onSecondaryButtonClick={closeBottomSheet}
            onTertiaryButtonClick={closeBottomSheet}
            containInDemoContainer={true}
          >
            <div style={{ padding: '0 24px 24px', color: '#333' }}>
              <p>Это содержимое Bottom Sheet. Здесь может быть любая информация или интерактивные элементы.</p>
              <p>Вы можете закрыть этот Bottom Sheet, нажав на одну из кнопок внизу, кликнув по затемненной области или просто смахнув его вниз.</p>
            </div>
          </BottomSheetContent>
        </div>
      </div>
    </motion.div>
  );
};

export default BottomSheet; 