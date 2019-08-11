import fs from 'fs';

const env = process.env.NODE_ENV || 'dev';
const config = JSON.parse(fs.readFileSync(`config/${env}.json`).toString());

export default config;
