import { message } from 'antd';
import moment from 'moment';

let echarts = require('echarts');

/**
 /**
 * 生成唯一字符串
 */
export function uuid() {
  const s = [];
  const hexDigits = '0123456789abcdef';
  for (let i = 0; i < 36; i += 1) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4';
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  s[8] = '-';
  s[13] = '-';
  s[18] = '-';
  s[23] = '-';
  return s.join('');
}


export const setCookie = (name, value, options) => {

  options = options || {};
  if (value === null) {
    value = '';
    options.expires = -1;
  }
  let expires = '';
  if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
    let date;
    if (typeof options.expires == 'number') {
      date = new Date();
      date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
    } else {
      date = options.expires;
    }
    expires = '; expires=' + date.toUTCString();
  }
  let path = options.path ? '; path=' + options.path : '';
  let domain = options.domain ? '; domain=' + options.domain : '';
  let s = [cookie, expires, path, domain, secure].join('');
  let secure = options.secure ? '; secure' : '';
  let c = [name, '=', encodeURIComponent(value)].join('');
  let cookie = [c, expires, path, domain, secure].join('');
  document.cookie = cookie;

};


export const getCookie = (name) => {

  let cookieValue = null;
  if (document.cookie && document.cookie != '') {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) == (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};


export function randomObjArray(obj, len) {
  let arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(obj);
  }
  return arr;
}


// 添加 status 和  uid
export function addUidList(fileUrlList) {

  if (!fileUrlList || !Array.isArray(fileUrlList)) {
    return fileUrlList;
  }
  const filesUrl = fileUrlList.map((item, index) => {
    return { status: 'done', uid: index, url: item };
  });
  return filesUrl;
};


export function randomNum(m, n) {
  return Math.floor(Math.random() * (m - n) + n);
}


export function clearQuotationMark(data) {
  // json的值将被临时储存在这个变量中
  let keyValue = '';
  // 处理好的json字符串
  for (let key in data) {
    keyValue += key + ':' + JSON.stringify(data[key]) + ',';
  }
  // 去除最后一个逗号
  keyValue = keyValue.substring(0, keyValue.length - 1);
  return '{' + keyValue + '}';
}

// json 数据转换成表单格式
export function formData(payload) {
  let data = new FormData();
  for (let key in payload) {   // 转换表单
    data.append(key, payload[key]);
  }
  return data;
}

// 获取二级路由
export function getSecondNode(param) {
  let treeNode = null;
  const menuTree = JSON.parse(localStorage.getItem('menuTree'));
  if (menuTree) {
    for (const item of menuTree) {
      if (item.dirCode === param) {
        treeNode = item.children;
      }
    }
  }
  return treeNode;
}

// 请求放回错误处理
export function checkError(value) {
  const { code, info } = value;
  if (code == -1) { // 请求错误
    message.error(info);
    return false;
  }
  message.success(info);
  return true;
}


//  验证是否为编辑态
export function checkEdit(status, obj, payload) {

  if (status === 'edit') {
    const { id, ts } = obj;
    payload = { ...payload, id, ts };
  }
  return payload;
}

// 将 string 转换成 moment
export function string2Moment(text, ruleDate = 'YYYY-MM-DD HH:mm') {
  return text ? moment(text).format(ruleDate) : '';
}


// 批量删除
export function delMore(payload) {

  let idArray = [];
  let tsArray = [];

  for (let item of payload) {
    const { id, ts } = item;
    idArray.push(id);
    tsArray.push(ts);
  }
  return { id: idArray.toString(), ts: tsArray.toString() };
}


//  分页参数
export function getPageParam(data) {
  const { current, pageSize } = data;
  return {
    pageIndex: current,
    size: pageSize,
  };
}


/**
 * 表单日期格式化
 * @param fieldArray 待格式化的字段数组
 * @param formData 表单数据
 * @param formatRule 格式化规则
 */
export function formatFormDate(formData, fieldArray, formatRule = 'YYYY-MM-DD HH:mm:ss') {

  if (!Array.isArray(fieldArray)) {
    return formData;
  }

  for (const field of fieldArray) {
    if (formData[field]) {
      formData[field] = formData[field].format(formatRule);
    }
  }
  return formData;
}


export function formatFormDateRange(formData, fieldArray, formatRule = 'YYYY-MM-DD HH:mm:ss') {

  if (!Array.isArray(fieldArray)) {
    return formData;
  }

  for (const field of fieldArray) {
    if (formData[field]) {
      formData[field] = formData[field].map((item) => {
        return item.format(formatRule);
      }).toString();
    }
  }
  return formData;
}


export function downloadFile(name, href) {
  var a = document.createElement('a'), //创建a标签
    e = document.createEvent('MouseEvents'); //创建鼠标事件对象
  e.initEvent('click', false, false); //初始化事件对象
  a.href = href; //设置下载地址
  a.download = name; //设置下载文件名
  a.dispatchEvent(e); //给指定的元素，执行事件click事件


}


// 判断是否要显示弹框底部按钮
export function footer(disabled) {
  let result = null;
  if (disabled) {
    result = { footer: null };
  }
  return result;
}

// 获取树选中的值
export function tree2Map(data, key, value) {
  let map = {};
  treeMap(data, map, key, value);
  return map;
}


export function treeMap(data, map, key, value) {

  if (!Array.isArray(data)) {
    return data;
  }

  for (let item of data) {
    let { children } = item;
    map[item[key]] = item[value];
    if (children) {
      treeMap(children, map, key, value);
    }
  }
  return map;
}


// 数据转换

export function changeTreeData(data, key, value, title) {

  if (!Array.isArray(data)) {
    return data;
  }
  return data.map(item => {
    let { children } = item;
    let result = { ...item };
    if (children) {
      result.children = this.changeTreeData(children);
    }
    result.value = item[value];
    result.key = item[key];
    result.title = item[title];
    return result;
  });
}





