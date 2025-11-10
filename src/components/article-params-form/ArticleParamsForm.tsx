import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import styles from './ArticleParamsForm.module.scss';
import { useState, useRef } from 'react';
import clsx from 'clsx';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { ArticleParamsFormProps } from './TypeArticleParamsForm';
import { Text } from 'src/ui/text';

import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from 'src/constants/articleProps';

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [isFormVisible, setIsFormVisible] = useState(false);
	const formRef = useRef<HTMLDivElement>(null);
	const handleFormToggle = () => setIsFormVisible((prevState) => !prevState);
	const [tempForm, setTempForm] = useState(props.nowForm);

	useOutsideClickClose({
		isOpen: isFormVisible,
		rootRef: formRef,
		onClose: () => setIsFormVisible(false),
		onChange: setIsFormVisible,
	});

	return (
		<>
			<ArrowButton isOpen={isFormVisible} onClick={handleFormToggle} />
			{isFormVisible && (
				<aside
					className={clsx(
						styles.container,
						isFormVisible && styles.container_open
					)}
					ref={formRef}>
					<form
						className={styles.form}
						onSubmit={(e) => {
							e.preventDefault();
							props.onApplyForm(tempForm);
							setIsFormVisible(false);
						}}>
						<Text
							as='h2'
							size={31}
							weight={800}
							align='left'
							family='open-sans'>
							ЗАДАЙТЕ ПАРАМЕТРЫ
						</Text>
						<Select
							title='Шрифт'
							selected={tempForm.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={(value) =>
								setTempForm((prev) => ({
									...prev,
									fontFamilyOption: value,
								}))
							}
						/>
						<RadioGroup
							name='font-size'
							title='Размер шрифта'
							selected={tempForm.fontSizeOption}
							options={fontSizeOptions}
							onChange={(value) =>
								setTempForm((prev) => ({
									...prev,
									fontSizeOption: value,
								}))
							}
						/>
						<Select
							title='Цвет шрифта'
							selected={tempForm.fontColor}
							options={fontColors}
							onChange={(value) =>
								setTempForm((prev) => ({
									...prev,
									fontColor: value,
								}))
							}
						/>
						<Separator />
						<Select
							title='Цвет фона'
							selected={tempForm.backgroundColor}
							options={backgroundColors}
							onChange={(value) =>
								setTempForm((prev) => ({
									...prev,
									backgroundColor: value,
								}))
							}
						/>
						<Select
							title='Ширина контента'
							selected={tempForm.contentWidth}
							options={contentWidthArr}
							onChange={(value) =>
								setTempForm((prev) => ({
									...prev,
									contentWidth: value,
								}))
							}
						/>
						<div className={styles.bottomContainer}>
							<Button
								title='Сбросить'
								htmlType='reset'
								type='clear'
								onClick={() => {
									setTempForm(props.nowForm);
									props.onResetForm();
								}}
							/>
							<Button
								title='Применить'
								htmlType='submit'
								type='apply'
								onClick={() => {
									props.onApplyForm(tempForm);
									setIsFormVisible(false);
								}}
							/>
						</div>
					</form>
				</aside>
			)}
		</>
	);
};
