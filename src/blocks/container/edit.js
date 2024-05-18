import BlockControls from './components/BlockControls';
import InspectorAdvancedControls from './components/InspectorAdvancedControls';
import GoogleFontLink from '../../components/google-font-link';
import { applyFilters } from '@wordpress/hooks';
import { Fragment, useEffect, useRef } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withUniqueId, withContainerLegacyMigration, withDeviceType } from '../../hoc';
import withDynamicContent from '../../extend/dynamic-content/hoc/withDynamicContent';
import ContainerContentRenderer from './components/ContainerContentRenderer';
import GenerateBlocksInspectorControls from '../../extend/inspector-control';
import { withBlockContext } from '../../block-context';
import { useSelect } from '@wordpress/data';
import { withTemplateContext } from '../../extend/template-selector/templateContext';
import getDeviceType from '../../utils/get-device-type';
import withSetAttributes from '../../hoc/withSetAttributes';

const ContainerEdit = ( props ) => {
	const {
		clientId,
		attributes,
		setAttributes,
		ContentRenderer = ContainerContentRenderer,
	} = props;

	const {
		anchor,
		typography,
		googleFont,
		googleFontVariants,
		isBlockPreview = false,
		gridId,
		isGrid,
		isQueryLoopItem,
	} = attributes;

	const ref = useRef( null );
	const deviceType = getDeviceType();

	const allowedTagNames = applyFilters(
		'generateblocks.editor.allowedContainerTagNames',
		[
			'div',
			'article',
			'section',
			'header',
			'footer',
			'aside',
			'a',
		]
	);

	const filterTagName = ( tagValue ) => allowedTagNames.includes( tagValue ) ? tagValue : 'div';

	const allShapes = [];

	Object.keys( generateBlocksInfo.svgShapes ).forEach( ( key ) => {
		const shapes = generateBlocksInfo.svgShapes[ key ].svgs;

		Object.keys( shapes ).forEach( ( shapeName ) => {
			allShapes[ shapeName ] = {
				label: shapes[ shapeName ].label,
				icon: shapes[ shapeName ].icon,
			};
		} );
	} );

	const {
		getBlockParents,
		getBlocksByClientId,
	} = useSelect( ( select ) => select( 'core/block-editor' ), [] );

	useEffect( () => {
		const parentBlockId = getBlockParents( clientId, true );

		if ( parentBlockId.length > 0 ) {
			const parentBlocks = getBlocksByClientId( parentBlockId );

			if ( parentBlocks.length > 0 ) {
				if ( 'generateblocks/grid' === parentBlocks[ 0 ].name ) {
					const parentGridId = parentBlocks[ 0 ].attributes.uniqueId;

					if ( parentGridId !== gridId ) {
						setAttributes( {
							isGrid: true,
							gridId: parentGridId,
						} );
					}
				} else if ( isGrid && ! isQueryLoopItem ) {
					// Grid block isn't the parent, can't be a grid item.
					setAttributes( {
						isGrid: false,
						gridId: '',
					} );
				}
			}
		} else if ( isGrid && ! isQueryLoopItem ) {
			// No parent exists, can't be a grid item.
			setAttributes( {
				isGrid: false,
				gridId: '',
			} );
		}
	} );

	return (
		<Fragment>
			<BlockControls
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>

			<GenerateBlocksInspectorControls
				attributes={ attributes }
				setAttributes={ setAttributes }
			>
				{ applyFilters( 'generateblocks.editor.settingsPanel', undefined, { ...props, device: deviceType } ) }
			</GenerateBlocksInspectorControls>

			<InspectorAdvancedControls
				anchor={ anchor }
				attributes={ attributes }
				setAttributes={ setAttributes }
				filterTagName={ filterTagName }
			/>

			<GoogleFontLink
				fontFamily={ typography.fontFamily }
				googleFont={ googleFont }
				googleFontVariants={ googleFontVariants }
				isBlockPreview={ isBlockPreview }
			/>

			<ContentRenderer
				{ ...props }
				generateBlocksInfo={ generateBlocksInfo }
				filterTagName={ filterTagName }
				allShapes={ allShapes }
				deviceType={ deviceType }
				containerRef={ ref }
			/>
		</Fragment>
	);
};

export default compose(
	withSetAttributes,
	withDeviceType,
	withTemplateContext,
	withBlockContext,
	withDynamicContent,
	withUniqueId,
	withContainerLegacyMigration,
)( ContainerEdit );
