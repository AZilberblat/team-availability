FROM node:20

RUN mkdir /frontend
WORKDIR /frontend
COPY . .
RUN npm install
CMD ["npm", "start"]