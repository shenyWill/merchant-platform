import {
  imageSizeTips,
  imageTypeTips
} from '@/config/errorMsg';
import { Message } from 'element-ui';
import api from '@/api';

function fileType(name) {
  if (!name) return '';
  const dotIndex = name.lastIndexOf('.');
  const type = name.substring(dotIndex + 1).toLowerCase();
  return type;
}

function isImage(name) {
  const type = fileType(name);
  const lists = ['jpg', 'jpeg', 'png'];
  for (let i = 0; i < lists.length; i++) {
    if (type === lists[i]) return true;
  }
  return false;
}

export async function request (url, data = {}) {
  return api.post(url, data);
}

export function validateUploadImage(file) {
  const isImg = isImage(file.name);
  if (!isImg) {
    Message({
      type: 'error',
      message: imageTypeTips
    });
    return false;
  }

  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    Message({
      type: 'error',
      message: imageSizeTips
    });
    return false;
  }
  return true;
}

export function img2Base64(image) {
  let canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  let context = canvas.getContext('2d');
  context.drawImage(image, 0, 0, image.width, image.height);
  const ext = image.src.substring(image.src.lastIndexOf('.') + 1).toLowerCase();
  return canvas.toDataURL(`image/${ext}`);
}

export function showMessage(type, message) {
  return this.$message({
    duration: 1000,
    type,
    message
  });
}

/*
 * @param {String} obj
 *
 * */
export function parseTime(obj) {
  if (!obj) {
    return '';
  }
  let date = new Date(obj);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
  const minutes = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
  const seconds = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();

  return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
}

export function browserVersion () {
}

export function isValidIP (ip) {
  const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
  return reg.test(ip);
}
