import { ComponentStyleConfig } from "@chakra-ui/react";

export const Button: ComponentStyleConfig = {
	// style object for base or default style
	baseStyle: {
		fontWeight: 400,
		lineHeight: 1,
	},
	// styles for different sizes ("sm", "md", "lg")
	sizes: {},
	// styles for different visual variants ("outline", "solid")
	variants: {
		solid: {
			borderRadius: 0,
			border: "1px",
			borderColor: "black",
		},
		invertedSolid: {
			backgroundColor: "whiteAlpha.800",
			color: "brand.900",
			borderRadius: 0,
			_hover: {
				backgroundColor: "white",
			},
			_focusVisible: {
				backgroundColor: "white",
			},
		},
		link: {
			color: "white",
			textDecoration: "none !important",
			lineHeight: 1,
			_hover: {
				color: "brand.900",
			},
		},
	},
	// default values for 'size', 'variant' and 'colorScheme'
	defaultProps: {
		variant: "solid",
		colorScheme: "brandAlpha",
	},
};
