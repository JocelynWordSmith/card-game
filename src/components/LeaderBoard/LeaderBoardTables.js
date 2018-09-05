import React from 'react'
import PropTypes from 'prop-types'

import { keygen } from '../../utilities/keygen'

const LeaderBoardHead = ({ text }) => {
  const { c1, c2, c3, c4 } = text
  return (
    <thead>
      <tr>
        <th scope="col">{c1}</th>
        <th scope="col">{c2}</th>
        <th scope="col">{c3}</th>
        <th scope="col">{c4}</th>
      </tr>
    </thead>
  )
}

// passing object to render, does not mutate
LeaderBoardHead.propTypes = {
  text: PropTypes.object,
}

const LeaderBoardBody = ({ scores, text }) => {
  const { c1, c2, c3, c4 } = text
  return (
    <tbody>
      {scores.map((score, idx) => {
        const { id } = score
        const { player, time, turns } = score.val
        return (
          <tr key={`${id}tr`}>
            <td key={id + c1}>{idx + 1}</td>
            <td key={id + c2}>{player}</td>
            <td key={id + c3}>{time}</td>
            <td key={id + c4}>{turns}</td>
          </tr>
        )
      })}
    </tbody>
  )
}

// passing array to render, does not mutate
// passing object to render, does not mutate
LeaderBoardBody.propTypes = {
  text: PropTypes.object,
  scores: PropTypes.array,
}

const LeaderBoardTable = props => {
  const { scores, text, tableCaption } = props
  return (
    <table>
      <caption>{tableCaption}</caption>
      <LeaderBoardHead text={text} />
      <LeaderBoardBody scores={scores} text={text} />
    </table>
  )
}

// passing array to render, does not mutate
// passing object to render, does not mutate
LeaderBoardTable.propTypes = {
  tableCaption: PropTypes.string,
  text: PropTypes.object,
  scores: PropTypes.array,
}

const LeaderBoardTables = props => {
  const { scores } = props

  return Object.keys(scores).map(scoreLevel => {
    const tableConfig = {
      scores: scores[scoreLevel],
      tableCaption: scoreLevel,
      text: props.text,
    }
    return <LeaderBoardTable key={keygen()} {...tableConfig} />
  })
}

// passing array to render, does not mutate
LeaderBoardTables.propTypes = {
  scores: PropTypes.object,
}

export default LeaderBoardTables
