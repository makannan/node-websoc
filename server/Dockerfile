FROM node

ENV NPM_CONFIG_LOGLEVEL warn
RUN npm config set proxy http://www-proxy.us.oracle.com:80
RUN npm config set https-proxy http://www-proxy.us.oracle.com:80

# Create app directory
RUN mkdir -p /usr/apps/home-automation
WORKDIR /usr/apps/home-automation

# Install app dependencies
COPY package.json /usr/apps/home-automation
RUN npm install

COPY app.js /usr/apps/home-automation
COPY views/ /usr/apps/home-automation

EXPOSE 8080

CMD ["npm", "start"]
