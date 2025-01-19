import { Manager, Socket } from 'socket.io-client';

let socket: Socket;

export const connectToServer = ( token: string) => {

  const manager = new Manager('http://localhost:3000/socket.io/socket.io.js',{
    extraHeaders: {
      Authorization: `${token}`
    }
  });

  socket?.removeAllListeners();
  socket = manager.socket('/');
  addListeners();  
}

const addListeners = () => {

  const clientsUl = document.querySelector<HTMLUListElement>('#clients-ul')!;
  const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
  const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
  const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')!;
  const serverStatusLabel = document.querySelector<HTMLSpanElement>('#server-status')!;
  const serverStatus = document.getElementById('server-status');


  socket.on('connect', () => {    
    serverStatusLabel.innerHTML = 'Online';
    clientsUl.innerHTML = socket.id || '';
    if (serverStatus) {
      serverStatus.classList.add('connected');
    }
  })
  
  socket.on('disconnect', () => {
    serverStatusLabel.innerHTML = 'Offline';
    if (serverStatus) {
      serverStatus.classList.remove('connected');
    }
  })

  socket.on('clients-updated', (clients: string[]) => {
    clientsUl.innerHTML = clients.map(client => `<li>${client}</li>`).join('');
    /* let clientsHtml = '';
        clients.forEach( clientId => {
            clientsHtml += `
                <li>${ clientId }</li>
            `
        });
        clientsUl.innerHTML = clientsHtml; */
  })
  
  messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if ( messageInput.value.trim().length <= 0 ) return;

    socket.emit('message-from-client',{
      /* id: socket.id, */
      id: 'YO!',
      message: messageInput.value
    });

    messageInput.value = '';
  })

  socket.on('message-from-server', (payload: { fullName:string, message:string }) => {
    /* messagesUl.innerHTML += `<li> ${payload.message} </li>` */

    const newMessage = 
    `<li> 
      <strong>${ payload.fullName }: </strong>
      <spam>${ payload.message }</spam>
    </li>`;

    const li = document.createElement('li');
    li.innerHTML = newMessage;
    messagesUl.append(li);

  })

  serverStatus?.addEventListener('click', () => {
    // Simular conexión
    const isConnected = true; // Cambia esto según tu lógica de conexión

    if (isConnected) {
      serverStatus.classList.add('connected'); // Añade la clase 'connected'
    } else {
      serverStatus.classList.remove('connected'); // Quita la clase 'connected'
    }
  });

}




