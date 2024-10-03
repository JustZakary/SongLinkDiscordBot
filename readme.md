# Discord Song Link Bot

## Introduction

This bot identifies song links in Discord messages and provides information about the song across different platforms.

## Requirements

- Node.js
- npm (Node Package Manager)
- A Discord bot token

## Installation

1. **Clone the Repository**

   - Clone the bot's code from its repository using Git or download the source code directly.

2. **Install Node.js and npm**

   - Ensure that Node.js and npm are installed on your machine. If not, download and install them from [Node.js official website](https://nodejs.org/).

3. **Setting Up the Project**
   - Navigate to the bot's directory in your terminal or command prompt.
   - Run `npm install` to install all the necessary dependencies.

## Configuration

1. **Create a `.env` File**

   - In the bot's root directory, create a file named `.env`.
   - This file will store your Discord bot token and other environment variables.

2. **Setting the Bot Token**
   - Obtain your Discord bot token from the [Discord Developer Portal](https://discord.com/developers/applications).
   - In the `.env` file, add the following line:
     ```
     TOKEN=Your_Discord_Bot_Token
     ```

## Running the Bot

- After configuration, run the bot using the following command in the terminal:
  ```
  npm run start
  ```
- The bot should now be running and responsive to messages in Discord.

## Usage

- The bot automatically checks every message in the servers it is part of for music links.
- When a music link from supported platforms is found, it provides an embed with information about the song accessible across different music services.

## Supported Music Platforms

- Amazon Music
- Anghami
- Boomplay
- Deezer
- Apple Music
- Pandora
- Soundcloud
- Tidal
- YouTube
- YouTube Music
- Spotify
- Napster

## Note

- Ensure your bot has the necessary permissions in your Discord server to read and send messages.

## Contributing

- Contributions to the bot's development and improvement are welcome. Please refer to the repository's contribution guidelines.

## Support

- For support, questions, or feature requests, open an issue in the GitHub repository of the bot.
