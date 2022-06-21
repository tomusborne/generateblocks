import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { addFilter, applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import PanelArea from '../components/panel-area';
import getIcon from '../utils/get-icon';

const data = [
	{
		name: 'generateblocks/button',
		id: 'buttonDocumentation',
		url: 'https://docs.generateblocks.com/collection/buttons/',
	},
	{
		name: 'generateblocks/button-container',
		id: 'buttonContainerDocumentation',
		url: 'https://docs.generateblocks.com/collection/buttons/',
	},
	{
		name: 'generateblocks/container',
		id: 'containerDocumentation',
		url: 'https://docs.generateblocks.com/collection/container/',
	},
	{
		name: 'generateblocks/grid',
		id: 'gridDocumentation',
		url: 'https://docs.generateblocks.com/collection/grid/',
	},
	{
		name: 'generateblocks/headline',
		id: 'headlineDocumentation',
		url: 'https://docs.generateblocks.com/collection/headline/',
	},
	{
		name: 'generateblocks/image',
		id: 'imageDocumentation',
		url: 'https://docs.generateblocks.com/collection/image/',
	},
];

const withDocumentation = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const {
			name,
			state,
		} = props;

		const blockData = data.find( ( obj ) => {
			return name === obj.name;
		} );

		if ( ! blockData || 0 === blockData.length ) {
			return <BlockEdit { ...props } />;
		}

		return (
			<Fragment>
				<BlockEdit { ...props } />

				<InspectorControls>
					<PanelArea
						{ ...props }
						title={ __( 'Documentation', 'generateblocks' ) }
						icon={ getIcon( 'documentation' ) }
						initialOpen={ false }
						className={ 'gblocks-panel-label' }
						id={ blockData.id }
						state={ state }
					>
						<p>{ __( 'Need help with this block?', 'generateblocks' ) }</p>
						<a href={ blockData.url } target="_blank" rel="noreferrer noopener">{ __( 'Visit our documentation', 'generateblocks' ) }</a>

						{ applyFilters( 'generateblocks.editor.controls', '', blockData.id, props, state ) }
					</PanelArea>
				</InspectorControls>
			</Fragment>
		);
	};
}, 'withDocumentation' );

addFilter(
	'editor.BlockEdit',
	'generateblocks/with-documentation',
	withDocumentation,
	99
);
