import BlockControls from './components/BlockControls';
import InspectorAdvancedControls from '../grid/components/InspectorAdvancedControls';
import ComponentCSS from './components/ComponentCSS';
import GoogleFontLink from '../../components/google-font-link';
import Element from '../../components/element';
import { applyFilters } from '@wordpress/hooks';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import getIcon from '../../utils/get-icon';
import { Fragment, useEffect } from '@wordpress/element';
import { useDeviceType, useInnerBlocksCount } from '../../hooks';
import classnames from 'classnames';
import ShapeDividers from './components/ShapeDividers';
import InspectorControls from './components/InspectorControls';
import GridItem from './components/GridItem';
import { compose } from '@wordpress/compose';
import { withUniqueId, withContainerLegacyMigration } from '../../hoc';
import { useDispatch } from '@wordpress/data';

const ContainerEdit = ( props ) => {
	const {
		attributes,
		setAttributes,
		clientId,
	} = props;

	const {
		uniqueId,
		className,
		anchor,
		tagName,
		backgroundColor,
		fontFamily,
		googleFont,
		googleFontVariants,
		isGrid,
	} = attributes;

	const { selectBlock } = useDispatch( 'core/block-editor' );
	const [ deviceType, setDeviceType ] = useDeviceType( 'Desktop' );
	const innerBlocksCount = useInnerBlocksCount( clientId );
	const hasChildBlocks = 0 < innerBlocksCount;

	useEffect( () => {
		const thisBlock = document.getElementById( `block-${ clientId }` );

		if ( thisBlock && 'full' === attributes.align ) {
			thisBlock.setAttribute( 'data-align', 'full' );
		}
	}, [] );

	// Attribute defaults added to an object late don't get defaults.
	if ( 'undefined' === typeof attributes.bgOptions.selector ) {
		attributes.bgOptions.selector = 'element';
	}

	if ( 'undefined' === typeof attributes.bgOptions.opacity ) {
		attributes.bgOptions.opacity = 1;
	}

	const tagNames = applyFilters(
		'generateblocks.editor.containerTagNames',
		[
			{ label: 'div', value: 'div' },
			{ label: 'section', value: 'section' },
			{ label: 'header', value: 'header' },
			{ label: 'footer', value: 'footer' },
			{ label: 'aside', value: 'aside' },
		],
		props,
		{ deviceType }
	);

	const allowedTagNames = applyFilters(
		'generateblocks.editor.allowedContainerTagNames',
		[
			'div',
			'section',
			'header',
			'footer',
			'aside',
			'a',
		]
	);

	const filterTagName = ( tagValue ) => allowedTagNames.includes( tagValue ) ? tagValue : 'div';

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
			'gb-container-empty': ! hasChildBlocks,
			'gb-container-visual-guides': ! hasChildBlocks && ! hasStyling && ! props.isSelected,
		} ),
		id: anchor ? anchor : null,
	};

	htmlAttributes = applyFilters(
		'generateblocks.frontend.htmlAttributes',
		htmlAttributes,
		'generateblocks/container',
		attributes
	);

	const blockProps = useBlockProps( htmlAttributes );

	const allShapes = [];

	Object.keys( generateBlocksInfo.svgShapes ).forEach( ( key ) => {
		const shapes = generateBlocksInfo.svgShapes[ key ].svgs;

		Object.keys( shapes ).forEach( ( name ) => {
			allShapes[ name ] = {
				label: shapes[ name ].label,
				icon: shapes[ name ].icon,
			};
		} );
	} );

	useEffect( () => {
		const thisBlock = document.getElementById( `block-${ clientId }` );

		if ( thisBlock ) {
			const alignValue = attributes.align;
			let currentDataAlign = '';

			if ( thisBlock.getAttribute( 'data-align' ) ) {
				currentDataAlign = thisBlock.getAttribute( 'data-align' );
			}

			if ( alignValue !== currentDataAlign ) {
				if ( ( '' === alignValue || undefined === alignValue ) && '' !== currentDataAlign ) {
					thisBlock.removeAttribute( 'data-align' );
				} else {
					thisBlock.setAttribute( 'data-align', alignValue );
				}
			}
		}
	}, [ attributes.align ] );

	return (
		<Fragment>
			<BlockControls
				attributes={ attributes }
				setAttributes={ setAttributes }
				deviceType={ deviceType }
			/>

			<InspectorControls
				{ ...props }
				deviceType={ deviceType }
				setDeviceType={ setDeviceType }
				state={ { deviceType } }
				blockDefaults={ generateBlocksDefaults.container }
				tagNames={ tagNames }
				filterTagName={ filterTagName }
				allShapes={ allShapes }
			/>

			<InspectorAdvancedControls anchor={ anchor } setAttributes={ setAttributes } />

			<ComponentCSS { ...props } deviceType={ deviceType } />

			<GoogleFontLink
				fontFamily={ fontFamily }
				googleFont={ googleFont }
				googleFontVariants={ googleFontVariants }
			/>

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
		</Fragment>
	);
};

export default compose(
	withUniqueId,
	withContainerLegacyMigration
)( ContainerEdit );
