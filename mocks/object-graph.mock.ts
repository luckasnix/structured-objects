export const colors = [
	"red",
	"yellow",
	"green",
	"blue",
	"orange",
	"purple",
	"white",
	"black",
] as const;

export const sizes = ["small", "medium", "large"] as const;

export type Color = (typeof colors)[number];

export type Size = (typeof sizes)[number];

export type Shirt = {
	sku: string;
	color: Color;
	size: Size;
};

export const shirtsMock: Array<Shirt> = [
	{ sku: "1", color: "red", size: "small" },
	{ sku: "2", color: "red", size: "medium" },
	{ sku: "3", color: "yellow", size: "small" },
	{ sku: "4", color: "green", size: "small" },
	{ sku: "5", color: "green", size: "large" },
	{ sku: "6", color: "blue", size: "small" },
	{ sku: "7", color: "blue", size: "medium" },
	{ sku: "8", color: "blue", size: "large" },
];

export const extraShirtsMock: Array<Shirt> = [
	{ sku: "9", color: "orange", size: "small" },
	{ sku: "10", color: "orange", size: "medium" },
	{ sku: "11", color: "orange", size: "large" },
	{ sku: "12", color: "purple", size: "small" },
	{ sku: "13", color: "purple", size: "large" },
	{ sku: "14", color: "white", size: "medium" },
	{ sku: "15", color: "white", size: "large" },
	{ sku: "16", color: "black", size: "large" },
];
