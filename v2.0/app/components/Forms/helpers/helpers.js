export function isImage(file) {
  const fileName = file.name || file.path;
  const suffix = fileName.substr(fileName.indexOf('.') + 1).toLowerCase();
  if (suffix === 'jpg' || suffix === 'jpeg' || suffix === 'bmp' || suffix === 'png') {
    return true;
  }
  return false;
}

export function getAspectRatioFloat(aspectRatio) {
  const arr = aspectRatio.split(':');
  return parseFloat(arr[0]) / parseFloat(arr[1]);
}

export function isWithinAspectRatio(image, aspectRatio, percentDifferenceMargin = 0) {
  const aspectRatioFloat = getAspectRatioFloat(aspectRatio);
  // TODO: finish implementing
  return false;
}
