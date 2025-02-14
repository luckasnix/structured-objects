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
    const shirtsObjectGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    expect(shirtsObjectGraph.length).toBe(8);

    shirtsObjectGraph.add(shirtToAdd);

    expect(shirtsObjectGraph.length).toBe(9);
  });
});

describe("size", () => {
  test("gets the size of the object graph", () => {
    const shirtToAdd: Shirt = { sku: "9", color: "orange", size: "small" };
    const shirtsObjectGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    expect(shirtsObjectGraph.size).toBe(8);

    shirtsObjectGraph.add(shirtToAdd);

    expect(shirtsObjectGraph.size).toBe(9);
  });
});

describe("keys()", () => {
  test("gets an iterator object that contains the keys of the object graph", () => {
    const shirtsObjectGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    const shirtsObjectGraphKeysIterator = shirtsObjectGraph.keys();
    const shirtsObjectGraphKeys = Array.from(shirtsObjectGraphKeysIterator);

    expectTypeOf(shirtsObjectGraphKeysIterator[Symbol.iterator]).toBeFunction();
    expect(shirtsObjectGraphKeys).toEqual(["1", "2", "3", "4", "5", "6", "7", "8"]);
  });
});

describe("values()", () => {
  test("gets an iterator object that contains the values of the object graph", () => {
    const shirtsObjectGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    const shirtsObjectGraphValuesIterator = shirtsObjectGraph.values();
    const shirtsObjectGraphValues = Array.from(shirtsObjectGraphValuesIterator);

    expectTypeOf(shirtsObjectGraphValuesIterator[Symbol.iterator]).toBeFunction();
    expect(shirtsObjectGraphValues).toHaveLength(8);
    expect(shirtsObjectGraphValues[0]).toStrictEqual(shirtsMock[0]);
  });
});

describe("get()", () => {
  test("logs an error when there is no node with the provided key in the object graph", () => {
    const consoleErrorSpy = vi.spyOn(console, "error");
    const shirtsObjectGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    const returnedNode = shirtsObjectGraph.get("9");

    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(returnedNode).toBeUndefined();
  });

  test("gets a node of the object graph", () => {
    const shirtsObjectGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    const returnedNode = shirtsObjectGraph.get(shirtsMock[0].sku);

    expect(returnedNode?.color).toBe(shirtsMock[0].color);
    expect(returnedNode?.size).toBe(shirtsMock[0].size);
  });
});

describe("copy()", () => {
  test("gets a copy of the original object graph", () => {
    const shirtsObjectGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    const copiedShirtsObjectGraph = shirtsObjectGraph.copy();

    expect(shirtsObjectGraph.get("1")).toEqual(copiedShirtsObjectGraph.get("1"));
  });
});

