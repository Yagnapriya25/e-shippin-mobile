// src/config.js
import * as FileSystem from 'expo-file-system';
import { Constants } from 'expo-constants'; // Expo Constants package
import dotenv from 'dotenv';

// Load .env file
dotenv.config({ path: `${FileSystem.documentDirectory}.env` });

const env = {
  API_URL: process.env.API_URL,
  GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
  DEBUG: process.env.DEBUG === 'true' // Convert 'true'/'false' to boolean
};

export default env;
