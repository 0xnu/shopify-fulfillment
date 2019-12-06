# Shopify Fulfillment API

This is a Shopify Fulfillment API. It enable app developers to give merchants more control and visibility into order fulfillment. It lets you access and change data inside the application from remote. The request must use the protocol HTTPS. Note - it shows feature of an application that is still in development and as such, can change.


## Getting Started and Local Development

- Clone the repo.
- Create a `.env` file in the root of the application. Add these variables (**HOST**, **PORT**, **MongoDB**, **TOKEN_SECRET**, **USERNAME**, and **PASSWORD**) and their respective values. Example:
	- `HOST = localhost`
	- `PORT = 5000`
	- `MongoDB = mongodb+srv://{username}:{password}@{cluster}.mongodb.net/test?retryWrites=true&w=majority`
	- `TOKEN_SECRET = 5G4kuCU9V6MdNZkHJEuwTv7kzk`
	- `USERNAME = myusername`
	- `PASSWORD = mypassword`
- You can install yarn with this command `npm i yarn` if you don't have it in your local machine
- Install dependencies with `yarn` in terminal
- Launch the application with `npm start`
- Follow the instructions [here](https://github.com/dakshshah96/local-cert-generator/) to generate SSL for localhost
- Create a folder called `https` inside `src` folder
- Add `server.key` and `server.crt` inside it
- Visit `https://localhost:5000/docs` for documentation and testing
- Access sample data `https://localhost:5000/api/users`


## Production Deployment

Additional information coming soon.

## Docker version: Install Docker (optional)

- **macOSX Users:** Open terminal and type this command `brew cask install docker`
- **Windows Users:** [instructions here](https://docs.docker.com/docker-for-windows/install/)
- **Linux Users:** [instructions here](https://runnable.com/docker/install-docker-on-linux)

	### Run Docker-Compose Up
	Once installed open a command prompt Terminal in the folder you have the `docker-compose.yml` file in and and run

	### Rebuild images without using any cache

	`docker-compose build --no-cache`

	### Start the Cluster

	`docker-compose up`

	### Verify

	- **API Documentation:** Visit this URL `localhost:5000/docs` to verify it is up
	- **API Endpoint:** Visit this URL `localhost:5000/api/users` to verify it is up.

	### Stop the Cluster

	To stop the cluster, type `docker-compose down`. Data volumes will persist, so it’s possible to start the cluster again with the same data using `docker-compose up`. To destroy the cluster and the data volumes type `docker-compose down -v`.

## Got any questions?

[Email us](mailto:apiteam@macromade.com) 😎🤖👾👻