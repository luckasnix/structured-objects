export class ObjectGraph<NodeValue extends Record<string, unknown>> {
  private nodes: Map<string, NodeValue>;
  private keyExtractor: (nodeValue: NodeValue) => string;

  constructor (nodeValues: Array<NodeValue>, keyExtractor: (nodeValue: NodeValue) => string) {
    if (!nodeValues) {
      throw new Error('Provide a value for the "nodeValues" parameter');
    }
    if (!keyExtractor) {
      throw new Error('Provide a value for the "keyExtractor" parameter');
    }
    this.nodes = new Map();
    this.keyExtractor = keyExtractor;
    if (nodeValues.length > 0) {
      nodeValues.forEach(nodeValue => this.nodes.set(this.keyExtractor(nodeValue), nodeValue));
    }
  };

  /**
   * @description Returns the length of the object graph
   */
  public get length() {
    return Array.from(this.nodes.keys()).length;
  };

  /**
   * @description Returns a node of the object graph
   */
  public get(key: string) {
    if (!key) {
      throw new Error('Provide a value for the "key" parameter');
    }
    if (typeof key !== 'string') {
      throw new TypeError('The parameter "key" must be a string');
    }
    const node = this.nodes.get(key);
    if (!node) {
      throw new Error('A node with this key does not exist in the object graph');
    }
    return node;
  };

  /**
   * @description Returns all nodes of the object graph
   */
  public getAll() {
    return Array.from(this.nodes.values());
  }

  /**
   * @description Returns a copy of the original object graph
   */
  public copy() {
    return new ObjectGraph(Array.from(this.nodes.values()), this.keyExtractor)
  }

  /**
   * @description Inserts a node to the object graph
   */
  public insert(nodeValue: NodeValue) {
    if (!nodeValue) {
      throw new Error('Provide a value for the "nodeValue" parameter');
    }
    const nodeKey = this.keyExtractor(nodeValue);
    if (this.nodes.get(nodeKey)) {
      throw new Error('A node with the same key already exists in the object graph');
    }
    this.nodes.set(nodeKey, nodeValue);
  };

  /**
   * @description Returns a copy of the original object graph with a received node inserted
   */
  public toInserted(nodeValue: NodeValue) {
    const copiedObjectGraph = this.copy();
    copiedObjectGraph.insert(nodeValue);
    return copiedObjectGraph;
  };

  /**
   * @description Replaces a node in the object graph
   */
  public replace(nodeValue: NodeValue) {
    if (!nodeValue) {
      throw new Error('Provide a value for the "nodeValue" parameter');
    }
    const nodeKey = this.keyExtractor(nodeValue);
    if (!this.nodes.get(nodeKey)) {
      throw new Error('A node with the provided key does not exist in the object graph');
    }
    this.nodes.set(nodeKey, nodeValue);
  };

  /**
   * @description Returns a copy of the original object graph with a received node replaced
   */
  public toReplaced(nodeValue: NodeValue) {
    const copiedObjectGraph = this.copy();
    copiedObjectGraph.replace(nodeValue);
    return copiedObjectGraph;
  };

  /**
   * @description Removes a node to the object graph
   */
  public remove(key: string) {
    if (!key) {
      throw new Error('Provide a value for the "key" parameter');
    }
    if (typeof key !== 'string') {
      throw new TypeError('The parameter "key" must be a string');
    }
    if (!this.nodes.get(key)) {
      throw new Error('A node with this key does not exist in this object graph');
    }
    this.nodes.delete(key);
  };

  /**
   * @description Returns a copy of the original object graph with a received node removed
   */
  public toRemoved(key: string) {
    const copiedObjectGraph = this.copy();
    copiedObjectGraph.remove(key);
    return copiedObjectGraph;
  };

  /**
   * @description Returns all the values of the provided property
   */
  public valuesOf(property: string) {
    if (!property) {
      throw new Error('Provide a value for the "property" parameter');
    }
    if (typeof property !== 'string') {
      throw new TypeError('The parameter "property" must be a string');
    }
    const propertyValues = new Set();
    this.nodes.forEach(node => propertyValues.add(node[property]));
    return Array.from(propertyValues);
  };
};
