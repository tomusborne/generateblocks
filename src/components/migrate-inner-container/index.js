import { ToggleControl, Modal, Button, Notice } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState, useContext } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import ControlsContext from '../../block-context';
import { doInnerContainerMigration, doSimpleMigration, shouldMigrateInnerContainer } from './utils';

export default function MigrateInnerContainer( props ) {
	const {
		setAttributes,
		attributes,
	} = props;

	const {
		useInnerContainer,
	} = attributes;

	const { clientId } = useContext( ControlsContext );
	const [ isInnerContainerMigrateOpen, setIsInnerContainerMigrateOpen ] = useState( false );
	const openModal = () => setIsInnerContainerMigrateOpen( true );
	const closeModal = () => setIsInnerContainerMigrateOpen( false );

	const {
		getBlocksByClientId,
		getBlockRootClientId,
		getBlockParentsByBlockName,
		getBlock,
	} = useSelect( ( select ) => select( 'core/block-editor' ), [] );

	const {
		insertBlocks,
		removeBlocks,
	} = useDispatch( 'core/block-editor' );

	function isInsideGridBlock( blockClientId ) {
		return getBlockParentsByBlockName( blockClientId, 'generateblocks/grid', true )[ 0 ];
	}

	function getChildBlock( blockClientId ) {
		const currentBlock = getBlock( blockClientId );
		return currentBlock && currentBlock.innerBlocks.length ? getBlock( currentBlock.innerBlocks[ 0 ].clientId ) : '';
	}

	const migrateInnerContainer = shouldMigrateInnerContainer( {
		attributes,
		insideGridBlock: isInsideGridBlock( clientId ),
		childBlock: getChildBlock( clientId ),
	} );

	return (
		<>
			{ !! useInnerContainer &&
				<ToggleControl
					label={ __( 'Use legacy inner container', 'generateblocks' ) }
					help={ __( 'Old versions of the Container block had an inner container div. This will remove that inner div for you.', 'generateblocks' ) }
					checked={ !! useInnerContainer }
					onChange={ openModal }
				/>
			}

			{ !! isInnerContainerMigrateOpen &&
				<Modal title={ __( 'Add inner Container block', 'generateblocks' ) } onRequestClose={ closeModal }>
					<p>{ __( 'We can automatically add an inner Container block to this block if your layout relies on it.', 'generateblocks' ) }</p>
					<Notice status="info" isDismissible={ false } className="gblocks-inner-container-notice">
						<strong>{ __( 'Recommendation:', 'generateblocks' ) }</strong>
						{ !! migrateInnerContainer
							? ' ' + __( 'Yes, we recommend you add an inner Container block to maintain your current layout.', 'generateblocks' )
							: ' ' + __( 'No, we do not believe you need an inner Container block based on your current layout.', 'generateblocks' )
						}
					</Notice>
					<Button
						variant={ !! migrateInnerContainer ? 'primary' : 'tertiary' }
						style={ { marginRight: '5px' } }
						onClick={ () => {
							doInnerContainerMigration( {
								clientId,
								attributes,
								setAttributes,
								parentBlock: getBlocksByClientId( clientId )[ 0 ],
								hasParentBlock: getBlockRootClientId( clientId ),
								insertBlocks,
								removeBlocks,
							} );
							closeModal();
						} }
					>
						{ __( 'Yes, add an inner Container block', 'generateblocks' ) }
					</Button>

					<Button
						variant={ ! migrateInnerContainer ? 'primary' : 'tertiary' }
						onClick={ () => {
							doSimpleMigration( { attributes, setAttributes } );
							closeModal();
						} }
					>
						{ __( 'No, just remove the legacy inner container div', 'generateblocks' ) }
					</Button>
				</Modal>
			}
		</>
	);
}
