const nodeFactory = (data, left = null, right = null) => {
  return { data, left, right }
}

const treeFactory = (array) => {
  const buildTree = (arr, start, end) => {
    if (start > end) {
      return null
    }
    let mid = parseInt((start + end) / 2)
    let node = nodeFactory(arr[mid])
    node.left = buildTree(arr, start, mid - 1)
    node.right = buildTree(arr, mid + 1, end)
    return node
  }
  let arr = [...new Set(array)].sort()
  let root = buildTree(arr, 0, arr.length - 1)
  const insert = (value) => {
    let temp = root
    while (temp !== null) {
      if (temp.data > value) {
        if (temp.left !== null) {
          temp = temp.left
        } else {
          temp.left = nodeFactory(value)
          return
        }
      } else {
        if (temp.right !== null) {
          temp = temp.right
        } else {
          temp.right = nodeFactory(value)
          return
        }
      }
    }
  }
  const remove = (value) => {
    let temp = root
    let previous
    while (temp !== null) {
      previous = temp
      if (temp.data > value) {
        temp = temp.left
        if (temp.data === value) {
          switch (checkChildren(temp)) {
            case 0:
              previous.left = null
              break
            case 1:
              if (temp.left === null) {
                previous.left = temp.right
              } else {
                previous.left = temp.left
              }
              break
            case 2:
              let nextHigh = findNextBiggest(temp)
              if (checkChildren(nextHigh[0]) === 0) {
                remove(nextHigh[0].data)
                temp.data = nextHigh[0].data
              } else {
                remove(nextHigh[0].data)
                temp.data = nextHigh[0].data
              }
              break
          }

          return
        }
      } else if (temp.data < value) {
        temp = temp.right
        if (temp.data === value) {
          switch (checkChildren(temp)) {
            case 0:
              previous.right = null
              break
            case 1:
              if (temp.left === null) {
                previous.right = temp.right
              } else {
                previous.right = temp.left
              }
              break
            case 2:
              let nextHigh = findNextBiggest(temp)
              if (checkChildren(nextHigh[0]) === 0) {
                remove(nextHigh[0].data)
                temp.data = nextHigh[0].data
              } else {
                remove(nextHigh[0].data)
                temp.data = nextHigh[0].data
              }
              break
          }
          return
        }
      } else {
        let nextHigh = findNextBiggest(temp)
        if (checkChildren(nextHigh[0]) === 0) {
          remove(nextHigh[0].data)
          temp.data = nextHigh[0].data
        } else {
          remove(nextHigh[0].data)
          temp.data = nextHigh[0].data
          return
        }
      }
    }
    throw console.error('item doesnt belong in the tree')
  }
  const findNextBiggest = (node) => {
    let previous = node
    node = node.right
    if (node.left === null) {
      return [node, previous]
    }
    while (node.left !== null) {
      previous = node
      node = node.left
    }
    return [node, previous]
  }
  const checkChildren = (node) => {
    if (
      (node.left === null && node.right !== null) ||
      (node.left !== null && node.right === null)
    ) {
      return 1
    } else if (node.left !== null && node.right !== null) {
      return 2
    } else {
      return 0
    }
  }
  const find = (value) => {
    let temp = root

    while (temp !== null) {
      if (temp.data === value) {
        return temp
      }
      if (temp.data > value) {
        temp = temp.left
      } else {
        temp = temp.right
      }
    }
    throw console.error('item doesnt exist in the tree')
  }
  const levelOrder = (cb) => {
    if (root === null) {
      return
    }
    let arr = []
    let queue = []
    queue.push(root)
    while (queue.length > 0) {
      let current = queue[0]
      cb ? cb(current) : arr.push(current)
      if (current.left !== null) {
        queue.push(current.left)
      }
      if (current.right !== null) {
        queue.push(current.right)
      }
      queue.shift()
    }
    if (arr.length > 0) {
      return arr
    }
  }
  let preArray = []
  const preOrder = (cb, node = root) => {
    if (node === null) {
      return
    }
    cb ? cb(node) : preArray.push(node)
    preOrder(cb ? cb : undefined, node.left)
    preOrder(cb ? cb : undefined, node.right)
    if (preArray.length > 0) {
      return preArray
    }
  }
  let inArray = []
  const inOrder = (cb, node = root) => {
    if (node === null) {
      return
    }
    inOrder(cb ? cb : undefined, node.left)
    cb ? cb(node) : inArray.push(node)
    inOrder(cb ? cb : undefined, node.right)
    if (inArray.length > 0) {
      return inArray
    }
  }
  let postArray = []
  const postOrder = (cb, node = root) => {
    if (node === null) {
      return
    }
    postOrder(cb ? cb : undefined, node.left)
    postOrder(cb ? cb : undefined, node.right)
    cb ? cb(node) : postArray.push(node)
    if (postArray.length > 0) {
      return postArray
    }
  }
  const height = (node = root) => {
    if (node === null) {
      return -1
    }
    let leftHeight = height(node.left)
    let rightHeight = height(node.right)

    return Math.max(leftHeight, rightHeight) + 1
  }
  const depth = (node, rootNode = root) => {
    let i = 0
    if (rootNode === null) {
      return
    }
    while (rootNode !== node) {
      if (rootNode.data > node.data) {
        rootNode = rootNode.left
        i++
      } else if (rootNode.data < node.data) {
        rootNode = rootNode.right
        i++
      }
    }
    return i
  }
  const isBalanced = () => {
    let arr = levelOrder()
    for (let i = 0; i < arr.length; i++) {
      if (
        Math.max(height(arr[i].left), height(arr[i].right)) -
          Math.min(height(arr[i].left), height(arr[i].right)) >
        1
      ) {
        return false
      }
    }
    return true
  }
  const rebalance = () => {
    let nodes = inOrder()
    let values = []
    for (const node of nodes) {
      values.push(node.data)
    }
    root = buildTree(values, 0, values.length - 1)
  }
  return {
    get root() {
      return root
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
  }
}
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false)
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`)
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true)
  }
}

// let x = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
// let y = [1, 2, 4, 4, 3, 3, 5, 5, 7, 6, 8, 9]
// let teste = [20, 30, 40, 32, 34, 36, 50, 60, 70, 65, 80, 75, 85]

// let tree = treeFactory(teste)
// tree.insert(45)
// prettyPrint(tree.root)

// const call = (node) => {
//   console.log(node.data)
// }
// tree.remove(50)

// tree.insert(200)
// console.log(`depth de 85 `, tree.depth(tree.find(85)))
// // tree.insert(250)
// // tree.insert(300)

// // console.log(tree.levelOrder())
// // tree.preOrder(call)
// // console.log(tree.inOrder())

// console.log('post order', tree.postOrder())
// console.log('height', tree.height())
// console.log('is balanced ? ', tree.isBalanced())

// tree.rebalance()
// prettyPrint(tree.root)
// console.log('is balanced ? ', tree.isBalanced())
function createRandomArray() {
  let array = []
  let size = 13
  for (let i = 0; i < size; i++) {
    let number = generateRandomNumber(1, 40)
    if (array.includes(number)) {
      number = generateRandomNumber(1, 40)
    } else {
      array.push(number)
    }
  }
  return array
}
const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}

let array = [7, 6, 34, 31, 29, 25, 15, 16, 22, 13]
let tree = treeFactory(array)
prettyPrint(tree.root)
console.log('is balanced? ', tree.isBalanced())
function tester() {
  let array = createRandomArray()
  let tree = treeFactory(array)
  prettyPrint(tree.root)
  console.log('is balanced? ', tree.isBalanced())
  // console.log('level order ')
  // console.table(tree.levelOrder())
  // console.log('pre order ')
  // console.table(tree.preOrder())
  // console.log('post order ')
  // console.table(tree.postOrder())
  // console.log('in order')
  // console.table(tree.inOrder())
  // for (let i = 0; i < 5; i++) {
  //   tree.insert(generateRandomNumber(100, 300))
  // }
  // prettyPrint(tree.root)
  // console.log('is balanced? ', tree.isBalanced())
  // tree.rebalance()
  // console.log('rebalancing')
  // prettyPrint(tree.root)
  // console.log('is balanced? ', tree.isBalanced())
  // console.log('level order ')
  // console.table(tree.levelOrder())
  // console.log('pre order ')
  // console.table(tree.preOrder())
  // console.log('post order ')
  // console.table(tree.postOrder())
  // console.log('in order')
  // console.table(tree.inOrder())
}
// tester()
