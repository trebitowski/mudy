# Müdy - Personal Mood Journal

A journal that uses a LLM to analyze your entries and log your mood.

![Screenshot of journal page](https://github.com/trebitowski/mudy/assets/29380383/d811a3bc-0ba5-4b0c-99de-f18910c982d7)
![Screenshot of trend page](https://github.com/trebitowski/mudy/assets/29380383/37599e70-b25b-4c85-9e55-53b70ecc8124)

## Install
### Clerk
- Create a new application in the [dashboard](https://dashboard.clerk.com/)
- Copy publishable key and secret key to .env.local
### Planetscale
- Create a new [database](https://app.planetscale.com/)
### OpenAI
- Create a new secret key
- Copy key to .env.local

## Usage
- Connect to local database using pscale proxy
- Run npm dev
