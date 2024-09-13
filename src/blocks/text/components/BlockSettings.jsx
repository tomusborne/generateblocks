import { __ } from '@wordpress/i18n';
import { SelectControl, ToggleControl } from '@wordpress/components';

import {
	ApplyFilters,
	OpenPanel,
	URLControls,
	IconControl,
	TagNameControl,
	HtmlAttributes,
} from '@components/index.js';
import { useBlockStyles } from '@hooks/useBlockStyles';

export const buttonColorControls = [
	{
		label: 'Background Color',
		id: 'button-background-color',
		items: [
			{
				tooltip: 'Background Color',
				value: 'backgroundColor',
				selector: '',
			},
			{
				tooltip: 'Hover Background Color',
				value: 'backgroundColor',
				selector: '&:is(:hover, :focus)',
			},
		],
	},
	{
		label: 'Text Color',
		id: 'button-text-color',
		items: [
			{
				tooltip: 'Text Color',
				value: 'color',
				selector: '',
			},
			{
				tooltip: 'Hover Text Color',
				value: 'color',
				selector: '&:is(:hover, :focus)',
			},
		],
	},
	{
		label: 'Icon Color',
		id: 'icon-color',
		items: [
			{
				tooltip: 'Icon Color',
				value: 'color',
				selector: 'svg',
			},
			{
				tooltip: 'Hover Icon Color',
				value: 'color',
				selector: '&:is(:hover, :focus) svg',
			},
		],
	},
];

export const textColorControls = [
	{
		label: 'Text Color',
		id: 'text-text-color',
		items: [
			{
				tooltip: 'Text Color',
				value: 'color',
				selector: '',
			},
		],
	},
	{
		label: 'Icon Color',
		id: 'icon-color',
		items: [
			{
				tooltip: 'Icon Color',
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
		htmlAttributes,
		tagName,
		icon,
		iconLocation,
		iconOnly,
	} = attributes;

	const {
		currentAtRule,
	} = useBlockStyles();

	return (
		<ApplyFilters
			name="generateblocks.editor.blockControls"
			blockName={ name }
			getStyleValue={ getStyleValue }
			onStyleChange={ onStyleChange }
			currentAtRule={ currentAtRule }
			attributes={ attributes }
			setAttributes={ setAttributes }
		>
			<OpenPanel
				title={ __( 'Link Destination', 'generateblocks' ) }
				shouldRender={ 'a' === tagName && '' === currentAtRule }
			>
				<URLControls
					setAttributes={ setAttributes }
					htmlAttributes={ htmlAttributes }
				/>
			</OpenPanel>

			<OpenPanel
				title={ __( 'Settings', 'generateblocks' ) }
				shouldRender={ '' === currentAtRule }
			>
				<TagNameControl
					blockName="generateblocks/text"
					value={ tagName }
					onChange={ ( value ) => {
						setAttributes( { tagName: value } );

						if ( 'a' === value && ! getStyleValue( 'display', currentAtRule ) ) {
							onStyleChange( 'display', 'block' );
						}
					} }
				/>

				<HtmlAttributes
					items={ htmlAttributes }
					onAdd={ ( value ) => setAttributes( { htmlAttributes: value } ) }
					onRemove={ ( value ) => setAttributes( { htmlAttributes: value } ) }
					onChange={ ( value ) => setAttributes( { htmlAttributes: value } ) }
				/>
			</OpenPanel>

			<OpenPanel
				title={ __( 'Icon', 'generateblocks' ) }
				shouldRender={ '' === currentAtRule }
			>
				<IconControl
					value={ icon }
					onChange={ ( value ) => {
						// If the user hasn't done this before, align the icon and text.
						if ( ! icon ) {
							onStyleChange( 'display', 'inline-flex' );
							onStyleChange( 'alignItems', 'center' );
							onStyleChange( 'columnGap', '0.5em' );
						}

						setAttributes( { icon: value } );
					} }
					onClear={ () => {
						setAttributes( { icon: '' } );
					} }
					attributes={ attributes }
				/>

				{ !! icon && (
					<>
						{ ! iconOnly && (
							<SelectControl
								label={ __( 'Icon Location', 'generateblocks' ) }
								value={ iconLocation }
								options={ [
									{ label: __( 'Before', 'generateblocks' ), value: 'before' },
									{ label: __( 'After', 'generateblocks' ), value: 'after' },
								] }
								onChange={ ( value ) => setAttributes( { iconLocation: value } ) }
							/>
						) }

						<ToggleControl
							label={ __( 'Show icon only', 'generateblocks' ) }
							checked={ !! iconOnly }
							onChange={ () => setAttributes( { iconOnly: ! iconOnly } ) }
						/>
					</>
				) }
			</OpenPanel>
		</ApplyFilters>
	);
}
