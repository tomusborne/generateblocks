import { useBlockProps, InspectorControls, useInnerBlocksProps } from '@wordpress/block-editor';
import { useEffect, useMemo } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { withUniqueId } from '../../hoc';
import { BlockStyles } from '@edge22/block-styles';
import { convertInlineStyleStringToObject } from '../element/utils.js';
import RootElement from '../../components/root-element/index.js';
import { TemplateSelector } from '@components/template-selector';
import { templates } from './templates';
import { BlockSettings } from './components/BlockSettings';
import { selectorShortcuts } from '@utils/selectorShortcuts';
import { withEmptyObjectFix } from '@hoc/withEmptyObjectFix';
import { withStyles } from '@hoc/withStyles';
import { BlockStylesBuilder } from '@components/index';

function EditBlock( props ) {
	const {
		attributes,
		setAttributes,
		name,
		clientId,
		selector,
		onStyleChange,
	} = props;

	const {
		className,
		uniqueId,
		styles = {},
		htmlAttributes = [],
		globalClasses = [],
		tagName,
		showTemplateSelector,
	} = attributes;

	const classNames = useMemo( () => {
		const classes = [];

		if ( className ) {
			classes.push( className );
		}

		if ( globalClasses.length > 0 ) {
			classes.push( ...globalClasses );
		}

		if ( Object.keys( styles ).length > 0 ) {
			classes.push( `gb-query-${ uniqueId }` );
		}

		return classes;
	}, [ className, globalClasses, styles, uniqueId ] );

	useEffect( () => {
		if ( ! tagName ) {
			setAttributes( { tagName: 'div' } );
		}
	}, [ tagName ] );

	const { style = '', ...otherAttributes } = htmlAttributes;
	const inlineStyleObject = convertInlineStyleStringToObject( style );
	const combinedAttributes = { ...otherAttributes, style: inlineStyleObject };

	const blockProps = useBlockProps(
		{
			className: classNames.join( ' ' ).trim(),
			...combinedAttributes,
		}
	);

	const innerBlocksProps = useInnerBlocksProps(
		blockProps,
		{
			allowedBlocks: [
				'generateblocks/looper',
				'generateblocks/query-no-results',
				'generateblocks/query-page-numbers',
				'generateblocks/element',
			],
		}
	);

	const TagName = tagName || 'div';
	const shortcuts = useMemo( () => {
		const visibleShortcuts = [
			{
				label: __( 'Main', 'generateblocks' ),
				value: '',
			},
			{
				label: __( 'Links', 'generateblocks' ),
				value: 'a',
			},
		];

		return {
			selectorShortcuts,
			visibleShortcuts,
		};
	}, [] );

	if ( showTemplateSelector ) {
		return (
			<TemplateSelector
				clientId={ clientId }
				setAttributes={ setAttributes }
				label={ __( 'Query', 'generateblocks-pro' ) }
				instructions={ __( 'Choose a layout to start with.', 'generateblocks-pro' ) }
				templates={ templates }
			/>
		);
	}

	return (
		<>
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
				<TagName { ...innerBlocksProps } />
			</RootElement>
		</>
	);
}

const Edit = compose(
	withStyles,
	withEmptyObjectFix,
	withUniqueId
)( EditBlock );

export { Edit };
