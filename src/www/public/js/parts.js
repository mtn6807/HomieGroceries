'use strict';

import {html, render} from 'https://unpkg.com/lit-html?module';

// A generic header
export function header(title, showGoBackButton=false){
	return html`
		<header>
			${showGoBackButton
				? html`<a class="left" @click='${()=>{history.back()}}'><i class="fas fa-chevron-left"></i></a>`
				: ''
			}
			<h1>${title}</h1>
		</header>
	`;
}

// HG footer
export function footer(){ // TODO: if logged in, show home button
	return html`
		<footer>
			<span class="logo">
			HG
			</span>
		</footer>
	`;
}

// Put things on these
export function island(content){
	return html`
		<div class="island">
		${content}
		</div>
	`;
}

// some space
export function spacer(){
	return html`<div class="spacer"></div>`;
}

// Just a quickie page wrapper
export function genericPage(title, content, showGoBackButton){
	return html`
		${header(title, showGoBackButton)}
		<main>
			${content}
		</main>
		${footer()}
	`;
}
