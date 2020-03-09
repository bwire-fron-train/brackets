module.exports = function check(str, bracketsConfig) {
  function checkBracket(token, idx) {
    return bracketsConfig.map(pair => pair[idx]).filter(a => a === token).length !== 0;   
  }
  function isStartBracket(token) {
    return checkBracket(token, 0)  
  }

  function isEndBracket(token) {
    return checkBracket(token, 1)  
  }

  function getStartBracket(token) {
    config = bracketsConfig.filter(pair => pair[1] === token);
    if (config.length !== 0) {
      return config[0][0];
    } else {
      return undefined;
    }
  }

  const stack = [];
  const result =  str.split('').reduce((a, s) => {
    if (!a) return a;

    if (isStartBracket(s)) {
      if (isEndBracket(s) && stack[stack.length - 1] === s) {
        stack.pop();
        return true;
      } else {
        stack.push(s);
        return true;
      }
    } else {
      const b = stack.pop();
      if (b) {
        return getStartBracket(s) == b 
      } else {
        return false;
      }
    }
  }, true);

  return result && stack.length === 0;
}
