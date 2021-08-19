FROM node:13.7 as build-deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
#RUN yarn build
#CMD [ "yarn", "start"]
