<!-- markdownlint-disable-file no-duplicate-heading -->
# Object Graph

## Constructor

### SimilarityGraph()

Returns an instance of SimilarityGraph.

#### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| nodeValues | `Array<NodeValue>` | - | __Required.__ The array of objects to generate the nodes of the graph. |
| keyExtractor | `(nodeValue: NodeValue) => string` | - | __Required.__ The function to generate a key for each node. |

## Instance Properties

### size

Returns the size of the graph.

## Instance Methods

### keys()

Returns an iterator that contains the keys of the graph.

### values()

Returns an iterator that contains the values of the graph.

### get()

Returns a node of the graph.

#### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| nodeKey | `string` | - | __Required.__ The key of the node to return from the graph. |

### copy()

Returns a copy of the original graph.

### subgraph()

Returns a subgraph of the original graph.

#### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| nodeKeys | `Array<string>` | - | __Required.__ The array of keys of the nodes to add to the object subgraph. |

### add()

Adds a node to the graph.

#### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| nodeValue | `NodeValue` | - | __Required.__ The value of the node to add to the graph. |

### toAdded()

Returns a copy of the original graph with a received node added.

#### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| nodeValue | `NodeValue` | - | __Required.__ The value of the node to add to the graph. |

### update()

Updates a node in the graph.

#### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| nodeValue | `NodeValue` | - | __Required.__ The value of the node to update in the graph. |

### toUpdated()

Returns a copy of the original graph with a received node updated.

#### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| nodeValue | `NodeValue` | - | __Required.__ The value of the node to update in the graph. |

### remove()

Removes a node from the graph.

#### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| nodeKey | `string` | - | __Required.__ The key of the node to remove from the graph. |

### toRemoved()

Returns a copy of the original graph with a received node removed.

#### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| nodeKey | `string` | - | __Required.__ The key of the node to remove from the graph. |

### valuesOf()

Returns a list of unique values for a specified property across selected nodes in the graph. If no selection is made, it operates on the entire graph.

#### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| propertyKey | `keyof NodeValue` | - | __Required.__ The property key of the node values to return from the graph. |
| nodeKeys | `Array<string>` | - | The array of nodes keys to define the selected nodes. |

### valuesBy()

Returns all values grouped by property.

### match()

Returns all nodes that match with the provided shape.

#### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| shape | `Partial<Record<keyof NodeValue, unknown>>` | - | __Required.__ The shape of the nodes to return from the graph. |
