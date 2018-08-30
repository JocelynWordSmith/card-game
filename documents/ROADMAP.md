# Requirements and actions for application

The following requirements and actions are separated by stages, Stage 1 being the MVP, stages 2 through n being enhancements based on available time.

## REQUIREMENTS

1. [ ] All cards begin `face down`.
1. [ ] WHEN the first turn begins, the [`Timer` component](../src/components/Timer/Timer.js) will begin counting
1. [ ] A turn consists of turning one card face up, and then a second
    - If they match, the pair is removed from play
    - If they do not match, both cards turn back over
1. [ ] WHEN no cards remain in play the game ends
1. [ ] WHEN then game ends, the timer will stop

## Stage 1

*turn the following into a UML-like diagram, write stubs, make sure it still makes sense*

Keep it easy until you cant
dont solve problems you dont have
optimize when you're done but don't be lazy

1. The application will begin with a title screen. the title screen will contain:
    - the game title
    - instructions for the game
    - a `start game` button that is disabled
    - a dropdown for difficulty (containing difficulties from ajax response)
    - WHEN the difficulty is selected the start button is enabled
1. WHILE the title screen is loading, the object from [this url](https://web-code-test-dot-nyt-games-prd.appspot.com/cards.json) will be fetched
    - The data will be stored in memory
    - this should be done in an agnostic middleware-ish services component, so that local/persistent storage can be used as well. I'm not sure what library method will be used for this, so on first pass just mock the data locally and make a sev 1 TODO
    - populate the difficulty dropdown
1. WHEN the start button is pressed, the game board will load
    - The game board will contain as many cards as are in the response based on difficulty
    - the cards will be in a pseudo 0random ordering by their designated symbols (i should say the _symbols_ will be in a pseudo random order since the cards dont really care)
    - each card will begin in its ``face down`` state
    - each card will be a `Card` component made of a `button` element
    - each card will be styled to look like a white square with a black border
    - each card will have visible identifying text (row and column)
    - each card will have visible interaction instructions (click/press/select card to flip)
    - each card will have non visible paired identification (matching the unicode symbols from response) in a display none div or stored in memory
    - each card will be a pure function component "belonging" to a collection held by a `Board` class component
    - the `Board` will need a relationship to the timer and `App` container. Just make the `Timer` a field of the `Board` for now with a sev 3 TODO
1. THEN the timer will be zero, and the cards will be selectable
    - the cards are buttons, so we don't need special logic to manage focus or use keyboard events with mobile or desktop screen readers
    - for now just put the cards in a `section` and make sure they work with a keyboard. we can look at making it a table (sometimes easier for screen readers) or a non submitting form (just for semantic purposes)
1. WHEN the first card is selected
    - The timer will begin
1. GIVEN there has not been a card selected for the current turn (user is selecting card 1 of 2)
    - WHEN a card is selected (including the first card of the game)
        - the symbol from the response that is stored will become visible
        - the button will have supplemental text indicating it is selected (primarily for screen readers)
        - a significant border color change will occur (dark red or blue for contrast sake)
        - the card will be disabled and aria-pressed="true"
1. GIVEN a card has been selected but the turn is not over (user is selecting card 2 of 2)
    - WHEN a card is selected
        - the symbol from the response that is stored will become visible
        - the button will have supplemental text indicating it is selected (primarily for screen readers)
        - a significant border color change will occur (dark red or blue for contrast sake)
        - the card will be disabled and aria-pressed="true"
    - IF the card selected in this step (2 of 2) DOES NOT match the card selected in the first step (1 of 2) as dictated by the symbols from the response
        - THEN a message indicating that the cards DO NOT match will be injected into an aria live container/header which is visible
        - AND the card will return to its `face down` state
    - IF the card selected in this step (2 of 2) matches the card selected in the first step (1 of 2) as dictated by the symbols from the response
        - THEN a message indicating that the cards match will be injected into an aria live container/header which is visible
        - AND a message indicating that the cards match will appear on the card to seperate it from selected cards in play
        - IF this card is also the last card in play
            - THEN the timer will stop counting
            - AND a message will be injected into the visible header containing a victory message and the elapsed time
            - AND the user will returned to the title screen


## STAGE 2
- IF the cards request fails, the game will have fallback options for local play
- move card 'type' into state
- look at making it a table (sometimes easier for screen readers) or a non submitting form (just for semantic purposes)
- make the card flips animate
- impliment a better visual design for all interactions
- impliment local storage using index db for persitant games and game state

## STAGE 3
- refactor Overall code clarity and organization
- refactor State management
- refactor Attention to detail
- refactor User experience

##STAGE 4
- fullscreen mode
- improved scoring system
- leaderboard using persisted storage from stage two

## STAGE 5
- Polish the hell out of everything
- dev test, get a few people to play it
- get it on a ghpages site
- write some tests, run some audits, try to break it

## STAGE 6
- Beat the clock
- local head to head
- local head to head against computer
- local unlimited game that gets harder (using reshuffles and scrolling maybe?)

## STAGE 7
- online play vs person

## STAGE 8
- online play of the additional game types

## STAGE 9
- toggleable audio (toggle state stored in db)
- social api interaction

## STAGE 10
- its probs been like a week by now you should turn it in
