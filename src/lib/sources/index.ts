import { SourceProcessor } from './types';
import { cnnProcessor } from './cnn';

// 注册所有源处理器
const sourceProcessors: Record<string, SourceProcessor> = {
  [cnnProcessor.name]: cnnProcessor,
  // 在这里添加更多源，例如:
  // [bbcProcessor.name]: bbcProcessor,
};

export const getAllSources = (): SourceProcessor[] => {
  return Object.values(sourceProcessors);
};

export const getSourceByName = (name: string): SourceProcessor | undefined => {
  return sourceProcessors[name];
};