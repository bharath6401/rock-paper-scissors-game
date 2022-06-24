import {Component} from 'react'
import Popup from 'reactjs-popup'
import {RiCloseLine} from 'react-icons/ri'
import {Paragraph} from './styledComponent'

import 'reactjs-popup/dist/index.css'

import './index.css'

class RockPaperScissors extends Component {
  state = {
    score: 0,
    gameState: false,
    resultArr: [],
    result: false,
    resultText: '',
  }

  imageClicked = event => {
    // console.log(event.target.id)
    const userId = event.target.id

    const random3 = Math.floor(Math.random(0, 1) * 3)
    let randomId
    switch (random3) {
      case 0:
        randomId = 'ROCK'
        break
      case 1:
        randomId = 'PAPER'
        break
      case 2:
        randomId = 'SCISSORS'
        break

      default:
        break
    }
    console.log(userId, randomId)
    let ret
    if (
      (userId === 'ROCK' && randomId === 'SCISSORS') ||
      (userId === 'SCISSORS' && randomId === 'PAPER') ||
      (userId === 'PAPER' && randomId === 'ROCK')
    ) {
      this.YouWonView(userId, randomId)

      console.log('won', userId, randomId)
    } else if (userId === randomId) {
      this.DrawView(userId, randomId)
      console.log('Draw', userId, randomId)
    } else {
      this.YouLoseView(userId, randomId)
      console.log('Lose', userId, randomId)
    }
    // return ret
  }

  YouWonView = (userId, randomId) => {
    //   const {userId, randomId} = prop
    const {choiceList} = this.props
    const userUrl = choiceList.filter(eachItem => eachItem.id === userId)
    const randomUrl = choiceList.filter(eachItem => eachItem.id === randomId)
    const resultObj = [...userUrl, ...randomUrl]
    console.log(resultObj)
    const num = 0
    this.setState(prevState => ({
      score: prevState.score + 1,
      resultArr: [...resultObj],
      result: true,
      resultText: 'YOU WON',
    }))
  }

  YouLoseView = (userId, randomId) => {
    const num = 0
    const {choiceList} = this.props
    const userUrl = choiceList.filter(eachItem => eachItem.id === userId)
    const randomUrl = choiceList.filter(eachItem => eachItem.id === randomId)
    const resultObj = [...userUrl, ...randomUrl]
    console.log(resultObj)
    this.setState(prevState => ({
      score: prevState.score - 1,
      resultArr: [...resultObj],
      result: true,
      resultText: 'YOU LOSE',
    }))
    // return <h1>You Lose</h1>
  }

  DrawView = (userId, randomId) => {
    const {choiceList} = this.props
    const userUrl = choiceList.filter(eachItem => eachItem.id === userId)
    const randomUrl = choiceList.filter(eachItem => eachItem.id === randomId)
    const resultObj = [...userUrl, ...randomUrl]
    console.log(resultObj)
    this.setState(prevState => ({
      score: prevState.score,
      resultArr: [...resultObj],
      result: true,
      resultText: 'IT IS DRAW',
    }))
    const num = 0
    // return <h1>DRAW</h1>
  }

  PlayAgain = () => {
    this.setState({result: false})
  }

  render() {
    const {score, gameState, result, resultArr, resultText} = this.state
    const {choiceList} = this.props
    console.log(score)
    return (
      <div className="bg-home col-12">
        <div className="col-9 rpc-score-container m-1">
          <div>
            <h1>Rock Paper Scissors</h1>
            <p>ROCK</p>
            <p>PAPER</p>
            <p>SCISSORS</p>
          </div>
          <div className="score col-3 d-flex flex-row justify-content-center align-items-center">
            <Paragraph className="mr-1 score">Score</Paragraph>
            <Paragraph className="score">{score}</Paragraph>
          </div>
        </div>
        <div className="rps-play-container col-9">
          {/* choiceList */}
          {!result && (
            <div className="d-flex flex-column">
              <div className="d-flex flex-row justify-content-center col-12">
                <button
                  type="button"
                  data-testid="rockButton"
                  onClick={this.imageClicked}
                  className="col-4"
                >
                  <img
                    id={choiceList[0].id}
                    alt={choiceList[0].id}
                    className="rps-image col-8"
                    src={choiceList[0].imageUrl}
                  />
                </button>
                <button
                  type="button"
                  data-testid="scissorsButton"
                  onClick={this.imageClicked}
                  className="col-4"
                >
                  <img
                    id={choiceList[1].id}
                    alt={choiceList[1].id}
                    className="rps-image col-8"
                    src={choiceList[1].imageUrl}
                  />
                </button>
              </div>
              <div className="d-flex flex-column align-items-center col-12">
                <button
                  type="button"
                  data-testid="paperButton"
                  onClick={this.imageClicked}
                  className="col-4"
                >
                  <img
                    id={choiceList[2].id}
                    alt={choiceList[2].id}
                    className="rps-image col-8"
                    src={choiceList[2].imageUrl}
                  />
                </button>
              </div>
            </div>
          )}
          {result && (
            <div>
              <h1>Rock Paper Scissors</h1>
              <div className="d-flex flex-row">
                <div className="d-flex flex-column align-items-center">
                  <h1>YOU</h1>
                  <img
                    alt="your choice"
                    className="result-images"
                    src={resultArr[0].imageUrl}
                  />
                </div>
                <div className="d-flex flex-column align-items-center">
                  <h1>OPPONENT</h1>
                  <img
                    alt="opponent choice"
                    className="result-images"
                    src={resultArr[1].imageUrl}
                  />
                </div>
              </div>
              {/* <div>
                
              </div> */}
              <div className="d-flex flex-column align-items-center">
                <p>{resultText}</p>
                <button
                  type="button"
                  className="play-again"
                  onClick={this.PlayAgain}
                >
                  PLAY AGAIN
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="popup-container col-9">
          <Popup
            modal
            trigger={
              <button type="button" className="rules">
                Rules
              </button>
            }
          >
            {close => (
              <>
                <div className="col-9">
                  <button
                    type="button"
                    className="trigger-button align-self-end"
                    onClick={() => close()}
                  >
                    <RiCloseLine />
                  </button>
                </div>

                <div>
                  <img
                    className="rules-image col-11"
                    alt="rules"
                    src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png "
                  />
                </div>
              </>
            )}
          </Popup>
        </div>
      </div>
    )
  }
}

export default RockPaperScissors
