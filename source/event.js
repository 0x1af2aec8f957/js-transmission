// 流对象

const method = {};

export const $on = (action, handel) => method[action] = handel;
export const $emit = (action, ...arv) => method[action](...arv);