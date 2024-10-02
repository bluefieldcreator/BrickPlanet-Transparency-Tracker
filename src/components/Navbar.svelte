<script type="text/javascript">
import {isAdmin, username} from './../components/userManager.js';
import { db } from './userManager.js'

let xD = db.back('opt.peers')
console.log('Heya~ Heres the list of peers in the database, ' + Object.keys(xD))
</script>
<div class="md:space-x-2 text-center md:w-max mx-auto border w-auto p-2">
    <div class = "md:inline-block"><a class= "md:inline-block cursor-pointer hover:underline" href="/">🏠 Homepage</a></div>
    <div class = "md:inline-block"> <a class= "md:inline-block cursor-pointer hover:underline" href="/privacy">🔒 Privacy [WIP]</a></div>
    <div class = "md:inline-block">  <a class= "md:inline-block cursor-pointer hover:underline" href="/report">🚩 Report [WIP]</a></div>
    <div class = "md:inline-block">  <a class = "md:inline-block cursor-pointer hover:underline" href="https://discord.gg/vZm9NenFd6">🎈 Discord</a></div>
    {#if $isAdmin} 
    <div>ADMIN</div>
    {/if}
</div>