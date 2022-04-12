import { createAction } from '@reduxjs/toolkit';

/**
 * Action to initialize a new query block state.
 *
 * @param id The query block id (blockId).
 * @param query The query arguments.
 *
 * @returns {{payload: {query, id}, type: string}} The generated action.
 *
 * @example dispatch( initQueryBlock( uniqueId ) );
 */
export const initQueryBlock = createAction( 'generateblocks/queryLoop/init' );

/**
 * Action to remove a query block from the state.
 *
 * @returns {{payload: string, type: string}} The generated action.
 *
 * @example dispatch( removeQueryBlock( uniqueId ) );
 */
export const removeQueryBlock = createAction( 'generateblocks/queryLoop/remove' );

export const addQueryBlockQueryParam = createAction('generateblocks/queryLoop/addQueryParameter');
