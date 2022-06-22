import { ComponentStyleConfig } from "@chakra-ui/react";

export const Button: ComponentStyleConfig = {
	// style object for base or default style
	baseStyle: {},
	// styles for different sizes ("sm", "md", "lg")
	sizes: {},
	// styles for different visual variants ("outline", "solid")
	variants: {
		solid: {
			borderRadius: 0,
			border: "1px",
			borderColor: "black",
		},
	},
	// default values for 'size', 'variant' and 'colorScheme'
	defaultProps: {
		variant: "solid",
		colorScheme: "brandAlpha",
	},
};
