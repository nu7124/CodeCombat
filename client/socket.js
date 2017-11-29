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

battleEvents.on('p1Submit', (total)=> {
  let total1 = total;
  console.log("p1Submit Socket ID: ",socket.id)
  console.log("TOTAL TIME: ", total)
  // battleEvents.emit('p2Pending', 'AWAITING PLAYER TWO SUBMISSION', total, socket.id)
  socket.emit('p2PendingSetup', 'AWAITING PLAYER TWO SUBMISSION', total, socket.id)
})

battleEvents.on('p2Submit', (opponentTotal, p2Total, p1Socket, roomId)=> {
  console.log(`OPPONENT: ${p1Socket}, TIME: ${opponentTotal} vs PLAYER2: ${socket.id} TIME: ${p2Total}`)
  // console.log("PLAYER @ SOCKET: ", socket.id)
  let winner = opponentTotal < p2Total ? [p1Socket, opponentTotal] : [socket.id, p2Total]
  // battleEvents.emit('determineWinner', winner)
  socket.emit('determineWinner', winner, roomId)
  console.log('OFFICIAL WINNER', winner)
})

socket.on('foundWinner', (winner) => {
  console.log('FOUND WINNER*********', winner)
  battleEvents.emit('determineWinner', winner)
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

socket.on('p1SubmitFinish', (msg, p1Total, p1Socket) => {
  battleEvents.emit('p2Pending', msg, p1Total, p1Socket)
})

battleEvents.on('updateWin', (userId) => {
  socket.emit('updateWin', userId)
})

battleEvents.on('updateLoss', (userId) => {
  socket.emit('updateLoss', userId)
})
// socket.on('findOrJoinRoom', socketID => {
//   console.log('Joining room in FRONT:', socketID)
//   socket.join(socketID)
// });


export default socket
