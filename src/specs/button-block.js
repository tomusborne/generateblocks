/**
 * WordPress dependencies
 */
import {
	getEditedPostContent,
	createNewPost,
} from '@wordpress/e2e-test-utils';
// eslint-disable-next-line no-restricted-syntax
import { searchForBlock } from '@wordpress/e2e-test-utils/build/inserter';
// eslint-disable-next-line no-restricted-syntax
import { canvas } from '@wordpress/e2e-test-utils/build/canvas';

describe( 'GenerateBlocksButtons', () => {
	beforeEach( async() => {
		await createNewPost();
	}, 60000 );

	it( 'has focus on button content', async() => {
		await searchForBlock( 'generateblocks/button' );
		const insertButton = await page.waitForXPath( `//button//span[contains(text(), 'Buttons')]` );
		await insertButton.click();

		await page.evaluate( () => {
			wp.data.dispatch( 'core/block-editor' ).selectBlock( wp.data.select( 'core/block-editor' ).getSelectedBlockClientId(), 0 );
		} );

		// eslint-disable-next-line @wordpress/no-global-active-element
		await canvas().waitForFunction( () => document.activeElement.closest( '.block-editor-block-list__layout' ) );
		await page.keyboard.type( 'Content' );

		expect( await getEditedPostContent() ).toMatchSnapshot();
	}, 60000 );
} );
