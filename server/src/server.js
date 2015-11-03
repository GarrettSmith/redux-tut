import Server from 'socket.io';

export default function startServer(store) {
  const io = new Server().attach(8090);

  store.subscribe(() =>  {
    io.emit('state', getState());
  });

  io.on('connection', socket => {
    socket.emit('state', getState());
    socket.on('action', store.dispatch.bind(store));
  });

  function getState() {
    return store.getState().toJSA();
  }
}
