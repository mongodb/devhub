# Name the node stage "builder"
FROM node:14 AS builder
# Set working directory
WORKDIR /devhub
# Copy all files from current directory to working dir in image
COPY package.json ./
# install node modules
RUN npm install
RUN npm install -g gatsby-cli

WORKDIR /devhub
COPY . .

# expose port
EXPOSE 8000

#start command
CMD ["gatsby", "develop", "-H", "0.0.0.0" ]