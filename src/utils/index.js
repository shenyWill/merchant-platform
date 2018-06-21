export function fileType (name) {
  if (!name) return '';
  const dotIndex = name.lastIndexOf('.');
  const type = name.subString(dotIndex + 1).toLowerCase();
  return type;
}
