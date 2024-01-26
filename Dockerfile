FROM node:18

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

# Set user to not be root
USER node
# The command to run the app
CMD ["node", "dist/bundle.js"]