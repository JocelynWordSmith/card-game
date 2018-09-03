import React from 'react'
import PropTypes from 'prop-types'

import styles from './Timer.scss'
import { events } from '../../utilities/utilities'

export const formatTime = time => {
  if (time < 0) return '--:--'
  const h = Math.floor(time / 3600)
  const m = Math.floor((time % 3600) / 60)
  const mm = m < 10 ? `0${m}` : m
  const s = time % 60
  const ss = s < 10 ? `0${s}` : s
  if (h > 0) return [h, mm, ss].join(':')
  return `${m}:${ss}`
}

const endGameNamespace = 'gameEnd'

const Timer = ({ time = 0 }) => <div className={styles.timer}>{formatTime(time)}</div>

Timer.propTypes = {
  time: PropTypes.number,
}

class TimerContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      secondsElapsed: 0,
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 1000)
    this.endSub = events.sub(endGameNamespace, () => {
      clearInterval(this.interval)
    })
  }

  componentWillUnmount() {
    this.endSub()
    clearInterval(this.interval)
  }

  tick() {
    const { timerNamepace } = this.props
    const seconds = this.state.secondsElapsed + 1
    this.setState({
      secondsElapsed: seconds,
    })
    events.pub(timerNamepace, seconds)
  }

  render() {
    return <Timer time={this.state.secondsElapsed} />
  }
}

export default TimerContainer
