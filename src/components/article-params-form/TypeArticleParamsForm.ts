import { ArticleStateType } from 'src/constants/articleProps';

export type ArticleParamsFormProps = {
	nowForm: ArticleStateType,
	onResetForm: () => void
	onApplyForm: (aplly: ArticleStateType) => void;
} 