import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import App from "./App";
import { setup } from "twind";

setup({
	theme: {
		fontFamily: {
			text: ["Gabarito", "sans-serif"],
			serif: ["Times", "serif"],
		},
		extend: {
			colors: {
				"custom-orange": "#fb923c",
			},
		},
	},

	preflight: {
		"@import": `url('https://fonts.googleapis.com/css2?family=Gabarito&display=swap')`,
	},
});

const lifecycles = singleSpaReact({
	React,
	ReactDOM,
	rootComponent: App,
	errorBoundary(err, info, props) {
		// Customize the root error boundary for your microfrontend here.
		return null;
	},
});

export const { bootstrap, mount, unmount } = lifecycles;
