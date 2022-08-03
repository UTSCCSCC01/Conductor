FROM node:latest
COPY . /src
WORKDIR /src
RUN npm install --production
EXPOSE 3007
CMD npm start