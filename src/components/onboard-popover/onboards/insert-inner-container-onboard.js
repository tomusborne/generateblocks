import OnboardPopover from '../index';
import { __ } from '@wordpress/i18n';

export default function InsertInnerContainerOnboard() {
	return (
		<OnboardPopover onboardingKey="insert_inner_container">
			<h3>
				{ __( 'Insert inner container', 'generateblocks' ) }
			</h3>
			<p>
				{ __( 'Use this button to add a centered inner Container block for your content.', 'generateblocks' ) }
			</p>
			<p>
				{ __( 'We generally recommend this for top-level Containers so your content does not span the entire width of your screen. ', 'generateblocks' ) }
				<a
					target="_blank"
					rel="noreferrer"
					href="https://docs.generateblocks.com/article/add-inner-container/"
					title={ __( 'Read more about adding inner Container blocks.', 'generateblocks' ) }>
					{ __( 'Read more.', 'generateblocks' ) }
				</a>
			</p>
		</OnboardPopover>
	);
}
