export interface AppConfig {
  environment: string;
  apiHost: string;
  aiApiKey: string;
  aiApiGenerate: string;
  docusignClientId: string;
  docusignClientSecret: string;
  docusignRedirectUri: string;
  docusignAuthUrl: string;
  docusignTokenUrl: string;
  docusignNavigatorApi: string;
}

export const Config: AppConfig = {
  environment: process.env.NEXT_PUBLIC_ENVIRONMENT || 'dev',
  apiHost: process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:3010',
  aiApiKey: process.env.NEXT_PUBLIC_AI_API_KEY || '',
  aiApiGenerate: 'https://gaxvwyokzf.execute-api.us-east-1.amazonaws.com/generate-text', // us-east-1
  docusignClientId: process.env.DOCUSIGN_CLIENT_ID || '',
  docusignClientSecret: process.env.DOCUSIGN_CLIENT_SECRET || '',
  docusignRedirectUri: process.env.DOCUSIGN_REDIRECT_URI || '',
  docusignAuthUrl: process.env.DOCUSIGN_AUTH_URL || '',
  docusignTokenUrl: process.env.DOCUSIGN_TOKEN_URL || '',
  docusignNavigatorApi: process.env.DOCUSIGN_NAVIGATOR_API_BASE_URL || 'https://api-d.docusign.com',
};
