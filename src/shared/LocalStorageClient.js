import {storage} from '../core/utils';

const storageName = (param) => `excel:${param}`;

export class LocalStorageClient {
  constructor(name) {
    this.name = storageName(name);
  }

  save(state) {
    storage(this.name, state);
    return Promise.resolve();
  }

  get() {
    return new Promise((res) => {
      setTimeout(() => res(storage(this.name)), 1000);
    });
  }
}
