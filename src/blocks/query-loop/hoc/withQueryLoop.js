import { Fragment, useEffect } from '@wordpress/element';
import InspectorControls from '../components/InspectorControls';
import QueryLoopRenderer from '../components/QueryLoopRenderer';
import queryLoopAttributes from '../attributes';
import filterAttributes from '../../../utils/filter-attributes';

export default ( WrappedComponent ) => {
	return ( props ) => {
		const { attributes, setAttributes } = props;

		useEffect( () => {
			setAttributes( { isQueryLoop: true } );
		}, [] );

		const newProps = attributes.isQueryLoop ? Object.assign( {}, props, {
			defaultLayout: '100',
			templateLock: 'all',
			InnerBlocksRenderer: QueryLoopRenderer,
		} ) : props;

		return (
			<Fragment>
				<InspectorControls
					attributes={ filterAttributes( attributes, Object.keys( queryLoopAttributes ) ) }
					setAttributes={ setAttributes }
				/>

				<WrappedComponent { ...newProps } />
			</Fragment>
		);
	};
};
