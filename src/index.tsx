import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './app';
import {Layout} from 'components/Layout';

const element = document.getElementById('root');
const root = createRoot(element!);

root.render(
	<Layout>
		<App />
	</Layout>
);
