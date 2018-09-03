import React from 'react'

const LeaderBoardHead = ({ text }) => {
  const { c1, c2, c3, c4 } = text
  return (
    <thead>
      <tr>
        <th scope="column">{c1}</th>
        <th scope="column">{c2}</th>
        <th scope="column">{c3}</th>
        <th scope="column">{c4}</th>
      </tr>
    </thead>
  )
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

const LeaderBoardTable = props => {
  const { scores, text } = props
  const { tableCaption } = text
  return (
    <table>
      <caption>{tableCaption}</caption>
      <LeaderBoardHead text={text} />
      <LeaderBoardBody scores={scores} text={text} />
    </table>
  )
}

export default LeaderBoardTable
