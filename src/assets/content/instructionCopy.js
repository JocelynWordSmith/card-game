// moved from Menu.js
// was originally more compact and using mapIdToArr to generate the id's
// seems like a waste of processing, so I just made it static
export default {
  header: 'Memory Game Instructions',
  steps: [
    {
      val: {
        head: 'To start the game:',
        body: [
          {
            val: 'Enter your name',
            id: 'step2',
          },
          {
            val: 'Select a difficulty from the dropdown',
            id: 'step3',
          },
          {
            val: 'Then press submit',
            id: 'step4',
          },
        ],
      },
      id: 'step11',
    },
    {
      val: {
        head: 'Once you have started the game:',
        body: [
          {
            val: 'Select a card, the face will appear',
            id: 'step5',
          },
          {
            val: 'Select a second card, the face will appear',
            id: 'step6',
          },
          {
            val: 'If they match, they stay face up',
            id: 'step7',
          },
          {
            val: "If they don't match, they flip back over",
            id: 'step8',
          },
          {
            val: 'Match all the cards and you win the game!',
            id: 'step9',
          },
          {
            val: 'Try to finish as fast as you can with as few turns as possible',
            id: 'step10',
          },
        ],
      },
      id: 'step12',
    },
  ],
}
