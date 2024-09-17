import { __ } from '@wordpress/i18n';
import { RichText, useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { Platform, useEffect, useMemo } from '@wordpress/element';
import { compose } from '@wordpress/compose';

import { BlockStyles, withUniqueId } from '@edge22/block-styles';

import { withDynamicTag } from '../../hoc/withDynamicTag';
import { LinkBlockToolbar } from '../../components/link-block-toolbar/LinkBlockToolbar.jsx';
import { convertInlineStyleStringToObject } from '../element/utils.js';
import { Icon } from './components/Icon.jsx';
import RootElement from '../../components/root-element/index.js';
import { BlockSettings } from './components/BlockSettings';
import { selectorShortcuts } from '@utils/selectorShortcuts';
import { withEmptyObjectFix } from '@hoc/withEmptyObjectFix';
import { withStyles } from '@hoc/withStyles';
import { BlockStylesBuilder } from '@components/block-styles-builder/BlockStylesBuilder';
import { TagNameToolbar } from '@components/index';

function EditBlock( props ) {
	const {
		attributes,
		setAttributes,
		mergeBlocks,
		onReplace,
		dynamicTagValue,
		name,
		clientId,
		selector,
		onStyleChange,
	} = props;

	const {
		tagName,
		content,
		className,
		uniqueId,
		styles = {},
		htmlAttributes = [],
		icon,
		iconLocation,
		globalClasses = [],
		iconOnly,
	} = attributes;

	useEffect( () => {
		if ( ! tagName ) {
			setAttributes( { tagName: 'span' } );
		}
	}, [ tagName ] );

	const contentValue = useMemo( () => {
		if ( ! dynamicTagValue ) {
			return content;
		}

		return dynamicTagValue.reduce( ( acc, { original, replacement } ) => {
			if ( ! replacement ) {
				return acc;
			}

			return acc.replaceAll( original, replacement );
		}, content );
	}, [ dynamicTagValue, content ] );

	const classNames = useMemo( () => {
		const classes = [];

		if ( className ) {
			classes.push( className );
		}

		if ( globalClasses.length > 0 ) {
			classes.push( ...globalClasses );
		}

		if ( Object.keys( styles ).length > 0 ) {
			classes.push( `gb-text-${ uniqueId }` );
		}

		if ( ! icon ) {
			classes.push( 'gb-text' );
		}

		return classes;
	}, [ className, styles, icon, uniqueId, globalClasses ] );

	const { style = '', href, ...otherAttributes } = htmlAttributes;
	const inlineStyleObject = convertInlineStyleStringToObject( style );
	const combinedAttributes = { ...otherAttributes, style: inlineStyleObject };

	const blockProps = useBlockProps(
		{
			className: classNames.join( ' ' ).trim(),
			...combinedAttributes,
		}
	);

	const TagNameWithIcon = tagName || 'span';
	const richTextProps = {
		identifier: content,
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
		const visibleSelectors = [
			{
				label: __( 'Main', 'generateblocks' ),
				value: '',
			},
		];

		if ( 'a' === tagName || 'button' === tagName ) {
			visibleSelectors.push(
				{
					label: __( 'Hover', 'generateblocks' ),
					value: ':is(:hover, :focus)',
				}
			);

			delete selectorShortcuts.links;
		}

		if ( icon ) {
			visibleSelectors.push(
				{
					label: __( 'Icon', 'generateblocks' ),
					value: '.gb-shape svg',
				},
			);

			selectorShortcuts.default.items.push(
				{ label: __( 'Icon', 'generateblocks' ), value: '.gb-shape svg' },
				{ label: __( 'Hovered icon', 'generateblocks' ), value: '&:is(:hover, :focus) .gb-shape svg' },
			);

			selectorShortcuts.icons = {
				label: __( 'Icon', 'generateblocks' ),
				items: [
					{ label: __( 'Icon', 'generateblocks' ), value: '.gb-shape svg' },
					{ label: __( 'Hovered icon', 'generateblocks' ), value: '&:is(:hover, :focus) .gb-shape svg' },
				],
			};
		}

		return {
			selectorShortcuts,
			visibleShortcuts: visibleSelectors,
		};
	}, [ tagName, icon ] );

	return (
		<>
			<LinkBlockToolbar
				setAttributes={ setAttributes }
				htmlAttributes={ htmlAttributes }
				tagName={ tagName }
			/>

			<TagNameToolbar
				label={ __( 'Choose tag name', 'generateblocks' ) }
				tagName={ tagName }
				onChange={ ( value ) => setAttributes( { tagName: value } ) }
			/>

			<InspectorControls>
				<BlockStyles
					settingsTab={ (
						<BlockSettings
							{ ...props }
						/>
					) }
					stylesTab={ (
						<BlockStylesBuilder
							selector={ selector }
							setAttributes={ setAttributes }
							shortcuts={ shortcuts }
							onStyleChange={ onStyleChange }
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
								<RichText
									{ ...richTextProps }
									tagName="span"
								/>
							) }
							{ 'after' === iconLocation && ( <Icon icon={ icon } /> ) }
						</TagNameWithIcon>
					) }

					{ ! icon && (
						<RichText
							{ ...richTextProps }
							{ ...blockProps }
							tagName={ tagName || 'span' }
						/>
					) }
				</>
			</RootElement>
		</>
	);
}

const Edit = compose(
	withStyles,
	withEmptyObjectFix,
	withDynamicTag,
	withUniqueId
)( EditBlock );

export { Edit };
