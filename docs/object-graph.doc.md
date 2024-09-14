<!-- markdownlint-disable-file no-duplicate-heading -->
# Object Graph

## Constructor

Returns an instance of ObjectGraph.

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| nodeValues | `Array<NodeValue>` | - | __Required.__ The array of objects to generate the nodes of the graph. |
| keyExtractor | `(nodeValue: NodeValue) => string` | - | __Required.__ The function to generate a key for each node. |

## length

Returns the length of the object graph.

## keys()

Returns the keys of the object graph.

## values()

Returns the values of the object graph.

## get()

Returns a node of the object graph.

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| nodeKey | `string` | - | __Required.__ The key of the node to return from the object graph. |

## copy()

Returns a copy of the original object graph.

## add()

Adds a node to the object graph.

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| nodeValue | `NodeValue` | - | __Required.__ The value of the node to add to the object graph. |

## toAdded()

Returns a copy of the original object graph with a received node added.

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| nodeValue | `NodeValue` | - | __Required.__ The value of the node to add to the object graph. |

## update()

Updates a node in the object graph.

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| nodeValue | `NodeValue` | - | __Required.__ The value of the node to update in the object graph. |

## toUpdated()

Returns a copy of the original object graph with a received node updated.

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| nodeValue | `NodeValue` | - | __Required.__ The value of the node to update in the object graph. |

## remove()

Removes a node from the object graph.

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| nodeKey | `string` | - | __Required.__ The key of the node to remove from the object graph. |

## toRemoved()

Returns a copy of the original object graph with a received node removed.

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| nodeKey | `string` | - | __Required.__ The key of the node to remove from the object graph. |

## valuesOf()

Returns all values of the provided property.

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| propertyKey | `keyof NodeValue` | - | __Required.__ The property key of the node values to return from the object graph. |

## match()

Returns all nodes that match with the provided shape.

### Parameters

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| shape | `Partial<Record<keyof NodeValue, Array<unknown>>>` | - | __Required.__ The shape of the nodes to return from the object graph. |
