const {VM} = require('vm2');
// import {VM} from 'vm2'
// import {EventEmitter} from 'events'
// const {EventEmitter} = require('events');
// const socket = require('../client/socket')
// const events = new EventEmitter()
// export default events

// module.exports = {
//   events,
//   mssg
// }

// function mssg(msg, shouldBroadcast = true) {
//   // If shouldBroadcast is truthy, we will emit an event to listeners w. msg
//   shouldBroadcast &&
//       events.emit('mssg', msg);
// }

var log3 = [], err3 = [];
var vmThree = new VM({
  sandbox: {
    console: {
      log(...args) {
        log3.push({args: args, at: new Error().stack})
      },
      error(...args) {
        err3.push(args)
      }
    }
  }
})
//.run('console.log("hi")')
// log
// console.log(log3)
// => [ [ 'hi' ],
//     { args: [ 'hi' ],
//       at: 'Error\n    at Object.log (repl:1:70)\n    at Object.apply (/Users/jonathanmartinez/Documents/Fullstack/Immersive/capStone/node_modules/vm2/lib/contextify.js:288:34)\n    at vm.js:1:9\n    at ContextifyScript.Script.runInContext (vm.js:59:29)\n    at VM.run (/Users/jonathanmartinez/Documents/Fullstack/Immersive/capStone/node_modules/vm2/lib/main.js:212:72)\n    at repl:1:134\n    at ContextifyScript.Script.runInThisContext (vm.js:50:33)\n    at REPLServer.defaultEval (repl.js:240:29)\n    at bound (domain.js:301:14)\n    at REPLServer.runBound [as eval] (domain.js:314:12)' } ]

// var log4 = [], err4 = [];

// var vmFour = new VM({
//   sandbox: {
//     console: {
//       log(...args) {
//         log4.push({args: args, at: new Error().stack})
//       },
//       error(...args) {
//         err4.push(args)
//       }
//     }
//   }
// })
console.log('before cats!!!')

// var outPut = vmThree.run(`
// let addCat = (str) => str + 'cat';
// addCat("fat")
// `)

// console.log('TEST!');
// console.log(outPut);
// console.log('END!');

var runner = (data) => vmThree.run(`${data}`)
// console.log('TEST!');
// console.log(runner);
// console.log('END!');
module.exports = runner;


// const vm = new VM({
//     timeout: 1000,
//     sandbox: {}
// });
// var vm = new VM
//VM PROPERTIES
// => VM {
//   domain:
//    Domain {
//      domain: null,
//      _events: { error: [Function: debugDomainError] },
//      _eventsCount: 1,
//      _maxListeners: undefined,
//      members: [] },
//   _events: {},
//   _eventsCount: 0,
//   _maxListeners: undefined,
//   options: { timeout: undefined, sandbox: null, compiler: 'javascript' },
//   _context:
//    { VMError: [Function: VMError],
//      Buffer:
//       { [Function: Buffer]
//         poolSize: 8192,
//         from: [Function],
//         alloc: [Function],
//         allocUnsafe: [Function],
//         allocUnsafeSlow: [Function],
//         isBuffer: [Function: isBuffer],
//         compare: [Function: compare],
//         isEncoding: [Function],
//         concat: [Function],
//         byteLength: [Function: byteLength],
//         [Symbol(node.isEncoding)]: [Function] } } }

// export function draw(start, end, strokeColor='black', shouldBroadcast=true) {
//   // Draw the line between the start and end positions
//   // that is colored with the given color.
//   ctx.beginPath();
//   ctx.strokeStyle = strokeColor;
//   ctx.moveTo(...start);
//   ctx.lineTo(...end);
//   ctx.closePath();
//   ctx.stroke();

//   // If shouldBroadcast is truthy, we will emit a draw event to listeners
//   // with the start, end and color data.
//   shouldBroadcast &&
//       events.emit('draw', start, end, strokeColor);

// };
