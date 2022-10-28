function merge(a, b) {
  let sorted = [];
  while (a.length && b.length) {
    if (a[0] < b[0]) {
      sorted.push(a.shift());
    } else {
      sorted.push(b.shift());
    }
  }
  return [...sorted, ...a, ...b];
}
export function mergeSort(array) {
  if (array.length < 2) {
    return array;
  } else {
    let half = Math.floor(array.length / 2);
    let left = mergeSort(array.slice(0, half));
    let right = mergeSort(array.slice(half));
    return merge(left, right);
  }
}
