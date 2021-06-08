# Weather App

welcome to the weather app! this app was written for a hooks workshop at Fullstack Academy

## Notes

we're using `json-server` to serve ~6000 US city, state names from `db.json`, which will power our location autocompletion,

and we're using Vercel's `useSWR` hook + `axios` for front-end data fetching.

the site has been bootstrapped with `create-react-app` and relies on an environment variable --

`process.env.REACT_APP_OPEN_WEATHER_API_KEY` -- to authenticate requests to

OpenWeather's <strong>Geocoding API</strong> and <strong>One Call API</strong>

sign-up for an API key here: https://openweathermap.org/appid

## Getting Started

`npm i`

create a `.env` file, <strong>add to your `.gitignore`</strong>, and set your OpenWeather api key on `process.env.REACT_APP_OPEN_WEATHER_API_KEY`

by adding `REACT_APP_OPEN_WEATHER_API_KEY = <your-api-key>` to the `.env`

`json-server --watch db.json --port 8080` -- if you change the port number, update the hardcoded port in `useSuggestions`'s `uri` string

`npm run start` -- runs on port 3000
