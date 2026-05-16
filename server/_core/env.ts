export const ENV = {
  // OAuth
  ownerOpenId: process.env.OWNER_OPEN_ID || "",
  ownerName: process.env.OWNER_NAME || "",
  
  // JWT
  jwtSecret: process.env.JWT_SECRET || "dev-secret",
  
  // OAuth URLs
  oauthServerUrl: process.env.OAUTH_SERVER_URL || "",
  oauthPortalUrl: process.env.VITE_OAUTH_PORTAL_URL || "",
  
  // App
  appId: process.env.VITE_APP_ID || "",
  
  // Database
  databaseUrl: process.env.DATABASE_URL || "",
  
  // Manus APIs
  builtInForgeApiUrl: process.env.BUILT_IN_FORGE_API_URL || "",
  builtInForgeApiKey: process.env.BUILT_IN_FORGE_API_KEY || "",
  
  // Frontend
  frontendForgeApiUrl: process.env.VITE_FRONTEND_FORGE_API_URL || "",
  frontendForgeApiKey: process.env.VITE_FRONTEND_FORGE_API_KEY || "",
};
