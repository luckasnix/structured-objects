# Structured Objects

Structured Objects is a lightweight and powerful library for manipulating objects in JavaScript and TypeScript across different types of data structures.

## Installation

npm:

```bash
npm i @kasnix/structured-objects
```

Yarn:

```bash
yarn add @kasnix/structured-objects
```

pnpm:

```bash
pnpm add @kasnix/structured-objects
```

Deno:

```bash
deno add npm:@kasnix/structured-objects
```

Bun:

```bash
bun add @kasnix/structured-objects
```

## Usage

```typescript
import { ObjectGraph } from "@kasnix/structured-objects/object-graph";

type DataItem = {
  id: string;
  // ...
};

const dataList: Array<DataItem> = [/* ... */];

const dataGraph = new ObjectGraph<DataItem>(dataList, (dataItem) => dataItem.id);
```

## Documentation

- [Object Graph](./docs/object-graph.doc.md)
