import express from 'express';
import { initializeDatabase, addPlayer } from './database';
import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();
const apiKey = process.env.RIOT_API_KEY;

const app = express();
const PORT = 5001;

// Middleware
app.use(express.json());

// Set up database
initializeDatabase();

// Test Route
app.get('/api', (req, res) => {
  res.send('Backend is running!');
});

// Testing connection to the backend
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Testing summoner name
app.get('/api/summoner', async (req, res) => {

  if (!apiKey) {
    throw new Error('API key is not set in the environment variables');
  }

  const playerId = req.query.playerId;

  if (!playerId) {
    throw new Error('Player ID not valid');
  }

  //console.log(playerId.toString());
  const gameName = playerId.toString().replace('-', '/');
  
  if (!apiKey) {
    throw new Error('API key is not set in the environment variables');
  }
  
  // make API call to RIOT, looking for PUUID and other info
  try {
    const accountInfo = await axios.get(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}?api_key=${apiKey}`, {
      headers: {
        'X-Riot-Token': apiKey,
      },
    });

    const puuid = accountInfo.data.puuid

    if (!puuid) {
      throw new Error('PUUID is not valid');
    }

    // Instead of sending puuid, gameName, and tagLine back, we now search for more information from riot
    const summonerDTO = await axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${apiKey}`, {
      headers: {
        'X-Riot-Token': apiKey,
      },
    });

    if (!summonerDTO) {
      throw new Error('SummonerDTO was not successfully retrieved');
    }

    //before we send back, look at players database and populate it if the player does not currently exist
    

    //adds player info to database
    addPlayer({
      game_name: accountInfo.data.gameName,
      tag_line: accountInfo.data.tagLine,
      profile_icon_id: summonerDTO.data.profileIconId,
      puuid: summonerDTO.data.puuid,
    });

    // returns both account info and summonerDTO
    res.status(200).json({
      account: accountInfo.data,
      summoner: summonerDTO.data,
    });

  } catch (error) {
    res.status(500).send('Error fetching player data');
  }

});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});