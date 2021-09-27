# Name the node stage "builder"
FROM node:14 AS builder
# Set working directory
ENV NPM_BASE_64_AUTH=$NPM_BASE_64_AUTH
ENV NPM_EMAIL=$NPM_EMAIL
WORKDIR /devhub
COPY package.json ./
RUN echo "//artifactory.corp.mongodb.com/artifactory/api/npm/npm/:_authToken=${NPM_BASE_64_AUTH}" > /devhub/.npmrc && \
    npm install && \
    npm install -g gatsby-cli && \
    rm -f /app/.npmrc
# install node modules
# Copy all files from current directory to working dir in image
COPY . .

# expose port
EXPOSE 8000

#start command
CMD ["gatsby", "develop", "-H", "0.0.0.0" ]