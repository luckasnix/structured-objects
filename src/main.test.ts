import { expect, describe, test } from 'vitest';

import ObjectGraph from './main';
import { shirtsMock, extraShirtsMock, type Shirt } from './main.mock';

describe('length', () => {
  test('get the length of the graph', () => {
    const shirtToAdd: Shirt = { sku: '9', color: 'orange', size: 'small' };
    const shirtsObjectGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    expect(shirtsObjectGraph.length).toBe(8);

    shirtsObjectGraph.setNode(shirtToAdd);

    expect(shirtsObjectGraph.length).toBe(9);
  });
});

describe('setNode()', () => {
  test('add a node to the graph', () => {
    const shirtToAdd: Shirt = { sku: '1', color: 'red', size: 'small' };
    const shirtsObjectGraph = new ObjectGraph<Shirt>([], (shirt) => shirt.sku);

    shirtsObjectGraph.setNode(shirtToAdd);

    expect(shirtsObjectGraph.getNode(shirtToAdd.sku)).toEqual(shirtToAdd);
  });

  test('update a node of the graph', () => {
    const shirtsObjectGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    expect(shirtsObjectGraph.getNode('3').color).toBe('yellow');
    expect(shirtsObjectGraph.getNode('3').size).toBe('small');

    shirtsObjectGraph.setNode({ sku: '3', color: 'red', size: 'large' });

    expect(shirtsObjectGraph.getNode('3').color).toBe('red');
    expect(shirtsObjectGraph.getNode('3').size).toBe('large');
  });
});

describe('setNodes()', () => {
  test('add many nodes to the graph', () => {
    const shirtsObjectGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    expect(shirtsObjectGraph.length).toBe(8);

    shirtsObjectGraph.setNodes(extraShirtsMock);

    expect(shirtsObjectGraph.length).toBe(16);
  });
});

describe('deleteNode()', () => {
  test('delete a node from the graph', () => {
    const shirtsObjectGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    expect(() => shirtsObjectGraph.getNode(shirtsMock[0].sku)).not.toThrowError();

    shirtsObjectGraph.deleteNode(shirtsMock[0].sku);

    expect(() => shirtsObjectGraph.getNode(shirtsMock[0].sku)).toThrowError();
  });

  test('delete a non-existent node from the graph and throw an error', () => {
    const shirtsObjectGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    expect(() => shirtsObjectGraph.deleteNode(shirtsMock[shirtsMock.length].sku)).toThrowError();
  });
});

describe('getNode()', () => {
  test('get a node of the graph', () => {
    const firstShirt = shirtsMock[0];
    const shirtsObjectGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    const nodeObtained = shirtsObjectGraph.getNode(firstShirt.sku);

    expect(nodeObtained.color).toBe(firstShirt.color);
    expect(nodeObtained.size).toBe(firstShirt.size);
  });
});

describe('getValuesFromProperty()', () => {
  test('get values from properties of nodes of the graph', () => {
    const shirtsObjectGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    const valuesFromColorProperty = shirtsObjectGraph.getValuesFromProperty('color');
    const valuesFromSizeProperty = shirtsObjectGraph.getValuesFromProperty('size');

    expect(valuesFromColorProperty).toContain('red');
    expect(valuesFromColorProperty).toContain('yellow');
    expect(valuesFromColorProperty).toContain('green');
    expect(valuesFromColorProperty).toContain('blue');
    expect(valuesFromSizeProperty).toContain('small');
    expect(valuesFromSizeProperty).toContain('medium');
    expect(valuesFromSizeProperty).toContain('large');
  });
});

describe('getMatchedNodes()', () => {
  test('get matching nodes in the graph', () => {
    const shirtsObjectGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    const matchedShirts = shirtsObjectGraph.getMatchedNodes({
      color: ['red', 'blue'],
      size: ['small', 'medium'],
    });

    expect(matchedShirts.length).toBe(4);
  });
});
