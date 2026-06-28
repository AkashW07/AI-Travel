AI Travel Planner

AI Travel Planner is a full-stack web application that helps users generate personalized travel itineraries using AI. Users can plan trips by entering their destination, budget, travel duration, and preferences. The application uses the Google Gemini API to generate travel recommendations.

Features
Generate personalized travel itineraries using AI
Select destination, budget, duration, and travel preferences
Responsive and user-friendly interface
REST API for communication between frontend and backend
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

Move into the project folder:

cd AI-Travel

Install backend dependencies:

cd node-express-server
npm install

Install frontend dependencies:

cd ../react-client
npm install
Environment Variables

Create a .env file inside the node-express-server folder.

Example:

GOOGLE_API_KEY=your_google_api_key
Running the Application
Start the Backend
cd node-express-server
npm start
Start the Frontend
cd react-client
npm start

The frontend runs on http://localhost:3000

The backend runs on http://localhost:8080

Future Improvements
User authentication
Save trip history
Hotel and flight recommendations
Interactive maps
Weather information
PDF itinerary export