import React from 'react';
import {createRoot, Root} from 'react-dom/client';

const DIALOG_CONTAINER = document.getElementById('dialog');

export class DialogManager {
	reactRoot: Root;

	container: HTMLElement;

	constructor(container = DIALOG_CONTAINER) {
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
