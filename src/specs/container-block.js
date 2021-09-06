/**
 * WordPress dependencies
 */
import {
	getEditedPostContent,
	createNewPost,
	loginUser,
	// canvas,
} from '@wordpress/e2e-test-utils';

import { insertGenerateBlocksBlock } from '../utils/e2e';

describe( 'GenerateBlocksContainer', () => {
	beforeEach( async() => {
		await loginUser( 'admin', 'password' );
		await createNewPost();
	}, 60000 );

	it( 'can be added to the editor', async() => {
		await insertGenerateBlocksBlock( 'Container', {
			layout: {
				outerContainer: 'contained',
				// innerContainer: 'contained',
				containerWidth: '960',
				tagName: 'aside',
			},
			typography: {
				fontWeight: 'bold',
				textTransform: 'capitalize',
				fontFamily: 'Roboto',
				fontSizeUnit: 'px',
				fontSize: '16',
			},
			spacing: {
				minimumHeight: '10',
				minimumHeightUnit: 'vh',
				paddingUnit: 'em',
				padding: {
					top: '10',
					right: '10',
					bottom: '10',
					left: '10',
				},
				marginUnit: '',
				margin: {
					top: '10',
					right: '10',
					bottom: '10',
					left: '10',
				},
				borderSizeUnit: '',
				borderSize: {
					top: '2',
					right: '2',
					bottom: '2',
					left: '2',
				},
				borderRadiusUnit: '',
				borderRadius: {
					topLeft: '4',
					topRight: '4',
					bottomLeft: '4',
					bottomRight: '4',
				},
				outerZIndex: '1',
				innerZIndex: '2',
			},
		} );

		await insertGenerateBlocksBlock( 'Container', {
			layout: {
				outerContainer: 'contained',
				// innerContainer: 'contained',
				containerWidth: '960',
				tagName: 'aside',
			},
			spacing: {
				padding: {
					top: '12',
					right: '12',
					bottom: '12',
					left: '12',
				},
			},
		} );

		expect( await getEditedPostContent() ).toMatchSnapshot();
	}, 60000 );
} );
