# Horoscope app
A nodejs backend service that generates daily personalized horoscope based on user's zodiac sign
Used Google to mock horoscope text data and zodiac sign from and to date.

## Features
- User signup and login(using jwt)
- Auto find zodia sign based on user's birthdate
- Daily horoscope api
- Horoscope history api(last 7 days)
- rate limiting(max 5 per minute)
- swagger documentation

## Tech Stack
- Node.js, Express.js
- MongoDb with mongoose
- Jwt for authentication
- Express-rate-limit for rate limiting
- Swagger for api docs

## Setup

### Prerequisites
- Nodejs (V>18)
- MongoDB(local or cloud)

### Clone the repo
git clone https://github.com/your-username/horoscope-api.git
cd Nodejs

### Install dependencies
- npm install

### Create .env file in the root directory
- Add this PORT, MONGO_URL, JWT_SECRET

### Run the server
- npm start


## Design Decisions
- Zodiac sign is calculated at signup based on birthdate and stored in user db to avoid recalculating at every request
- JWT is used to authenticate user with session cached for 1 day
- Rate limiting is used to avoid multiple requests
- Horoscope content is being mocked in in-memory, keeping system simple and fast

## Future Scope
- We can use some AI generated horoscope content or some external apis to enhance personalization
- We can add index on database for better query performance
- We can add unit tests and ci/cd pipeline for smoother deployment

## Scalability
Personalized model will require dynamic generation pipeline, caching strategy to serve repeated requests, persistent storage to save generated data, schedulers to trigger daily horoscope generation, asyn task queues(like kafka) to process horoscope jobs
It will also require some stack changes. for eg:
- Redis for caching
- Worker service to process generation
- Integrate with external apis or custom llm model to generate text
- Kafka to trigger communication
- ttl indexes to remove outdated data in mongo