<script>
	import { user, username, isAdmin } from './userManager';
	import Navbar from './Navbar.svelte';
	
	export let usernameInput;
	export let passwordInput;
	
	let message;

	function login() {
		user.auth(usernameInput, passwordInput, ({ err }) => {

			if (err) {
				console.log('❌ Error! ' + err);

				message = '❌ Error! ' + err;
			} else {
				console.log('✔️ Success! ' + $username);
				message = '🙇 Logged in as ' + $username;
			}
		});
	}

	function signup() {
		user.create(usernameInput, passwordInput, ({ err }) => {
			if (err) {
				console.log('❌ Error! ' + err);
				message = '❌ Error! ' + err;
			} else {
				console.log('✔️ Registered as ' + usernameInput);
				message = '✔️ Registered as ' + usernameInput;
			}
		});
	}

	function signOut() {
		user.leave();
		username.set('');
		isAdmin.set(false);
	}
</script>

{#if !$username}
	<div class="border-2 rounded m-2 text-center mx-auto">
		<input
			bind:value={usernameInput}
			class="bg-gray-200 shadow-inner focus:outline-none p-2 m-2 rounded"
			type=""
			name="username"
			placeholder="username"
		/>
		<br />
		<input
			bind:value={passwordInput}
			class="bg-gray-200 shadow-inner focus:outline-none p-2 m-2 rounded"
			type="password"
			name="password"
			placeholder="password"
		/>
		<div
			class="text-center mx-auto border-2 bg-black text-white font-bold w-max py-1 px-3 rounded border-black hover:bg-white hover:text-black m-2 cursor-pointer transition-all duration-500  "
			on:click={login}
		>
			log in
		</div>
		<p />
		<div
			class="text-center mx-auto border-2 bg-black text-white font-bold w-max py-1 px-3 rounded border-black hover:bg-white hover:text-black m-2 cursor-pointer transition-all duration-500  "
			on:click={signup}
		>
			register
		</div>

		<div>{message ? message : ''}</div>
	</div>
{:else}
	<div class="p-1 m-1 text-center border w-max mx-auto  bg-black text-white">
		Hello,
		<p class="inline bg-black text-white p-1">{$username},</p>
		how's your data doing?
	</div>
	<Navbar />
	<div
		on:click={signOut}
		class="text-center mx-auto border-2 bg-black text-white w-max py-1 px-3 rounded border-black hover:bg-white hover:text-black m-2 cursor-pointer transition-all duration-500"
	>
		Sign Out 👋
	</div>
{/if}
