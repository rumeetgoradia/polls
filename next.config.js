/** @type {import('next').NextConfig} */
const { withPlaiceholder } = require("@plaiceholder/next")
module.exports = withPlaiceholder({
	reactStrictMode: true,
	images: {
		domains: [],
	},
	webpack: (config, { dev, isServer }) => {
		// Replace React with Preact only in client production build
		if (!dev && !isServer) {
			Object.assign(config.resolve.alias, {
				react: "preact/compat",
				"react-dom/test-utils": "preact/test-utils",
				"react-dom": "preact/compat",
			})
		}

		return config
	},
})
