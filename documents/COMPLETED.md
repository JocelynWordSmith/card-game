# moving stuff to here from roadmap once it is done so I have less to sort through at a time

## Stage 1

*turn the following into a UML-like diagram, write stubs, make sure it still makes sense*

1. [x] The application will begin with a title screen. the title screen will contain:
    - the game title
    - ~~instructions for the game~~ moved to STAGE 2
    - a `start game` button that is disabled
    - a dropdown for difficulty (containing difficulties from ajax response)
    - WHEN the difficulty is selected the start button is enabled (UPDATE the dropdown has a default value when the response returns)
1. ~~WHILE the title screen is loading, the object from [this url](https://web-code-test-dot-nyt-games-prd.appspot.com/cards.json) will be fetched~~ moved to STAGE 2 to refactor
    - The data will be stored in memory
    - [x] this should be done in an agnostic middleware-ish services component, so that local/persistent storage can be used as well. I'm not sure what library method will be used for this, so on first pass just mock the data locally and make a sev 1 TODO
    - [x] populate the difficulty dropdown
1. [x] WHEN the start button is pressed, the game board will load
    - The game board will contain as many cards as are in the response based on difficulty
    - ~~the cards will be in a pseudo 0random ordering by their designated symbols (i should say the _symbols_ will be in a pseudo random order since the cards dont really care)~~ moved to stage 2
    - each card will begin in its ``face down`` state
    - each card will be a `Card` component made of a `button` element
    - ~~each card will be styled to look like a white square with a black border~~ STAGE2
    - ~~each card will have non visible paired identification (matching the unicode symbols from response) in a display none div or stored in memory~~ STAGE2
    - ~~each card will be a pure function component "belonging" to a collection held by a `Board` class component~~ this is no longer true
    - ~~the `Board` will need a relationship to the timer and `App` container. Just make the `Timer` a field of the `Board` for now with a sev 3 TODO~~ this is no longer true
1. [x] THEN the timer will be zero, and the cards will be selectable
    - the cards are buttons, so we don't need special logic to manage focus or use keyboard events with mobile or desktop screen readers
    - for now just put the cards in a `section` and make sure they work with a keyboard. we can look at making it a table (sometimes easier for screen readers) or a non submitting form (just for semantic purposes)
1. [x] WHEN the first card is selected
    - The timer will begin
1. [x] GIVEN there has not been a card selected for the current turn (user is selecting card 1 of 2)
    - WHEN a card is selected (including the first card of the game)
        - the symbol from the response that is stored will become visible
        - ~~the button will have supplemental text indicating it is selected (primarily for screen readers)~~ STAGE2
        - ~~a significant border color change will occur (dark red or blue for contrast sake)~~ STAGE2
        - the card will be disabled ~~and aria-pressed="true"~~ STAGE2
1. [x] GIVEN a card has been selected but the turn is not over (user is selecting card 2 of 2)
    - WHEN a card is selected
        - the symbol from the response that is stored will become visible
        - ~~the button will have supplemental text indicating it is selected (primarily for screen readers)~~ STAGE2
        - ~~a significant border color change will occur (dark red or blue for contrast sake)~~ STAGE2
        - the card will be disabled ~~and aria-pressed="true"~~ STAGE2
    - [x] IF the card selected in this step (2 of 2) DOES NOT match the card selected in the first step (1 of 2) as dictated by the symbols from the response
        - ~~THEN a message indicating that the cards DO NOT match will be injected into an aria live container/header which is visible~~ STAGE2
        - AND the card will return to its `face down` state
    - [x] IF the card selected in this step (2 of 2) matches the card selected in the first step (1 of 2) as dictated by the symbols from the response
        - ~~THEN a message indicating that the cards match will be injected into an aria live container/header which is visible~~ STAGE2
        - ~~AND a message indicating that the cards match will appear on the card to seperate it from selected cards in play~~ STAGE2
        - IF this card is also the last card in play
            - THEN the timer will stop counting
            - AND a message will be injected into the visible header containing a victory message and the elapsed time
            - ~~AND the user will returned to the title screen~~ STAGE2