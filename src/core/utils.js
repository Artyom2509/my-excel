/* eslint-disable no-invalid-this */
export function capitalize(string = '') {
  if (typeof string !== 'string') {
    return '';
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getMethodName(eventName) {
  return 'on' + capitalize(eventName);
}

export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  }

  localStorage.setItem(key, JSON.stringify(data));
}

export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  return a == b;
}

export function camelToDushCase(str) {
  return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

export function toInlineStyles(styles = {}) {
  return Object.keys(styles)
      .map((key) => `${camelToDushCase(key)}: ${styles[key]}`)
      .join(';');
}

export function debounce(fn, wait) {
  let timeout;
  return function(...args) {
    const later = () => {
      clearTimeout(timeout);
      fn.apply(this, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function formatDate(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const hour = '' + d.getHours();
  const minutes = '' + d.getMinutes();
  const seconds = '' + d.getDate();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return (
    [day, month, year].join('.') + ' ' + [hour, minutes, seconds].join(':')
  );
}

export function preventDefault(event) {
  event.preventDefault();
}
