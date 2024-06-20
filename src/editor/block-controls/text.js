import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';
import { useMemo } from '@wordpress/element';
import { buttonColorControls, textColorControls } from './colorControls.js';
import { addFilter } from '@wordpress/hooks';
import UnitControl from '../../components/unit-control/index.js';
import { URLControls } from '../../components/url-controls/index.js';
import { IconControl } from '../../components/icon-control';
import { OpenPanel } from '../../components/open-panel';
import { moreDesignOptions, Padding, ColorPickerControls } from './index.js';
import { TagNameControl } from '@components/tagname-control';
import { HtmlAttributes } from '@components/html-attributes';

export function TextOptions( options, props ) {
	const {
		getStyleValue,
		onStyleChange,
		currentAtRule,
		name,
		attributes,
		setAttributes,
	} = props;

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

	if ( 'generateblocks/text' !== name ) {
		return options;
	}

	const tagNames = [
		'p',
		'span',
		'div',
		'h1',
		'h2',
		'h3',
		'h4',
		'h5',
		'h6',
		'a',
		'button',
		'figcaption',
	];
	const tagNameOptions = tagNames.map( ( tag ) => {
		return {
			label: tag,
			value: tag,
		};
	} ).filter( Boolean );

	return (
		<>
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
					label={ __( 'Font size', 'generateblocks' ) }
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

				<Padding
					getStyleValue={ getStyleValue }
					onStyleChange={ onStyleChange }
					currentAtRule={ currentAtRule }
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

				<SelectControl
					label={ __( 'Icon Location', 'generateblocks' ) }
					value={ iconLocation }
					options={ [
						{ label: __( 'Before', 'generateblocks' ), value: 'before' },
						{ label: __( 'After', 'generateblocks' ), value: 'after' },
					] }
					onChange={ ( value ) => setAttributes( { iconLocation: value } ) }
				/>
			</OpenPanel>

			<OpenPanel
				title={ __( 'Settings', 'generateblocks' ) }
				shouldRender={ '' === currentAtRule }
			>
				<TagNameControl
					options={ tagNameOptions }
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

			{ options }
		</>
	);
}

addFilter(
	'generateblocks.editor.blockStyles',
	'generateblocks/textOptions',
	TextOptions
);
