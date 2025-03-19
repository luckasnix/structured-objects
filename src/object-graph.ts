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
   * @deprecated Since version 1.2.0. Will be removed in version 2.0.0. Use "size" instead.
   */
  public get length(): number {
    return this.nodes.size;
  }

  /**
   * @description Returns the size of the object graph.
   * @since 1.2.0
   */
  public get size(): number {
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
   * @description Returns a subgraph of the original object graph.
   * @since 1.3.0
   */
  public subgraph(nodeKeys: Array<string>): ObjectGraph<NodeValue> {
    if (!nodeKeys) {
      throw new Error("Provide a value for the 'nodeKeys' parameter");
    }
    if (!Array.isArray(nodeKeys)) {
      throw new TypeError("The parameter 'nodeKeys' must be an array");
    }
    if (nodeKeys.length === 0) {
      throw new Error("The parameter 'nodeKeys' must contain at least one item");
    }
    const subgraph = new ObjectGraph([], this.keyExtractor);
    for (const [nodeKey, nodeValue] of this.nodes) {
      if (nodeKeys.includes(nodeKey)) {
        subgraph.add(nodeValue);
      }
    }
    return subgraph;
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
      throw new Error("A node with the same key already exists in the object graph");
    }
    this.nodes.set(nodeKey, nodeValue);
  }

  /**
   * @description Returns a copy of the original object graph with a received node added.
   * @since 1.0.0
   */
  public toAdded(nodeValue: NodeValue): ObjectGraph<NodeValue> {
    const copiedGraph = this.copy();
    copiedGraph.add(nodeValue);
    return copiedGraph;
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
      throw new Error("A node with the provided key does not exist in the object graph");
    }
    this.nodes.set(nodeKey, nodeValue);
  }

  /**
   * @description Returns a copy of the original object graph with a received node updated.
   * @since 1.0.0
   */
  public toUpdated(nodeValue: NodeValue): ObjectGraph<NodeValue> {
    const copiedGraph = this.copy();
    copiedGraph.update(nodeValue);
    return copiedGraph;
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
    this.nodes.delete(nodeKey);
  }

  /**
   * @description Returns a copy of the original object graph with a received node removed.
   * @since 1.0.0
   */
  public toRemoved(nodeKey: string): ObjectGraph<NodeValue> {
    const copiedGraph = this.copy();
    copiedGraph.remove(nodeKey);
    return copiedGraph;
  }

  /**
   * @description Returns a list of unique values for a specified property across selected nodes in the object graph. If no selection is made, it operates on the entire graph.
   * @since 1.0.0
   */
  public valuesOf<NodeValueKey extends keyof NodeValue>(
    nodeValueKey: NodeValueKey,
    nodeKeys?: Array<string>,
  ): Array<NodeValue[NodeValueKey]> {
    if (!nodeValueKey) {
      throw new Error("Provide a value for the 'nodeValueKey' parameter");
    }
    if (typeof nodeValueKey !== "string") {
      throw new TypeError("The parameter 'nodeValueKey' must be a string");
    }
    const propertyValues: Set<NodeValue[NodeValueKey]> = new Set();
    const graphNodes = nodeKeys ? this.subgraph(nodeKeys).nodes : this.nodes;
    for (const [_, nodeValue] of graphNodes) {
      propertyValues.add(nodeValue[nodeValueKey as NodeValueKey]);
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
        if (shapeEntry[1] === undefined) {
          return true;
        }
        return shapeEntry[1].includes(nodeValue[shapeEntry[0]]);
      });
      if (hasMatched) {
        matchedNodes.push(nodeValue);
      }
    }
    return matchedNodes;
  }
}
