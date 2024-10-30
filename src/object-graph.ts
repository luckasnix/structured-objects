export class ObjectGraph<NodeValue extends Record<string, unknown>> {
  private nodes: Map<string, NodeValue>;
  private keyExtractor: (nodeValue: NodeValue) => string;

  /**
   * @description Returns an instance of ObjectGraph.
   * @since 1.0.0
   */
  constructor(nodeValues: Array<NodeValue>, keyExtractor: (nodeValue: NodeValue) => string) {
    if (!nodeValues) {
      throw new Error("Provide a value for the 'nodeValues' parameter");
    }
    if (!keyExtractor) {
      throw new Error("Provide a value for the 'keyExtractor' parameter");
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
   * @since 1.0.0
   */
  public get length(): number {
    return this.nodes.size;
  }

  /**
   * @description Returns an iterator object that contains the keys of the object graph.
   * @since 1.0.0
   */
  public keys(): IterableIterator<string> {
    return this.nodes.keys();
  }

  /**
   * @description Returns an iterator object that contains the values of the object graph.
   * @since 1.0.0
   */
  public values(): IterableIterator<NodeValue> {
    return this.nodes.values();
  }

  /**
   * @description Returns a node of the object graph.
   * @since 1.0.0
   */
  public get(nodeKey: string): NodeValue | undefined {
    if (!nodeKey) {
      throw new Error("Provide a value for the 'nodeKey' parameter");
    }
    if (typeof nodeKey !== "string") {
      throw new TypeError("The parameter 'nodeKey' must be a string");
    }
    const nodeValue = this.nodes.get(nodeKey);
    if (!nodeValue) {
      console.error("A node with this key does not exist in the object graph");
    }
    return nodeValue;
  }

  /**
   * @description Returns a copy of the original object graph.
   * @since 1.0.0
   */
  public copy(): ObjectGraph<NodeValue> {
    return new ObjectGraph(Array.from(this.nodes.values()), this.keyExtractor);
  }

  /**
   * @description Adds a node to the object graph.
   * @since 1.0.0
   */
  public add(nodeValue: NodeValue): void {
    if (!nodeValue) {
      throw new Error("Provide a value for the 'nodeValue' parameter");
    }
    const nodeKey = this.keyExtractor(nodeValue);
    if (this.nodes.get(nodeKey)) {
      console.error("A node with the same key already exists in the object graph");
    }
    this.nodes.set(nodeKey, nodeValue);
  }

  /**
   * @description Returns a copy of the original object graph with a received node added.
   * @since 1.0.0
   */
  public toAdded(nodeValue: NodeValue): ObjectGraph<NodeValue> {
    const copiedObjectGraph = this.copy();
    copiedObjectGraph.add(nodeValue);
    return copiedObjectGraph;
  }

  /**
   * @description Updates a node in the object graph.
   * @since 1.0.0
   */
  public update(nodeValue: NodeValue): void {
    if (!nodeValue) {
      throw new Error("Provide a value for the 'nodeValue' parameter");
    }
    const nodeKey = this.keyExtractor(nodeValue);
    if (!this.nodes.get(nodeKey)) {
      console.error("A node with the provided key does not exist in the object graph");
    }
    this.nodes.set(nodeKey, nodeValue);
  }

  /**
   * @description Returns a copy of the original object graph with a received node updated.
   * @since 1.0.0
   */
  public toUpdated(nodeValue: NodeValue): ObjectGraph<NodeValue> {
    const copiedObjectGraph = this.copy();
    copiedObjectGraph.update(nodeValue);
    return copiedObjectGraph;
  }

  /**
   * @description Removes a node from the object graph.
   * @since 1.0.0
   */
  public remove(nodeKey: string): void {
    if (!nodeKey) {
      throw new Error("Provide a value for the 'nodeKey' parameter");
    }
    if (typeof nodeKey !== "string") {
      throw new TypeError("The parameter 'nodeKey' must be a string");
    }
    if (!this.nodes.get(nodeKey)) {
      console.error("A node with this key does not exist in this object graph");
    }
    this.nodes.delete(nodeKey);
  }

  /**
   * @description Returns a copy of the original object graph with a received node removed.
   * @since 1.0.0
   */
  public toRemoved(nodeKey: string): ObjectGraph<NodeValue> {
    const copiedObjectGraph = this.copy();
    copiedObjectGraph.remove(nodeKey);
    return copiedObjectGraph;
  }

  /**
   * @description Returns all values of the provided property.
   * @since 1.0.0
   */
  public valuesOf(propertyKey: keyof NodeValue): Array<NodeValue[keyof NodeValue]> {
    if (!propertyKey) {
      throw new Error("Provide a value for the 'propertyKey' parameter");
    }
    if (typeof propertyKey !== "string") {
      throw new TypeError("The parameter 'propertyKey' must be a string");
    }
    const propertyValues: Set<NodeValue[keyof NodeValue]> = new Set();
    for (const [_, nodeValue] of this.nodes) {
      propertyValues.add(nodeValue[propertyKey as keyof NodeValue]);
    }
    return Array.from(propertyValues);
  }

  /**
   * @description Returns all nodes that match with the provided shape.
   * @since 1.0.0
   */
  public match(shape: Partial<Record<keyof NodeValue, Array<unknown>>>): Array<NodeValue> {
    if (!shape) {
      throw new Error("Provide a value for the 'shape' parameter");
    }
    const matchedNodes: Array<NodeValue> = new Array();
    for (const [_, nodeValue] of this.nodes) {
      const shapeEntries = Object.entries(shape) as Array<[keyof NodeValue, Array<unknown>]>;
      const hasMatched = shapeEntries.every((shapeEntry) => {
        return shapeEntry[1].includes(nodeValue[shapeEntry[0]]);
      });
      if (hasMatched) {
        matchedNodes.push(nodeValue);
      }
    }
    return matchedNodes;
  }
}
