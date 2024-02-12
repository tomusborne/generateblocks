import { Button, ButtonGroup } from '@wordpress/components';
import { desktop, mobile, tablet } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { useLibrary } from './library-provider';
import { PatternDetails } from './pattern-details';

export function PatternDetailsHeader( {
	pattern,
	isSelected,
	bulkInsertEnabled,
	globalStyleData,
	closeModal,
} ) {
	const {
		activePatternId,
		previewIframeWidth,
		setPreviewIframeWidth,
	} = useLibrary();

	return (
		<PatternDetails
			pattern={ pattern }
			showPreview={ false }
			isSelected={ isSelected }
			showTitle={ false }
			bulkInsertEnabled={ bulkInsertEnabled }
			globalStyleData={ globalStyleData }
			closeModal={ closeModal }
		>
			{ !! activePatternId && (
				<ButtonGroup>
					<Button
						isPressed={ '100%' === previewIframeWidth }
						variant={ 'tertiary' }
						icon={ desktop }
						label={ __( 'Desktop', 'generateblocks' ) }
						showTooltip
						onClick={ () => setPreviewIframeWidth( '100%' ) }
					/>
					<Button
						isPressed={ '900px' === previewIframeWidth }
						variant={ 'tertiary' }
						icon={ tablet }
						label={ __( 'Tablet', 'generateblocks' ) }
						showTooltip
						onClick={ () => setPreviewIframeWidth( '900px' ) }
					/>
					<Button
						isPressed={ '400px' === previewIframeWidth }
						variant={ 'tertiary' }
						icon={ mobile }
						label={ __( 'Mobile', 'generateblocks' ) }
						showTooltip
						onClick={ () => setPreviewIframeWidth( '400px' ) }
					/>
				</ButtonGroup>
			) }
		</PatternDetails>
	);
}
