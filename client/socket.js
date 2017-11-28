import io from 'socket.io-client'
import {events} from './components/editor'
import {battleEvents} from './components/BattleEditor'
const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
  console.log(`A socket connection has been made: ${socket.id}`)
})
events.on('userSubmit', (userFunc) => {
  console.log('user submitted userFunc is:', userFunc)
  socket.emit('userSubmit', userFunc);
})
battleEvents.on('battleSubmit', (userFunc) => {
  console.log('player1 submitted userFunc is:', userFunc)
  socket.emit('battleSubmit', userFunc);
})
socket.on('result', (outPut) => {
  console.log('SOCKET CONNECTED ', outPut)
  events.emit('output', outPut);
})
socket.on('battleResult', (outPut) => {
  console.log('SOCKET CONNECTED ', outPut)
  battleEvents.emit('battleOutput', outPut);
})
socket.on('pass', (value) => {
  events.emit('pass', value)
})
socket.on('battlePass', (value) => {
  battleEvents.emit('battlePass', value)
})
socket.on('mssg', (msg) => {
  console.log(`${msg} READY IS RUNINNG BRUNCH FOR LIFE`)
  // this.setState({show: true})
})
// socket.on('findOrJoinRoom', socketID => {
//   console.log('Joining room in FRONT:', socketID)
//   socket.join(socketID)
// });


export default socket
