import {formatDate, storage} from '../core/utils';

export function toHTML(key) {
  const id = key.split(':')[1];
  const {title} = storage(key);

  return `
    <li class="db__record">
      <a href="#excel/${id}">${title}</a>
      <strong>${formatDate(+id)}</strong>
    </li>
  `;
}

export function getAllKeys() {
  const keys = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key.includes('excel')) continue;
    keys.push(key);
  }

  return keys;
}

export function createRecordsTable() {
  const keys = getAllKeys();

  if (!keys.length) {
    return `<h4 class="db__record center">
      Вы пока не создали ни одной таблицы.
    </h4>`;
  }

  return `
    <div class="db__list-header">
      <span>Название</span>
      <span>Дата открытия</span>
    </div>

    <ul class="db__list">
      ${keys.map(toHTML).join('')}
    </ul>`;
}
