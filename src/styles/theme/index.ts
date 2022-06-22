import { extendTheme } from "@chakra-ui/react";
import { StyleFunctionProps } from "@chakra-ui/theme-tools";
import { components } from "./components";

const fonts = [
	"Inter",
	"ui-sans-serif",
	"system-ui",
	"-apple-system",
	"BlinkMacSystemFont",
	"Segoe UI",
	"Roboto",
	"Helvetica Neue",
	"Arial",
	"Noto Sans",
	"sans-serif",
	"Apple Color Emoji",
	"Segoe UI Emoji",
	"Segoe UI Symbol",
	"Noto Color Emoji",
].join(",");

const theme = extendTheme({
	styles: {
		global: (props: StyleFunctionProps) => ({
			"html, body": {
				scrollBehavior: "smooth",
				fontFamily: fonts,
				bg: "white",
				color: "black",
			},
		}),
	},
	colors: {
		white: "#F6F6F6",
		black: "#111820",
		brand: {
			"50": "#c6d8d3",
			"100": "#b1c9c2",
			"200": "#9cbab1",
			"300": "#88aca1",
			"400": "#749e90",
			"500": "#608f80",
			"600": "#4c8170",
			"700": "#387360",
			"800": "#226650",
			"900": "#035841",
		},
		error: {
			"50": "#fae1e1",
			"100": "#f2b5b4",
			"200": "#e68784",
			"300": "#d85b58",
			"400": "#cb3f39",
			"500": "#be2d1d",
			"600": "#b1261e",
			"700": "#9f1e1f",
			"800": "#8d141f",
			"900": "#6e031e",
		},
		gray: {
			"50": "#fafafa",
			"100": "#f6f6f6",
			"200": "#f0f0f0",
			"300": "#e2e2e2",
			"400": "#c0c0c0",
			"500": "#a1a1a1",
			"600": "#787878",
			"700": "#636363",
			"800": "#444444",
			"900": "#232323",
		},
	},
	fonts: {
		heading: fonts,
		body: fonts,
	},
	config: {
		initialColorMode: "light",
		useSystemColorMode: false,
	},
	components,
});

export default theme;

export { default as Fonts } from "./fonts";
