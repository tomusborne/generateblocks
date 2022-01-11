import { createElement } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import classnames from 'classnames';

export default function RootElement( { name, clientId, children } ) {
	const {
		getBlockRootClientId,
	} = useSelect( ( select ) => select( 'core/block-editor' ), [] );

	const blockName = name.toString().replace( '/', '-' );

	const blockProps = {
		className: classnames( {
			'wp-block': true,
			'gb-is-root-block': true,
			[ `gb-root-block-${ blockName }` ]: true,
		} ),
	};

	const parentBlock = getBlockRootClientId( clientId );

	if ( parentBlock ) {
		return children;
	}

	return createElement(
		'div',
		blockProps,
		children
	);
}
