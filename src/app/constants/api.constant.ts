export interface CertObject {
  cert: string;
  url: string;
}

export const PREFIX_PATH = './assets/data';
export const PROVIDER_DATA_API = `${PREFIX_PATH}/providers.json`;

export const CERT_API_LIST: CertObject[] = [
  { cert: 'AI-102', url: `${PREFIX_PATH}/azure-ai-102.json` },
  { cert: 'AZ-104', url: `${PREFIX_PATH}/amazon-az-104.json` },
  { cert: 'PA English Part 5', url: `${PREFIX_PATH}/part5.json` },
  { cert: 'PA English Part 7', url: `${PREFIX_PATH}/part7.json` },
];
