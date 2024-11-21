import sqlite3 from 'sqlite3';

// Initialize SQLite match database
const db = new sqlite3.Database('./lol_data.db');

export const initializeDatabase = () => {
  // Create players table
  db.exec(`
    CREATE TABLE IF NOT EXISTS players (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      game_name TEXT NOT NULL,
      tag_line TEXT NOT NULL,
      profile_icon_id INTEGER,
      puuid TEXT UNIQUE NOT NULL,
      last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  
  /*
  // Create matches table
  db.exec(`
    CREATE TABLE IF NOT EXISTS matches (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      match_id TEXT UNIQUE NOT NULL,
      puuid TEXT NOT NULL,
      game_mode TEXT,
      champion_name TEXT,
      kills INTEGER,
      deaths INTEGER,
      assists INTEGER,
      match_duration INTEGER,
      timestamp TIMESTAMP NOT NULL,
      FOREIGN KEY (puuid) REFERENCES players (puuid)
    );
  `);
  */

  console.log('Database tables initialized!');
};

/*
id INTEGER PRIMARY KEY AUTOINCREMENT,
game_name TEXT NOT NULL,
tag_line TEXT NOT NULL,
profile_icon_id INTEGER,
puuid TEXT UNIQUE NOT NULL,
*/

export const addPlayer = (playerData: {
  game_name: string;
  tag_line: string;
  profile_icon_id: number;
  puuid: string;
 
}) => {
  const stmt = db.prepare(`
    INSERT OR IGNORE INTO players (game_name, tag_line, profile_icon_id, puuid)
    VALUES (?, ?, ?, ?)
  `);

  stmt.run(
    playerData.game_name,
    playerData.tag_line,
    playerData.profile_icon_id,
    playerData.puuid, 
  );

  console.log('Player added or already exists:', playerData.game_name, ' #', playerData.tag_line);
};