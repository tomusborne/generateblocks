import { useBlockProps, useInnerBlocksProps, InspectorControls } from '@wordpress/block-editor';
import { useEffect, useMemo } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { BlockStyles, withUniqueId } from '@edge22/block-styles';
import BlockAppender from './components/BlockAppender.jsx';
import RootElement from '../../components/root-element/index.js';
import { BlockSettings } from './components/BlockSettings';
import { selectorShortcuts } from '@utils/selectorShortcuts.js';
import { withEmptyObjectFix } from '@hoc/withEmptyObjectFix.js';
import { withStyles } from '@hoc/withStyles';
import { BlockStylesBuilder, StylesOnboarder } from '@components/index.js';
import { withHtmlAttributes } from '@hoc/withHtmlAttributes.js';

function EditBlock( props ) {
	const {
		attributes,
		setAttributes,
		clientId,
		isSelected,
		name,
		selector,
		onStyleChange,
		htmlAttributes,
	} = props;

	const {
		tagName,
		className,
		styles = {},
		uniqueId,
		globalClasses = [],
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
			classes.push( `gb-element-${ uniqueId }` );
		}

		return classes;
	}, [ className, globalClasses, styles, uniqueId ] );

	useEffect( () => {
		if ( ! tagName ) {
			setAttributes( { tagName: 'div' } );
		}
	}, [ tagName ] );

	const blockProps = useBlockProps(
		{
			className: classNames.join( ' ' ).trim(),
			...htmlAttributes,
		}
	);
	const innerBlocksProps = useInnerBlocksProps(
		blockProps,
		{
			renderAppender: () => <BlockAppender clientId={ clientId } isSelected={ isSelected } attributes={ attributes } />,
		}
	);
	const TagName = tagName || 'div';
	const shortcuts = useMemo( () => {
		const visibleSelectors = [
			{
				label: __( 'Main', 'generateblocks' ),
				value: '',
			},
		];

		if ( 'a' === tagName ) {
			visibleSelectors.push(
				{
					label: __( 'Hover', 'generateblocks' ),
					value: '&:is(:hover, :focus)',
				}
			);
		} else {
			visibleSelectors.push(
				{
					label: __( 'Links', 'generateblocks' ),
					value: 'a',
				}
			);
		}

		return {
			selectorShortcuts,
			visibleShortcuts: visibleSelectors,
		};
	}, [ tagName ] );

	return (
		<>
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
	withHtmlAttributes,
	withStyles,
	withEmptyObjectFix,
	withUniqueId
)( EditBlock );

export { Edit };
