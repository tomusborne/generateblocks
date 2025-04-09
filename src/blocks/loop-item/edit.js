import { useBlockProps, InspectorControls, useInnerBlocksProps } from '@wordpress/block-editor';
import { useMemo, useEffect } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

import { BlockStyles, withUniqueId } from '@edge22/block-styles';

import { BlockSettings } from './components/BlockSettings';
import { selectorShortcuts } from '@utils/selectorShortcuts';
import { withStyles } from '@hoc/withStyles';
import { BlockStylesBuilder, BlockAppender } from '@components/index';
import { withHtmlAttributes } from '@hoc/withHtmlAttributes.js';
import { getBlockClasses } from '@utils/getBlockClasses';

import './editor.scss';

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
		name,
	} = props;

	const {
		tagName,
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
		const visibleSelectors = [];
		const blockSelectors = { ...selectorShortcuts };

		visibleSelectors.push(
			{
				label: __( 'Links', 'generateblocks' ),
				value: 'a',
			}
		);

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
	}, [ tagName ] );

	const contextPostId = context?.postId ?? context?.[ 'generateblocks/loopIndex' ] ?? 0;
	const previewId = context?.[ 'generateblocks/loopPreviewId' ] ?? {};
	const hasLoopItems = context?.[ 'generateblocks/hasLoopItems' ] ?? false;
	const setPreviewId = context?.[ 'generateblocks/setLoopPreviewId' ] ?? null;
	const queryId = context?.[ 'generateblocks/queryId' ] ?? '';
	const itemPreviewId = previewId[ queryId ] || 0;

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
				{ ( !! hasLoopItems && itemPreviewId !== contextPostId ) && (
					<button
						className="gb-block-preview__toggle"
						data-block-id={ clientId }
						data-context-post-id={ contextPostId }
						onClick={ () => {
							if ( setPreviewId ) {
								setPreviewId( ( prev ) => {
									return {
										...prev,
										[ queryId ]: contextPostId,
									};
								} );
							}
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
