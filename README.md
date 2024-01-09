
# 🌐 Namecheap Market AI Picker

## Overview 📋
The Namecheap Market AI Picker is a JavaScript-based application designed to automate the process of finding interesting domains. It integrates with Namecheap's API to fetch domain information, uses OpenAI's services to evaluate domain names, and sends daily emails or RSS notifications about domains that might be of interest.

## Features 🌟
- **Domain Information Fetching** 🌍: Utilizes Namecheap's API to gather data about available domains.
- **AI-Powered Analysis** 🤖: Leverages OpenAI's advanced AI algorithms to assess the potential interest in different domain names.
- **Automated Notifications** 📧: Sends daily updates via email or RSS feed about intriguing domain names.

## Prerequisites 📚
- Node.js environment
- Access to Namecheap API
- OpenAI API key
- Setup for email notifications or RSS feed integration

## Installation 💾
1. Clone the repository to your local machine.
2. Navigate to the project directory and run `npm install` to install all the necessary dependencies.

## Configuration ⚙️
1. Set up the `.env` file with your Namecheap API credentials, OpenAI API key, and email/RSS configuration details.
2. Customize the settings in `namecheap.js` and `openAi.js` as needed to suit your domain search criteria and AI analysis preferences.

## Docker Setup 🐳
1. Make sure Docker and Docker Compose are installed on your machine.
2. Use the provided `docker-compose.yml` file to build and run the application in a Docker container.
3. Execute `docker-compose up -d` to start the application.

## Usage 🚀
Run the application using the command `node index.js`. The app will automatically fetch domain data, analyze it using AI, and send out notifications based on the configured schedule and methods (email/RSS).

## Files Description 🗂
- **index.js**: Main entry point of the application. Handles application logic and orchestration.
- **mail.js**: Manages email sending functionalities.
- **namecheap.js**: Integrates with Namecheap API for domain operations.
- **openAi.js**: Connects to OpenAI services for AI-driven analysis and insights.
- **toFile.js**: Handles file operations, possibly including data serialization and encoding.

## Contributing 🤝
Contributions to enhance the application are welcome. Please follow the standard fork-and-pull request workflow.

## License 📄
This project is licensed under the [MIT License](LICENSE).