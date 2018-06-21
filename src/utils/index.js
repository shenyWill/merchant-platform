import { imageSizeTips, imageTypeTips } from '@/config/errorMsg';

function fileType (name) {
  if (!name) return '';
  const dotIndex = name.lastIndexOf('.');
  const type = name.substring(dotIndex + 1).toLowerCase();
  return type;
}

function isImage (name) {
  const type = fileType(name);
  const lists = ['jpg', 'jpeg', 'png'];
  for (let i = 0; i < lists.length; i++) {
    if (type === lists[i]) return true;
  }
  return false;
}

export function validateUploadImage (file) {
  const isImg = isImage(file.name);
  if (!isImg) {
    showMessage.call(this, 'error', imageTypeTips);
    return false;
  }

  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    showMessage.call(this, 'error', imageSizeTips);
    return false;
  }
  return true;
}

export function img2Base64 (image) {
  let canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  let context = canvas.getContext('2d');
  context.drawImage(image, 0, 0, image.width, image.height);
  const ext = image.src.substring(image.src.lastIndexOf('.') + 1).toLowerCase();
  return canvas.toDataURL(`image/${ext}`);
}

export function showMessage (type, message) {
  return this.$message({
    duration: 1000,
    type,
    message
  });
}

