FROM mhart/alpine-node:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm i yarn
RUN yarn

# Bundle app source
COPY . ./

# Expose port
EXPOSE 3000

# This allows Heroku bind its PORT the Apps port
# since Heroku needs to use its own PORT before the App can be made accessible to the World
EXPOSE $PORT

# Define default command
CMD [ "npm", "start" ]