import { createReduxStore, register } from '@wordpress/data';
import {
	actions as currentStyleActions,
	selectors as currentStyleSelectors,
	reducer as currentStyleReducer,
} from '../../../generateblocks-pro/src/store/plugins/styles/current-style';
import {
	actions as nestedRuleActions,
	selectors as nestedRuleSelectors,
	reducer as nestedRuleReducer,
} from '../../../generateblocks-pro/src/store/plugins/styles/nested-rule';
import {
	actions as stylesActions,
	selectors as stylesSelectors,
	reducer as stylesReducer,
} from '../../../generateblocks-pro/src/store/plugins/styles/styles';
import {
	actions as atRuleActions,
	selectors as atRuleSelectors,
	reducer as atRuleReducer,
} from '../../../generateblocks-pro/src/store/plugins/styles/at-rule';
import {
	actions as tabsActions,
	selectors as tabsSelectors,
	reducer as tabsReducer,
} from '../../../generateblocks-pro/src/store/plugins/setting-tabs';

export const currentStyleStore = createReduxStore(
	'gb-block-styles-current-style',
	{
		reducer: currentStyleReducer,
		actions: currentStyleActions,
		selectors: currentStyleSelectors,
	}
);

export const atRuleStore = createReduxStore(
	'gb-block-styles-at-rule',
	{
		reducer: atRuleReducer,
		actions: atRuleActions,
		selectors: atRuleSelectors,
	}
);

export const nestedRuleStore = createReduxStore(
	'gb-block-styles-nested-rule',
	{
		reducer: nestedRuleReducer,
		actions: nestedRuleActions,
		selectors: nestedRuleSelectors,
	}
);

export const stylesStore = createReduxStore(
	'gb-block-styles',
	{
		reducer: stylesReducer,
		actions: stylesActions,
		selectors: stylesSelectors,
	}
);

export const tabsStore = createReduxStore(
	'gb-block-setting-tabs',
	{
		reducer: tabsReducer,
		actions: tabsActions,
		selectors: tabsSelectors,
	}
);

register( currentStyleStore );
register( stylesStore );
register( atRuleStore );
register( nestedRuleStore );
register( tabsStore );
