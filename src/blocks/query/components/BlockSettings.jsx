import { OpenPanel } from '@edge22/components';

import {
	ApplyFilters,
	TagNameControl,
} from '@components/index.js';

import { QueryInspectorControls } from './QueryInspectorControls';
import { useBlockStyles } from '@hooks/useBlockStyles';

export function BlockSettings( {
	onStyleChange,
	getStyleValue,
	name,
	attributes,
	setAttributes,
	context,
} ) {
	const panelProps = {
		name,
		attributes,
		setAttributes,
		getStyleValue,
		onStyleChange,
	};

	const {
		tagName,
	} = attributes;

	const {
		atRule,
	} = useBlockStyles();

	return (
		<ApplyFilters
			name="generateblocks.editor.blockControls"
			blockName={ name }
			onStyleChange={ onStyleChange }
			getStyleValue={ getStyleValue }
			attributes={ attributes }
			setAttributes={ setAttributes }
		>
			<OpenPanel
				{ ...panelProps }
				panelId="query-parameters"
			>
				<QueryInspectorControls
					attributes={ attributes }
					setAttributes={ setAttributes }
					context={ context }
				/>
			</OpenPanel>
			<OpenPanel
				{ ...panelProps }
				panelId="settings"
			>
				{ '' === atRule && (
					<TagNameControl
						blockName="generateblocks/query"
						value={ tagName }
						onChange={ ( value ) => {
							setAttributes( { tagName: value } );
						} }
					/>
				) }
			</OpenPanel>
		</ApplyFilters>
	);
}
