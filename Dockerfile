# Name the node stage "builder"
FROM node:14 AS builder
# Set working directory
ARG NPM_BASE_64_AUTH=$NPM_BASE_64_AUTH
ARG NPM_EMAIL=$NPM_EMAIL
WORKDIR /devhub
COPY package.json ./
COPY .npmrc ./
# install node modules
RUN npm install
RUN npm install -g gatsby-cli
# Copy all files from current directory to working dir in image
COPY . .

# expose port
EXPOSE 8000

#start command
CMD ["gatsby", "develop", "-H", "0.0.0.0" ]