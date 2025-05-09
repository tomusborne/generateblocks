import { createElement } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import classnames from 'classnames';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';

export default function RootElement( {
	name,
	clientId,
	align,
	children,
	isBlockPreview,
} ) {
	const {
		getBlockRootClientId,
	} = useSelect( ( select ) => select( 'core/block-editor' ), [] );

	const supportsLayout = useSelect( ( select ) => {
		const {
			getSettings,
		} = select( blockEditorStore );

		return getSettings().supportsLayout || false;
	}, [] );

	const blockName = name.toString().replace( '/', '-' );

	const blockProps = {
		className: classnames( {
			'wp-block': true,
			'gb-is-root-block': true,
			[ `gb-root-block-${ blockName }` ]: true,
			[ `align${ align }` ]: supportsLayout,
		} ),
		'data-align': align && ! supportsLayout ? align : null,
		'data-block': clientId,
	};

	const parentBlockId = getBlockRootClientId( clientId );

	if ( applyFilters( 'generateblocks.rootElement.disable', parentBlockId || isBlockPreview, { name } ) ) {
		return children;
	}

	return createElement(
		'div',
		blockProps,
		children
	);
}
