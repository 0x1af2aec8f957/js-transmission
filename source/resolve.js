// 数据解析
import {config} from './config';

const {decode, beforeSuccess} = config;

export const payload = (res) => {
  res = decode ? eval(decode(res)) : eval(res);
  return beforeSuccess ? beforeSuccess(res) || res : res;
};