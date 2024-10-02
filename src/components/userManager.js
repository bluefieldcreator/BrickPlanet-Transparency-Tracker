import Gun from 'gun/gun.js';
import 'gun/sea.js';
import { writable } from 'svelte/store';

export const db = Gun({ peers: ['https://brickplanet-peer-1.herokuapp.com/gun', 'https://brick-planet-2.herokuapp.com/gun'] });

try {
    console.log("💻 Connected to persitency peer, welcome! 👋")
} catch (err) {
    console.log("❌ Could not connect to persitency peer! 😔")
} finally {
    console.log("Database initialization finished! 👍")
}
export const user = db.user().recall({ sessionStorage: true });

export let username = writable('');
export let isAdmin = writable(false);
db.on('auth', async (event) => {
    const alias = await user.get('alias');
    const admin = await user.get('admin');
    console.log(`Logging in as ${alias} 👋`);
    username.set(alias);
    alias === 'Admin' || admin === true ? isAdmin.set(true) : isAdmin.set(false);
})

username.subscribe(value => {
    console.log(`💻 User state has changed to ${value} successfully 👍`);
});
