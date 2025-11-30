# Migration Guide: v1 to v2

This guide will help you migrate your code from `@kasnix/structured-objects` v1 to v2.

## Requirements

### Node.js Version

The minimum Node.js version has been updated from 20.8.1 to 22.14.0. To ensure the library continues to work correctly, make sure you are using Node.js version 22.14.0 or higher.

To check your version, use the following command:

```bash
node --version
```

## Replacements

### ObjectGraph → SimilarityGraph

The `ObjectGraph` class has been renamed to `SimilarityGraph` to better reflect its purpose and functionality.

```typescript
// v1
const graph = new ObjectGraph(nodeValues, keyExtractor);

// v2
const graph = new SimilarityGraph(nodeValues, keyExtractor);
```

As a consequence of the class name change, the import subpath has also changed. Additionally, duplicate import paths (original and simplified) have been removed in favor of a single subpath.

```typescript
// v1
import { ObjectGraph } from "@kasnix/structured-objects/object-graph"; // Original
import { ObjectGraph } from "@kasnix/structured-objects/graph"; // Simplified

// v2
import { SimilarityGraph } from "@kasnix/structured-objects/similarity-graph";
```

## Removals

### `length` Property

The deprecated `length` property has been removed. Use the `size` property instead.

```typescript
// v1
const nodeCount = graph.length; // Deprecated but still worked

// v2
const nodeCount = graph.size; // Use this instead
```

This change affects test matchers that rely on the `length` property, such as `.toHaveLength()` in Jest and Vitest.

```typescript
// v1
expect(graph).toHaveLength(5);

// v2
expect(graph.size).toBe(5);
```

## Migration Checklist

- [ ] Update Node.js to version 22.14.0 or higher
- [ ] Replace all references to `ObjectGraph` class with `SimilarityGraph`
- [ ] Update import subpaths from `/graph` or `/object-graph` to `/similarity-graph`
- [ ] Replace all uses of `.length` with `.size`
- [ ] Update test assertions from `expect(graph).toHaveLength(n)` to `expect(graph.size).toBe(n)`
