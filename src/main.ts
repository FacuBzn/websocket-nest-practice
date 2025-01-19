import './style.css'
import { connectToServer } from './socket-cliente.ts'

document.querySelector<HTMLDivElement>('#root')!.innerHTML = `
  <div>
  <h1> Websocket - Client </h1>
  <input id="jwt-token" placeholder="Json Web Token" />
  <button id="btn-connect"> Connect </button>

  <spam id="server-status"> Offline </spam>

  <ul id="clients-ul">
    <li> Cliente Id </li>
  </ul>

  <form id="message-form">
    <input placeholder="message" id="message-input" />    
  </form>

  <h3>  Messages </h3> 
  <ul id="messages-ul">    
  </ul>

  </div>
`
/* 
connectToServer() */
/* setupCounter(document.querySelector<HTMLButtonElement>('#counter')!) */

const jwtToken = document.querySelector<HTMLInputElement>('#jwt-token')!;
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')!;

btnConnect.addEventListener('click', () => {

  if ( jwtToken.value.trim().length <= 0 ) return alert('Token is required');

  connectToServer( jwtToken.value.trim() );
})
