# Did the Braves Win Today? — Frontend

A simple, playful web app that tells you if the Atlanta Braves won today.
Built with vanilla HTML, CSS, and JavaScript. Features a Saturday city connect 
easter egg that switches to an alternate color scheme on Saturdays.

## Live Site
https://didthebraveswintoday.netlify.app

## Features
- Displays today's result — win, loss, in progress, or no game
- Shows score and opponent
- Automatically switches to Atlanta city connect colors on Saturdays
- Pulls live data from the Braves API on page load

## Tech Stack
- HTML / CSS / Vanilla JavaScript
- Deployed on Netlify

## Related Repo
[braves-api](https://github.com/graysonpeterson/braves-api) — the FastAPI backend this site consumes

## Run Locally

```bash
git clone https://github.com/graysonpeterson/braves-frontend.git
cd braves-frontend
```

Open `index.html` with Live Server in VS Code, or any local static file server.

Make sure the `API_BASE` variable in `app.js` points to your local or live API URL.
