FROM node:16


# # Create app directory
# WORKDIR /usr/src/app

# # Install app dependencies
# # A wildcard is used to ensure both package.json AND package-lock.json are copied
# # where available (npm@5+)
# COPY package*.json ./



# RUN ls -l /usr/src/app

# RUN npm install
# # If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY --chown=node:node . .

#EXPOSE 3000

#FROM node:16

# RUN mkdir /app && chown node:node /app
# WORKDIR /app

# USER node
# COPY --chown=node:node package.json package-lock.json* ./

# RUN npm install --force

# COPY --chown=node:node . .

#WORKDIR /app

#RUN npm run ng add @angular/material

# RUN mkdir /app && chown node:node /app
# WORKDIR /app

# COPY --chown=node:node package.json package-lock.json* ./

# RUN npm install

# COPY --chown=node:node . .

# WORKDIR /usr/src/app
# COPY . .

# RUN chown -R 777 .


