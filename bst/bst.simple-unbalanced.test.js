const bst = require('./bst');

describe('Simple examples that have imbalanced trees', () => {
  test('Tree has 3 elements, starting in left left configuration.', () => {
    let tree = bst.create(10);
    
    tree = bst.insert(tree, 6);
    tree = bst.insert(tree, 4);

    expect(tree).toEqual({
      value: 6,
      height: 1,
      left: {
        value: 4,
        height: 0,
        left: null,
        right: null
      },
      right: {
        value: 10,
        height: 0,
        left: null,
        right: null
      }
    });

  });

  test('Tree has 3 elements, starting in left right configuration.', () => {
    let tree = bst.create(10);
    
    tree = bst.insert(tree, 4);
    tree = bst.insert(tree, 6);

    expect(tree).toEqual({
      value: 6,
      height: 1,
      left: {
        value: 4,
        height: 0,
        left: null,
        right: null
      },
      right: {
        value: 10,
        height: 0,
        left: null,
        right: null
      }
    });

  });

  test('Tree has 3 elements, starting in right right configuration.', () => {
    let tree = bst.create(4);
    
    tree = bst.insert(tree, 6);
    tree = bst.insert(tree, 10);

    expect(tree).toEqual({
      value: 6,
      height: 1,
      left: {
        value: 4,
        height: 0,
        left: null,
        right: null
      },
      right: {
        value: 10,
        height: 0,
        left: null,
        right: null
      }
    });

  });

  test('Tree has 3 elements, starting in right left configuration.', () => {
    let tree = bst.create(4);
    
    tree = bst.insert(tree, 10);
    tree = bst.insert(tree, 6);

    expect(tree).toEqual({
      value: 6,
      height: 1,
      left: {
        value: 4,
        height: 0,
        left: null,
        right: null
      },
      right: {
        value: 10,
        height: 0,
        left: null,
        right: null
      }
    });

  });
});
