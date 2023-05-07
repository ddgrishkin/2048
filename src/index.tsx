import React from 'react';
import {createRoot} from 'react-dom/client';
import {Layout} from 'components/Layout';
import App from './app';

const element = document.getElementById('root');
const root = createRoot(element!);

root.render(
	<Layout>
		<App />
	</Layout>
);
