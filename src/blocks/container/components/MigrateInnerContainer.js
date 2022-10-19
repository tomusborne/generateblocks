import { ToggleControl, Modal, Button, Notice } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState, useContext } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import hasNumericValue from '../../../utils/has-numeric-value';
import sizingValue from '../../../utils/sizingValue';
import ControlsContext from '../../../block-context';

export default function MigrateInnerContainer( props ) {
	const {
		setAttributes,
		attributes,
	} = props;

	const {
		useInnerContainer,
		isGrid,
		paddingTop,
		paddingRight,
		paddingBottom,
		paddingLeft,
		paddingTopTablet,
		paddingRightTablet,
		paddingBottomTablet,
		paddingLeftTablet,
		paddingTopMobile,
		paddingRightMobile,
		paddingBottomMobile,
		paddingLeftMobile,
		paddingUnit,
		containerWidth,
		outerContainer,
		innerContainer,
		innerZindex,
		marginLeft,
		marginRight,
		useGlobalContainerWidth,
		verticalAlignment,
		verticalAlignmentTablet,
		verticalAlignmentMobile,
		sizing,
	} = attributes;

	const { clientId } = useContext( ControlsContext );
	const [ isInnerContainerMigrateOpen, setIsInnerContainerMigrateOpen ] = useState( false );
	const openModal = () => setIsInnerContainerMigrateOpen( true );
	const closeModal = () => setIsInnerContainerMigrateOpen( false );
	const { insertBlocks, removeBlocks } = useDispatch( 'core/block-editor' );
	const { getBlocksByClientId, getBlockRootClientId } = useSelect( ( select ) => select( 'core/block-editor' ), [] );
	const hasParentBlock = getBlockRootClientId( clientId );
	const hasDefaultContainerWidth = parseInt( containerWidth ) === parseInt( generateBlocksInfo.globalContainerWidth );
	const recommended = ( ! hasParentBlock && 'full' === outerContainer && 'contained' === innerContainer ) || hasNumericValue( innerZindex );
	const layoutAttributes = {};
	let setMinHeightFlex = false;

	if ( sizingValue( 'minHeight', sizing ) && verticalAlignment && ! isGrid ) {
		layoutAttributes.display = 'flex';
		layoutAttributes.flexDirection = 'column';
		layoutAttributes.justifyContent = verticalAlignment;
		setMinHeightFlex = true;
	}

	if ( isGrid && verticalAlignment ) {
		layoutAttributes.display = 'flex';
		layoutAttributes.flexDirection = 'column';
		layoutAttributes.justifyContent = verticalAlignment;
	}

	if ( ! isGrid ) {
		if ( ! setMinHeightFlex && sizingValue( 'minHeightTablet', sizing ) && 'inherit' !== verticalAlignmentTablet ) {
			layoutAttributes.displayTablet = 'flex';
			layoutAttributes.flexDirectionTablet = 'column';
			setMinHeightFlex = true;
		}

		if ( setMinHeightFlex && 'inherit' !== verticalAlignmentTablet ) {
			layoutAttributes.justifyContentTablet = verticalAlignmentTablet;
		}
	}

	if ( isGrid && verticalAlignmentTablet && 'inherit' !== verticalAlignmentTablet ) {
		layoutAttributes.justifyContentTablet = verticalAlignmentTablet;
	}

	if ( ! isGrid ) {
		if ( ! setMinHeightFlex && sizingValue( 'minHeightMobile', sizing ) && 'inherit' !== verticalAlignmentMobile ) {
			layoutAttributes.displayMobile = 'flex';
			layoutAttributes.flexDirectionMobile = 'column';
			setMinHeightFlex = true;
		}

		if ( setMinHeightFlex && 'inherit' !== verticalAlignmentTablet ) {
			layoutAttributes.justifyContentMobile = verticalAlignmentMobile;
		}
	}

	if ( isGrid && verticalAlignmentMobile && 'inherit' !== verticalAlignmentMobile ) {
		layoutAttributes.justifyContentMobile = verticalAlignmentMobile;
	}

	return (
		<>
			{ !! useInnerContainer &&
				<ToggleControl
					label={ __( 'Use legacy inner container', 'generateblocks' ) }
					help={ __( 'Old versions of the Container block had an inner container div. This will remove that inner div for you.', 'generateblocks' ) }
					checked={ !! useInnerContainer }
					onChange={ () => openModal() }
				/>
			}

			{ !! isInnerContainerMigrateOpen &&
				<Modal title={ __( 'Add inner Container block', 'generateblocks' ) } onRequestClose={ closeModal }>
					<p>{ __( 'We can automatically add an inner Container block to this block if your layout relies on it.', 'generateblocks' ) }</p>
					<Notice status="info" isDismissible={ false } className="gblocks-inner-container-notice">
						<strong>{ __( 'Recommendation:', 'generateblocks' ) }</strong>
						{ !! recommended
							? ' ' + __( 'Yes, we recommend you add an inner Container block to maintain your current layout.', 'generateblocks' )
							: ' ' + __( 'No, we do not believe you need an inner Container block based on your current layout.', 'generateblocks' )
						}
					</Notice>
					<Button
						variant={ !! recommended ? 'primary' : 'tertiary' }
						style={ { marginRight: '5px' } }
						onClick={ () => {
							const parentBlock = getBlocksByClientId( clientId )[ 0 ];
							const childBlocks = parentBlock.innerBlocks;

							const newInnerBlocks = createBlock(
								'generateblocks/container',
								{
									paddingTop,
									paddingRight,
									paddingBottom,
									paddingLeft,
									paddingTopTablet,
									paddingRightTablet,
									paddingBottomTablet,
									paddingLeftTablet,
									paddingTopMobile,
									paddingRightMobile,
									paddingBottomMobile,
									paddingLeftMobile,
									paddingUnit,
									useGlobalContainerWidth: 'contained' === innerContainer ? !! hasDefaultContainerWidth : useGlobalContainerWidth,
									marginLeft: 'auto',
									marginRight: 'auto',
									zindex: innerZindex,
								},
								childBlocks
							);

							const childClientIds = childBlocks.map( ( block ) => block.clientId );
							removeBlocks( childClientIds );
							insertBlocks( newInnerBlocks, 0, clientId );

							setAttributes( {
								useInnerContainer: false,
								paddingTop: '',
								paddingRight: '',
								paddingBottom: '',
								paddingLeft: '',
								paddingTopTablet: '',
								paddingRightTablet: '',
								paddingBottomTablet: '',
								paddingLeftTablet: '',
								paddingTopMobile: '',
								paddingRightMobile: '',
								paddingBottomMobile: '',
								paddingLeftMobile: '',
								paddingUnit: generateBlocksDefaults.container.paddingUnit,
								variantRole: ! hasParentBlock ? 'section' : '',
								useGlobalContainerWidth: ! isGrid && 'contained' === outerContainer && !! hasDefaultContainerWidth,
								marginLeft: ! isGrid && 'contained' === outerContainer ? 'auto' : marginLeft,
								marginRight: ! isGrid && 'contained' === outerContainer ? 'auto' : marginRight,
								sizing: {
									...attributes.sizing,
									height: isGrid ? '100%' : '',
									maxWidth: ! isGrid && 'contained' === outerContainer && ! hasDefaultContainerWidth && containerWidth ? containerWidth + 'px' : '',
								},
								...layoutAttributes,
							} );

							closeModal();
						} }
					>
						{ __( 'Yes, add an inner Container block', 'generateblocks' ) }
					</Button>

					<Button
						variant={ ! recommended ? 'primary' : 'tertiary' }
						onClick={ () => {
							setAttributes( {
								useInnerContainer: false,
								useGlobalContainerWidth: ! isGrid && 'contained' === outerContainer && !! hasDefaultContainerWidth,
								marginLeft: ! isGrid && 'contained' === outerContainer ? 'auto' : marginLeft,
								marginRight: ! isGrid && 'contained' === outerContainer ? 'auto' : marginRight,
								sizing: {
									...attributes.sizing,
									height: isGrid ? '100%' : '',
									maxWidth: ! isGrid && 'contained' === outerContainer && ! hasDefaultContainerWidth && containerWidth ? containerWidth + 'px' : '',
								},
								...layoutAttributes,
							} );
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
