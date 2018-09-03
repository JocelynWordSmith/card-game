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
1. [x] card data will be fetched from [this url](https://web-code-test-dot-nyt-games-prd.appspot.com/cards.json)

## STAGE 3

- fix bug where cards are clickable during revertDelay
- [ ] create unopinionated data format in services to only return requested data
- [ ] implement a better visual design for all interactions
- [ ] TEST YOUR SHIT
- refactor Overall code clarity and organization
- refactor State management
- refactor Attention to detail
- refactor User experience
    - make the card flips animate
    - look at making it a table (sometimes easier for screen readers) or a non submitting form (just for semantic purposes)
- persit games and game state

## STAGE 4

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

## STAGE 7

- online play vs person
- online play of the additional game types
- local unlimited game that gets harder (using reshuffles and scrolling maybe?)

## STAGE 8

- toggleable audio (toggle state stored in db)
- social api interaction
