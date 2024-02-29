import { expect, describe, test } from 'vitest';

import { ObjectGraph } from './main';
import { shirtsMock, extraShirtsMock, type Shirt } from './main.mock';

describe('length', () => {
  test('get the length of the object graph', () => {
    const shirtToInsert: Shirt = { sku: '9', color: 'orange', size: 'small' };
    const shirtsObjectGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    expect(shirtsObjectGraph.length).toBe(8);

    shirtsObjectGraph.insert(shirtToInsert);

    expect(shirtsObjectGraph.length).toBe(9);
  });
});

describe('get()', () => {
  test('throws an error when there is no node with the provided key in the object graph', () => {
    const shirtsObjectGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    expect(() => {
      shirtsObjectGraph.get('9');
    }).toThrowError();
  });

  test('get a node of the object graph', () => {
    const shirtsObjectGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    const returnedNode = shirtsObjectGraph.get(shirtsMock[0].sku);

    expect(returnedNode.color).toBe(shirtsMock[0].color);
    expect(returnedNode.size).toBe(shirtsMock[0].size);
  });
});

describe('getAll()', () => {
  test('get all nodes of the object graph', () => {
    const shirtsObjectGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);
    const returnedShirtsObjectGraph = shirtsObjectGraph.getAll();

    expect(shirtsMock.length).toBe(returnedShirtsObjectGraph.length);
    expect(shirtsMock[0]).toEqual(returnedShirtsObjectGraph[0]);
  });
});

describe('copy()', () => {
  test('get a copy of the original object graph', () => {
    const shirtsObjectGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    const copiedShirtsObjectGraph = shirtsObjectGraph.copy();

    expect(shirtsObjectGraph.get('1')).toEqual(copiedShirtsObjectGraph.get('1'));
  });
});

describe('insert()', () => {
  test('throws an error when a node with the same key already exists in the object graph', () => {
    const shirtsObjectGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    expect(() => {
      shirtsObjectGraph.insert(shirtsMock[0]);
    }).toThrowError();
  });

  test('inserts a node to the object graph', () => {
    const shirtsObjectGraph = new ObjectGraph<Shirt>([], (shirt) => shirt.sku);

    shirtsObjectGraph.insert(shirtsMock[0]);

    expect(shirtsObjectGraph.get('1')).toEqual(shirtsMock[0]);
  });
});

describe('toInserted()', () => {
  test('get a copy of the original object graph with a received node inserted', () => {
    const shirtsObjectGraph = new ObjectGraph<Shirt>([], (shirt) => shirt.sku);

    const copiedShirtsObjectGraph = shirtsObjectGraph.toInserted(shirtsMock[0]);

    shirtsObjectGraph.insert(shirtsMock[0]);

    expect(shirtsObjectGraph.get('1')).toEqual(copiedShirtsObjectGraph.get('1'));
  });
});

describe('replace()', () => {
  test('throws an error when there is no node with the same key in the object graph', () => {
    const shirtsObjectGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    expect(() => {
      shirtsObjectGraph.replace(extraShirtsMock[0]);
    }).toThrowError();
  });

  test('replaces a node in the object graph', () => {
    const shirtToReplace: Shirt = { sku: '1', color: 'red', size: 'large' };
    const shirtsObjectGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    expect(shirtsObjectGraph.get('1').size).toBe('small');

    shirtsObjectGraph.replace(shirtToReplace);

    expect(shirtsObjectGraph.get('1').size).toBe('large');
  });
});

describe('toReplaced()', () => {
  test('get a copy of the original object graph with a received node replaced', () => {
    const shirtToReplace: Shirt = { sku: '1', color: 'red', size: 'large' };
    const shirtsObjectGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    const copiedShirtsObjectGraph = shirtsObjectGraph.toReplaced(shirtToReplace);

    expect(shirtsObjectGraph.get('1').size).toBe('small');
    expect(copiedShirtsObjectGraph.get('1').size).toBe('large');
  });
});

describe('remove()', () => {
  test('throws an error when there is no node with the provided key in the object graph', () => {
    const shirtsObjectGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    expect(() => {
      shirtsObjectGraph.remove('9');
    }).toThrowError();
  });

  test('removes a node to the object graph', () => {
    const shirtsObjectGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    expect(() => {
      shirtsObjectGraph.get('1');
    }).not.toThrowError();

    shirtsObjectGraph.remove('1');

    expect(() => {
      shirtsObjectGraph.get('1');
    }).toThrowError();
  });
});

describe('toRemoved()', () => {
  test('get a copy of the original object graph with a received node removed', () => {
    const shirtsObjectGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    const copiedShirtsObjectGraph = shirtsObjectGraph.toRemoved('1');

    expect(shirtsObjectGraph.length).toBe(8);
    expect(copiedShirtsObjectGraph.length).toBe(7);
  });
});
