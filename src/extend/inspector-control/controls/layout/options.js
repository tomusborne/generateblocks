import { __ } from '@wordpress/i18n';

const flexOptions = {
	flexDirection: [
		{
			label: __( 'Row', 'generateblocks' ),
			value: 'row',
			icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z" /><path d="m15 5-1.41 1.41L18.17 11H2v2h16.17l-4.59 4.59L15 19l7-7-7-7z" /></svg>,
		},
		{
			label: __( 'Column', 'generateblocks' ),
			value: 'column',
			icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z" /><path d="m19 15-1.41-1.41L13 18.17V2h-2v16.17l-4.59-4.59L5 15l7 7 7-7z" /></svg>,
		},
		{
			label: __( 'Reverse Row', 'generateblocks' ),
			value: 'row-reverse',
			icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z" /><path d="m9 19 1.41-1.41L5.83 13H22v-2H5.83l4.59-4.59L9 5l-7 7 7 7z" /></svg>,
		},
		{
			label: __( 'Reverse Column', 'generateblocks' ),
			value: 'column-reverse',
			icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z" /><path d="m5 9 1.41 1.41L11 5.83V22h2V5.83l4.59 4.59L19 9l-7-7-7 7z" /></svg>,
		},
	],
	flexWrap: [
		{
			label: __( 'No Wrap', 'generateblocks' ),
			value: 'nowrap',
		},
		{
			label: __( 'Wrap', 'generateblocks' ),
			value: 'wrap',
		},
		{
			label: __( 'Reverse Wrap', 'generateblocks' ),
			value: 'wrap-reverse',
		},
	],
	alignItems: [
		{
			label: __( 'Start', 'generateblocks' ),
			value: 'flex-start',
			icon: <svg aria-hidden="true" viewBox="0 0 16 16"><path fill="currentColor" d="M0 0h16v1H0z" /><path fill="currentColor" stroke="currentColor" d="M3.5 2.5h3v7h-3zm5 0h3v5h-3z" /></svg>,
		},
		{
			label: __( 'Center', 'generateblocks' ),
			value: 'center',
			icon: <svg aria-hidden="true" viewBox="0 0 16 16"><path fill="currentColor" stroke="currentColor" d="M3.5 3.5h3v8h-3zm5 1h3v6h-3z" /><path fill="currentColor" d="M0 7h16v1H0z" /></svg>,
		},
		{
			label: __( 'End', 'generateblocks' ),
			value: 'flex-end',
			icon: <svg aria-hidden="true" viewBox="0 0 16 16"><path fill="currentColor" d="M0 15h16v1H0z" /><path fill="currentColor" stroke="currentColor" d="M3.5 6.5h3v7h-3zm5 2h3v5h-3z" /></svg>,
		},
		{
			label: __( 'Stretch', 'generateblocks' ),
			value: 'stretch',
			icon: <svg aria-hidden="true" viewBox="0 0 16 16"><path fill="currentColor" d="M0 0h16v1H0zm0 15h16v1H0z" /><path fill="currentColor" stroke="currentColor" d="M3.5 2.5h3v11h-3zm5 0h3v11h-3z" /></svg>,
		},
		{
			label: __( 'Baseline', 'generateblocks' ),
			value: 'baseline',
			icon: <svg aria-hidden="true" viewBox="0 0 16 16"><path fill="currentColor" d="M0 7h16v1H0z" /><path fillRule="evenodd" clipRule="evenodd" d="M12 3H8v7h4V3zm-1 1H9v3h2V4zM7 3H3v9h4V3zM6 4H4v3h2V4z" fill="currentColor" /></svg>,
		},
	],
	justifyContent: [
		{
			label: __( 'Start', 'generateblocks' ),
			value: 'flex-start',
			icon: <svg aria-hidden="true" viewBox="0 0 16 16"><path fill="currentColor" stroke="currentColor" d="M2.5 4.5h3v7h-3zm5 0h3v7h-3z" /><path fill="currentColor" d="M0 0h1v16H0z" /></svg>,
		},
		{
			label: __( 'Center', 'generateblocks' ),
			value: 'center',
			icon: <svg aria-hidden="true" viewBox="0 0 16 16"><path fill="currentColor" stroke="currentColor" d="M2.5 4.5h3v7h-3zm7 0h3v7h-3z" /><path fill="currentColor" d="M7 0h1v16H7z" /></svg>,
		},
		{
			label: __( 'End', 'generateblocks' ),
			value: 'flex-end',
			icon: <svg aria-hidden="true" viewBox="0 0 16 16"><path fill="currentColor" d="M15 0h1v16h-1z" /><path fill="currentColor" stroke="currentColor" d="M5.5 4.5h3v7h-3zm5 0h3v7h-3z" /></svg>,
		},
		{
			label: __( 'Space Between', 'generateblocks' ),
			value: 'space-between',
			icon: <svg aria-hidden="true" viewBox="0 0 16 16"><path fill="currentColor" d="M15 0h1v16h-1zM0 0h1v16H0z" /><path fill="currentColor" stroke="currentColor" d="M10.5 4.5h3v7h-3zm-8 0h3v7h-3z" /></svg>,
		},
		{
			label: __( 'Space Around', 'generateblocks' ),
			value: 'space-around',
			icon: <svg aria-hidden="true" viewBox="0 0 16 16"><path fill="currentColor" d="M15 0h1v16h-1zM0 0h1v16H0z" /><path fill="currentColor" stroke="currentColor" d="M9.5 4.5h3v7h-3zm-6 0h3v7h-3z" /></svg>,
		},
	],
};

export default flexOptions;
