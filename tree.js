import { nodeFactory } from "./node.js";
import { mergeSort } from "./mergeSort.js";
export const treeFactory = (array) => {
  const buildTree = (arr, start, end) => {
    if (start > end) {
      return null;
    }
    let mid = parseInt((start + end) / 2);
    let node = nodeFactory(arr[mid]);
    node.left = buildTree(arr, start, mid - 1);
    node.right = buildTree(arr, mid + 1, end);
    return node;
  };

  let arr = [...new Set(mergeSort(array))];
  let root = buildTree(arr, 0, arr.length - 1);
  const insert = (value) => {
    let temp = root;
    while (temp !== null) {
      if (temp.data > value) {
        if (temp.left !== null) {
          temp = temp.left;
        } else {
          temp.left = nodeFactory(value);
          return;
        }
      } else {
        if (temp.right !== null) {
          temp = temp.right;
        } else {
          temp.right = nodeFactory(value);
          return;
        }
      }
    }
  };
  const remove = (value) => {
    let temp = root;
    let previous;
    while (temp !== null) {
      previous = temp;
      if (temp.data > value) {
        temp = temp.left;
        if (temp.data === value) {
          switch (checkChildren(temp)) {
            case 0:
              previous.left = null;
              break;
            case 1:
              if (temp.left === null) {
                previous.left = temp.right;
              } else {
                previous.left = temp.left;
              }
              break;
            case 2:
              let nextHigh = findNextBiggest(temp);
              if (checkChildren(nextHigh[0]) === 0) {
                remove(nextHigh[0].data);
                temp.data = nextHigh[0].data;
              } else {
                remove(nextHigh[0].data);
                temp.data = nextHigh[0].data;
              }
              break;
          }

          return;
        }
      } else if (temp.data < value) {
        temp = temp.right;
        if (temp.data === value) {
          switch (checkChildren(temp)) {
            case 0:
              previous.right = null;
              break;
            case 1:
              if (temp.left === null) {
                previous.right = temp.right;
              } else {
                previous.right = temp.left;
              }
              break;
            case 2:
              let nextHigh = findNextBiggest(temp);
              if (checkChildren(nextHigh[0]) === 0) {
                remove(nextHigh[0].data);
                temp.data = nextHigh[0].data;
              } else {
                remove(nextHigh[0].data);
                temp.data = nextHigh[0].data;
              }
              break;
          }
          return;
        }
      } else {
        let nextHigh = findNextBiggest(temp);
        if (checkChildren(nextHigh[0]) === 0) {
          remove(nextHigh[0].data);
          temp.data = nextHigh[0].data;
        } else {
          remove(nextHigh[0].data);
          temp.data = nextHigh[0].data;
          return;
        }
      }
    }
    throw console.error("item doesnt belong in the tree");
  };
  const findNextBiggest = (node) => {
    let previous = node;
    node = node.right;
    if (node.left === null) {
      return [node, previous];
    }
    while (node.left !== null) {
      previous = node;
      node = node.left;
    }
    return [node, previous];
  };
  const checkChildren = (node) => {
    if (
      (node.left === null && node.right !== null) ||
      (node.left !== null && node.right === null)
    ) {
      return 1;
    } else if (node.left !== null && node.right !== null) {
      return 2;
    } else {
      return 0;
    }
  };
  const find = (value) => {
    let temp = root;

    while (temp !== null) {
      if (temp.data === value) {
        return temp;
      }
      if (temp.data > value) {
        temp = temp.left;
      } else {
        temp = temp.right;
      }
    }
    throw console.error("item doesnt exist in the tree");
  };
  const levelOrder = (cb) => {
    if (root === null) {
      return;
    }
    let arr = [];
    let queue = [];
    queue.push(root);
    while (queue.length > 0) {
      let current = queue.shift();
      cb ? cb(current) : arr.push(current);
      if (current.left !== null) {
        queue.push(current.left);
      }
      if (current.right !== null) {
        queue.push(current.right);
      }
    }

    return arr;
  };
  const preOrder = (node = root, preArray = []) => {
    if (node === null) {
      return;
    }
    preArray.push(node);
    preOrder(node.left, preArray);
    preOrder(node.right, preArray);
    return preArray;
  };

  const inOrder = (node = root, inArray = []) => {
    if (node === null) {
      return;
    }
    inOrder(node.left, inArray);
    if (!inArray.includes(node)) {
      inArray.push(node);
    }
    inOrder(node.right, inArray);

    return inArray;
  };

  const postOrder = (node = root, postArray = []) => {
    if (node === null) {
      return;
    }
    postOrder(node.left, postArray);
    postOrder(node.right, postArray);
    postArray.push(node);
    return postArray;
  };
  const height = (node = root) => {
    if (node === null) {
      return -1;
    }
    let leftHeight = height(node.left);
    let rightHeight = height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  };
  const depth = (node, rootNode = root) => {
    let i = 0;
    if (rootNode === null) {
      return;
    }
    while (rootNode !== node) {
      if (rootNode.data > node.data) {
        rootNode = rootNode.left;
        i++;
      } else if (rootNode.data < node.data) {
        rootNode = rootNode.right;
        i++;
      }
    }
    return i;
  };
  const isBalanced = () => {
    let arr = levelOrder();
    for (let i = 0; i < arr.length; i++) {
      if (
        Math.max(height(arr[i].left), height(arr[i].right)) -
          Math.min(height(arr[i].left), height(arr[i].right)) >
        1
      ) {
        return false;
      }
    }
    return true;
  };
  const rebalance = () => {
    let nodes = inOrder();
    let values = [];
    for (const node of nodes) {
      values.push(node.data);
    }
    root = buildTree(values, 0, values.length - 1);
  };
  return {
    get root() {
      return root;
    },
    insert,
    remove,
    find,
    levelOrder,
    preOrder,
    inOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
};
