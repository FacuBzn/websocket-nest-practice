import './style.css'
import { connectToServer } from './socket-cliente.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
  <h1> Websocket - Client </h1>

  <spam id="server-status"> Offline </spam>

  <ul id="clientes-ul">
    <li> Cliente Id </li>
  </ul>

  </div>
`
connectToServer()
/* setupCounter(document.querySelector<HTMLButtonElement>('#counter')!) */
