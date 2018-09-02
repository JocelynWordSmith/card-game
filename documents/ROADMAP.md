# Requirements and actions for application

**Reminder**

- Keep it simple until you cant
- dont solve problems you dont have
- dont optimize until you're done
- dont hide text for screen readers that others might use
- composition > inheritance
- functions > classes, but classes arent bad
- usability and scalability > clever code

## REQUIREMENTS

1. [x] All cards begin `face down`.
1. [x] WHEN the first turn begins, the [`Timer` component](../src/components/Timer/Timer.js) will begin counting
1. [x] A turn consists of turning one card face up, and then a second
    - If they match, the pair is removed from play
    - If they do not match, both cards turn back over
1. [x] WHEN no cards remain in play the game ends
1. [x] WHEN then game ends, the timer will stop
1. [ ] card data will be fetched from [this url](https://web-code-test-dot-nyt-games-prd.appspot.com/cards.json)

## STAGE 2

### Usability

- [ ] all card signs must be announced when cards are shown in order to communicate info to screen readers
- [ ] implement a better visual design for all interactions
- [ ] each card will have visible interaction instructions (click/press/select card to flip) for sighted users with other impairments
- [x] ~~each card will have visible identifying text (row and column)~~ will not do since viewport dictates row/col
- [ ] the button will have supplemental text indicating it is selected (primarily for screen readers)
- [ ] a significant border color change will occur (dark red or blue for contrast sake)
- [ ] aria-pressed or aria-selected true/false to indicate card state
- [ ] a message indicating that the cards DO or DO NOT match will be injected into an aria live container/header which is visible
- [ ] a message indicating that the cards match will appear on the card to seperate it from selected cards in play

### Gameplay

- [ ] the cards will be in a pseudo random ordering by their designated symbols (i should say the _symbols_ will be in a pseudo random order since the cards don't really care)
- [ ]the user can return to the title screen after completion
- [ ] WHILE the title screen is loading, the object from [this url](https://web-code-test-dot-nyt-games-prd.appspot.com/cards.json) will be fetched

### Scalability

- [x] split out crowded code
- [ ] fix pub/sub so that unsub works
- [ ] create unopinionated data format in services to only return requested data
- [ ] The API data will be stored in memory
- [x] move card 'type' into state






## STAGE 3
- [ ] TEST YOUR SHIT
- refactor Overall code clarity and organization
- refactor State management
- refactor Attention to detail
- refactor User experience
    - make the card flips animate
    - look at making it a table (sometimes easier for screen readers) or a non submitting form (just for semantic purposes)
- [ ] impliment local storage using index db for persitant games and game state

##STAGE 4
- IF the cards request fails, the game will have fallback options for local play
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
