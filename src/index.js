const HTML = String.raw`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#090711">
<title>NEONIFY — Spotify Player</title>
<style>
:root{color-scheme:dark;--bg:#090711;--panel:#13101e;--panel2:#1b1628;--muted:#a69bb8;--pink:#ff3cac;--purple:#784bff;--cyan:#53e5ff;--line:#30263e}
*{box-sizing:border-box}body{margin:0;background:radial-gradient(ellipse at 20% 0%,#28113e 0,transparent 36%),radial-gradient(ellipse at 90% 10%,#241044 0,transparent 30%),var(--bg);color:#fff;font:14px/1.5 Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,sans-serif;min-height:100vh}
button,input{font:inherit}button{cursor:pointer;color:inherit}.app{min-height:100vh;padding:16px 16px 112px;display:grid;grid-template-columns:240px minmax(0,1fr);gap:16px;max-width:1600px;margin:auto}
.sidebar,.main{background:rgba(16,13,25,.88);border:1px solid #ffffff12;border-radius:20px;backdrop-filter:blur(18px)}.sidebar{padding:22px 16px;display:flex;flex-direction:column;gap:24px;min-height:calc(100vh - 144px)}
.brand{font-size:23px;font-weight:900;letter-spacing:2px;background:linear-gradient(90deg,var(--pink),#b78aff,var(--cyan));color:transparent;background-clip:text}.brand small{display:block;font-size:9px;letter-spacing:4px;color:#a89ab9}
.nav{display:grid;gap:8px}.nav button,.side-action{background:transparent;border:0;text-align:left;padding:11px 12px;border-radius:11px;color:#b9aec8}.nav button:hover,.nav button.active,.side-action:hover{background:#ffffff10;color:#fff}.nav b{display:inline-block;width:26px;color:#e4a4ff}
.side-title{font-size:10px;letter-spacing:2px;color:#766b84;text-transform:uppercase;margin:4px 10px}.side-action{width:100%;font-size:13px}.account{margin-top:auto;padding:13px;background:linear-gradient(135deg,#251333,#151124);border:1px solid #ffffff12;border-radius:14px}.account strong{display:block}.account span{color:var(--muted);font-size:12px;display:block;margin:4px 0 10px}.small-btn{border:1px solid #ffffff22;background:#ffffff0b;border-radius:20px;padding:7px 12px;font-size:12px}
.main{padding:24px;min-width:0;overflow:hidden}.top{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:25px}.search{flex:1;max-width:620px;position:relative}.search input{width:100%;border:1px solid #ffffff16;background:#ffffff0b;border-radius:30px;padding:13px 18px 13px 44px;color:white;outline:none}.search input:focus{border-color:#bd6bff;box-shadow:0 0 0 3px #a34dff20}.search:before{content:"⌕";position:absolute;left:17px;top:7px;font-size:24px;color:#bba9ca}.pill{border:1px solid #ffffff22;background:#ffffff0b;border-radius:30px;padding:10px 16px}.hero{padding:28px;border-radius:18px;background:linear-gradient(115deg,#35104c,#201342 55%,#102b3b);position:relative;overflow:hidden;margin-bottom:28px}.hero:after{content:"♫";position:absolute;right:7%;top:-45px;font-size:210px;opacity:.09}.eyebrow{color:#e9a8ff;text-transform:uppercase;letter-spacing:3px;font-size:10px;font-weight:800}.hero h1{font-size:clamp(28px,5vw,46px);line-height:1.05;margin:10px 0}.hero p{color:#d4c5e1;max-width:470px;margin:0 0 20px}.primary{border:0;border-radius:30px;padding:11px 20px;color:#100b18;font-weight:800;background:linear-gradient(90deg,#ff55b7,#bd82ff);box-shadow:0 5px 24px #d43cff35}.section-head{display:flex;align-items:center;justify-content:space-between;margin:24px 0 12px}.section-head h2{font-size:18px;margin:0}.muted{color:var(--muted)}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(145px,1fr));gap:13px}.card{padding:11px;background:#ffffff08;border:1px solid #ffffff0d;border-radius:14px;min-width:0;cursor:pointer;transition:.18s}.card:hover{background:#ffffff13;transform:translateY(-2px);border-color:#c36aff55}.cover{width:100%;aspect-ratio:1;object-fit:cover;border-radius:9px;background:linear-gradient(135deg,#38234f,#121b2c)}.card strong{display:block;margin-top:9px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:13px}.card small{display:block;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:3px}.tracklist{display:grid;gap:5px}.track{display:grid;grid-template-columns:42px minmax(0,1fr) 44px;gap:12px;align-items:center;padding:8px;border-radius:10px;cursor:pointer}.track:hover{background:#ffffff10}.track img{width:42px;height:42px;object-fit:cover;border-radius:6px}.track strong,.track small{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.track small{color:var(--muted)}.track .duration{text-align:right;color:var(--muted);font-variant-numeric:tabular-nums}.empty{padding:34px;text-align:center;color:var(--muted);border:1px dashed #ffffff22;border-radius:14px}.status{color:var(--muted);font-size:12px;min-height:20px}
.player{position:fixed;z-index:10;bottom:12px;left:12px;right:12px;max-width:1576px;margin:auto;display:grid;grid-template-columns:minmax(150px,1fr) minmax(220px,1.5fr) minmax(100px,1fr);gap:18px;align-items:center;padding:12px 18px;background:rgba(20,15,30,.94);border:1px solid #ffffff1c;border-radius:17px;backdrop-filter:blur(22px);box-shadow:0 8px 45px #0009}.now{display:flex;align-items:center;gap:11px;min-width:0}.now img{width:48px;height:48px;object-fit:cover;border-radius:7px;background:#281b38}.now strong,.now small{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.now small{color:var(--muted)}.controls{text-align:center}.control-row{display:flex;justify-content:center;align-items:center;gap:16px}.iconbtn{background:transparent;border:0;color:#cbbbd8;font-size:19px}.iconbtn:hover{color:#fff}.playbtn{width:35px;height:35px;border:0;border-radius:50%;background:linear-gradient(135deg,var(--pink),#ad7bff);color:#120a1b;font-weight:900}.progress{display:flex;align-items:center;gap:9px;margin-top:6px;color:#988ba7;font-size:10px}.progress input{flex:1;accent-color:#e66bff;min-width:40px}.volume{display:flex;align-items:center;gap:8px;justify-content:flex-end}.volume input{width:90px;accent-color:#e66bff}
.login{position:fixed;inset:0;background:#090711ed;z-index:20;display:grid;place-items:center;padding:20px}.login-box{width:min(440px,100%);text-align:center;padding:34px;border-radius:22px;border:1px solid #ffffff20;background:linear-gradient(145deg,#21122f,#100e1b);box-shadow:0 0 80px #8e39b733}.login-box h1{font-size:38px;margin:0;background:linear-gradient(90deg,var(--pink),#c58aff,var(--cyan));color:transparent;background-clip:text}.login-box p{color:#b7a9c5}.login-box button{margin-top:15px}.hidden{display:none!important}
@media(max-width:760px){.app{display:block;padding:8px 8px 105px}.sidebar{min-height:0;padding:12px;display:flex;flex-direction:row;align-items:center;justify-content:space-between;margin-bottom:8px}.brand{font-size:18px}.brand small{display:none}.nav{display:flex;gap:2px}.nav button{padding:8px;font-size:12px}.nav b{width:auto;margin-right:4px}.side-extra{display:none}.account{margin:0;padding:7px 9px}.account span{display:none}.account strong{font-size:11px}.account .small-btn{padding:4px 8px}.main{padding:15px}.top{margin-bottom:15px}.hero{padding:22px}.grid{grid-template-columns:repeat(auto-fill,minmax(115px,1fr));gap:9px}.player{left:6px;right:6px;bottom:6px;padding:9px;grid-template-columns:1fr 1.2fr;gap:8px}.volume{display:none}.now img{width:40px;height:40px}.now strong{font-size:12px}.now small{font-size:10px}.control-row{gap:9px}.iconbtn{font-size:16px}.progress{margin-top:2px}.progress span{display:none}}
</style>
</head>
<body>
<div class="app">
<aside class="sidebar">
  <div class="brand">NEONIFY<small>YOUR SOUND. YOUR SPACE.</small></div>
  <nav class="nav">
    <button class="active" data-view="home"><b>⌂</b> Home</button>
    <button data-view="search"><b>⌕</b> Search</button>
    <button data-view="library"><b>▤</b> Library</button>
  </nav>
  <div class="side-extra">
    <div class="side-title">Your collection</div>
    <button class="side-action" id="likedNav">♡ Liked Songs</button>
    <button class="side-action" id="recentNav">◷ Recently Played</button>
  </div>
  <div class="account">
    <strong id="userName">Not connected</strong>
    <span id="userType">Connect your Spotify account</span>
    <button class="small-btn" id="logoutBtn">Disconnect</button>
  </div>
</aside>
<main class="main">
  <div class="top">
    <div class="search"><input id="searchInput" placeholder="Search songs, artists, albums..." autocomplete="off"></div>
    <button class="pill" id="connectBtn">Connect Spotify</button>
  </div>
  <div id="content">
    <section class="hero"><div class="eyebrow">A new way to listen</div><h1>Feel the frequency.</h1><p>Your music, wrapped in neon. Connect Spotify Premium to start streaming from this browser.</p><button class="primary" id="heroConnect">Connect Spotify</button></section>
    <div class="empty">Connect your Spotify account to load your music.</div>
  </div>
  <div class="status" id="status" role="status"></div>
</main>
</div>
<div class="player">
  <div class="now"><img id="npImg" alt="" src=""><div><strong id="npTitle">Nothing playing</strong><small id="npArtist">Choose a track to begin</small></div></div>
  <div class="controls"><div class="control-row">
    <button class="iconbtn" id="shuffleBtn" title="Shuffle">⤨</button>
    <button class="iconbtn" id="prevBtn" title="Previous">◀◀</button>
    <button class="playbtn" id="playBtn" title="Play">▶</button>
    <button class="iconbtn" id="nextBtn" title="Next">▶▶</button>
    <button class="iconbtn" id="repeatBtn" title="Repeat">↻</button>
  </div><div class="progress"><span id="elapsed">0:00</span><input id="seek" type="range" min="0" max="1000" value="0"><span id="total">0:00</span></div></div>
  <div class="volume"><span>◖</span><input id="volume" type="range" min="0" max="100" value="70"></div>
</div>
<div class="login" id="login">
 <div class="login-box"><h1>NEONIFY</h1><p>Sign in with Spotify to search, explore your library and stream music with your Premium account.</p><button class="primary" id="loginBtn" type="button">Continue with Spotify</button><p id="loginStatus" role="status" style="color:#ff75bd;font-size:13px;min-height:22px"></p><p style="font-size:11px">Playback is provided by Spotify. A Premium account is required for Web Playback SDK.</p></div>
</div>
<script defer src="https://sdk.scdn.co/spotify-player.js"></script>
<script>
(function(){
"use strict";
const CLIENT_ID=__NEONIFY_CLIENT_ID__;
const REDIRECT_URI=location.origin+"/";
const SCOPES=["streaming","user-read-email","user-read-private","user-read-playback-state","user-modify-playback-state","user-read-currently-playing","user-library-read","user-library-modify","playlist-read-private","playlist-read-collaborative","user-read-recently-played","user-top-read"].join(" ");
const $=id=>document.getElementById(id);
let accessToken=localStorage.getItem("neon_access_token")||"";
let refreshToken=localStorage.getItem("neon_refresh_token")||"";
let expiresAt=Number(localStorage.getItem("neon_expires_at")||0);
let player=null,deviceId="",currentTrack=null,progressTimer=null,repeatMode="off",shuffle=false;
function status(s){
 const message=s||"";
 const target=$("status");
 if(target) target.textContent=message;
 const loginMessage=$("loginStatus");
 if(loginMessage && !$("login").classList.contains("hidden")) loginMessage.textContent=message;
}
function escapeHtml(s){return String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function fmt(ms){if(!Number.isFinite(ms)||ms<0)return"0:00";let t=Math.floor(ms/1000);return Math.floor(t/60)+":"+String(t%60).padStart(2,"0")}
function randomString(n){const a=new Uint8Array(n);crypto.getRandomValues(a);return Array.from(a,b=>("0"+b.toString(16)).slice(-2)).join("")}
async function challenge(v){const d=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(v));return btoa(String.fromCharCode.apply(null,new Uint8Array(d))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}
async function login(){
 try {
  if(!CLIENT_ID || CLIENT_ID.includes("PASTE_") || CLIENT_ID === "__NEONIFY_CLIENT_ID__") {
   throw new Error("Spotify Client ID is missing. Set SPOTIFY_CLIENT_ID in Cloudflare and redeploy.");
  }
  if(!window.crypto || !window.crypto.subtle) {
   throw new Error("Secure browser cryptography is unavailable. Open this HTTPS site in Chrome.");
  }
  const verifier=randomString(64);
  const state=randomString(16);
  const codeChallenge=await challenge(verifier);
  sessionStorage.setItem("neon_verifier",verifier);
  sessionStorage.setItem("neon_state",state);
  const authorizeUrl=new URL("https://accounts.spotify.com/authorize");
  authorizeUrl.search=new URLSearchParams({
   client_id:CLIENT_ID,
   response_type:"code",
   redirect_uri:REDIRECT_URI,
   scope:SCOPES,
   state,
   code_challenge_method:"S256",
   code_challenge:codeChallenge
  }).toString();
  status("Opening Spotify sign-in…");
  window.location.assign(authorizeUrl.toString());
 } catch(error) {
  console.error("Neonify login error:",error);
  status("Login error: "+(error && error.message ? error.message : String(error)));
 }
}
async function handleCallback(){
 const q=new URLSearchParams(location.search),code=q.get("code"),state=q.get("state");
 if(q.get("error")){status("Spotify authorization was cancelled.");history.replaceState({},"", "/");return}
 if(!code)return;
 if(!state||state!==sessionStorage.getItem("neon_state")){status("Login security check failed. Please try again.");history.replaceState({},"", "/");return}
 const verifier=sessionStorage.getItem("neon_verifier");
 try{
  const r=await fetch("https://accounts.spotify.com/api/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({client_id:CLIENT_ID,grant_type:"authorization_code",code,redirect_uri:REDIRECT_URI,code_verifier:verifier})});
  const d=await r.json();if(!r.ok)throw new Error(d.error_description||d.error||"Token exchange failed");
  saveTokens(d);status("Spotify connected.");history.replaceState({},"","/");
 }catch(e){status("Login failed: "+e.message);history.replaceState({},"","/")}
 sessionStorage.removeItem("neon_verifier");sessionStorage.removeItem("neon_state");
}
function saveTokens(d){accessToken=d.access_token;refreshToken=d.refresh_token||refreshToken;expiresAt=Date.now()+(d.expires_in||3600)*1000;localStorage.setItem("neon_access_token",accessToken);localStorage.setItem("neon_refresh_token",refreshToken);localStorage.setItem("neon_expires_at",String(expiresAt))}
async function token(){
 if(!accessToken)throw new Error("Connect Spotify first.");
 if(Date.now()<expiresAt-60000)return accessToken;
 if(!refreshToken)throw new Error("Session expired. Please reconnect Spotify.");
 const r=await fetch("https://accounts.spotify.com/api/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({client_id:CLIENT_ID,grant_type:"refresh_token",refresh_token:refreshToken})});
 const d=await r.json();if(!r.ok)throw new Error(d.error_description||"Could not refresh Spotify session");saveTokens(d);return accessToken;
}
async function api(path,options){
 const t=await token(),r=await fetch("https://api.spotify.com/v1"+path,{...options,headers:{Authorization:"Bearer "+t,"Content-Type":"application/json",...(options&&options.headers||{})}});
 if(r.status===204)return null;const d=await r.json().catch(()=>({}));
 if(!r.ok)throw new Error(d.error&&d.error.message||"Spotify API error ("+r.status+")");return d;
}
function imageOf(x){return x&&x.images&&x.images[0]?x.images[0].url:""}
function artists(x){return(x.artists||[]).map(a=>a.name).join(", ")}
function duration(x){return fmt(x.duration_ms)}
function cards(items,type){
 if(!items||!items.length)return'<div class="empty">Nothing to show here yet.</div>';
 return '<div class="grid">'+items.map(x=>{
  const obj=x[type==="playlist"?"track":type==="album"?"":""]||x;
  const name=x.name||obj.name||"Untitled",sub=type==="playlist"?(x.owner&&x.owner.display_name||"Spotify playlist"):type==="artist"?"Artist":type==="album"?artists(x):artists(obj);
  const img=imageOf(x)||imageOf(obj);
  return '<article class="card" data-kind="'+type+'" data-id="'+escapeHtml(x.id||obj.id||"")+'"><img class="cover" src="'+escapeHtml(img)+'" alt=""><strong>'+escapeHtml(name)+'</strong><small>'+escapeHtml(sub)+'</small></article>';
 }).join("")+'</div>';
}
function renderTracks(items){
 if(!items||!items.length)return'<div class="empty">No tracks found.</div>';
 return '<div class="tracklist">'+items.map((x,i)=>{
  const t=x.track||x; if(!t||!t.id)return"";
  return '<div class="track" data-track="'+escapeHtml(t.uri||("spotify:track:"+t.id))+'"><img src="'+escapeHtml(imageOf(t.album))+'" alt=""><div><strong>'+escapeHtml(t.name)+'</strong><small>'+escapeHtml(artists(t))+'</small></div><span class="duration">'+duration(t)+'</span></div>';
 }).join("")+'</div>';
}
function section(title,html){return'<div class="section-head"><h2>'+title+'</h2></div>'+html}
function hero(){return '<section class="hero"><div class="eyebrow">Your personal soundscape</div><h1>Feel the frequency.</h1><p>Find your next favourite track, revisit your collection and let the music take over.</p><button class="primary" id="mixBtn">Explore music</button></section>'}
async function home(){
 $("content").innerHTML=hero()+'<div class="empty">Loading your Spotify library…</div>';
 try{
  const [playlists,recent,top]=await Promise.all([api("/me/playlists?limit=8"),api("/me/player/recently-played?limit=8"),api("/me/top/tracks?limit=8&time_range=medium_term")]);
  $("content").innerHTML=hero()+section("Your playlists",cards(playlists.items,"playlist"))+section("Recently played",renderTracks(recent.items))+section("Your top tracks",renderTracks(top.items));
 }catch(e){$("content").innerHTML=hero()+'<div class="empty">'+escapeHtml(e.message)+'</div>'}
}
async function library(){
 $("content").innerHTML=section("Your library",'<div class="empty">Loading playlists…</div>');
 try{const d=await api("/me/playlists?limit=50");$("content").innerHTML=section("Your playlists",cards(d.items,"playlist"))}catch(e){status(e.message)}
}
async function search(q){
 if(!q){$("content").innerHTML=hero();return}
 $("content").innerHTML='<div class="empty">Searching Spotify…</div>';
 try{
  const d=await api("/search?"+new URLSearchParams({q:q,type:"track,album,artist,playlist",limit:"8"}));
  let h=section("Tracks",renderTracks(d.tracks&&d.tracks.items));
  h+=section("Albums",cards(d.albums&&d.albums.items,"album"));
  h+=section("Artists",cards(d.artists&&d.artists.items,"artist"));
  h+=section("Playlists",cards(d.playlists&&d.playlists.items,"playlist"));
  $("content").innerHTML=h;
 }catch(e){$("content").innerHTML='<div class="empty">'+escapeHtml(e.message)+'</div>'}
}
async function showPlaylist(id){
 try{const d=await api("/playlists/"+encodeURIComponent(id));$("content").innerHTML='<div class="hero"><div class="eyebrow">Playlist</div><h1>'+escapeHtml(d.name)+'</h1><p>'+escapeHtml(d.description||"")+'</p><button class="primary" data-play-context="spotify:playlist:'+id+'">Play playlist</button></div>'+section("Tracks",renderTracks(d.tracks.items));}catch(e){status(e.message)}
}
async function showAlbum(id){
 try{const d=await api("/albums/"+encodeURIComponent(id));$("content").innerHTML='<div class="hero"><div class="eyebrow">Album</div><h1>'+escapeHtml(d.name)+'</h1><p>'+escapeHtml(artists(d))+' · '+escapeHtml(d.release_date||"")+'</p><button class="primary" data-play-context="spotify:album:'+id+'">Play album</button></div>'+section("Tracks",renderTracks(d.tracks.items));}catch(e){status(e.message)}
}
async function startPlayer(){
 if(!accessToken)return;
 if(!window.Spotify){status("Loading Spotify playback engine…");return}
 if(player)return;
 player=new Spotify.Player({name:"NEONIFY Web Player",getOAuthToken:cb=>token().then(cb).catch(e=>status(e.message)),volume:.7});
 player.addListener("ready",({device_id})=>{deviceId=device_id;status("Player ready. Select a track to play.");api("/me/player").catch(()=>{});});
 player.addListener("not_ready",()=>{deviceId="";status("Spotify player disconnected.");});
 player.addListener("player_state_changed",state=>{if(!state)return;currentTrack=state.track_window.current_track;updateNow(currentTrack);$("playBtn").textContent=state.paused?"▶":"Ⅱ";$("seek").max=state.duration||1;$("seek").value=state.position||0;$("elapsed").textContent=fmt(state.position);$("total").textContent=fmt(state.duration);});
 ["initialization_error","authentication_error","account_error","playback_error"].forEach(ev=>player.addListener(ev,({message})=>status(message)));
 await player.connect();
}
function updateNow(t){if(!t)return;$("npTitle").textContent=t.name;$("npArtist").textContent=(t.artists||[]).map(a=>a.name).join(", ");$("npImg").src=t.album&&t.album.images&&t.album.images[0]?t.album.images[0].url:""}
async function playUri(uri){
 try{
  if(!deviceId)await startPlayer();if(!deviceId){status("Spotify player is not ready yet. Try again in a moment.");return}
  await api("/me/player", {method:"PUT",body:JSON.stringify({device_ids:[deviceId],play:false})}).catch(()=>{});
  if(uri.startsWith("spotify:track:"))await api("/me/player/play?device_id="+deviceId,{method:"PUT",body:JSON.stringify({uris:[uri]})});
  else await api("/me/player/play?device_id="+deviceId,{method:"PUT",body:JSON.stringify({context_uri:uri})});
  status("Playing on NEONIFY.");
 }catch(e){status(e.message)}
}
async function command(path,method="PUT",body){
 try{await api(path,{method,body:body?JSON.stringify(body):undefined})}catch(e){status(e.message)}
}
async function profile(){
 try{const me=await api("/me");$("userName").textContent=me.display_name||me.id;$("userType").textContent="Spotify account connected";$("connectBtn").textContent="Connected";$("login").classList.add("hidden");await startPlayer();await home()}catch(e){status(e.message)}
}
function disconnect(){["neon_access_token","neon_refresh_token","neon_expires_at"].forEach(k=>localStorage.removeItem(k));accessToken="";refreshToken="";expiresAt=0;if(player){player.disconnect();player=null}deviceId="";$("login").classList.remove("hidden");$("userName").textContent="Not connected";$("userType").textContent="Connect your Spotify account";$("connectBtn").textContent="Connect Spotify";$("content").innerHTML=hero()+'<div class="empty">Connect your Spotify account to load your music.</div>'}
window.neonLogin=login;
$("loginBtn").addEventListener("click",function(event){event.preventDefault();login();});
$("connectBtn").addEventListener("click",login);
const heroConnectButton=$("heroConnect");
if(heroConnectButton) heroConnectButton.addEventListener("click",login);
$("logoutBtn").addEventListener("click",disconnect);
$("searchInput").addEventListener("keydown",e=>{if(e.key==="Enter")search(e.target.value.trim())});
$("searchInput").addEventListener("input",e=>{if(!e.target.value.trim()&&accessToken)home()});
document.querySelectorAll("[data-view]").forEach(b=>b.onclick=()=>{document.querySelectorAll("[data-view]").forEach(x=>x.classList.remove("active"));b.classList.add("active");if(b.dataset.view==="home")home();if(b.dataset.view==="library")library();if(b.dataset.view==="search"){$("searchInput").focus();$("content").innerHTML='<div class="empty">Search for a song, artist, album or playlist above.</div>'}});
$("likedNav").onclick=async()=>{try{const d=await api("/me/tracks?limit=50");$("content").innerHTML=section("Liked Songs",renderTracks(d.items))}catch(e){status(e.message)}};
$("recentNav").onclick=async()=>{try{const d=await api("/me/player/recently-played?limit=50");$("content").innerHTML=section("Recently Played",renderTracks(d.items))}catch(e){status(e.message)}};
$("content").addEventListener("click",e=>{
 const track=e.target.closest("[data-track]");if(track){playUri(track.dataset.track);return}
 const card=e.target.closest("[data-kind]");if(card){if(card.dataset.kind==="playlist")showPlaylist(card.dataset.id);else if(card.dataset.kind==="album")showAlbum(card.dataset.id);else search(card.querySelector("strong").textContent);return}
 const ctx=e.target.closest("[data-play-context]");if(ctx)playUri(ctx.dataset.playContext);
 const mix=e.target.closest("#mixBtn");if(mix)$("searchInput").focus();
});
$("playBtn").onclick=async()=>{if(!player){await startPlayer();return}const s=await player.getCurrentState();if(s&&s.paused)player.resume();else player.pause()};
$("prevBtn").onclick=()=>player&&player.previousTrack();$("nextBtn").onclick=()=>player&&player.nextTrack();
$("shuffleBtn").onclick=async()=>{shuffle=!shuffle;await command("/me/player/shuffle?state="+shuffle);$("shuffleBtn").style.color=shuffle?"#ff71d0":"#cbbbd8"};
$("repeatBtn").onclick=async()=>{repeatMode=repeatMode==="off"?"context":repeatMode==="context"?"track":"off";await command("/me/player/repeat?state="+repeatMode);$("repeatBtn").style.color=repeatMode!=="off"?"#ff71d0":"#cbbbd8"};
$("seek").onchange=()=>player&&player.seek(Number($("seek").value));
$("volume").oninput=e=>player&&player.setVolume(Number(e.target.value)/100);
setInterval(async()=>{if(!player)return;try{const s=await player.getCurrentState();if(s&&s.duration){$("seek").max=s.duration;$("seek").value=s.position;$("elapsed").textContent=fmt(s.position);$("total").textContent=fmt(s.duration)}}catch(e){}},1000);
window.onSpotifyWebPlaybackSDKReady=()=>{if(accessToken)startPlayer()};
handleCallback().then(()=>{if(accessToken)profile()});
})();
</script>
</body>
</html>`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/health") {
      return Response.json({ ok: true, app: "Neonify", playback: "Spotify Web Playback SDK" });
    }
    if (url.pathname !== "/" && url.pathname !== "/index.html") {
      return new Response("Not found", { status: 404 });
    }
    if (!env.SPOTIFY_CLIENT_ID) {
      return new Response("Missing SPOTIFY_CLIENT_ID. Add it as a Worker variable in Cloudflare or wrangler.jsonc.", { status: 500 });
    }
    const page = HTML.replace("__NEONIFY_CLIENT_ID__", JSON.stringify(String(env.SPOTIFY_CLIENT_ID)));
    return new Response(page, {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "no-store",
        "x-content-type-options": "nosniff",
        "referrer-policy": "strict-origin-when-cross-origin"
      }
    });
  }
};
