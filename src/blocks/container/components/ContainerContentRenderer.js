import RootElement from '../../../components/root-element';
import GridItem from './GridItem';
import Element from '../../../components/element';
import { applyFilters } from '@wordpress/hooks';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import getIcon from '../../../utils/get-icon';
import ShapeDividers from './ShapeDividers';
import classnames from 'classnames';
import { useInnerBlocksCount } from '../../../hooks';
import { useDispatch } from '@wordpress/data';
import ComponentCSS from './ComponentCSS';
import getBackgroundImageUrl from '../../../utils/get-background-image-url';

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
	} = attributes;

	const { selectBlock } = useDispatch( 'core/block-editor' );
	const innerBlocksCount = useInnerBlocksCount( clientId );
	const hasChildBlocks = 0 < innerBlocksCount;

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
		} ),
		id: anchor ? anchor : null,
		'data-align': align ? align : null,
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
						<div className={ 'gb-inside-container' }>
							{ applyFilters( 'generateblocks.frontend.insideContainer', '', attributes ) }
							<InnerBlocks
								templateLock={ false }
								renderAppender={ () => {
									if ( isBlockPreview ) {
										return false;
									}

									// Selected Container.
									if ( props.isSelected ) {
										return <InnerBlocks.ButtonBlockAppender />;
									}

									// Empty non-selected Container.
									if ( ! hasChildBlocks && ! props.isSelected ) {
										return <Button
											className="gblocks-container-selector"
											onClick={ () => selectBlock( clientId ) }
											aria-label={ __( 'Select Container', 'generateblocks' ) }
										>
											<span className="gblocks-container-selector__icon">
												{ getIcon( 'container' ) }
											</span>
										</Button>;
									}

									return false;
								} }
							/>
						</div>

						<ShapeDividers attributes={ attributes } allShapes={ allShapes } />

						{ applyFilters( 'generateblocks.frontend.beforeContainerClose', '', attributes ) }
					</Element>
				</GridItem>
			</RootElement>
		</>
	);
}
