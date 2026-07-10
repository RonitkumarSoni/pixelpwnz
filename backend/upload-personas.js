import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';
import { connectDB, disconnectDB } from './src/db.js';
import { ingestPairs } from './src/brain/index.js';
import { buildToneProfile } from './src/brain/promptBuilder.js';
import Session from './src/store/Session.js';
import { PREDEFINED_PERSONAS } from './src/brain/personas.js';

async function uploadPersonas() {
  await connectDB();
  console.log('Connected to MongoDB. Uploading custom personas...');

  for (const [id, persona] of Object.entries(PREDEFINED_PERSONAS)) {
    console.log(`Processing persona: ${persona.name}...`);
    
    // We will use the id as the session_id so it is persistent and we don't duplicate
    const sessionId = `custom-persona-${id}`;
    
    // Assign stable random UUIDs to the pairs so Chroma doesn't duplicate if re-run
    const pairs = persona.pairs.map((p, idx) => ({ ...p, id: `pair-${id}-${idx}` }));
    
    const toneProfile = buildToneProfile(pairs);
    
    // Upload vectors to Chroma DB
    await ingestPairs(sessionId, pairs);
    
    // Save/Update in MongoDB
    await Session.findOneAndUpdate(
      { session_id: sessionId },
      {
        session_id: sessionId,
        contact_name: persona.name,
        userName: 'User', // default user name for the persona
        label: `Public Persona: ${persona.name}`,
        pairs,
        toneProfile,
      },
      { upsert: true, new: true }
    );
    
    console.log(`Successfully uploaded ${persona.name} to Chroma DB and MongoDB.`);
  }

  console.log('All personas uploaded successfully!');
  await disconnectDB();
}

uploadPersonas().catch(console.error);
