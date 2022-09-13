import { useInnerBlocksCount } from '../../../hooks';
import { InnerBlocks } from '@wordpress/block-editor';
import { useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import getIcon from '../../../utils/get-icon';
import { applyFilters } from '@wordpress/hooks';

export default ( { clientId, isSelected, attributes } ) => {
	const { isBlockPreview } = attributes;
	const innerBlocksCount = useInnerBlocksCount( clientId );
	const hasChildBlocks = 0 < innerBlocksCount;
	const { selectBlock } = useDispatch( 'core/block-editor' );

	let appender = false;

	if ( isBlockPreview ) {
		return false;
	}

	// Selected Container.
	if ( isSelected ) {
		appender = <InnerBlocks.ButtonBlockAppender />;
	}

	// Empty non-selected Container.
	if ( ! hasChildBlocks && ! isSelected ) {
		appender = <Button
			className="gblocks-container-selector"
			onClick={ () => selectBlock( clientId ) }
			aria-label={ __( 'Select Container', 'generateblocks' ) }
		>
			<span className="gblocks-container-selector__icon">
				{ getIcon( 'container' ) }
			</span>
		</Button>;
	}

	return applyFilters(
		'generateblocks.editor.containerAppender',
		appender,
		{ clientId, isSelected, attributes }
	);
};
