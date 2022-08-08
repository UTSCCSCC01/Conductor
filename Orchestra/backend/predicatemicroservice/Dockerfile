FROM node:latest
COPY . /src
WORKDIR /src
RUN npm install --production
EXPOSE 3014
CMD npm start