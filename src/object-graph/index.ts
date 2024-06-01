export class ObjectGraph<NodeValue extends Record<string, unknown>> {
  private nodes: Map<string, NodeValue>;
  private keyExtractor: (nodeValue: NodeValue) => string;

  constructor(nodeValues: Array<NodeValue>, keyExtractor: (nodeValue: NodeValue) => string) {
    if (!nodeValues) {
      throw new Error('Provide a value for the "nodeValues" parameter');
    }
    if (!keyExtractor) {
      throw new Error('Provide a value for the "keyExtractor" parameter');
    }
    this.nodes = new Map();
    this.keyExtractor = keyExtractor;
    if (nodeValues.length > 0) {
      for (const nodeValue of nodeValues) {
        this.nodes.set(this.keyExtractor(nodeValue), nodeValue);
      }
    }
  }

  /**
   * @description Returns the length of the object graph.
   */
  public get length() {
    return this.nodes.size;
  }

  /**
   * @description Returns a node of the object graph.
   */
  public get(nodeKey: string) {
    if (!nodeKey) {
      throw new Error('Provide a value for the "nodeKey" parameter');
    }
    if (typeof nodeKey !== "string") {
      throw new TypeError('The parameter "nodeKey" must be a string');
    }
    const nodeValue = this.nodes.get(nodeKey);
    if (!nodeValue) {
      console.error("A node with this key does not exist in the object graph");
    }
    return nodeValue;
  }

  /**
   * @description Returns all nodes of the object graph.
   */
  public getAll() {
    return Array.from(this.nodes.values());
  }

  /**
   * @description Returns a copy of the original object graph.
   */
  public copy() {
    return new ObjectGraph(Array.from(this.nodes.values()), this.keyExtractor);
  }

  /**
   * @description Adds a node to the object graph.
   */
  public add(nodeValue: NodeValue) {
    if (!nodeValue) {
      throw new Error('Provide a value for the "nodeValue" parameter');
    }
    const nodeKey = this.keyExtractor(nodeValue);
    if (this.nodes.get(nodeKey)) {
      console.error("A node with the same key already exists in the object graph");
    }
    this.nodes.set(nodeKey, nodeValue);
  }

  /**
   * @description Returns a copy of the original object graph with a received node added.
   */
  public toAdded(nodeValue: NodeValue) {
    const copiedObjectGraph = this.copy();
    copiedObjectGraph.add(nodeValue);
    return copiedObjectGraph;
  }

  /**
   * @description Updates a node in the object graph.
   */
  public update(nodeValue: NodeValue) {
    if (!nodeValue) {
      throw new Error('Provide a value for the "nodeValue" parameter');
    }
    const nodeKey = this.keyExtractor(nodeValue);
    if (!this.nodes.get(nodeKey)) {
      console.error("A node with the provided key does not exist in the object graph");
    }
    this.nodes.set(nodeKey, nodeValue);
  }

  /**
   * @description Returns a copy of the original object graph with a received node updated.
   */
  public toUpdated(nodeValue: NodeValue) {
    const copiedObjectGraph = this.copy();
    copiedObjectGraph.update(nodeValue);
    return copiedObjectGraph;
  }

  /**
   * @description Removes a node from the object graph.
   */
  public remove(nodeKey: string) {
    if (!nodeKey) {
      throw new Error('Provide a value for the "nodeKey" parameter');
    }
    if (typeof nodeKey !== "string") {
      throw new TypeError('The parameter "nodeKey" must be a string');
    }
    if (!this.nodes.get(nodeKey)) {
      console.error("A node with this key does not exist in this object graph");
    }
    this.nodes.delete(nodeKey);
  }

  /**
   * @description Returns a copy of the original object graph with a received node removed.
   */
  public toRemoved(nodeKey: string) {
    const copiedObjectGraph = this.copy();
    copiedObjectGraph.remove(nodeKey);
    return copiedObjectGraph;
  }

  /**
   * @description Returns all values of the provided property.
   */
  public valuesOf(property: keyof NodeValue) {
    if (!property) {
      throw new Error('Provide a value for the "property" parameter');
    }
    if (typeof property !== "string") {
      throw new TypeError('The parameter "property" must be a string');
    }
    const propertyValues = new Set();
    for (const [_, nodeValue] of this.nodes) {
      propertyValues.add(nodeValue[property]);
    }
    return Array.from(propertyValues);
  }

  /**
   * @description Returns all nodes that match with the provided matcher.
   */
  public match(matcher: Partial<Record<keyof NodeValue, Array<unknown>>>) {
    if (!matcher) {
      throw new Error('Provide a value for the "matcher" parameter');
    }
    const matchedNodes: Array<NodeValue> = new Array();
    for (const [_, nodeValue] of this.nodes) {
      const matcherEntries = Object.entries(matcher) as Array<[keyof NodeValue, Array<unknown>]>;
      const hasMatched = matcherEntries.every((matcherEntry) => {
        return matcherEntry[1].includes(nodeValue[matcherEntry[0]]);
      });
      if (hasMatched) {
        matchedNodes.push(nodeValue);
      }
    }
    return Array.from(matchedNodes);
  }
}
