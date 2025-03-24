import rootTokens from '../../../tokens.json';

const parseTokenValue = (value) => {
  if (typeof value !== 'string') {
    return value;
  }
  
  if (value.endsWith('ms')) {
    const match = value.match(/^(\d+)ms$/);
    if (match) {
      return value; 
    }
  }
  
  if (value.startsWith('cubic-bezier')) {
    return value;
  }
  
  return value;
};

const processedTokens = {
  "BOTTOM_SHEET_ENTER_DURATION": "200ms",
  "BOTTOM_SHEET_EXIT_DURATION": "100ms",
  "BOTTOM_ENTER_EASING": "cubic-bezier(.165, .84, .44, 1)",
  "BOTTOM_EXIT_EASING": "cubic-bezier(.165, .84, .44, 1)",
  "BOTTOM_SHEET_OVERLAY_ENTER_DURATION": "300ms",
  "BOTTOM_SHEET_OVERLAY_ENTER_EASING": "cubic-bezier(0.25, 0.1, 0.25, 1)",
  "BOTTOM_SHEET_OVERLAY_EXIT_DURATION": "250ms",
  "BOTTOM_SHEET_OVERLAY_EXIT_EASING": "cubic-bezier(.165, .84, .44, 1)"
};

processedTokens.updateToken = function(tokenName, tokenValue) {
  if (this.hasOwnProperty(tokenName)) {
    this[tokenName] = parseTokenValue(tokenValue);
    return true;
  }
  return false;
};

console.log('TokenUtils loaded with values:', processedTokens);

export default processedTokens;