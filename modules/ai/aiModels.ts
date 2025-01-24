export interface ModelInfo {
  service: ModelServices;
  provider: string;
  modelName: string;
  modelId: ModelIds;
}

export enum ModelServices {
  AWSBedrock = 'AWS Bedrock',
}

export enum ModelIds {
  AMAZON_TITAN_TEXT_LITE_V1 = 'amazon.titan-text-lite-v1',
  AMAZON_TITAN_TEXT_EXPRESS_V1 = 'amazon.titan-text-express-v1',
  AMAZON_NOVA_PRO_V1 = 'amazon.nova-pro-v1:0',
  AMAZON_NOVA_LITE_V1 = 'amazon.nova-lite-v1:0',
  AMAZON_NOVA_MICRO_V1 = 'amazon.nova-micro-v1:0',
  ANTHROPIC_CLAUDE_3_SONNET = 'anthropic.claude-3-sonnet-20240229-v1:0',
  ANTHROPIC_CLAUDE_3_5_SONNET = 'anthropic.claude-3-5-sonnet-20241022-v2:0',
  ANTHROPIC_CLAUDE_3_HAIKU = 'anthropic.claude-3-haiku-20240307-v1:0',
  ANTHROPIC_CLAUDE_3_5_HAIKU = 'anthropic.claude-3-5-haiku-20241022-v1:0',
  COHERE_COMMAND_TEXT_V14 = 'cohere.command-text-v14',
  COHERE_COMMAND_LIGHT_TEXT_V14 = 'cohere.command-light-text-v14',
  META_LLAMA3_1_8B_INSTRUCT_V1 = 'meta.llama3-1-8b-instruct-v1:0',
  META_LLAMA3_1_70B_INSTRUCT_V1 = 'meta.llama3-1-70b-instruct-v1:0',
  META_LLAMA3_3_70B_INSTRUCT_V1 = 'meta.llama3-3-70b-instruct-v1:0',
  MISTRAL_MISTRAL_7B_INSTRUCT_V0_2 = 'mistral.mistral-7b-instruct-v0:2',
  MISTRAL_MIXTRAL_8X7B_INSTRUCT_V0_1 = 'mistral.mixtral-8x7b-instruct-v0:1',
}

export const MODELS: ModelInfo[] = [
  {
    service: ModelServices.AWSBedrock,
    provider: 'Amazon',
    modelName: 'Titan Text G1 - Lite',
    modelId: ModelIds.AMAZON_TITAN_TEXT_LITE_V1,
  },
  {
    service: ModelServices.AWSBedrock,
    provider: 'Amazon',
    modelName: 'Titan Text G1 - Express',
    modelId: ModelIds.AMAZON_TITAN_TEXT_EXPRESS_V1,
  },
  {
    service: ModelServices.AWSBedrock,
    provider: 'Anthropic',
    modelName: 'Claude 3 Sonnet',
    modelId: ModelIds.ANTHROPIC_CLAUDE_3_SONNET,
  },
  // {
  //   service: ModelServices.AWSBedrock,
  //   provider: 'Anthropic',
  //   modelName: 'Claude 3.5 Sonnet',
  //   modelId: ModelIds.ANTHROPIC_CLAUDE_3_5_SONNET,
  // },
  {
    service: ModelServices.AWSBedrock,
    provider: 'Anthropic',
    modelName: 'Claude 3 Haiku',
    modelId: ModelIds.ANTHROPIC_CLAUDE_3_HAIKU,
  },
  // {
  //   service: ModelServices.AWSBedrock,
  //   provider: 'Anthropic',
  //   modelName: 'Claude 3.5 Haiku',
  //   modelId: ModelIds.ANTHROPIC_CLAUDE_3_5_HAIKU,
  // },
  {
    service: ModelServices.AWSBedrock,
    provider: 'Cohere',
    modelName: 'Command',
    modelId: ModelIds.COHERE_COMMAND_TEXT_V14,
  },
  {
    service: ModelServices.AWSBedrock,
    provider: 'Cohere',
    modelName: 'Command Light',
    modelId: ModelIds.COHERE_COMMAND_LIGHT_TEXT_V14,
  },
  {
    service: ModelServices.AWSBedrock,
    provider: 'Meta',
    modelName: 'Llama 3.1 Instruct 8B',
    modelId: ModelIds.META_LLAMA3_1_8B_INSTRUCT_V1,
  },
  {
    service: ModelServices.AWSBedrock,
    provider: 'Meta',
    modelName: 'Llama 3.1 Instruct 70B',
    modelId: ModelIds.META_LLAMA3_1_70B_INSTRUCT_V1,
  },
  {
    service: ModelServices.AWSBedrock,
    provider: 'Meta',
    modelName: 'Llama 3.3 Instruct 70B',
    modelId: ModelIds.META_LLAMA3_3_70B_INSTRUCT_V1,
  },
  {
    service: ModelServices.AWSBedrock,
    provider: 'Mistral AI',
    modelName: 'Mistral 7B Instruct',
    modelId: ModelIds.MISTRAL_MISTRAL_7B_INSTRUCT_V0_2,
  },
  {
    service: ModelServices.AWSBedrock,
    provider: 'Mistral AI',
    modelName: 'Mixtral 8x7B Instruct',
    modelId: ModelIds.MISTRAL_MIXTRAL_8X7B_INSTRUCT_V0_1,
  },
];

export const getModelInfoByModelId = (modelId: string): ModelInfo | undefined =>
  MODELS.find((model) => model.modelId === modelId);
