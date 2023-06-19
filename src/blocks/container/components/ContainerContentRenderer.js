import RootElement from '../../../components/root-element';
import GridItem from './GridItem';
import { applyFilters, doAction } from '@wordpress/hooks';
import { useBlockProps, store as blockEditorStore, useInnerBlocksProps } from '@wordpress/block-editor';
import ShapeDividers from './ShapeDividers';
import classnames from 'classnames';
import { useInnerBlocksCount } from '../../../hooks';
import { useSelect } from '@wordpress/data';
import ComponentCSS from './ComponentCSS';
import getBackgroundImageUrl from '../../../utils/get-background-image-url';
import BlockAppender from './BlockAppender';

export default function ContainerContentRenderer( props ) {
	const {
		attributes,
		clientId,
		name,
		filterTagName,
		allShapes,
		deviceType,
		containerRef,
	} = props;

	const {
		uniqueId,
		className,
		anchor,
		tagName,
		backgroundColor,
		isGrid,
		bgOptions,
		bgImageInline,
		bgImage,
		align,
		isBlockPreview = false,
		useInnerContainer,
		templateLock,
	} = attributes;

	const TagName = filterTagName( applyFilters( 'generateblocks.frontend.containerTagName', tagName, attributes ) );
	const innerBlocksCount = useInnerBlocksCount( clientId );
	const hasChildBlocks = 0 < innerBlocksCount;
	const supportsLayout = useSelect( ( select ) => {
		const {
			getSettings,
		} = select( blockEditorStore );

		return getSettings().supportsLayout || false;
	}, [] );

	let hasStyling = (
		!! backgroundColor ||
		!! bgImage ||
		attributes.borderSizeTop ||
		attributes.borderSizeRight ||
		attributes.borderSizeBottom ||
		attributes.borderSizeLeft
	);

	hasStyling = applyFilters( 'generateblocks.editor.containerHasStyling', hasStyling, props );

	let htmlAttributes = {
		className: classnames( {
			'gb-container': true,
			[ `gb-container-${ uniqueId }` ]: true,
			[ `${ className }` ]: undefined !== className,
			'gb-container-empty': ! hasChildBlocks && ! isBlockPreview,
			'gb-container-visual-guides': ! hasChildBlocks && ! hasStyling && ! props.isSelected && ! isBlockPreview,
			[ `align${ align }` ]: supportsLayout,
		} ),
		id: anchor ? anchor : null,
		'data-align': align && ! supportsLayout ? align : null,
		ref: containerRef,
	};

	const backgroundUrl = getBackgroundImageUrl( props );

	if ( bgImageInline && backgroundUrl ) {
		let imageAttributeName = 'background-image';

		if ( 'element' !== bgOptions.selector ) {
			imageAttributeName = '--' + imageAttributeName;
		}

		htmlAttributes.style = {
			[ imageAttributeName ]: 'url(' + backgroundUrl + ')',
		};
	}

	htmlAttributes = applyFilters(
		'generateblocks.frontend.htmlAttributes',
		htmlAttributes,
		'generateblocks/container',
		attributes
	);

	const blockProps = useBlockProps( htmlAttributes );

	const innerBlocksProps = useInnerBlocksProps(
		! useInnerContainer
			? blockProps
			: { className: 'gb-inside-container' },
		{
			templateLock: applyFilters( 'generateblocks.editor.containerTemplateLock', templateLock || false, props ),
			renderAppender: () => <BlockAppender clientId={ clientId } isSelected={ props.isSelected } attributes={ attributes } />,
		}
	);

	doAction( 'generateblocks.editor.renderBlock', { ...props, ref: containerRef } );
	const containerBlockProps = useInnerContainer ? blockProps : innerBlocksProps;

	return (
		<>
			<ComponentCSS { ...props } deviceType={ deviceType } />

			<RootElement name={ name } clientId={ clientId } align={ align }>
				<GridItem isGrid={ isGrid } uniqueId={ uniqueId }>
					<TagName { ...containerBlockProps }>
						<>
							{ useInnerContainer
								? <div { ...innerBlocksProps }>{ innerBlocksProps.children }</div>
								: innerBlocksProps.children
							}
							<ShapeDividers attributes={ attributes } allShapes={ allShapes } />
						</>
					</TagName>
				</GridItem>
			</RootElement>
		</>
	);
}
