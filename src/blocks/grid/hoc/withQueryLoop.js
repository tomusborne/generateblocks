import { Fragment, useState, useEffect } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';
import QueryLoopRenderer from '../components/QueryLoopRenderer';

export default ( WrappedComponent ) => {
	return ( props ) => {
		const { setAttributes } = props;
		const [ isQueryLoop, setIsQueryLoop ] = useState( false );

		useEffect( () => {
			setAttributes( { isQueryLoop } );
		}, [ isQueryLoop ] );

		const newProps = isQueryLoop ? Object.assign( {}, props, {
			defaultLayout: '100',
			templateLock: 'all',
			InnerBlocksRenderer: QueryLoopRenderer,
		} ) : props;

		return (
			<Fragment>
				<InspectorControls>
					<ToggleControl
						label={ __( 'Enable query loop', 'generateblocks' ) }
						checked={ isQueryLoop }
						onChange={ setIsQueryLoop }
					/>
				</InspectorControls>

				<WrappedComponent { ...newProps } />
			</Fragment>
		);
	};
};
