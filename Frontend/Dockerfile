FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .

COPY ./scripts/start.sh /app
CMD ["/app/start.sh"]

