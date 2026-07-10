export const TIMESTAMP_HEADER = /^\[\d{1,2}\/\d{1,2}\/\d{2,4},\s\d{1,2}:\d{2}:\d{2}\s[AP]M\]/;

export const SENDER_LINE = /^\[\d{1,2}\/\d{1,2}\/\d{2,4},\s\d{1,2}:\d{2}:\d{2}\s[AP]M\]\s([^:]+):\s(.+)/;

export const SYSTEM_MESSAGE = /(Messages and calls are end-to-end encrypted|Media omitted|This message was deleted)/i;

export const EMOJI = /\p{Extended_Pictographic}/gu;
