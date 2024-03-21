FROM node:18 as build

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

# Copy nginx conf file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy SSL sertificates
COPY ./sertit/star_turku_fi.crt /etc/nginx/star_turku_fi.crt
COPY ./sertit/star_turku_fi.key /etc/nginx/star_turku_fi.key

# Copy the built React app to Nginx's web server directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 443

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]