const bst = require('./bst');

describe('Simple examples that do not involve an imbalanced trees', () => {
  let tree = bst.create(10);
  
  test('Tree has 1 element', () => {
    expect(tree).toEqual({
      value: 10,
      height: 0,
      left: null,
      right: null
    });
  });

  test('Tree has 2 elements', () => {
    tree = bst.insert(tree, 20);

    expect(tree).toEqual({
      value: 10,
      height: 1,
      left: null,
      right: {
        height: 0,
        value: 20,
        left: null,
        right: null
      }
    });
  });

  test('Tree has 3 elements', () => {
    tree = bst.insert(tree, 5);

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
        value: 20,
        height: 0,
        left: null,
        right: null
      }
    });
  });

  test('Tree has 4 elements', () => {
    tree = bst.insert(tree, 4);

    expect(tree).toEqual({
      value: 10,
      height: 2,
      left: {
        value: 5,
        height: 1,
        left: {
          value: 4,
          height: 0,
          left: null,
          right: null
        },
        right: null
      },
      right: {
        value: 20,
        height: 0,
        left: null,
        right: null
      }
    });
  });
});
