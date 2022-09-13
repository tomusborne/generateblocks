import RootElement from '../../../components/root-element';
import GridItem from './GridItem';
import InsideContainer from './InsideContainer';
import Element from '../../../components/element';
import { applyFilters } from '@wordpress/hooks';
import { InnerBlocks, useBlockProps, store as blockEditorStore } from '@wordpress/block-editor';
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
		align,
		isBlockPreview = false,
		useInnerContainer,
	} = attributes;

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

	return (
		<>
			<ComponentCSS { ...props } deviceType={ deviceType } />

			<RootElement name={ name } clientId={ clientId } align={ align }>
				<GridItem isGrid={ isGrid } uniqueId={ uniqueId }>
					<Element
						tagName={ filterTagName( applyFilters( 'generateblocks.frontend.containerTagName', tagName, attributes ) ) }
						htmlAttrs={ blockProps }
					>
						{ applyFilters( 'generateblocks.frontend.afterContainerOpen', '', attributes ) }
						<InsideContainer useInnerContainer={ useInnerContainer } >
							{ applyFilters( 'generateblocks.frontend.insideContainer', '', attributes ) }
							<InnerBlocks
								templateLock={ false }
								renderAppender={ () => <BlockAppender clientId={ clientId } isSelected={ props.isSelected } attributes={ attributes } /> }
							/>
						</InsideContainer>

						<ShapeDividers attributes={ attributes } allShapes={ allShapes } />

						{ applyFilters( 'generateblocks.frontend.beforeContainerClose', '', attributes ) }
					</Element>
				</GridItem>
			</RootElement>
		</>
	);
}
