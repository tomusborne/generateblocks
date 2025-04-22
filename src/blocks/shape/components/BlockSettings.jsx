import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
import { Flex, FlexBlock } from '@wordpress/components';

import { OpenPanel, IconControl } from '@edge22/components';
import { UnitControl } from '@edge22/styles-builder';

import {
	ApplyFilters,
	ColorPickerControls,
} from '@components/index.js';
import { moreDesignOptions } from '@utils';
import { useBlockStyles } from '@hooks/useBlockStyles';
import generalSvgs from '@components/icon-picker/svgs-general';
import socialSvgs from '@components/icon-picker/svgs-social';
import { ShapeDividerControls } from './ShapeDividerControls';

export const shapeColorControls = [
	{
		label: 'Color',
		id: 'shape-color',
		items: [
			{
				tooltip: 'Color',
				value: 'color',
				selector: 'svg',
			},
		],
	},
];

export function BlockSettings( {
	getStyleValue,
	onStyleChange,
	name,
	attributes,
	setAttributes,
} ) {
	const {
		html,
		className,
	} = attributes;

	const {
		atRule,
	} = useBlockStyles();

	const panelProps = {
		name,
		attributes,
		setAttributes,
		getStyleValue,
		onStyleChange,
	};

	const iconType = className?.includes( 'gb-shape--divider' ) ? 'divider' : 'icon';

	let icons = applyFilters(
		'generateblocks.editor.iconSVGSets',
		{
			general: {
				group: __( 'General', 'generateblocks' ),
				svgs: generalSvgs,
			},
			social: {
				group: __( 'Social', 'generateblocks' ),
				svgs: socialSvgs,
			},
		},
		{ attributes }
	);

	if ( 'divider' === iconType ) {
		icons = generateBlocksInfo.svgShapes;
	}

	return (
		<ApplyFilters
			name="generateblocks.editor.blockControls"
			blockName={ name }
			getStyleValue={ getStyleValue }
			onStyleChange={ onStyleChange }
			currentAtRule={ atRule }
			attributes={ attributes }
			setAttributes={ setAttributes }
		>
			<OpenPanel
				{ ...panelProps }
				panelId="shape"
			>
				{ '' === atRule && (
					<IconControl
						label={ __( 'Shape', 'generateblocks' ) }
						value={ html }
						onChange={ ( value ) => setAttributes( { html: value } ) }
						onClear={ () => setAttributes( { html: '' } ) }
						icons={ icons }
						iconType={ iconType }
						clearLabel={ __( 'Clear', 'generateblocks' ) }
						openLabel={ __( 'Open Library', 'generateblocks' ) }
						modalTitle={ __( 'Shape Library', 'generateblocks' ) }
					/>
				) }

				<ShapeDividerControls
					onStyleChange={ onStyleChange }
					getStyleValue={ getStyleValue }
				/>
			</OpenPanel>

			<OpenPanel
				{ ...panelProps }
				dropdownOptions={ [
					moreDesignOptions,
				] }
				panelId="design"
			>
				<Flex>
					<FlexBlock>
						<UnitControl
							id="width"
							label={ __( 'Width', 'generateblocks' ) }
							value={ getStyleValue( 'width', atRule, 'svg' ) }
							onChange={ ( value ) => onStyleChange( 'width', value, atRule, 'svg' ) }
						/>
					</FlexBlock>

					<FlexBlock>
						<UnitControl
							id="height"
							label={ __( 'Height', 'generateblocks' ) }
							value={ getStyleValue( 'height', atRule, 'svg' ) }
							onChange={ ( value ) => onStyleChange( 'height', value, atRule, 'svg' ) }
						/>
					</FlexBlock>
				</Flex>

				<ColorPickerControls
					items={ shapeColorControls }
					getStyleValue={ getStyleValue }
					onStyleChange={ onStyleChange }
					currentAtRule={ atRule }
				/>
			</OpenPanel>

			<OpenPanel
				{ ...panelProps }
				panelId="settings"
			/>
		</ApplyFilters>
	);
}
