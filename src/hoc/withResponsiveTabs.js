import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter, applyFilters } from '@wordpress/hooks';
import { InspectorControls } from '@wordpress/block-editor';
import ResponsiveTabs from '../components/responsive-tabs';
import { useDeviceType } from '../hooks';

const withResponsiveTabs = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const {
			name,
		} = props;

		const blocks = applyFilters(
			'generateblocks.editor.responsiveTabBlocks',
			[
				'generateblocks/button',
				'generateblocks/button-container',
				'generateblocks/container',
				'generateblocks/grid',
				'generateblocks/headline',
				'generateblocks/image',
			],
			props,
		);

		if ( ! blocks.includes( name ) ) {
			return <BlockEdit { ...props } />;
		}

		const [ deviceType, setDeviceType ] = useDeviceType( 'Desktop' );

		return (
			<>
				<InspectorControls>
					<ResponsiveTabs
						{ ...props }
						selectedDevice={ deviceType }
						onClick={ setDeviceType }
					/>
				</InspectorControls>

				<BlockEdit { ...props } />
			</>
		);
	};
}, 'withResponsiveTabs' );

addFilter(
	'editor.BlockEdit',
	'generateblocks/with-responsive-tabs',
	withResponsiveTabs,
	1
);
