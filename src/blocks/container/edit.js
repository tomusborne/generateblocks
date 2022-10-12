import BlockControls from './components/BlockControls';
import InspectorAdvancedControls from './components/InspectorAdvancedControls';
import GoogleFontLink from '../../components/google-font-link';
import { applyFilters } from '@wordpress/hooks';
import { Fragment } from '@wordpress/element';
import { useDeviceType } from '../../hooks';
import InspectorControls from './components/InspectorControls';
import { compose } from '@wordpress/compose';
import { withUniqueId, withContainerLegacyMigration } from '../../hoc';
import withDynamicContent from '../../extend/dynamic-content/hoc/withDynamicContent';
import ContainerContentRenderer from './components/ContainerContentRenderer';
import GenerateBlocksInspectorControls from '../../extend/inspector-control';
import { withBlockContext } from '../../block-context';

const ContainerEdit = ( props ) => {
	const {
		clientId,
		attributes,
		setAttributes,
		ContentRenderer = ContainerContentRenderer,
	} = props;

	const {
		fontFamily,
		googleFont,
		googleFontVariants,
		isBlockPreview = false,
	} = attributes;

	const [ deviceType ] = useDeviceType();

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

	return (
		<Fragment>
			<BlockControls
				attributes={ attributes }
				setAttributes={ setAttributes }
				deviceType={ deviceType }
			/>

			<GenerateBlocksInspectorControls
				attributes={ attributes }
				setAttributes={ setAttributes }
			>
				<InspectorControls
					clientId={ clientId }
					attributes={ attributes }
					setAttributes={ setAttributes }
					filterTagName={ filterTagName }
				/>
			</GenerateBlocksInspectorControls>

			<InspectorAdvancedControls
				{ ...props }
				filterTagName={ filterTagName }
			/>

			<GoogleFontLink
				fontFamily={ fontFamily }
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
			/>
		</Fragment>
	);
};

export default compose(
	withBlockContext,
	withDynamicContent,
	withUniqueId,
	withContainerLegacyMigration,
)( ContainerEdit );
