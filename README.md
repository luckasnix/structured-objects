# Object Graph

## Documentation

### Constructor

- `nodeValues`: Array of objects to be converted in nodes of the graph
- `keyExtractor`: Function that generates a key for each node

### Properties

- `length`: Returns the length of the object graph

### Methods

- `get`: Returns a node of the object graph
- `getAll`: Returns all nodes of the object graph
- `copy`: Returns a copy of the original object graph
- `insert`: Inserts a node to the object graph
- `toInserted`: Returns a copy of the original object graph with a received node inserted
- `insertMany`: Soon...
- `toManyInserted`: Soon...
- `replace`: Replaces a node in the object graph
- `toReplaced`: Returns a copy of the original object graph with a received node replaced
- `replaceMany`: Soon...
- `toManyReplaced`: Soon...
- `remove`: Removes a node to the object graph
- `removeMany`: Returns a copy of the original object graph with a received node removed
- `toRemoved`: Soon...
- `toManyRemoved`: Soon...
- `valuesOf`: Returns all the values of the provided property
