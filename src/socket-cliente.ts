import { Manager, Socket } from 'socket.io-client';


export const connectToServer = () => {
  const manager = new Manager('http://localhost:3000/socket.io/socket.io.js');
  const socket = manager.socket('/');
  addListeners(socket);
  
}

const addListeners = (socket: Socket) => {

  const serverStatusLabel = document.querySelector<HTMLSpanElement>('#server-status')!;
  const clientesUl = document.querySelector<HTMLUListElement>('#clientes-ul')!;

  socket.on('connect', () => {    
    /* serverStatusLabel.textContent = 'Online' */
    serverStatusLabel.innerHTML = 'Online';
    clientesUl.innerHTML = socket.id || '';
  })
  
  socket.on('disconnect', () => {
    console.log('Disconnected from server')
  })

  socket.on('clients-updated', (clients: string[]) => {
    clientesUl.innerHTML = clients.map(client => `<li>${client}</li>`).join('')
    /* let clientsHtml = '';
    clients.forEach(client => {
      clientsHtml += `<li>${client}</li>`;
    });
    clientesUl.innerHTML = clientsHtml; */

    console.log({clients})
  })
  

}




