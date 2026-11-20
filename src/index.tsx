import {createRoot} from 'react-dom/client';
import {Layout} from '@/ui/Layout';
import App from './app';

import './game.css';
import './index.css';

const element = document.getElementById('root');
const root = createRoot(element!);

root.render(
	<Layout>
		<App configurable />
	</Layout>
);
