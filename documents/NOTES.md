# Notes while i work

## STAGE 1
* Initial design doc didnt quite work out like i wanted, trying to reduce the amount of state im using and use functional components instead
* keep working on POC, dont revise docs until you are finished with POC
* I am going to try passing down callbacks for child -> parent communication and try to keep the state as "low" as possible, but might need to refactor if it breaks/muddles the direction of data flow. I think it will be simpler to manage than global state as long as I can keep things reasonably decoupled
* will try keeping seeding properties in a JSON like format in a single place to help keep UI concerns seperate from implimentation concerns