describe("add()", () => {
  test("logs an error when a node with the same key already exists in the object graph", () => {
    const consoleErrorSpy = vi.spyOn(console, "error");
    const shirtsObjectGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    shirtsObjectGraph.add(shirtsMock[0]);

    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  test("adds a node to the object graph", () => {
    const shirtsObjectGraph = new ObjectGraph<Shirt>([], (shirt) => shirt.sku);

    shirtsObjectGraph.add(shirtsMock[0]);

    expect(shirtsObjectGraph.get("1")).toEqual(shirtsMock[0]);
  });
});

describe("toAdded()", () => {
  test("gets a copy of the original object graph with a received node added", () => {
    const consoleErrorSpy = vi.spyOn(console, "error");
    const shirtsObjectGraph = new ObjectGraph<Shirt>([], (shirt) => shirt.sku);

    const copiedShirtsObjectGraph = shirtsObjectGraph.toAdded(shirtsMock[0]);

    expect(shirtsObjectGraph.size).toBe(0);
    expect(copiedShirtsObjectGraph.size).toBe(1);

    const returnedNodeFromCopy = copiedShirtsObjectGraph.get("1");

    expect(consoleErrorSpy).not.toHaveBeenCalled();
    expect(returnedNodeFromCopy).toBeDefined();

    const returnedNodeFromOriginal = shirtsObjectGraph.get("1");

    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(returnedNodeFromOriginal).toBeUndefined();
  });
});

describe("update()", () => {
  test("logs an error when there is no node with the same key in the object graph", () => {
    const consoleErrorSpy = vi.spyOn(console, "error");
    const shirtsObjectGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    shirtsObjectGraph.update(extraShirtsMock[0]);

    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  test("updates a node in the object graph", () => {
    const shirtToUpdate: Shirt = { sku: "1", color: "red", size: "large" };
    const shirtsObjectGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    expect(shirtsObjectGraph.get("1")?.size).toBe("small");

    shirtsObjectGraph.update(shirtToUpdate);

    expect(shirtsObjectGraph.get("1")?.size).toBe("large");
  });
});

describe("toUpdated()", () => {
  test("gets a copy of the original object graph with a received node updated", () => {
    const shirtToUpdate: Shirt = { sku: "1", color: "red", size: "large" };
    const shirtsObjectGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    const copiedShirtsObjectGraph = shirtsObjectGraph.toUpdated(shirtToUpdate);

    expect(shirtsObjectGraph.get("1")?.size).toBe("small");
    expect(copiedShirtsObjectGraph.get("1")?.size).toBe("large");
  });
});

describe("remove()", () => {
  test("logs an error when there is no node with the provided key in the object graph", () => {
    const consoleErrorSpy = vi.spyOn(console, "error");
    const shirtsObjectGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    const returnedNode = shirtsObjectGraph.remove("9");

    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(returnedNode).toBeUndefined();
  });

  test("removes a node from the object graph", () => {
    const consoleErrorSpy = vi.spyOn(console, "error");
    const shirtsObjectGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    const returnedNodeFromFirstAttempt = shirtsObjectGraph.get("1");

    expect(consoleErrorSpy).not.toHaveBeenCalled();
    expect(returnedNodeFromFirstAttempt).toBeDefined();

    shirtsObjectGraph.remove("1");

    expect(consoleErrorSpy).not.toHaveBeenCalled();

    const returnedNodeFromSecondAttempt = shirtsObjectGraph.get("1");

    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(returnedNodeFromSecondAttempt).toBeUndefined();
  });
});

describe("toRemoved()", () => {
  test("gets a copy of the original object graph with a received node removed", () => {
    const consoleErrorSpy = vi.spyOn(console, "error");
    const shirtsObjectGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    const copiedShirtsObjectGraph = shirtsObjectGraph.toRemoved("1");

    expect(shirtsObjectGraph.size).toBe(8);
    expect(copiedShirtsObjectGraph.size).toBe(7);

    const returnedNodeFromOriginal = shirtsObjectGraph.get("1");

    expect(consoleErrorSpy).not.toHaveBeenCalled();
    expect(returnedNodeFromOriginal).toBeDefined();

    const returnedNodeFromCopy = copiedShirtsObjectGraph.get("1");

    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(returnedNodeFromCopy).toBeUndefined();
  });
});

describe("valuesOf()", () => {
  test("gets all values of the provided property", () => {
    const shirtsObjectGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    const sizePropertyValues = shirtsObjectGraph.valuesOf("size");

    expect(sizePropertyValues).toContain("small");
    expect(sizePropertyValues).toContain("medium");
    expect(sizePropertyValues).toContain("large");
  });
});

describe("match()", () => {
  test("gets all nodes that match with the provided shape", () => {
    const colorsToMatch: Color[] = ["red", "blue"];
    const sizesToMatch: Size[] = ["small", "medium"];
    const shirtsObjectGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    const matchedShirts = shirtsObjectGraph.match({
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
    const shirtsObjectGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    const matchedShirts = shirtsObjectGraph.match({
      color: colorsToMatch,
      size: undefined,
    });

    expect(matchedShirts).toHaveLength(3);
    for (const matchedShirt of matchedShirts) {
      expect(matchedShirt.color).oneOf(colorsToMatch);
    }
  });

  test("gets all nodes for an empty shape", () => {
    const shirtsObjectGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    const matchedShirts = shirtsObjectGraph.match({});

    expect(matchedShirts).toHaveLength(8);
  });
});
