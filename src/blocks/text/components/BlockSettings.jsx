import { __ } from '@wordpress/i18n';
import { useMemo } from '@wordpress/element';
import { SelectControl } from '@wordpress/components';

import ApplyFilters from '@components/apply-filters';
import { OpenPanel } from '@components/open-panel';
import { URLControls } from '@components/url-controls';
import { IconControl } from '@components/icon-control';
import { ColorPickerControls } from '@components/color-picker-group';
import { moreDesignOptions } from '@components/open-panel/utils';
import UnitControl from '@components/unit-control';
import { TagNameControl } from '@components/tagname-control';
import { HtmlAttributes } from '@components/html-attributes';
import DimensionsControl from '@components/dimensions';

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
	currentAtRule,
	name,
	attributes,
	setAttributes,
} ) {
	const {
		htmlAttributes,
		tagName,
		icon,
		iconLocation,
	} = attributes;

	const colorControls = useMemo( () => {
		let controls = textColorControls;

		if ( 'a' === tagName || 'button' === tagName ) {
			controls = buttonColorControls;
		}

		if ( ! icon ) {
			controls = controls.filter( ( control ) => (
				'icon-color' !== control.id
			) );
		}

		return controls;
	}, [ tagName, icon ] );

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
				title={ __( 'Design', 'generateblocks' ) }
				dropdownOptions={ [
					moreDesignOptions,
				] }
			>
				<ColorPickerControls
					items={ colorControls }
					getStyleValue={ getStyleValue }
					onStyleChange={ onStyleChange }
					currentAtRule={ currentAtRule }
				/>

				<UnitControl
					id="fontSize"
					label={ __( 'Text size', 'generateblocks' ) }
					value={ getStyleValue( 'fontSize', currentAtRule ) }
					onChange={ ( value ) => onStyleChange( 'fontSize', value, currentAtRule ) }
				/>

				<SelectControl
					label={ __( 'Appearance', 'generateblocks' ) }
					value={ getStyleValue( 'fontWeight', currentAtRule ) }
					options={ [
						{ label: __( 'Default', 'generateblocks' ), value: '' },
						{ label: __( 'Thin', 'generateblocks' ), value: '100' },
						{ label: __( 'Extra Light', 'generateblocks' ), value: '200' },
						{ label: __( 'Light', 'generateblocks' ), value: '300' },
						{ label: __( 'Normal', 'generateblocks' ), value: '400' },
						{ label: __( 'Medium', 'generateblocks' ), value: '500' },
						{ label: __( 'Semi Bold', 'generateblocks' ), value: '600' },
						{ label: __( 'Bold', 'generateblocks' ), value: '700' },
						{ label: __( 'Extra Bold', 'generateblocks' ), value: '800' },
						{ label: __( 'Black', 'generateblocks' ), value: '900' },
					] }
					onChange={ ( value ) => onStyleChange( 'fontWeight', value, currentAtRule ) }
				/>

				{ 'a' === tagName || 'button' === tagName ? (
					<DimensionsControl
						label={ __( 'Padding', 'generateblocks-pro' ) }
						attributeNames={ [ 'paddingTop', 'paddingLeft', 'paddingRight', 'paddingBottom' ] }
						values={ {
							paddingTop: getStyleValue( 'paddingTop', currentAtRule ),
							paddingRight: getStyleValue( 'paddingRight', currentAtRule ),
							paddingBottom: getStyleValue( 'paddingBottom', currentAtRule ),
							paddingLeft: getStyleValue( 'paddingLeft', currentAtRule ),
						} }
						onChange={ ( values ) => Object.keys( values ).forEach( ( property ) => (
							onStyleChange( property, values[ property ], currentAtRule )
						) ) }
						placeholders={ {} }
					/>
				) : (
					<UnitControl
						id="marginBottom"
						label={ __( 'Bottom spacing', 'generateblocks' ) }
						value={ getStyleValue( 'marginBottom', currentAtRule ) }
						onChange={ ( value ) => onStyleChange( 'marginBottom', value, currentAtRule ) }
					/>
				) }
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
		</ApplyFilters>
	);
}