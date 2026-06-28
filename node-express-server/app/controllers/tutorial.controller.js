const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// Import the official Google Gen AI SDK
const { GoogleGenAI } = require("@google/genai");

// Initialize the free Gemini client using your environment variables
// This keeps your API keys secure and out of git repositories
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Create and Save a new AI Itinerary (With Intelligent Caching Check)
exports.create = async (req, res) => {
  // 1. Validate incoming request parameters
  if (!req.body.title) {
    res.status(400).send({
      message: "Destination city/country can not be empty!"
    });
    return;
  }

  // Normalize user inputs
  const destination = req.body.title.trim();
  const totalDays = req.body.description || "3"; 

  try {
    // --- 🚀 STRATEGIC CACHE CHECK LAYER ---
    // Check our local MySQL database first to see if this exact city already exists
    const cachedItinerary = await Tutorial.findOne({
      where: {
        title: {
          [Op.like]: destination // Case-insensitive matching fallback for MySQL
        }
      }
    });

    // Cache Hit Condition: If found in database, send it back immediately!
    if (cachedItinerary) {
      console.log(`⚡ CACHE HIT: Serving itinerary for "${destination}" directly from local MySQL.`);
      res.send(cachedItinerary);
      return; // Halts the function so we never make an unnecessary external API call
    }

    // Cache Miss Condition: If not found, log it and call the Gemini engine
    console.log(`🌐 CACHE MISS: "${destination}" not found in cache. Generating fresh plan via Gemini AI...`);

    // 2. Call the free Gemini AI API to generate a detailed itinerary
    const aiResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Create a clean, paragraph-spaced, day-by-day travel itinerary for a ${totalDays}-day trip to ${destination}. Include top local landmarks and specific food recommendations.`
    });

    // 3. Construct the record data layout using the generated AI stream
    const travelPlan = {
      title: destination,                // Saves destination name to 'title'
      description: aiResponse.text,     // Saves the complete AI generated text to 'description'
      published: req.body.published ? req.body.published : false
    };

    // 4. Save the compiled travel plan inside your local MySQL database for future caching
    Tutorial.create(travelPlan)
      .then(data => {
        res.send(data); // Returns the newly cached row to the React client
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some database error occurred while saving the itinerary."
        });
      });

  } catch (error) {
    console.error("System Orchestration Error:", error);
    res.status(500).send({
      message: "Failed to process, generate, or cache your travel itinerary."
    });
  }
};

// Retrieve all Itineraries from the database (unchanged structural behavior)
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Tutorial.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving itineraries."
      });
    });
};

// Find a single Itinerary with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find itinerary with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving itinerary with id=" + id
      });
    });
};

// Update an Itinerary by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Tutorial.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Itinerary was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update itinerary with id=${id}. Maybe record was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating itinerary with id=" + id
      });
    });
};

// Delete an Itinerary with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Itinerary was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete itinerary with id=${id}. Maybe record was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete itinerary with id=" + id
      });
    });
};

// Delete all Itineraries from the database
exports.deleteAll = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Itineraries were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all records."
      });
    });
};

// Find all published Itineraries
exports.findAllPublished = (req, res) => {
  Tutorial.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving itineraries."
      });
    });
};