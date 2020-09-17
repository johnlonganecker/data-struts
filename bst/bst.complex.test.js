const bst = require('./bst');

describe('Complex examples that involve, imbalanced trees and more than 3 nodes', () => {
  test('Tree has 5 elements with left left node imbalance', () => {
    let tree = bst.create(10);

    tree = bst.insert(tree, 20);
    tree = bst.insert(tree, 5);
    tree = bst.insert(tree, 4);
    tree = bst.insert(tree, 3);
    
    expect(tree).toEqual({
      value: 10,
      height: 2,
      left: {
        value: 4,
        height: 1,
        left: {
          value: 3,
          height: 0,
          left: null,
          right: null 
        },
        right: {
            value: 5,
            height: 0,
            left: null,
            right: null
          }
      },
      right: {
        value: 20,
        height: 0,
        left: null,
        right: null
      }
    });
  });

  test('Tree has 5 elements with left right node imbalance', () => {
    let tree = bst.create(100);

    tree = bst.insert(tree, 200);
    tree = bst.insert(tree, 50);
    tree = bst.insert(tree, 40);
    tree = bst.insert(tree, 45);
    
    expect(tree).toEqual({
      value: 100,
      height: 2,
      left: {
        value: 45,
        height: 1,
        left: {
          value: 40,
          height: 0,
          left: null,
          right: null 
        },
        right: {
            value: 50,
            height: 0,
            left: null,
            right: null
          }
      },
      right: {
        value: 200,
        height: 0,
        left: null,
        right: null
      }
    });
  });

  test('Tree has 5 elements with right right node imbalance', () => {
    let tree = bst.create(10);

    tree = bst.insert(tree, 5);
    tree = bst.insert(tree, 20);
    tree = bst.insert(tree, 30);
    tree = bst.insert(tree, 40);
    
    expect(tree).toEqual({
      value: 10,
      height: 2,
      left: {
        value: 5,
        height: 0,
        left: null,
        right: null
      },
      right: {
        value: 30,
        height: 1,
        left: {
          value: 20,
          height: 0,
          left: null,
          right: null 
        },
        right: {
            value: 40,
            height: 0,
            left: null,
            right: null
          }
      }
    });
  });

  test('Tree has 5 elements with right left node imbalance', () => {
    let tree = bst.create(10);

    tree = bst.insert(tree, 5);
    tree = bst.insert(tree, 20);
    tree = bst.insert(tree, 30);
    tree = bst.insert(tree, 25);
    
    expect(tree).toEqual({
      value: 10,
      height: 2,
      left: {
        value: 5,
        height: 0,
        left: null,
        right: null
      },
      right: {
        value: 25,
        height: 1,
        left: {
          value: 20,
          height: 0,
          left: null,
          right: null 
        },
        right: {
            value: 30,
            height: 0,
            left: null,
            right: null
          }
      }
    });
  });
});
