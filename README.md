# Weather App

Welcome to the weather app, powered by OpenWeather's OneCall + Geocoding APIs.

<div style="display: flex; align-items: center; justify-content: center; max-width: 100%; max-height: min-content;">
    <img width="150" height="320" src="https://i.imgur.com/yG5Ym6l.png" alt="openweather-mobile-landing-page" />
    <img width="150" height="320" src="https://i.imgur.com/eImmsSE.png" alt="openweather-mobile-landing-page" />
</div>

## Take it for a spin!

Try the app out [here](https://purple-hill-074194210.azurestaticapps.net). For the best experience, view on mobile or toggle your browser's devtools to emulate a mobile UX.

## About

Originally, this app was front-facing only and made direct calls to OpenWeather APIs via axios calls to a URI in which `process.env.REACT_APP_OPEN_WEATHER_API_KEY` was embedded directly. Rather than expose this key publicly in production, I deployed the site on Azure Static Web Apps backed by Azure Functions Serverless Compute to provide an access layer for front-end data fetching.

If you'd like to fork and extend this project, you'll simply need to grab an OpenWeather API key [here](https://openweathermap.org/appid), then add an `OPEN_WEATHER_API_KEY` to your Azure service's application settings [here](https://docs.microsoft.com/en-us/azure/static-web-apps/application-settings).

I'm also mocking a Google Places-style API by providing an array of ~6K US addresses, to power a lookup feature: under the `settings` hamburger located at the top right corner of the navbar you'll find a `cityName` lookup that emulates a db access service -- simply type in the start of your city name, and you'll find likely matches in the dropdowns below.

## Future

Now that the app is deployed and backed by SSL, I will be able to implement local geolocation to grab the user's current whereabouts via the HTML5 `navigator`.

## Tech

The weather app is built on

- React and React Context API + useReducer

- Azure Functions Serverless Compute

- OpenWeather [OneCall](https://openweathermap.org/api/one-call-api) and OpenWeather [Geocoding](https://openweathermap.org/api/geocoding-api) APIs

### The weather app is supported by the following libraries

- React Swipeable Views: I built a custom `SwipeCarousel` that uses the `render` pattern to invoke an array of callbacks for each `Slide`

- Styled Components: all vanilla css with some light props injection -- of note, the background image fetched into the main view sends Unsplash's excellent `source` endpoint query parameters based on time of day and weather conditions, which are passed into the `background-image` field of our styled-components `Background` container.
