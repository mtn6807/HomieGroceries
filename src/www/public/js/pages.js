'use strict'

/*
This is like Controllers.
Take the request from the routes, and coordinate the services to make it happen.
*/

import {html, render} from 'https://unpkg.com/lit-html?module';
// a page is made of parts
import * as parts from '/js/parts.js';

export function home(context, state){
	return html`
		${parts.genericPage("Homie Groceries", html`
			${parts.spacer()}
			${parts.island(html`
				<p>Groceries for all the Homies.</p>
			`)}
			${parts.spacer()}
			${parts.island(html`
				<a href="/login">Login <i class="fas fa-chevron-right"></i></a>
				<hr/>
				<a href="/register">Register <i class="fas fa-chevron-right"></i></a>
			`)}
			${parts.spacer()}
			${parts.island(html`
				<p>I bet this looks shitty on your shitty screen. Try saving this to your home screen, it'll look like an app and it'll look less ass.</p>
			`)}
			${parts.spacer()}
		`)}
	`;
};

export function login(context, state){
	return html`
		${parts.genericPage("Login", html`
			${parts.spacer()}
			${parts.island(html`
				<p>
					Login to HomieGroceries. Eventually, this page will actually work.
				</p>
			`)}
			${parts.spacer()}
			${parts.island(html`
				<form action="/api/v1/login" method="post">
					<label for="email">
						<span>Email</span>
						<input id="email" type="email" name="email" placeholder="hungryGuy@homies.com" required>
					</label>
					<hr/>
					<label for="password">
						<span>Password</span>
						<input id="password" type="password" name="password" placeholder="hunter2" required>
					</label>
					<div class="feedback no">
						<hr/>
						<p>Eventually, error messages will go here.</p>
					</div>
					<hr/>
					<input type="submit" value="Log In">
				</form>
			`)}
			${parts.spacer()}
			${parts.island(html`
				<a onclick="alert('lmao get fucked nerd')">Forgot Password? <i class="fas fa-chevron-right"></i></a>
				<hr/>
				<a href="/register">New Homie? Register <i class="fas fa-chevron-right"></i></a>
				`)}
			${parts.spacer()}
		`, true)}
	`;
}

export function register(context, state){
	return html`
		${parts.genericPage("Register", html`
			${parts.spacer()}
			${parts.island(html`
				<p>
					Register to HomieGroceries. Eventually, this page will actually work.
				</p>
			`)}
			${parts.spacer()}
			${parts.island(html`
				<form action="/api/v1/register" method="post">
					<label for="email">
						<span>Email</span>
						<input id="email" type="email" name="email" placeholder="hungryGuy@homies.com" required>
					</label>
					<hr/>
					<label for="displayName">
						<span>Display Name</span>
						<input id="displayName" type="text" name="displayName" placeholder="Homius Homley" required>
					</label>
					<hr/>
					<label for="password">
						<span>Password</span>
						<input id="password" type="password" name="password" placeholder="hunter2" required>
					</label>
					<hr/>
					<label for="isHomie">
						<span>On Jah, I am a Homie</span>
						<input id="isHomie" type="checkbox" name="isHomie" required>
					</label>
					<div class="feedback no">
						<hr/>
						<p>Eventually, error messages will go here.</p>
					</div>
					<hr/>
					<input type="submit" value="Register">
				</form>
			`)}
			${parts.spacer()}
			${parts.island(html`
				<a href="/login">Already a Homie? Login <i class="fas fa-chevron-right"></i></a>
			`)}
			${parts.spacer()}
		`, true)}
	`;
}

export function notFound(){
	return html`
		${parts.genericPage("404", html`
			${parts.spacer()}
			${parts.island(html`
				<p>Dog, The fuck is you doing?</p>
				<hr/>
				<button onclick="history.back()">
					<i class="fas fa-chevron-left"></i>
					Go Back
				</button>
			`)}
			${parts.spacer()}
		`, true)}
	`;
}
