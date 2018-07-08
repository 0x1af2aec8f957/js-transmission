// cache处理

let total = 100; // 缓存数量
const payload = {};

export const set = (key, value) => Object.keys(payload).length <= total
    ? payload[key] = value
    : do {
      delete payload[Object.keys(payload)[0]];
      payload[key] = value;
    };
export const get = key => payload[key];

export const setNumber = number => total = number;