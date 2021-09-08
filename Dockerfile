FROM node:12.13.1-alpine
RUN npm install -g http-server
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080
RUN echo 'run http-server dist on port:8080'
CMD [ "http-server", "dist" ]
