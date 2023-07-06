# Calculator CLI
The only thing youn really care about is [the file where the magic happens](https://github.com/glemiere/calculator/blob/main/src/commands/_calculate.ts).

## Installation
 `npm run install:global` (global install)

 or
 
`npm install` (local install)

## Building
`npm run build`

## Dev server
`npm run build:dev`

## Running
`npm run start` (local install)

or

`calculator` (global install)

## Command where the magic happens:
`npm run start calculate` (local install)

or 

`calculator calculate` (global install)

## Testing
`npm run test` but I didn't write any, maybe if y'all hire me though :D

### Note for self:

Could make a sanitazing function to avoid all the possible crappy inputs like a+b-t, but that would require some serious regex magic.
Also could test the calculate function against eval.
Finally this does not support percentages, could be fun to add but quite a bit of work.

###### Developed with ❤️ by @glemiere

