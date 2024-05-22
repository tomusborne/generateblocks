import { useInnerBlocksCount } from '../../../hooks';
import { Inserter } from '@wordpress/block-editor';
import { useDispatch } from '@wordpress/data';
import { __, sprintf, _x } from '@wordpress/i18n';
import { Button, Icon, Tooltip } from '@wordpress/components';
import getIcon from '../../../utils/get-icon';
import { applyFilters } from '@wordpress/hooks';
import { plus } from '@wordpress/icons';
import { getElementType } from '../block-types';

export default ( { clientId, isSelected, attributes } ) => {
	const { isBlockPreview } = attributes;
	const innerBlocksCount = useInnerBlocksCount( clientId );
	const hasChildBlocks = 0 < innerBlocksCount;
	const { selectBlock } = useDispatch( 'core/block-editor' );
	const { tagName } = attributes;

	let appender = false;
	let showAppender = true;

	if ( isBlockPreview ) {
		showAppender = false;
	}

	if ( 'button' === getElementType( tagName ) || 'heading' === getElementType( tagName ) ) {
		showAppender = false;
	}

	showAppender = applyFilters(
		'generateblocks.editor.showElementAppender',
		showAppender,
		{ clientId, isSelected, attributes }
	);

	if ( ! showAppender ) {
		return null;
	}

	function ButtonBlockAppender() {
		return (
			<Inserter
				position="bottom right"
				rootClientId={ clientId }
				__experimentalIsQuick
				renderToggle={ ( {
					onToggle,
					disabled,
					isOpen,
					blockTitle,
					hasSingleBlockType,
				} ) => {
					const label = hasSingleBlockType
						? sprintf(
							// translators: %s: the name of the block when there is only one
							_x( 'Add %s', 'directly add the only allowed block', 'generateblocks' ),
							blockTitle
						) : _x( 'Add block', 'Generic label for block inserter button', 'generateblocks' );

					return (
						<Tooltip text={ label }>
							<Button
								className={ 'block-editor-button-block-appender' }
								onClick={ onToggle }
								aria-haspopup={ ! hasSingleBlockType ? 'true' : undefined }
								aria-expanded={ ! hasSingleBlockType ? isOpen : undefined }
								disabled={ disabled }
								label={ label }
							>
								<Icon icon={ plus } />
							</Button>
						</Tooltip>
					);
				} }
				isAppender
			/>
		);
	}

	// Selected Container.
	if ( isSelected ) {
		appender = <ButtonBlockAppender />;
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
