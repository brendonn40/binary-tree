import { treeFactory } from "./tree.js";
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
function createRandomArray() {
  let array = [];
  let size = 6;
  for (let i = 0; i < size; i++) {
    let number = generateRandomNumber(1, 40);
    if (array.includes(number)) {
      number = generateRandomNumber(1, 40);
    } else {
      array.push(number);
    }
  }
  return array;
}
const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

let array = createRandomArray();
let tree = treeFactory(array);
prettyPrint(tree.root);
console.log("is balanced? ", tree.isBalanced());
console.log("level order", tree.levelOrder());
console.log("post order", tree.postOrder());
console.log("pre order", tree.preOrder());
console.log("in order", tree.inOrder());
for (let i = 0; i < 5; i++) {
  tree.insert(generateRandomNumber(100, 300));
}
prettyPrint(tree.root);
console.log("is balanced? ", tree.isBalanced());
tree.rebalance();
prettyPrint(tree.root);
console.log("is balanced? ", tree.isBalanced());
console.log("====================================");
console.log("level order", tree.levelOrder());
console.log("post order", tree.postOrder());
console.log("pre order", tree.preOrder());
console.log("in order", tree.inOrder());
