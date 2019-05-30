FROM node:10.15.3-slim AS build

# install chrome + necessary tools
RUN echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list && \
    wget http://dl-ssl.google.com/linux/linux_signing_key.pub && \
    apt-key add linux_signing_key.pub

RUN apt-get update && \
    apt-get -y install google-chrome-stable bzip2 && \
    apt-get clean

# copy in pakcage*.json only so we can cache dependencies
COPY package*.json src/

WORKDIR ./src

# install npm modules
RUN npm install --verbose

# copy in the rest of the source
COPY . .

# build/transpile
RUN npm run build

FROM build AS test

# build arg used to invalidate cache so tests will run
ARG TIMESTAMP=

# run unit tests
RUN npm run test

FROM node:10.15.3-slim

# define port to expose
ENV PORT=3100
EXPOSE $PORT

# set work directory
ENV DIR=/app
WORKDIR $DIR

# copy necessary files from previous stages
COPY --from=build /src/node_modules node_modules
COPY --from=build /src/angular.json .
COPY --from=build /src/package.json .
COPY --from=build /src/tsconfig.json .
COPY --from=build /src/src src

ENTRYPOINT [ "npm" ]
CMD [ "run", "build" ]
