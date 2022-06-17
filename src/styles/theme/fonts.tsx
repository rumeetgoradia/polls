import { Global } from "@emotion/react"
const Fonts = () => (
	<Global
		styles={`
        @font-face {
            font-family: 'TODO';
            src: url('/fonts/TODO.woff2') format('woff2');
            font-weight: TODO;
            font-display: optional;
            font-style: normal;
        }
        `}
	/>
)
export default Fonts
