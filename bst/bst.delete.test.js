const bst = require('./bst');

describe('Test all possible remove node scenarios, remove/insert with no rotations needed.', () => {
  test('Delete tree with one node', () => {
    let tree = bst.create(10);
    
    tree = bst.remove(tree, 10);

    expect(tree).toEqual(null);
  });

  test('Delete a node with no children', () => {
    let tree = bst.create(10);
    
    tree = bst.insert(tree, 4);
    tree = bst.insert(tree, 15);

    tree = bst.remove(tree, 15);

    expect(tree).toEqual({
      value: 10,
      height: 1,
      left: {
        value: 4,
        height: 0,
        left: null,
        right: null
      },
      right: null
    });
  });

  test('Delete a node with 1 left child', () => {
    let tree = bst.create(10);
    
    tree = bst.insert(tree, 4);
    tree = bst.insert(tree, 15);
    tree = bst.insert(tree, 3);

    tree = bst.remove(tree, 4);

    expect(tree).toEqual({
      value: 10,
      height: 1,
      left: {
        value: 3,
        height: 0,
        left: null,
        right: null
      },
      right: {
        value: 15,
        height: 0,
        left: null,
        right: null
      }
    });
  });

  test('Delete a node with 1 right child', () => {
    let tree = bst.create(10);
    
    tree = bst.insert(tree, 4);
    tree = bst.insert(tree, 15);
    tree = bst.insert(tree, 5);

    tree = bst.remove(tree, 4);

    expect(tree).toEqual({
      value: 10,
      height: 1,
      left: {
        value: 5,
        height: 0,
        left: null,
        right: null
      },
      right: {
        value: 15,
        height: 0,
        left: null,
        right: null
      }
    });
  });

  test('Delete a node with 2 children and no grandchildren', () => {
    let tree = bst.create(10);

    tree = bst.insert(tree, 7);
    tree = bst.insert(tree, 15);
    tree = bst.insert(tree, 20);
    tree = bst.insert(tree, 6);
    tree = bst.insert(tree, 9);

    tree = bst.remove(tree, 7);

    expect(tree).toEqual({
      value: 10,
      height: 2,
      left: {
        value: 9,
        height: 1,
        left: {
          value: 6,
          height: 0,
          left: null,
          right: null
        },
        right: null
      },
      right: {
        value: 15,
        height: 1,
        left: null,
        right: {
          value: 20,
          height: 0,
          left: null,
          right: null
        }
      }
    });
  });

  test('Delete a node with 2 children and 1 right-left grandchild', () => {
    let tree = bst.create(10);

    tree = bst.insert(tree, 7);
    tree = bst.insert(tree, 15);
    tree = bst.insert(tree, 20);
    tree = bst.insert(tree, 6);
    tree = bst.insert(tree, 9);
    tree = bst.insert(tree, 8);

    tree = bst.remove(tree, 7);

    expect(tree).toEqual({
      value: 10,
      height: 2,
      left: {
        value: 8,
        height: 1,
        left: {
          value: 6,
          height: 0,
          left: null,
          right: null
        },
        right: {
          value: 9,
          height: 0,
          left: null,
          right: null
        }
      },
      right: {
        value: 15,
        height: 1,
        left: null,
        right: {
          value: 20,
          height: 0,
          left: null,
          right: null
        }
      }
    });
  });

  test('Delete a node with 2 children, and 1 right-left-right descendant', () => {
    let tree = bst.create(30);

    // insert values
    [20, 60, 70, 10, 40, 50].forEach(num => {
      tree = bst.insert(tree, num);
    });

    tree = bst.remove(tree, 30);

    expect(tree).toEqual({
      value: 40,
      height: 2,
      left: {
        value: 20,
        height: 1,
        left: {
          value: 10,
          height: 0,
          left: null,
          right: null
        },
        right: null
      },
      right: {
        value: 60,
        height: 1,
        left: {
          value: 50,
          height: 0,
          left: null,
          right: null
        },
        right: {
          value: 70,
          height: 0,
          left: null,
          right: null
        }
      }
    });

  });

});
