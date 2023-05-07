import React from 'react';
import {createRoot, Root} from 'react-dom/client';

export class DialogManager {
	reactRoot: Root;

	container: HTMLElement;

	constructor(container: HTMLElement) {
		this.container = container;
		this.reactRoot = createRoot(container);
	}

	open(element: React.ReactNode) {
		this.reactRoot.render(element);
	}

	close() {
		this.reactRoot.render(null);
	}
}
