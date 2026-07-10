import mongoose from 'mongoose';

const personaSchema = new mongoose.Schema({
  persona_id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: 'Official predefined persona. Ready to chat!',
  },
  category: {
    type: String,
    default: 'Other',
  },
  chat_count: {
    type: Number,
    default: 0,
  },
  likes_count: {
    type: Number,
    default: 0,
  },
  liked_by: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
}, {
  timestamps: true,
});

const Persona = mongoose.model('Persona', personaSchema);
export default Persona;
