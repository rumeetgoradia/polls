import { ComponentStyleConfig } from "@chakra-ui/react";

export const Textarea: ComponentStyleConfig = {
	// style object for base or default style
	baseStyle: {},
	// styles for different sizes ("sm", "md", "lg")
	sizes: {},
	// styles for different visual variants ("outline", "solid")
	variants: {
		base: {
			borderRadius: 0,
			background: "gray.800",
			"&[aria-invalid=true], &[data-invalid]": {
				color: "error.600",
				_focus: {
					color: "white",
				},
			},
		},
	},
	// default values for 'size', 'variant' and 'colorScheme'
	defaultProps: {
		variant: "base",
	},
};
