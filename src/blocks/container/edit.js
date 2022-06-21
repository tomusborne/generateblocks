import BlockControls from './components/BlockControls';
import InspectorAdvancedControls from '../grid/components/InspectorAdvancedControls';
import GoogleFontLink from '../../components/google-font-link';
import { applyFilters } from '@wordpress/hooks';
import { Fragment } from '@wordpress/element';
import { useDeviceType } from '../../hooks';
import InspectorControls from './components/InspectorControls';
import { compose } from '@wordpress/compose';
import { withUniqueId, withContainerLegacyMigration } from '../../hoc';
import withDynamicContent from '../../extend/dynamic-content/hoc/withDynamicContent';
import ContainerContentRenderer from './components/ContainerContentRenderer';

const ContainerEdit = ( props ) => {
	const {
		attributes,
		setAttributes,
		ContentRenderer = ContainerContentRenderer,
	} = props;

	const {
		anchor,
		fontFamily,
		googleFont,
		googleFontVariants,
		isBlockPreview = false,
	} = attributes;

	const [ deviceType, setDeviceType ] = useDeviceType( 'Desktop' );

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
	withDynamicContent,
	withUniqueId,
	withContainerLegacyMigration,
)( ContainerEdit );
