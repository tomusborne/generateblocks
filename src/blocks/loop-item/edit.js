import { useBlockProps, InspectorControls, useInnerBlocksProps } from '@wordpress/block-editor';
import { useEffect, useMemo } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

import { BlockStyles, withUniqueId } from '@edge22/block-styles';

import { BlockSettings } from './components/BlockSettings';
import BlockAppender from '../element/components/BlockAppender';
import { selectorShortcuts } from '@utils/selectorShortcuts';
import { withEmptyObjectFix } from '@hoc/withEmptyObjectFix';
import { withStyles } from '@hoc/withStyles';
import { BlockStylesBuilder } from '@components/index';
import { withHtmlAttributes } from '@hoc/withHtmlAttributes.js';
import { useBlockClassAttributes } from '@hooks/useBlockClassAttributes';
import { getBlockClasses } from '@utils/getBlockClasses';

function EditBlock( props ) {
	const {
		attributes,
		setAttributes,
		clientId,
		isSelected,
		selector,
		onStyleChange,
		htmlAttributes,
	} = props;

	const {
		tagName,
		isBlockPreview = false,
	} = attributes;

	const classNameAttributes = useBlockClassAttributes( attributes );
	const classNames = getBlockClasses( 'gb-loop-item', classNameAttributes, true );

	if ( isBlockPreview ) {
		classNames.push( 'gb-block-preview' );
	}

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
		}

		visibleSelectors.push(
			{
				label: __( 'Links', 'generateblocks' ),
				value: 'a',
			}
		);

		return {
			selectorShortcuts,
			visibleShortcuts: visibleSelectors,
		};
	}, [ tagName ] );

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
			<TagName { ...innerBlocksProps } />
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
