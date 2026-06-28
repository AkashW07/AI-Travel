# AI Travel Planner

AI Travel Planner is a full-stack web application that helps users plan trips by generating personalized travel itineraries based on their preferences. The application combines a React frontend with a Node.js and Express backend while using the Google Gemini API to generate travel recommendations.

---

## Features

* Generate personalized travel itineraries using AI
* Select destination, budget, duration, and travel preferences
* Interactive and responsive user interface
* REST API for communication between frontend and backend
* Secure API key management using environment variables

---

## Tech Stack

### Frontend

* React.js
* JavaScript
* HTML
* CSS

### Backend

* Node.js
* Express.js

### AI Integration

* Google Gemini API

---

## Project Structure

```text
react-express-mysql/
│
├── react-client/
├── node-express-server/
└── README.md
```

---

## Getting Started

### Prerequisites

* Node.js
* npm
* Google Gemini API Key

### Installation

Clone the repository:

```bash
git clone https://github.com/AkashW07/AI-Travel.git
```

Move into the project folder:

```bash
cd AI-Travel
```

Install backend dependencies:

```bash
cd node-express-server
npm install
```

Install frontend dependencies:

```bash
cd ../react-client
npm install
```

---

## Environment Variables

Create a `.env` file inside the `node-express-server` folder.

Example:

```env
GOOGLE_API_KEY=your_google_api_key
```

---

## Running the Application

### Start the Backend

```bash
cd node-express-server
npm start
```

### Start the Frontend

```bash
cd react-client
npm start
```

The frontend runs at:

```text
http://localhost:3000
```

The backend runs at:

```text
http://localhost:8080
```

---

## Future Improvements

* User authentication
* Save trip history
* Hotel and flight recommendations
* Interactive maps
* Weather information
* PDF itinerary export

---


