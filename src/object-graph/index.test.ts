import { expect, describe, test, vi } from "vitest";

import { ObjectGraph } from ".";
import { shirtsMock, extraShirtsMock, type Shirt } from "./index.mock";

describe("length", () => {
  test("get the length of the object graph", () => {
    const shirtToAdd: Shirt = { sku: "9", color: "orange", size: "small" };
    const shirtsObjectGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    expect(shirtsObjectGraph.length).toBe(8);

    shirtsObjectGraph.add(shirtToAdd);

    expect(shirtsObjectGraph.length).toBe(9);
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

  test("get a node of the object graph", () => {
    const shirtsObjectGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    const returnedNode = shirtsObjectGraph.get(shirtsMock[0].sku);

    expect(returnedNode?.color).toBe(shirtsMock[0].color);
    expect(returnedNode?.size).toBe(shirtsMock[0].size);
  });
});

describe("getAll()", () => {
  test("get all nodes of the object graph", () => {
    const shirtsObjectGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    const returnedShirtsObjectGraph = shirtsObjectGraph.getAll();

    expect(shirtsMock.length).toBe(returnedShirtsObjectGraph.length);
    expect(shirtsMock[0]).toEqual(returnedShirtsObjectGraph[0]);
  });
});

describe("copy()", () => {
  test("get a copy of the original object graph", () => {
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
  test("get a copy of the original object graph with a received node added", () => {
    const consoleErrorSpy = vi.spyOn(console, "error");
    const shirtsObjectGraph = new ObjectGraph<Shirt>([], (shirt) => shirt.sku);

    const copiedShirtsObjectGraph = shirtsObjectGraph.toAdded(shirtsMock[0]);

    expect(shirtsObjectGraph.length).toBe(0);
    expect(copiedShirtsObjectGraph.length).toBe(1);

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
  test("get a copy of the original object graph with a received node updated", () => {
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
  test("get a copy of the original object graph with a received node removed", () => {
    const consoleErrorSpy = vi.spyOn(console, "error");
    const shirtsObjectGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    const copiedShirtsObjectGraph = shirtsObjectGraph.toRemoved("1");

    expect(shirtsObjectGraph.length).toBe(8);
    expect(copiedShirtsObjectGraph.length).toBe(7);

    const returnedNodeFromOriginal = shirtsObjectGraph.get("1");

    expect(consoleErrorSpy).not.toHaveBeenCalled();
    expect(returnedNodeFromOriginal).toBeDefined();

    const returnedNodeFromCopy = copiedShirtsObjectGraph.get("1");

    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(returnedNodeFromCopy).toBeUndefined();
  });
});

describe("valuesOf()", () => {
  test("get all values of the provided property", () => {
    const shirtsObjectGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    const sizePropertyValues = shirtsObjectGraph.valuesOf("size");

    expect(sizePropertyValues).toContain("small");
    expect(sizePropertyValues).toContain("medium");
    expect(sizePropertyValues).toContain("large");
  });
});

describe("match()", () => {
  test("get all nodes that match with the provided matcher", () => {
    const shirtsObjectGraph = new ObjectGraph<Shirt>(shirtsMock, (shirt) => shirt.sku);

    const matchedShirts = shirtsObjectGraph.match({
      color: ["yellow", "blue"],
    });

    for (const matchedShirt of matchedShirts) {
      expect(matchedShirt.color).oneOf(["yellow", "blue"]);
    }
  });
});
