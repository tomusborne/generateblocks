import { addFilter } from '@wordpress/hooks';
import { migrateButtonAttributes } from '../withButtonLegacyMigration';
import { migrateButtonContainerAttributes } from '../withButtonContainerLegacyMigration';
import { migrateContainerAttributes } from '../withContainerLegacyMigration';
import { migrateHeadlineAttributes } from '../withHeadlineLegacyMigration';
import { migrateGridAttributes } from '../withGridLegacyMigration';
import { migrateImageAttributes } from '../withImageLegacyMigration';
import { isEmpty, isObject } from 'lodash';

/**
 * This ensures that Global Styles pass the correct attributes
 * to the CSS generation even when attributes change names.
 */
addFilter(
	'generateblocks.editor.cssAttrs',
	'generateblocks/migrateCssAttrs',
	( attributes, props ) => {
		const {
			name,
		} = props;

		if ( ! attributes.useGlobalStyle ) {
			return attributes;
		}

		let migrateFunction = null;

		switch ( name ) {
			case 'generateblocks/button':
				migrateFunction = migrateButtonAttributes;
				break;

			case 'generateblocks/button-container':
				migrateFunction = migrateButtonContainerAttributes;
				break;

			case 'generateblocks/container':
				migrateFunction = migrateContainerAttributes;
				break;

			case 'generateblocks/headline':
				migrateFunction = migrateHeadlineAttributes;
				break;

			case 'generateblocks/grid':
				migrateFunction = migrateGridAttributes;
				break;

			case 'generateblocks/image':
				migrateFunction = migrateImageAttributes;
				break;
		}

		if ( null !== migrateFunction ) {
			// This ensures that old attributes (coming from Global Styles) are migrated
			// to their new attribute names so styling continues to work in the editor.
			const migratedAttributes = migrateFunction( {
				attributes: {
					...attributes,
					// Use the global style block version if possible.
					blockVersion: attributes.globalBlockVersion || 1,
				},
				mode: 'css',
			} );

			const newAttributes = {};

			// We only need these migrated attributes if a local attribute doesn't exist.
			Object.entries( migratedAttributes ).forEach( ( [ attributeName, attributeValue ] ) => {
				if ( isObject( attributeValue ) ) {
					Object.entries( attributeValue ).forEach( ( [ objectProperty, objectValue ] ) => {
						if ( isEmpty( attributes[ attributeName ]?.[ objectProperty ] ) ) {
							newAttributes[ attributeName ] = {
								...attributes[ attributeName ],
								...newAttributes[ attributeName ],
								[ objectProperty ]: objectValue,
							};
						}
					} );
				} else if ( isEmpty( attributes[ attributeName ] ) ) {
					newAttributes[ attributeName ] = attributeValue;
				}
			} );

			return { ...attributes, ...newAttributes };
		}

		return attributes;
	},
	1000
);
