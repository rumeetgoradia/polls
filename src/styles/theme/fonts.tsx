import { Global } from "@emotion/react";
const Fonts = () => (
	<Global
		styles={`
        @font-face {
            font-family: 'Inter';
            src: url('/fonts/Inter.woff2') format('woff2');
            font-weight: 100 900;
            font-display: optional;
            font-style: normal;
        }
        `}
	/>
);
export default Fonts;
