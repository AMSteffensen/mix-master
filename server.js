import express from "express";
import axios from "axios";
import { createClient } from "redis";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const app = express();
const port = 3000;

const redisClient = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

const cocktailSearchUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const singleCocktailUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

// Connect to Redis
redisClient
  .connect()
  .then(() => console.log("Connected to Redis"))
  .catch((err) => {
    console.error("Failed to connect to Redis", err);
    process.exit(1); // Exit the process if Redis connection fails
  });

// Use CORS middleware
app.use(cors()); // Enable CORS for all routes

// Middleware to parse JSON
app.use(express.json());

// Endpoint to get cocktail data (by search term)
app.get("/api/cocktails", async (req, res) => {
  const searchTerm = req.query.search || " ";

  // Check Redis for cached data
  try {
    const cachedData = await redisClient.get(searchTerm);
    if (cachedData) {
      console.log("Serving from cache");
      return res.json(JSON.parse(cachedData));
    }

    // If not cached, fetch from the Cocktail DB API
    console.log(`Fetching cocktail data for: ${searchTerm}`);
    const startTime = Date.now(); // Start time measurement
    const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
    const drinks = response.data.drinks;

    // Cache the response in Redis for future requests
    await redisClient.set(searchTerm, JSON.stringify(drinks), { EX: 3600 }); // Cache for 1 hour
    const endTime = Date.now(); // End time measurement
    const timeTaken = endTime - startTime; // Calculate time taken
    console.log(
      `Data fetched and cached for: ${searchTerm} in ${timeTaken} ms`
    );

    return res.json(drinks);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching cocktail data");
  }
});

// Endpoint to get specific cocktail data (by ID)
app.get("/api/cocktails/:id", async (req, res) => {
  const { id } = req.params;

  // Check Redis for cached specific cocktail data
  try {
    const cachedData = await redisClient.get(id);
    if (cachedData) {
      console.log("Serving specific cocktail from cache");
      return res.json(JSON.parse(cachedData));
    }

    // If not cached, fetch from the Cocktail DB API
    console.log(`Fetching specific cocktail data for ID: ${id}`);
    const startTime = Date.now(); // Start time measurement
    const response = await axios.get(`${singleCocktailUrl}${id}`);
    const drink = response.data.drinks[0];

    // Cache the response in Redis for future requests
    await redisClient.set(id, JSON.stringify(drink), { EX: 3600 }); // Cache for 1 hour
    const endTime = Date.now(); // End time measurement
    const timeTaken = endTime - startTime; // Calculate time taken
    console.log(
      `Data fetched and cached for cocktail ID: ${id} in ${timeTaken} ms`
    );

    return res.json(drink);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching specific cocktail data");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
