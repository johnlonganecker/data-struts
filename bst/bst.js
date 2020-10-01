/*
 * node = {
 *  value: <int>,
 *  left: <node>,
 *  right: <node>,
 *  height: 0,1,2,3,4,...
 * }
 */

const fs = require('fs');

let debug = false;

function rebalance(node, value) {

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
}

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

  return rebalance(node, value);
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
  if(tree === null) {
    return tree;
  }
  else if(value < tree.value) {
    tree.left = this.remove(tree.left, value);
  }
  else if(value > tree.value) {
    tree.right = this.remove(tree.right, value);
  }
  else {
    // if both exists
    if(tree.left !== null && tree.right !== null) { 
      // traverse, find smallest value on right side
      let smallest = tree.right;

      while(smallest.left !== null) {
        smallest = smallest.left;
      }
      tree.value = smallest.value;
      tree.right = this.remove(tree.right, smallest.value);
    }
    // if only right child
    else if(tree.right !== null) {
      return tree.right;
    }
    // if only left child
    else if(tree.left !== null) {
      return tree.left;
    }
    // no children
    else if(tree.left === null && tree.right == null) {
      return null;
    }
  }

  return rebalance(tree, value);
};

function newNode(value) {
  return {
    value: value,
    right: null,
    left: null,
    height: 0
  };
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

function convertDataFormat(tree) {
  let result = {
    name: tree.value,
    children: []
  }

  // go left
  if(tree.left !== null) {
    result.children.push(convertDataFormat(tree.left));
  }
  // go right
  if(tree.right !== null) {
    result.children.push(convertDataFormat(tree.right));
  }

  return result;
}

exports.writeFile = function(tree) {
  let vizGraphFormat = JSON.stringify({ version: "1.0.0", graph: convertDataFormat(tree) });

  fs.writeFile('/Users/johnlonganecker/projects/graph-viz/graph-data/test.json', vizGraphFormat, err => {
    console.log(err);
  });
}

exports.delayedAdd = function(tree, arr, delay) {
  let iID = setInterval(() => {
    if(arr.length === 0) {
      clearInterval(iID);  
    }
    let node = arr.shift();
    console.log(`adding ${node}`);

    tree = exports.insert(tree, node);

    exports.writeFile(tree);
  }, delay);

  return tree;
}
