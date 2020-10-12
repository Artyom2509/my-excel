class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string' ?
    document.querySelector(selector) : selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html.trim();
      return this;
    }

    return this.$el.outerHTML.trim();
  }

  text(text) {
    // if (typeof text === 'string') {
    //   this.$el.textContent = text.trim();
    //   return this;
    // }

    return this.$el.textContent = text;
  }

  clear() {
    this.html('');
    return this;
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }

    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }

    return this;
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  get data() {
    return this.$el.dataset;
  }

  find(selector) {
    return $(this.$el.querySelector(selector));
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  focus() {
    this.$el.focus();
    return this;
  }

  id(parse) {
    if (parse) {
      const parsed = this.id().split(':');
      return {
        row: +parsed[0],
        col: +parsed[1],
      }
    }
    return this.data.id;
  }

  css(styles = {}) {
    Object
        .keys(styles)
        .forEach(key => {
          this.$el.style[key] = styles[key]
        });
  }

  addClass(className) {
    this.$el.classList.add(className);
  }

  removeClass(className) {
    this.$el.classList.remove(className);
  }
}

export default function $(selector) {
  return new Dom(selector);
}

$.create = (tagname, classes = '') => {
  const el = document.createElement(tagname);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
}
