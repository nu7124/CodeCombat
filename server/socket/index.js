// const {VM} = require('vm2');
// var log3 = [], err3 = [];
// var vmThree = new VM({
//   sandbox: {
//     console: {
//       log(...args) {
//         log3.push({args: args, at: new Error().stack})
//       },
//       error(...args) {
//         err3.push(args)
//       }
//     }
//   }
// })
// let message;
const sandbox = require('../sandbox/sandbox');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('mssg', (msg) => {
      console.log('SOCKETS WORKS BITCHES', msg)
      var outPut = sandbox(`${msg}`);
      // var outPut = vmThree.run(`${msg}`)
      // message = msg;
      console.log('TEST!');
      console.log(outPut);
      console.log('END!');
      socket.emit('console', outPut)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })


  })
}

// console.log('MESSAGE!!!', message)
// var outPut = vmThree.run(`
// let addCat = (str) => str + 'cat';
// addCat("fat")
// `)
// var outPut = vmThree.run(`${message}`)
// console.log('TEST!');
// console.log(outPut);
// console.log('END!');

// io.on('connection', socket => {
// 	console.log(`Welcome new socket: ${socket.id}`);
// 	console.log("im the io", io)
// 	if(inMemoryDrawHistory.length) {
// 		console.log("gonna load", inMemoryDrawHistory)
// 		socket.emit('load', inMemoryDrawHistory)
// 	}

// 	socket.on('draw', (start, end, color) => {
// 		inMemoryDrawHistory.push({start, end, color});
// 		socket.broadcast.emit('draw', start, end, color)
// 	})

// 	socket.on('disconnect', () => {
// 		console.log(`Goodbye old friend: ${socket.id}`);
// 	})
// });
