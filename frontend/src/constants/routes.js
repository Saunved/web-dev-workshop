export const BASE_URL = process.env.USE_CODESPACE == 'yes' ? `https://${process.env.CODESPACE_NAME}-5000.preview.app.github.dev` : "http://localhost:9800";

export const loginRoute = `${BASE_URL}/login`;
export const registerRoute = `${BASE_URL}/user`;
export const tweetRoute = `${BASE_URL}/tweet`;
