import { describe, expect, expectTypeOf, test, vi } from "vitest";
import {
  type Color,
  type Shirt,
  type Size,
  extraShirtsMock,
  shirtsMock,
} from "../mocks/object-graph.mock";
import { ObjectGraph } from "../src/object-graph";

describe("length", () => {
  test("gets the length of the object graph", () => {
    const shirtToAdd: Shirt = { sku: "9", color: "orange", size: "small" };
    const shirtsGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    expect(shirtsGraph.length).toBe(8);

    shirtsGraph.add(shirtToAdd);

    expect(shirtsGraph.length).toBe(9);
  });
});

describe("size", () => {
  test("gets the size of the object graph", () => {
    const shirtToAdd: Shirt = { sku: "9", color: "orange", size: "small" };
    const shirtsGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    expect(shirtsGraph.size).toBe(8);

    shirtsGraph.add(shirtToAdd);

    expect(shirtsGraph.size).toBe(9);
  });
});

describe("keys()", () => {
  test("gets an iterator object that contains the keys of the object graph", () => {
    const shirtsGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    const shirtsGraphKeysIterator = shirtsGraph.keys();
    const shirtsGraphKeys = Array.from(shirtsGraphKeysIterator);

    expectTypeOf(shirtsGraphKeysIterator[Symbol.iterator]).toBeFunction();
    expect(shirtsGraphKeys).toEqual(["1", "2", "3", "4", "5", "6", "7", "8"]);
  });
});

describe("values()", () => {
  test("gets an iterator object that contains the values of the object graph", () => {
    const shirtsGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    const shirtsGraphValuesIterator = shirtsGraph.values();
    const shirtsGraphValues = Array.from(shirtsGraphValuesIterator);

    expectTypeOf(shirtsGraphValuesIterator[Symbol.iterator]).toBeFunction();
    expect(shirtsGraphValues).toHaveLength(8);
    expect(shirtsGraphValues[0]).toStrictEqual(shirtsMock[0]);
  });
});

describe("get()", () => {
  test("logs an error when there is no node with the provided key in the object graph", () => {
    const consoleErrorSpy = vi.spyOn(console, "error");
    const shirtsGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    const returnedNode = shirtsGraph.get("9");

    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(returnedNode).toBeUndefined();
  });

  test("gets a node of the object graph", () => {
    const shirtsGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    const returnedNode = shirtsGraph.get(shirtsMock[0].sku);

    expect(returnedNode?.color).toBe(shirtsMock[0].color);
    expect(returnedNode?.size).toBe(shirtsMock[0].size);
  });
});

describe("copy()", () => {
  test("gets a copy of the original object graph", () => {
    const shirtsGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    const copiedShirtsGraph = shirtsGraph.copy();

    expect(shirtsGraph.get("1")).toEqual(copiedShirtsGraph.get("1"));
  });
});

describe("subgraph()", () => {
  test("gets a subgraph of the original object graph", () => {
    const shirtsGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);
    const shirtsSubgraph = shirtsGraph.subgraph(["1", "2", "3", "4"]);

    expect(shirtsGraph).toHaveLength(8);
    expect(shirtsSubgraph).toHaveLength(4);
  });
});

