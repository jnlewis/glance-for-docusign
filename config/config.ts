export interface AppConfig {
  environment: string;
  apiHost: string;
  aiApiStreamingHost: string;
  aiApiKey: string;
  aiApiGenerate: string;
  docusignNavigatorApi: string;
}

export const Config: AppConfig = {
  environment: process.env.NEXT_PUBLIC_ENVIRONMENT || 'dev',
  apiHost: process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:3010',
  aiApiStreamingHost: 'https://voi4u3rc7unzfn562njz6vpyhq0tzphw.lambda-url.us-east-1.on.aws', // us-east-1
  // aiApiStreamingHost: 'https://fuw5657x3tmi2xclkpe7y2hpsi0hxiqr.lambda-url.ap-northeast-1.on.aws', //ap-northeast-1
  aiApiKey: 'mOK2p74t45G2gTYm5kLRvv2q9f9Xp',
  aiApiGenerate: 'https://gaxvwyokzf.execute-api.us-east-1.amazonaws.com/generate-text', // us-east-1
  docusignNavigatorApi: process.env.DOCUSIGN_NAVIGATOR_API_BASE_URL || 'https://api-d.docusign.com',
};
