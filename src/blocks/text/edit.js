import { __ } from '@wordpress/i18n';
import { RichText, useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { Platform, useEffect, useMemo } from '@wordpress/element';
import { compose } from '@wordpress/compose';

import { BlockStyles, withUniqueId } from '@edge22/block-styles';

import { withDynamicTag } from '../../hoc/withDynamicTag';
import { Icon } from './components/Icon.jsx';
import RootElement from '../../components/root-element/index.js';
import { BlockSettings } from './components/BlockSettings';
import { selectorShortcuts } from '@utils/selectorShortcuts';
import { withStyles } from '@hoc/withStyles';
import { BlockStylesBuilder } from '@components/block-styles-builder/BlockStylesBuilder';
import { AlignmentToolbar, LinkBlockToolbar, StylesOnboarder, TagNameToolbar } from '@components/index';
import { withHtmlAttributes } from '@hoc/withHtmlAttributes';
import { getBlockClasses } from '@utils/getBlockClasses';
import { DynamicTagBlockToolbar } from '../../dynamic-tags';

function EditBlock( props ) {
	const {
		attributes,
		setAttributes,
		mergeBlocks,
		onReplace,
		dynamicTagValue,
		setContentMode,
		contentMode,
		name,
		clientId,
		onStyleChange,
		getStyleValue,
		editorHtmlAttributes,
		isSelected,
		styles,
		context,
	} = props;

	const {
		tagName,
		content,
		icon,
		iconLocation,
		iconOnly,
		htmlAttributes,
	} = attributes;

	useEffect( () => {
		if ( ! tagName ) {
			setAttributes( { tagName: 'p' } );
		}
	}, [ tagName ] );

	const contentValue = useMemo( () => {
		if ( ! dynamicTagValue ) {
			return content;
		}

		return dynamicTagValue.reduce( ( acc, { original, replacement, fallback } ) => {
			if ( ! replacement ) {
				return acc.replaceAll( original, fallback );
			}

			const replacementWithNoLinks = replacement.replace( /href="[^"]*"/g, 'href="#"' );

			return acc.replaceAll( original, replacementWithNoLinks );
		}, content );
	}, [ dynamicTagValue, content ] );

	const classNames = getBlockClasses(
		'gb-text',
		{
			...attributes,
			styles,
		},
		! icon
	);

	const blockProps = useBlockProps(
		{
			className: classNames.join( ' ' ).trim(),
			...editorHtmlAttributes,
		}
	);

	const TagNameWithIcon = tagName || 'p';
	const richTextProps = {
		identifier: 'content',
		value: contentValue,
		onChange: ( value ) => setAttributes( { content: value } ),
		onMerge: mergeBlocks,
		onReplace,
		onRemove: () => onReplace( [] ),
		placeholder: __( 'Text', 'generateblocks' ),
		withoutInteractiveFormatting: 'a' === tagName || 'button' === tagName,
		...( Platform.isNative && { deleteEnter: true } ), // setup RichText on native mobile to delete the "Enter" key as it's handled by the JS/RN side
	};
	const shortcuts = useMemo( () => {
		const visibleSelectors = [];
		const blockSelectors = { ...selectorShortcuts };

		if ( 'a' !== tagName && 'button' !== tagName ) {
			visibleSelectors.push(
				{
					label: __( 'Links', 'generateblocks' ),
					value: 'a',
				}
			);
		}

		if ( icon ) {
			visibleSelectors.push(
				{
					label: __( 'Icon', 'generateblocks' ),
					value: '.gb-shape svg',
				},
			);

			if ( blockSelectors?.default?.items ) {
				blockSelectors.default.items.push(
					{ label: __( 'Icon', 'generateblocks' ), value: '.gb-shape svg' },
					{ label: __( 'Hovered icon', 'generateblocks' ), value: '&:is(:hover, :focus) .gb-shape svg' },
				);
			}

			blockSelectors.icons = {
				label: __( 'Icon', 'generateblocks' ),
				items: [
					{ label: __( 'Icon', 'generateblocks' ), value: '.gb-shape svg' },
					{ label: __( 'Hovered icon', 'generateblocks' ), value: '&:is(:hover, :focus) .gb-shape svg' },
				],
			};
		}

		if ( 'a' === tagName || 'button' === tagName ) {
			if ( blockSelectors?.links ) {
				delete blockSelectors.links;
			}

			const defaultItems = blockSelectors?.default?.items || [];

			if ( defaultItems.length > 0 ) {
				blockSelectors.default.items = defaultItems.filter( ( item ) => {
					return 'a' !== item.value && ! item.value.startsWith( 'a:' );
				} );
			}
		}

		return {
			selectorShortcuts: blockSelectors,
			visibleShortcuts: visibleSelectors,
		};
	}, [ tagName, icon ] );

	const renderContent = ( elementTagName, withBlockProps = false ) => {
		if ( 'preview' === contentMode && dynamicTagValue ) {
			const ElementTagName = elementTagName;

			// Render a plain HTML tag in preview mode
			return (
				<ElementTagName
					{ ...( withBlockProps && blockProps ) }
					dangerouslySetInnerHTML={ { __html: contentValue } }
				/>
			);
		}

		// The RichText component can't handle the `<button>` tag for some reason.
		// It doesn't allow spaces to be entered, and doesn't allow the user to type if there
		// isn't already a value entered. To handle this, we'll render a `<button>` tag instead
		// and use a `span` as the RichText component tag.
		if ( 'button' === elementTagName ) {
			return (
				<button
					{ ...( withBlockProps && blockProps ) }
				>
					<RichText
						{ ...richTextProps }
						tagName={ 'span' }
					/>
				</button>
			);
		}

		return (
			<RichText
				{ ...richTextProps }
				{ ...( withBlockProps && blockProps ) }
				tagName={ elementTagName }
			/>
		);
	};

	return (
		<>
			<TagNameToolbar
				label={ __( 'Choose tag name', 'generateblocks' ) }
				tagName={ tagName }
				onChange={ ( value ) => setAttributes( { tagName: value } ) }
			/>

			<LinkBlockToolbar
				setAttributes={ setAttributes }
				htmlAttributes={ htmlAttributes }
				tagName={ tagName }
				context={ context }
			/>

			<AlignmentToolbar
				withTextAlign
				getStyleValue={ getStyleValue }
				onStyleChange={ onStyleChange }
				setAttributes={ setAttributes }
				clientId={ clientId }
			/>

			{ ! iconOnly && (
				<DynamicTagBlockToolbar
					value={ content }
					tagName={ tagName }
					setContentMode={ setContentMode }
					contentMode={ contentMode }
					isSelected={ isSelected }
					onChange={ ( newValue ) => setAttributes( { content: newValue } ) }
					context={ context }
				/>
			) }

			<InspectorControls>
				<StylesOnboarder />
				<BlockStyles
					settingsTab={ (
						<BlockSettings
							{ ...props }
						/>
					) }
					stylesTab={ (
						<BlockStylesBuilder
							attributes={ attributes }
							setAttributes={ setAttributes }
							shortcuts={ shortcuts }
							onStyleChange={ onStyleChange }
							name={ name }
						/>
					) }
				/>
			</InspectorControls>

			<RootElement
				name={ name }
				clientId={ clientId }
			>
				<>
					{ !! icon && (
						<TagNameWithIcon { ...blockProps }>
							{ 'before' === iconLocation && ( <Icon icon={ icon } /> ) }
							{ ! iconOnly && (
								renderContent( 'span' )
							) }
							{ 'after' === iconLocation && ( <Icon icon={ icon } /> ) }
						</TagNameWithIcon>
					) }

					{ ! icon && (
						renderContent( tagName || 'span', true )
					) }
				</>
			</RootElement>
		</>
	);
}

const Edit = compose(
	withHtmlAttributes,
	withStyles,
	withDynamicTag,
	withUniqueId
)( EditBlock );

export { Edit };
