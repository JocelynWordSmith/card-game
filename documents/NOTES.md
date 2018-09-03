# Notes while i work

## STAGE 1
* plan on making everything accessible from the get go, since its easier to do it now
* should be able to use it using only a keyboard or with any screen reader
* Initial design doc didnt quite work out like i wanted, trying to reduce the amount of state im using and use functional components instead
* keep working on POC, dont revise docs until you are finished with POC
* I am going to try passing down callbacks for child -> parent communication and try to keep the state as "low" as possible, but might need to refactor if it breaks/muddles the direction of data flow. I think it will be simpler to manage than global state as long as I can keep things reasonably decoupled
* will try keeping seeding properties in a JSON like format in a single place to help keep UI concerns seperate from implimentation concerns
* completely changed relationships, initial doc was helpful but probably wont make another relationship diagram unless i get to multiple game types
* had to use a pub/sub feature to get the POC done, will refactor how to reduce possibility of "outside" logic conflicts (TODO)
* have to have a different way of managing "disabled" stated `disabled` attribute complicates tab order and keyboard completion. will need aria attribute to communicate state to user

## STAGE 1 retro
* I REALLY dislike some of the linting guidelines. the way it is setup it actually increases visual code inconsitensies, and semicolon omission is bad. especially since I sometimes have to add a LEADING semicolon to certain lines. also i think it would benefit from more control structure rules, specifically allowing short circuits (even though i used them for my POC i added TODOs). while i agree with requiring props validation, i would prefer a way for components to inherit props validations maybe? will look into this later
* some of the rules that cause visual inconsistencies but help brevity should be done in the build
* generally i disagree with making JS look less like JS without significant benefit to the developer
* i do like many of the rules
* React has a more gotchas than expected, and since this is my first time with it I had the joy of learning a few of them :)
* i spent too much time solving potential problems
* i think i overused enclosure creation in a couple places but already fixed most of them. might actually reintroduce it in on place to fix bug tho
* theres a power outage in my neighborhood hopefully i found all of my react gotchas

## STAGE 2
* using node-fetch for api fetching
* using idb-keyval for a lightweight indexedDB implimentation in case i get storing a full game state or running the app offline
* since i originally made the services util return a promise, swapping in the libraries was easy since they both use promises