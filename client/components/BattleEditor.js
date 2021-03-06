import ReactAce from 'react-ace-editor';
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {EventEmitter} from 'events';
import WinLosePopup from './WinLosePopup';

export const battleEvents = new EventEmitter()

export class BattleEditor extends Component {
  constructor() {
    super();

    this.state = {
      attempt: '',
      currentProblem: {},
      currentMatch: {},
      output: [],
      logger: [],
      pass: false,
      error: false,
      opponentTotal: 0,
      opponent: '',
      player2: true,
      winLosePop: false
      // eligibleQueue: [],
      // problemNum: 0,
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setSig = this.setSig.bind(this);
  }

  componentDidMount() {
    this.setState({currentProblem: this.props.questions})

    battleEvents.on('determineWinner', (winner) => {
      let ptsWagered = Math.floor((Math.log(this.state.currentProblem.level) + 1) * 30)
      console.log('pts wagered:', ptsWagered)

      if (winner[0] === this.state.opponent){
        const userId = +this.props.battleProps.match.params.userId
        battleEvents.emit('updateLoss', userId, ptsWagered)
      } else {
        const userId = +this.props.battleProps.match.params.userId
        battleEvents.emit('updateWin', userId, ptsWagered)
      }
    })

    if (this.state.player2){
      console.log('p2Boolean:', this.state.player2)
      battleEvents.on('p2Pending', (msg, p1Total, p1Socket) => {
        console.log('p2pending total & socket:', p1Total, p1Socket)
        this.setState({opponentTotal: p1Total, opponent: p1Socket})
      })
    }

    battleEvents.on('battleOutput', (output) => {
      this.setState({output: output[0]})
      this.setState({logger: output[1]})
    })

    if (!this.ace) return null;
  }

  componentWillReceiveProps(nP) {
    this.startTime = new Date();
    if (nP.questions && nP.questions.id) { this.setSig() }
    if (nP.match && nP.match.id) {
      this.setState({currentMatch: nP.match})
    }
  }

  setSig() {
    let currSig = this.state.currentProblem.signature
    this.ace && this.ace.editor.setValue(`function ${currSig}{}`)
  }

  onChange(newValue, e) {
    let attempt = newValue;
    const editor = this.ace.editor; // The editor object is from Ace's API
    editor.getSession().setUseWrapMode(true);
    //USED TO GET ANNOTATIOINS FROM THE CODE EDITOR
    let error = false;
    editor.getSession().on('changeAnnotation', () => {

      let comments = editor.getSession().getAnnotations();
      //LOOP THROUGH THE EDITOR SO THAT WE CAN SEE IF THERE IS AN ERROR
      comments.forEach(val => {
        if (val.type === 'error'){
          error = true
          this.setState({error})
        }
      })
    })
    this.setState({attempt, error})
  }

  onSubmit(e) {
    e.preventDefault();
    var total = new Date() - this.startTime;
    let currMatch = this.state.currentMatch
    let currProb = this.state.currentProblem
    var player = 'host'
    if (Object.keys(currMatch).length) { player = 'guest' }

    currProb && currProb.id ?
      battleEvents.emit('battleSubmit', [this.state.attempt, currProb.testSpecs, player])
    : null

    battleEvents.on('battlePass', (pass) => {
      if (pass){
        if (this.state.opponentTotal){
          this.setState({winLosePop: true})
          battleEvents.emit('p2Submit', this.state.opponentTotal, total, this.state.opponent, this.state.currentMatch.roomId)
        } else {
          this.setState({player2: false, winLosePop: true})
          battleEvents.emit('p1Submit', total)
        }
      }
      this.setState({pass})
    })
  }

  render() {
    let quest = this.state.currentProblem
    // let pointsAtStake = this.state.currentProblem.level * 5

    return (
      // this.state.problemNum !== quest.length ?
      <div className="main-train-container" >

      {
        this.state.winLosePop ? <WinLosePopup
          winLoseStatus={this.state.player2}
          pointNet={Math.floor((Math.log(this.state.currentProblem.level) + 1) * 30)}
          /> : null
      }

        {quest && <div className='question-div'>
          <h3 className='question-title-text'>{quest.id && quest.title}</h3>
          <p className='question-description-text'>{quest.id && quest.description}</p>
        </div>}

        <div className="train-container">
          <div className="editor-div left-train-container">
            <ReactAce
              style={{ height: '50vh', fontSize: 19}}
              mode="javascript"
              theme="monokai"
              enableBasicAutocompletion = {true}
              onChange={this.onChange}
              ref={instance => { this.ace = instance; }} // Let's put things into scope
            />

            <form
              id="train-submit"
              className="submit-btn"
              onSubmit={!this.state.error ? this.onSubmit : (e) => {
                e.preventDefault()
                this.setState({output: 'FIX YOUR ERRORS'})
              } }>
              <input className="editor-submit" type="submit" />
            </form>
          </div>

          <div className="right-train-container">
            <div className="output-div" >
              <h4 className="right-container-headers">CONSOLE:</h4>
              {
                this.state.logger.length ? <div className="output-text"> {this.state.logger.slice(0, this.state.logger.length / 2).map(val => (<div key={val}>{val}</div>))} </div>  : <div></div>
              }
            </div>

            <div className="test-specs-div">
              <h4 className="right-container-headers">Test Specs:</h4>

              {
                this.state.output && this.state.output !== "FIX YOUR ERRORS" ? <div className="output-text"> {this.state.output.map(val => (<div key={val}>{val}</div>))} </div>  : <div className="output-text">{this.state.output}</div>
              }
            </div>

          </div>
        </div>
      </div>
    //) : <div><h2>CONGRATULATIONS!!!</h2></div>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapState)(BattleEditor)
