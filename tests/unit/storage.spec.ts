import { assert } from 'chai'
import {Storage} from "@/service/storage";

function mockLocalStorage() {
  return {
    store: {},

    setItem(key, value) {
      this.store[key] = value;
    },

    getItem(key) {
      return this.store[key];
    }
  }
}

const PASSWORD = 'fizz';

describe('storage', () => {
  beforeEach(() => {
    // eslint-disable-next-line no-global-assign
    (global as any).localStorage = mockLocalStorage() as never;
  });

  it('should encrypt item and save it in local storage encrypted', () => {
    Storage.saveEncrypted('foo', 'bar', PASSWORD);

    assert(localStorage.getItem('foo') !== null, 'no item stored in local storage');
    assert(localStorage.getItem('foo') !== 'bar', 'item not encrypted');
  });

  it('should decrypt item with correct password', () => {
    localStorage.setItem('foo', '05305d1932927661ae478a59d02d2f93:3a59f7ef81583f99dedc5f58988c81cb74be9fb5de9ddaa98cec893a8f069fcf');
    assert(Storage.getEncrypted('foo', PASSWORD) === 'bar', 'decryption not correct')
  });

  it('should not decrypt item with incorrect password', () => {
    localStorage.setItem('foo', '05305d1932927661ae478a59d02d2f93:3a59f7ef81583f99dedc5f58988c81cb74be9fb5de9ddaa98cec893a8f069fcf');
    assert(Storage.getEncrypted('foo', 'bar') === null, 'decryption not correct')
  });

  it('should detect correct password', () => {
    localStorage.setItem('foo', '05305d1932927661ae478a59d02d2f93:3a59f7ef81583f99dedc5f58988c81cb74be9fb5de9ddaa98cec893a8f069fcf');
    assert(Storage.isPasswordCorrect('foo', PASSWORD) === true, 'password is correct')
  });

  it('should detect incorrect password', () => {
    localStorage.setItem('foo', '05305d1932927661ae478a59d02d2f93:3a59f7ef81583f99dedc5f58988c81cb74be9fb5de9ddaa98cec893a8f069fcf');
    assert(Storage.isPasswordCorrect('foo', 'bar') === false, 'password is incorrect')
  });
})
