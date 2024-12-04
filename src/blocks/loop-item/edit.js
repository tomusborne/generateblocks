import { useBlockProps, InspectorControls, useInnerBlocksProps } from '@wordpress/block-editor';
import { useMemo, useEffect } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { doAction } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

import { BlockStyles, withUniqueId } from '@edge22/block-styles';

import { BlockSettings } from './components/BlockSettings';
import { selectorShortcuts } from '@utils/selectorShortcuts';
import { withStyles } from '@hoc/withStyles';
import { BlockStylesBuilder, BlockAppender } from '@components/index';
import { withHtmlAttributes } from '@hoc/withHtmlAttributes.js';
import { getBlockClasses } from '@utils/getBlockClasses';

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

	useEffect( () => {
		if ( ! tagName ) {
			setAttributes( { tagName: 'div' } );
		}
	}, [ tagName ] );

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

	const contextPostId = context?.postId ?? context?.[ 'generateblocks/loopIndex' ] ?? 0;
	const previewId = context?.[ 'generateblocks/loopPreviewId' ] ?? 0;

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
				{ previewId !== contextPostId && (
					<button
						className="gb-block-preview__toggle"
						data-block-id={ clientId }
						data-context-post-id={ contextPostId }
						onClick={ () => {
							doAction( 'generateblocks.editor.loopItem.togglePreview', contextPostId, props );
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
	withHtmlAttributes,
	withStyles,
	withUniqueId
)( EditBlock );

export { Edit };
