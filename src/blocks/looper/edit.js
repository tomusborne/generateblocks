import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { useEffect, useMemo } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

import { BlockStyles, withUniqueId } from '@edge22/block-styles';

import { LoopInnerBlocksRenderer } from './components/LoopInnerBlocksRenderer';
import { BlockSettings } from './components/BlockSettings';
import { selectorShortcuts as defaultSelectorShortcuts } from '@utils/selectorShortcuts.js';
import { withEmptyObjectFix } from '@hoc/withEmptyObjectFix';
import { withStyles } from '@hoc/withStyles';
import { BlockStylesBuilder } from '@components/index';

import './editor.scss';
import { withHtmlAttributes } from '@hoc/withHtmlAttributes.js';

function EditBlock( props ) {
	const {
		attributes,
		setAttributes,
		selector,
		onStyleChange,
		htmlAttributes,
	} = props;

	const {
		className,
		uniqueId,
		styles,
		globalClasses = [],
		tagName,
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
			classes.push( `gb-looper-${ uniqueId }` );
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

	const TagName = tagName || 'div';
	const shortcuts = useMemo( () => {
		const selectorShortcuts = {
			...defaultSelectorShortcuts,
			default: {
				items: [
					{ label: __( 'First item', 'generateblocks' ), value: '> .gb-loop-item:first-child' },
					...defaultSelectorShortcuts.default.items,
				],
			},
		};

		const visibleSelectors = [
			{
				label: __( 'Main', 'generateblocks' ),
				value: '',
			},
		];

		return {
			selectorShortcuts,
			visibleShortcuts: visibleSelectors,
		};
	}, [] );

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
			<TagName { ...blockProps }>
				<LoopInnerBlocksRenderer { ...props } />
			</TagName>
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
