import rootTokens from '../../../tokens.json';

// Создаем функцию для корректной обработки любых пользовательских значений
const parseTokenValue = (value) => {
  if (typeof value !== 'string') {
    return value;
  }
  
  // Преобразуем миллисекунды в числовое значение, если это нужно
  if (value.endsWith('ms')) {
    const match = value.match(/^(\d+)ms$/);
    if (match) {
      return value; // Оставляем как есть для CSS
    }
  }
  
  // Проверяем, это cubic-bezier или нет
  if (value.startsWith('cubic-bezier')) {
    return value;
  }
  
  return value;
};

// Processed tokens generated from component/tokens.json
const processedTokens = {
  "BOTTOM_SHEET_EXIT_DURATION": "300ms",
  "BOTTOM_SHEET_EXIT_EASING": "cubic-bezier(.165, .84, .44, 1)",
  "BOTTOM_SHEET_OVERLAY_ENTER_DURATION": "300ms",
  "BOTTOM_SHEET_OVERLAY_ENTER_EASING": "cubic-bezier(0.25, 0.1, 0.25, 1)",
  "BOTTOM_SHEET_OVERLAY_EXIT_DURATION": "200ms",
  "BOTTOM_SHEET_OVERLAY_EXIT_EASING": "cubic-bezier(.165, .84, .44, 1)",
  "SPRING_STIFFNESS_MEDIUM": 230,
  "SPRING_DAMPING_HIGH": 22.22,
  "SPRING_MASS_DEFAULT": 1
};

// Метод для обновления токенов на лету
processedTokens.updateToken = function(tokenName, tokenValue) {
  if (this.hasOwnProperty(tokenName)) {
    this[tokenName] = parseTokenValue(tokenValue);
    return true;
  }
  return false;
};

// Log for debugging
console.log('TokenUtils loaded with values:', processedTokens);

export default processedTokens;