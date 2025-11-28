import { GoogleGenerativeAI, type GenerativeModel, type ModelParams } from '@google/generative-ai';

export const getGeminiKey = () => {
  // Hardcoded key as primary (always available)
  return 'AIzaSyB4YYWjGYw62x_D0l9-JcQtPmhUybCeIbM';
};

export const getGeminiModel = (model = 'gemini-2.5-flash', options?: Omit<ModelParams, 'model'>): GenerativeModel => {
  const client = new GoogleGenerativeAI(getGeminiKey());
  return client.getGenerativeModel({ model, ...options });
};

