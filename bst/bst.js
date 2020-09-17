/*
 * node = {
 *  value: <int>,
 *  left: <node>,
 *  right: <node>,
 *  balancer: -2 .. 2
 * }
 */

let debug = false;

exports.create = (value, enableDebug = false) => {
  debug = enableDebug;
  return this.insert(null, value);
};

exports.insert = (node, value) => {

  if(debug) {
    console.log('inserting ' + value + ' into our tree');
  }

  if(node === null) {
    return newNode(value);
  }
  if(value < node.value) {
    if(node.left === null) {
      node.left = newNode(value);
    }
    else {
      node.left = this.insert(node.left, value);
    }
  }
  else if(value > node.value) {
    if(node.right === null) {
      node.right = newNode(value);
    }
    else {
      node.right = this.insert(node.right, value);
    }
  }

  node.height = calcHeight(node);

  if(isLeftLeft(node, value)) {
    node = rotateRight(node);
  } 
  else if(isLeftRight(node, value)) {
    node.left = rotateLeft(node.left);
    node = rotateRight(node);
  }
  else if(isRightRight(node, value)) {
    node = rotateLeft(node);
  }
  else if(isRightLeft(node, value)) {
    node.right = rotateRight(node.right);
    node = rotateLeft(node);
  }

  return node;
};

exports.has = (tree, value) => {
  if(tree.value === value) {
    return true;
  }
  else if(value < tree.value) {
    if(tree.left === null) {
      return false;
    }
    return has(tree.left, value);
  }
  if(value.right === null) {
    return false;
  }
  return has(tree.right, value);
};

exports.remove = (tree, value) => {
  // find node, if exist remove and rebalance
  if(tree === null) {
    return false;
  }

  if(value < tree.value) {
    this.remove(tree.left, value);
  } else if(value > tree.value) {
    this.remove(tree.right, value);
  } else {
    return true;
  }
};

function newNode(value) {
  return {
    value: value,
    right: null,
    left: null,
    height: 0
  }
}

function rotateLeft(node) {
  let right = node.right;
  node.right = right.left;
  right.left = node;

  node.height = calcHeight(node);
  right.height = calcHeight(right);

  if(debug) {
    console.log("rotate left");
  }

  return right;
}

function rotateRight(node) {
  let left = node.left;

  if(debug) {
    console.log("node");
  }

  node.left = left.right;
  left.right = node;

  node.height = calcHeight(node);
  left.height = calcHeight(left);

  if(debug) {
    console.log("rotate right");
    console.log(left, node);
  }

  return left;
}

function isRightRight(node, value) {
  let balance = calcBalance(node);
  if(node.right !== null && balance > 1 && value > node.right.value) {
    return true;
  }
  return false;
}

function isRightLeft(node, value) {
  let balance = calcBalance(node);
  if(node.right !== null && balance > 1 && value < node.right.value) {
    return true;
  }
  return false;
}

function isLeftLeft(node, value) {
  let balance = calcBalance(node);
  if(node.left !== null && balance < -1 && value < node.left.value) {
    return true;
  }
  return false;
}

function isLeftRight(node, value) {
  let balance = calcBalance(node);
  if(node.left !== null && balance < -1 && value > node.left.value) {
    return true;
  }
  return false;
}

function calcBalance(node) {
  let leftB = node.left === null ? 0 : node.left.height + 1,
    rightB = node.right === null ? 0 : node.right.height + 1;

  return rightB - leftB;
}

function calcHeight(node) {
  let left = node.left === null ? null : node.left.height,
    right = node.right === null ? null : node.right.height;

  if(left === null && right === null) {
    return 0;
  }

  return Math.max(left, right) + 1;
}
