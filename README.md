# NYT Web Code Test

Thank you for considering me for a development role at the New York Times. This project was my first real exposure to react, so regardless of the next steps it was good to have a reason to really dig in. Any advice or feedback is appreciated as I would like to continue using react in the future.

## building the project

I stayed on the given project, however i ran into some issues with Node v10 so it might be worth adding to the assignment not to use v10.

The node_modules and build folder have been removed.

To build:

- uncompress the folder
- `cd` into the project
- make sure you are using Node v6 (I rolled back to 6.14.4)
- run `npm install'
- run 'npm run dev'
- navigate to `localhost:3000` in your browser

## project structure

All the code I wrote is the in src directory

```bash

|_src
  |_assets
    |_content # holds copy, configuration, and mock data
    |_documents # a bunch of stuff i wrote/used while working on this
    |_images 
  |_client # no work done in this folder
  |_components
    |_App
    |_Card
    |_GameBoard
    |_GameConfig
    |_InteractionView
    |_LeaderBoard
    |_Menu
    |_Messenger
    |_Timer
  |_server # no work done in this folder
  |_utilities
    |_agnostic.js # general utility methods
    |_events.js # pub/sub
    |_getPayload.js # requests
    |_keygetn.js # generate a number, does not generate same number twice
    |_utilities.js # root utility export

```

## updated requirements

revision of the requirements in the original README that worked better for me

## REQUIREMENTS

1. [x] All cards begin `face down`.
1. [x] WHEN the first turn begins, the [`Timer` component](../src/components/Timer/Timer.js) will begin counting
1. [x] A turn consists of turning one card face up, and then a second
    - If they match, the pair is removed from play
    - If they do not match, both cards turn back over
1. [x] WHEN no cards remain in play the game ends
1. [x] WHEN then game ends, the timer will stop
1. [x] card data will be fetched from [this url](https://web-code-test-dot-nyt-games-prd.appspot.com/cards.json)

## Extra Credit

1. I focused a lot on usability and semantics so app is completely accessible
    - there are some color contrast things that will get hit by an audit, but they are false positives. It's text that matches it's background bc it's screen reader specific text. Its the text inside the button behind the cards if you want to look
    - otherwise contrast and font stuff should be 100%
    - contextual but non redundant text is provided
    - light use of aria attributes (i prefer to use them only as needed and let the user agent handle most stuff) such as aria-live and aria-hidden
    - landmarks, heading levels, input labels, and element structures (like the tables, and i used caption instead of summary bc summary is deprecated)
    - all interactions should have significant, whether by focus indication, movement, or text
1. direction feedback in the messenger component tells the user what they did and what to do next
1. user can start a New game
1. top 3 leaderboards for both easy and hard using indexedDB
1. can clear the leaderboard
1. pseudo random card order
1. can store response data locally
1. tracks score by turns as well as time
1. animations
1. hopefully i made good code choices too :)


## Closing

This was a fun project, and I look forward to any feedback, critical or otherwise, that you might have. Feel free to ignore the whole documentation folder its mostly just todo lists, and let me know if there are any questions i can answer.

Cheers,
Joshua Smith
