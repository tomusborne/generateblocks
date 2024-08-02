import { __ } from '@wordpress/i18n';
import { BaseControl, Notice } from '@wordpress/components';
import { useMemo } from '@wordpress/element';

import {
	ApplyFilters,
	OpenPanel,
	URLControls,
	ColorPickerControls,
	moreDesignOptions,
	TagNameControl,
	HtmlAttributes,
	DimensionsControl,
	ImageUpload,
} from '@components/index.js';
import { containerColorControls, linkElementColorControls } from '../../element/components/BlockSettings';

export function BlockSettings( {
	getStyleValue,
	onStyleChange,
	currentAtRule,
	name,
	attributes,
	setAttributes,
} ) {
	const {
		tagName,
		htmlAttributes,
		styles,
	} = attributes;

	const backgroundImageUrl = useMemo( () => {
		const url = getStyleValue( 'backgroundImage', currentAtRule );

		const regex = /url\((['"]?)(.*?)\1\)/;
		const match = url.match( regex );

		if ( match && match[ 2 ] ) {
			return match[ 2 ];
		}
	}, [ getStyleValue( 'backgroundImage' ), currentAtRule ] );

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
					items={ 'a' === tagName ? linkElementColorControls : containerColorControls }
					getStyleValue={ getStyleValue }
					onStyleChange={ onStyleChange }
					currentAtRule={ currentAtRule }
				/>

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

				<ImageUpload
					label={ __( 'Background Image', 'generateblocks' ) }
					value={ getStyleValue( 'backgroundImage', currentAtRule ) }
					onInsert={ ( value ) => onStyleChange( 'backgroundImage', `url(${ value })`, currentAtRule ) }
					onSelectImage={ ( media ) => onStyleChange( 'backgroundImage', `url(${ media.url })`, currentAtRule ) }
					showInput={ false }
					previewUrl={ backgroundImageUrl }
				/>
			</OpenPanel>

			<OpenPanel
				title={ __( 'Settings', 'generateblocks' ) }
				shouldRender={ '' === currentAtRule }
			>
				<TagNameControl
					blockName="generateblocks/loop-item"
					value={ tagName }
					onChange={ ( value ) => {
						setAttributes( { tagName: value } );

						if ( 'a' === value && ! styles?.display ) {
							onStyleChange( 'display', 'block' );
						}
					} }
				/>

				{ 'a' === tagName && (
					<BaseControl>
						<Notice
							status="warning"
							isDismissible={ false }
						>
							{ __( 'This container is now a link element. Be sure not to add any interactive elements inside of it, like buttons or other links.', 'generateblocks' ) }
						</Notice>
					</BaseControl>
				) }

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
