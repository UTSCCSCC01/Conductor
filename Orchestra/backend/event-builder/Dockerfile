FROM node:latest
COPY . /src
WORKDIR /src
RUN npm install --production
EXPOSE 3008
CMD npm start