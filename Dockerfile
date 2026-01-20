FROM node:20-slim

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy bot file
COPY discord-bot.js ./

# Run the bot
CMD ["node", "discord-bot.js"]
