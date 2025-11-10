import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, ArticleStateType } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {

	const [nowSettings, setNowSettings] = useState(defaultArticleState);

	const handleApplyForm = (newSettings: ArticleStateType) => {
		setNowSettings(newSettings);
	};

	const handleResetForm = () => {
		setNowSettings(defaultArticleState);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': nowSettings.fontFamilyOption.value,
					'--font-size': nowSettings.fontSizeOption.value,
					'--font-color': nowSettings.fontColor.value,
					'--container-width': nowSettings.contentWidth.value,
					'--bg-color': nowSettings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm 
				nowForm={nowSettings}
				onApplyForm={handleApplyForm}
				onResetForm={handleResetForm}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
