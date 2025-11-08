# Migration Guide: v1 to v2

This guide will help you migrate your code from `@kasnix/structured-objects` v1 to v2.

## Requirements

### Node.js Version

The minimum Node.js version has been updated from **20.8.1** to **22.12.0**.

**Action required:** Update your Node.js version to 22.12.0 or higher.

```bash
# Check your current Node.js version
node --version

# Should be 22.12.0 or higher
```

## Replacements

### ObjectGraph → SimilarityGraph

The `ObjectGraph` class has been renamed to `SimilarityGraph` to better reflect its purpose and functionality.

#### Import Subpath

The import subpath has been consolidated and simplified:

**v1:**

```typescript
// Multiple import subpaths existed
import { ObjectGraph } from '@kasnix/structured-objects/object-graph'; // Original
import { ObjectGraph } from '@kasnix/structured-objects/graph'; // Simplified
```

**v2:**

```typescript
// Single import subpath
import { SimilarityGraph } from '@kasnix/structured-objects/similarity-graph';
```

#### Class Instantiation

**v1:**

```typescript
const graph = new ObjectGraph(data, keyExtractor);
```

**v2:**

```typescript
const graph = new SimilarityGraph(data, keyExtractor);
```

## Removals

### `length` Property

The deprecated `length` property has been removed. Use the `size` property instead.

#### Property Access

**v1:**

```typescript
const nodeCount = graph.length; // Deprecated but still worked
```

**v2:**

```typescript
const nodeCount = graph.size; // Use this
```

#### Testing

This change affects test matchers that rely on the `length` property, such as `.toHaveLength()` in Jest and Vitest.

**v1:**

```typescript
// This no longer works
expect(graph).toHaveLength(5);
```

**v2:**

```typescript
// Use direct assertion on size property
expect(graph.size).toBe(5);
```

## Migration Checklist

- [ ] Update Node.js to version 22.12.0 or higher
- [ ] Replace all `ObjectGraph` imports with `SimilarityGraph`
- [ ] Update import paths from `/graph` or `/object-graph` to `/similarity-graph`
- [ ] Replace all references to `ObjectGraph` class with `SimilarityGraph`
- [ ] Replace all uses of `.length` with `.size`
- [ ] Update test assertions from `expect(graph).toHaveLength(n)` to `expect(graph.size).toBe(n)`

## Need Help?

If you encounter any issues during migration, please [open an issue](https://github.com/luckasnix/structured-objects/issues) on GitHub.
