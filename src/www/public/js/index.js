'use strict';

import page from "https://unpkg.com/page?module";
import {html, render} from 'https://unpkg.com/lit-html?module';
import * as pages from '/js/pages.js';

const state = {
	login: {
		isLoggedIn: false,
		loggingInInProgress: false,
		showErrorMessage: false
	},
};

function display(pageFunction){
	return function(context){
		const doTheThing = ()=>{
			render(pageFunction(context, state), document.body);
		};
		state.rerender = doTheThing;
		doTheThing();
	};
}

page('/', display(pages.home));
page('/login', display(pages.login));
page('/register', display(pages.register));
// page('/h', );
// page('/h/new_house', );
// page('/h/:house', );
// page('/h/:house/new_member', );
// page('/h/:house/new_list', );
// page('/l/:list')
// page('/l/:list/new_item')
page('*', display(pages.notFound));
page();
