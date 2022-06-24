import { extendTheme } from "@chakra-ui/react";
import { StyleFunctionProps } from "@chakra-ui/theme-tools";
import { colors } from "./colors";
import { components } from "./components";
import { foundations } from "./foundations";

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
				bg: "black",
				color: "white",
			},
		}),
	},

	fonts: {
		heading: fonts,
		body: fonts,
	},

	colors,

	components,

	...foundations,
});

export default theme;

export { default as Fonts } from "./fonts";
