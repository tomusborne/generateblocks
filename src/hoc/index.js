import withUniqueId from './withUniqueId';
import withGridLegacyMigration from './withGridLegacyMigration';
import withButtonLegacyMigration from './withButtonLegacyMigration';
import withContainerLegacyMigration from './withContainerLegacyMigration';
import withButtonContainerLegacyMigration from './withButtonContainerLegacyMigration';
import withDeviceType from './withDeviceType';
import './withDocumentation';
import './migrations/migrateGlobalStyleAttrs';

export {
	withUniqueId,
	withGridLegacyMigration,
	withButtonLegacyMigration,
	withContainerLegacyMigration,
	withButtonContainerLegacyMigration,
	withDeviceType,
};
