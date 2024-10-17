import { createReduxStore } from '@wordpress/data';
import {
	currentStyleActions,
	currentStyleSelectors,
	currentStyleReducer,
	nestedRuleActions,
	nestedRuleSelectors,
	nestedRuleReducer,
	styleActions,
	styleSelectors,
	styleReducer,
	atRuleActions,
	atRuleSelectors,
	atRuleReducer,
} from '@edge22/styles-builder';

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
		reducer: styleReducer,
		actions: styleActions,
		selectors: styleSelectors,
	}
);
