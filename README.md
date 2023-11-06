# Müdy - Personal Mood Journal

A journal that uses a LLM to analyze your entries and log your mood.

![Screenshot of Journal page](https://github.com/trebitowski/mudy/assets/29380383/3cae8a05-0e47-4951-94e1-a87945fe8f5b)

![Screenshot of Trend page](https://github.com/trebitowski/mudy/assets/29380383/3494410e-4dec-4261-a411-b28990f710c6)


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