describe("add()", () => {
  test("logs an error when a node with the same key already exists in the object graph", () => {
    const consoleErrorSpy = vi.spyOn(console, "error");
    const shirtsGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    shirtsGraph.add(shirtsMock[0]);

    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  test("adds a node to the object graph", () => {
    const shirtsGraph = new ObjectGraph<Shirt>([], (shirt) => shirt.sku);

    shirtsGraph.add(shirtsMock[0]);

    expect(shirtsGraph.get("1")).toEqual(shirtsMock[0]);
  });
});

describe("toAdded()", () => {
  test("gets a copy of the original object graph with a received node added", () => {
    const consoleErrorSpy = vi.spyOn(console, "error");
    const shirtsGraph = new ObjectGraph<Shirt>([], (shirt) => shirt.sku);

    const copiedShirtsGraph = shirtsGraph.toAdded(shirtsMock[0]);

    expect(shirtsGraph.size).toBe(0);
    expect(copiedShirtsGraph.size).toBe(1);

    const returnedNodeFromCopy = copiedShirtsGraph.get("1");

    expect(consoleErrorSpy).not.toHaveBeenCalled();
    expect(returnedNodeFromCopy).toBeDefined();

    const returnedNodeFromOriginal = shirtsGraph.get("1");

    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(returnedNodeFromOriginal).toBeUndefined();
  });
});

describe("update()", () => {
  test("logs an error when there is no node with the same key in the object graph", () => {
    const consoleErrorSpy = vi.spyOn(console, "error");
    const shirtsGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    shirtsGraph.update(extraShirtsMock[0]);

    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  test("updates a node in the object graph", () => {
    const shirtToUpdate: Shirt = { sku: "1", color: "red", size: "large" };
    const shirtsGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    expect(shirtsGraph.get("1")?.size).toBe("small");

    shirtsGraph.update(shirtToUpdate);

    expect(shirtsGraph.get("1")?.size).toBe("large");
  });
});

describe("toUpdated()", () => {
  test("gets a copy of the original object graph with a received node updated", () => {
    const shirtToUpdate: Shirt = { sku: "1", color: "red", size: "large" };
    const shirtsGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    const copiedShirtsGraph = shirtsGraph.toUpdated(shirtToUpdate);

    expect(shirtsGraph.get("1")?.size).toBe("small");
    expect(copiedShirtsGraph.get("1")?.size).toBe("large");
  });
});

describe("remove()", () => {
  test("logs an error when there is no node with the provided key in the object graph", () => {
    const consoleErrorSpy = vi.spyOn(console, "error");
    const shirtsGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    const returnedNode = shirtsGraph.remove("9");

    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(returnedNode).toBeUndefined();
  });

  test("removes a node from the object graph", () => {
    const consoleErrorSpy = vi.spyOn(console, "error");
    const shirtsGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    const returnedNodeFromFirstAttempt = shirtsGraph.get("1");

    expect(consoleErrorSpy).not.toHaveBeenCalled();
    expect(returnedNodeFromFirstAttempt).toBeDefined();

    shirtsGraph.remove("1");

    expect(consoleErrorSpy).not.toHaveBeenCalled();

    const returnedNodeFromSecondAttempt = shirtsGraph.get("1");

    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(returnedNodeFromSecondAttempt).toBeUndefined();
  });
});

describe("toRemoved()", () => {
  test("gets a copy of the original object graph with a received node removed", () => {
    const consoleErrorSpy = vi.spyOn(console, "error");
    const shirtsGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    const copiedShirtsGraph = shirtsGraph.toRemoved("1");

    expect(shirtsGraph.size).toBe(8);
    expect(copiedShirtsGraph.size).toBe(7);

    const returnedNodeFromOriginal = shirtsGraph.get("1");

    expect(consoleErrorSpy).not.toHaveBeenCalled();
    expect(returnedNodeFromOriginal).toBeDefined();

    const returnedNodeFromCopy = copiedShirtsGraph.get("1");

    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(returnedNodeFromCopy).toBeUndefined();
  });
});

describe("valuesOf()", () => {
  test("gets all values of the provided property", () => {
    const shirtsGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    const sizePropertyValues = shirtsGraph.valuesOf("size");

    expect(sizePropertyValues).toContain("small");
    expect(sizePropertyValues).toContain("medium");
    expect(sizePropertyValues).toContain("large");
  });

  test("gets all values of the provided property from selected nodes", () => {
    const shirtsGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    const sizePropertyValues = shirtsGraph.valuesOf("size", ["1", "2", "3", "4"]);

    expect(sizePropertyValues).toContain("small");
    expect(sizePropertyValues).toContain("medium");
    expect(sizePropertyValues).not.toContain("large");
  });
});

describe("match()", () => {
  test("gets all nodes that match with the provided shape", () => {
    const colorsToMatch: Color[] = ["red", "blue"];
    const sizesToMatch: Size[] = ["small", "medium"];
    const shirtsGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    const matchedShirts = shirtsGraph.match({
      color: colorsToMatch,
      size: sizesToMatch,
    });

    expect(matchedShirts).toHaveLength(4);
    for (const matchedShirt of matchedShirts) {
      expect(matchedShirt.color).oneOf(colorsToMatch);
      expect(matchedShirt.size).oneOf(sizesToMatch);
    }
  });

  test("gets matched nodes ignoring undefined value in the shape", () => {
    const colorsToMatch: Color[] = ["yellow", "green"];
    const shirtsGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    const matchedShirts = shirtsGraph.match({
      color: colorsToMatch,
      size: undefined,
    });

    expect(matchedShirts).toHaveLength(3);
    for (const matchedShirt of matchedShirts) {
      expect(matchedShirt.color).oneOf(colorsToMatch);
    }
  });

  test("gets all nodes for an empty shape", () => {
    const shirtsGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    const matchedShirts = shirtsGraph.match({});

    expect(matchedShirts).toHaveLength(8);
  });
});
