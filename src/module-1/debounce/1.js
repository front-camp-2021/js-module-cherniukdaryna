import { debounce } from './index';

  const obj = {
    nickname: 'John',
    getName () {
      return this.nickname;
    }
  }

  const debounceLog = debounce((a, b) => {
    return a + b;
  }, 1000);

  const debounceGetName = debounce(obj.getName);

  // Note: should log "1" only one time
  console.error(debounceLog(1, 2));
  console.error(debounceLog(1, 3));
  console.error(debounceLog(1, 4));

  // Note: should log "John" only one time
  console.error(debounceGetName.call(obj));
  console.error(debounceGetName.call(obj));
  console.error(debounceGetName.call(obj));