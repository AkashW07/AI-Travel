AI Travel Planner

AI Travel Planner is a full-stack web application that helps users plan trips by generating personalized travel itineraries based on their preferences. The application combines a React frontend with a Node.js and Express backend, while Google Gemini API is used to generate travel recommendations.

Features
Generate personalized travel itineraries using AI
Select destination, budget, duration, and travel preferences
Interactive and responsive user interface
REST API for handling client requests
Secure API key management using environment variables
Tech Stack
Frontend
React.js
JavaScript
HTML
CSS
Backend
Node.js
Express.js
AI Integration
Google Gemini API
Project Structure
react-express-mysql/
│
├── react-client/          # React frontend
├── node-express-server/   # Express backend
└── README.md
Getting Started
Prerequisites
Node.js
npm
Google Gemini API Key
Installation

Clone the repository:

git clone https://github.com/AkashW07/AI-Travel.git

Go to the project directory:

cd AI-Travel

Install backend dependencies:

cd node-express-server
npm install

Install frontend dependencies:

cd ../react-client
npm install
Environment Variables

Create a .env file inside the node-express-server directory and add your Google Gemini API key.

Example:

GOOGLE_API_KEY=your_api_key_here
Run the Backend
cd node-express-server
npm start
Run the Frontend
cd react-client
npm start

The application will be available at:

Frontend: http://localhost:3000
Backend: http://localhost:8080
Future Improvements
User authentication
Save previous trips
Hotel and flight recommendations
Interactive maps
Weather forecasts
PDF itinerary export