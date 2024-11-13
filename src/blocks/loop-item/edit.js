import { useBlockProps, InspectorControls, useInnerBlocksProps } from '@wordpress/block-editor';
import { useMemo } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

import { BlockStyles, withUniqueId } from '@edge22/block-styles';

import { BlockSettings } from './components/BlockSettings';
import { selectorShortcuts } from '@utils/selectorShortcuts';
import { withStyles } from '@hoc/withStyles';
import { BlockStylesBuilder, BlockAppender } from '@components/index';
import { withHtmlAttributes } from '@hoc/withHtmlAttributes.js';
import { getBlockClasses } from '@utils/getBlockClasses';
import { withSetBlockAttributes } from '@hoc/withSetBlockAttributes';

function EditBlock( props ) {
	const {
		attributes,
		setAttributes,
		clientId,
		isSelected,
		onStyleChange,
		editorHtmlAttributes,
		styles,
		context,
	} = props;

	const {
		tagName,
		isBlockPreview = false,
	} = attributes;

	if ( ! tagName ) {
		setAttributes( { tagName: 'div' } );
	}

	const classNames = getBlockClasses(
		'gb-loop-item',
		{
			...attributes,
			styles,
		},
		true
	);

	if ( isBlockPreview ) {
		classNames.push( 'gb-block-preview' );
	}
	const blockProps = useBlockProps( {
		className: classNames.join( ' ' ).trim(),
		...editorHtmlAttributes,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		blockProps,
		{
			renderAppender: () => (
				<BlockAppender
					clientId={ clientId }
					isSelected={ isSelected }
					attributes={ attributes }
				/>
			),
		}
	);

	const {
		children: innerBlocksChildren,
		...otherInnerBlocksProps
	} = innerBlocksProps;

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
							attributes={ attributes }
							setAttributes={ setAttributes }
							shortcuts={ shortcuts }
							onStyleChange={ onStyleChange }
							name={ name }
						/>
					) }
				/>
			</InspectorControls>
			<TagName { ...otherInnerBlocksProps }>
				{ innerBlocksChildren }
				{ isBlockPreview && (
					<button
						className="gb-block-preview__toggle"
						data-block-id={ clientId }
						data-context-post-id={ context?.postId ?? 0 }
						onClick={ () => {
							setAttributes( { isBlockPreview: false } );
						} }
						type="button"
						aria-label={ __( 'Set this block as active', 'generateblocks' ) }
					/>
				) }
			</TagName>
		</>
	);
}

const Edit = compose(
	withSetBlockAttributes,
	withHtmlAttributes,
	withStyles,
	withUniqueId
)( EditBlock );

export { Edit };
