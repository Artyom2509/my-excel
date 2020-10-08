function capitalize(string = '') {
  if (typeof string !== 'string') {
    return '';
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName);
}

export {getMethodName}
