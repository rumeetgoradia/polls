import { ComponentStyleConfig } from "@chakra-ui/react";

export const Input: ComponentStyleConfig = {
	// style object for base or default style
	baseStyle: {},
	// styles for different sizes ("sm", "md", "lg")
	sizes: {},
	// styles for different visual variants ("outline", "solid")
	variants: {
		base: {
			field: {
				borderRadius: 0,
				position: "relative",
				zIndex: 10,
				background: "gray.200",
				"&[aria-invalid=true], &[data-invalid]": {
					color: "error.800",
					borderBottomColor: "error.800",
					_focus: {
						color: "black",
					},
				},
			},
		},
	},
	// default values for 'size', 'variant' and 'colorScheme'
	defaultProps: {
		variant: "base",
	},
};
