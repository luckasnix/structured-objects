class ObjectGraph<T extends Record<string, unknown>> {
  private nodes: Map<string, T>;
  private keyExtractor: (node: T) => string;

  constructor (nodes: Array<T>, keyExtractor: (node: T) => string) {
    if (!nodes) {
      throw new Error('Provide a value for the "nodes" parameter');
    }
    if (!keyExtractor) {
      throw new Error('Provide a value for the "keyExtractor" parameter');
    }
    this.nodes = new Map();
    this.keyExtractor = keyExtractor;
    if (nodes.length > 0) {
      nodes.forEach(node => this.nodes.set(this.keyExtractor(node), node));
    }
  };

  public get length() {
    return Array.from(this.nodes.keys()).length;
  };

  public setNode(node: T) {
    if (!node) {
      throw new Error('Provide a value for the "node" parameter');
    }
    const key = this.keyExtractor(node);
    this.nodes.set(key, node);
  };

  public setNodes(nodes: Array<T>) {
    if (!nodes) {
      throw new Error('Provide a value for the "nodes" parameter');
    }
    if (!Array.isArray(nodes)) {
      throw new TypeError('The parameter "nodes" must be an array');
    }
    if (nodes.length > 0) {
      nodes.forEach(node => this.nodes.set(this.keyExtractor(node), node));
    }
  };

  public deleteNode(key: string) {
    if (!key) {
      throw new Error('Provide a value for the "key" parameter');
    }
    if (typeof key !== 'string') {
      throw new TypeError('The parameter "key" must be a string');
    }
    if (!this.nodes.get(key)) {
      throw new Error('A node with this key does not exist in this graph');
    }
    this.nodes.delete(key);
  };

  public getNode(key: string) {
    if (!key) {
      throw new Error('Provide a value for the "key" parameter');
    }
    if (typeof key !== 'string') {
      throw new TypeError('The parameter "key" must be a string');
    }
    const node = this.nodes.get(key);
    if (!node) {
      throw new Error('A node with this key does not exist in this graph');
    }
    return node;
  };

  public getValuesFromProperty(key: string) {
    if (!key) {
      throw new Error('Provide a value for the "key" parameter');
    }
    if (typeof key !== 'string') {
      throw new TypeError('The parameter "key" must be a string');
    }
    const valuesByProperty = new Set();
    this.nodes.forEach(node => valuesByProperty.add(node[key]));
    return Array.from(valuesByProperty);
  };

  // TODO: improve the type of "matcherObject" parameter
  public getMatchedNodes(matcherObject: Record<string, Array<unknown>>) {
    if (!matcherObject) {
      throw new Error('Provide a value for the "matcherObject" parameter');
    }
    const nodesFound: Array<T> = new Array();
    this.nodes.forEach((node) => {
      const hasMatched = Object.entries(matcherObject).every((matcherEntry) => {
        return matcherEntry[1].includes(node[matcherEntry[0]]);
      });
      if (hasMatched) {
        nodesFound.push(node);
      }
    });
    return Array.from(nodesFound);
  };

  // TODO: create the "getCorrelatedNodes" method
};

export default ObjectGraph;
