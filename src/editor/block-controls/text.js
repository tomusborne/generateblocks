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

export function TextOptions( options, props ) {
	const {
		getStyleValue,
		onStyleChange,
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

	return (
		<>
			{ 'a' === tagName && (
				<OpenPanel
					title={ __( 'Link Destination', 'generateblocks' ) }
				>
					<URLControls
						setAttributes={ setAttributes }
						htmlAttributes={ htmlAttributes }
					/>
				</OpenPanel>
			) }

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
				/>

				<UnitControl
					id="fontSize"
					label={ __( 'Font size', 'generateblocks' ) }
					value={ getStyleValue( 'fontSize' ) }
					onChange={ ( value ) => onStyleChange( 'fontSize', value ) }
				/>

				<SelectControl
					label={ __( 'Appearance', 'generateblocks' ) }
					value={ getStyleValue( 'fontWeight' ) }
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
					onChange={ ( value ) => onStyleChange( 'fontWeight', value ) }
				/>

				<Padding
					getStyleValue={ getStyleValue }
					onStyleChange={ onStyleChange }
				/>
			</OpenPanel>

			<OpenPanel
				title={ __( 'Icon', 'generateblocks' ) }
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

			{ options }
		</>
	);
}

addFilter(
	'generateblocks.editor.blockStyles',
	'generateblocks/textOptions',
	TextOptions
);
