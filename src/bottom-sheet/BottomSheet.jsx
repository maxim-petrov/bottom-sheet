import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import '../index.css';
import './styles/bottom-sheet.scss';
import './styles/animation.scss';
import tokens from './tokens/utils/tokenUtils';


const BottomSheetPage = () => {
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
        <div className="component-demo-inner" style={{ textAlign: 'center', position: 'relative', minHeight: '450px' }}>
          <button 
            className="btn-root-119-18-1-1 btn-primary-a30-18-1-1 btn-medium-fdc-18-1-1 btn-typeButtonReset-268-18-1-1" 
            onClick={openBottomSheet}
          >
            <span className="btn-text-398-18-1-1">Открыть Bottom Sheet</span>
          </button>
          
          <BottomSheet 
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
          </BottomSheet>
        </div>
      </div>
      <div className="component-description">
        <h2 style={{ color: "#333" }}>Токены</h2>
        <p style={{ color: "#333" }}>
          Bottom Sheet использует следующие токены анимации:
        </p>
        <h3 style={{ color: "#333" }}>Анимация появления/исчезновения</h3>
        <ul style={{ color: "#333" }}>
          <li><code>Spring.Stiffness.Medium (230)</code> - средняя жесткость пружины для плавного появления</li>
          <li><code>Spring.Damping.High (22.22)</code> - сильное затухание для минимальных колебаний</li>
          <li><code>Spring.Mass.Default (1)</code> - стандартная масса для естественного движения</li>
          <li>Для исчезновения: <code>Duration.M</code> и <code>Easing.Exit</code> для плавного ухода</li>
        </ul>
        
        <h3 style={{ color: "#333" }}>Анимация overlay</h3>
        <ul style={{ color: "#333" }}>
          <li>Появление: <code>Duration.M</code> с <code>Easing.Entrance</code> для плавного появления</li>
          <li>Исчезновение: <code>Duration.S</code> с <code>Easing.Exit</code> для быстрого исчезновения</li>
        </ul>
        
        <h3 style={{ color: "#333" }}>Жесты и интерактивность</h3>
        <ul style={{ color: "#333" }}>
          <li>Перетаскивание вниз для закрытия с порогом 100px</li>
          <li>Плавный возврат на место при недостаточном перетаскивании</li>
          <li>Клик по overlay закрывает компонент</li>
          <li>Кнопка в верхней части для удобного закрытия</li>
        </ul>
        
        <h3 style={{ color: "#333" }}>Тип анимации</h3>
        <p style={{ color: "#333" }}>
          Структурная анимация - показывает изменение структуры интерфейса и помогает пользователю понять 
          модальный характер взаимодействия. Spring-анимация обеспечивает плавное появление, создавая 
          ощущение естественного движения элемента снизу вверх, как будто он имеет физическую массу и подчиняется законам физики.
        </p>
        
        <h3 style={{ color: "#333" }}>Использование spring-анимации для BottomSheet</h3>
        <p style={{ color: "#333" }}>
          Bottom Sheet особенно выигрывает от использования spring-анимации, так как:
        </p>
        <ul style={{ color: "#333" }}>
          <li><strong>Создает ощущение тяжести</strong> - компонент появляется с естественной инерцией</li>
          <li><strong>Улучшает ментальную модель</strong> - движение соответствует ожиданиям пользователя от физического объекта</li>
          <li><strong>Повышает осознанность</strong> - характер анимации подчеркивает модальную природу компонента</li>
          <li><strong>Согласуется с жестами</strong> - пружинная анимация идеально сочетается с жестовым интерфейсом (перетаскивание)</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default BottomSheetPage; 