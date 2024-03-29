export const compareArray = (arr1, arr2) =>
  arr1.length === arr2.length &&
  arr1.every((item, index) => (item = arr2[index]));

export const objectKeysToArray = (obj) =>
  typeof obj !== 'object' ? null : Object.keys(obj);

export const isEmptyObject = (obj) => {
  return (
    obj &&
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
};
