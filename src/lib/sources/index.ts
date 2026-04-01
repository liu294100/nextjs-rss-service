import { SourceProcessor } from './types';
import { abcProcessor } from './abc';
import { apProcessor } from './ap';
import { bbcProcessor } from './bbc';
import { bloombergProcessor } from './bloomberg';
import { cctvProcessor } from './cctv';
import { chosunProcessor } from './chosun';
import { cnbcProcessor } from './cnbc';
import { cnnProcessor } from './cnn';
import { foxNewsProcessor } from './foxnews';
import { france24Processor } from './france24';
import { ftProcessor } from './ft';
import { futuProcessor } from './futu';
import { guardianProcessor } from './guardian';
import { japanTimesProcessor } from './japantimes';
import { joongangProcessor } from './joongang';
import { kbsProcessor } from './kbs';
import { nhkProcessor } from './nhk';
import { nprProcessor } from './npr';
import { nytProcessor } from './nyt';
import { reutersProcessor } from './reuters';
import { rthkProcessor } from './rthk';
import { zaobaoProcessor } from './zaobao';

// 注册所有源处理器
const sourceProcessors: Record<string, SourceProcessor> = {
  [abcProcessor.name]: abcProcessor,
  [apProcessor.name]: apProcessor,
  [bbcProcessor.name]: bbcProcessor,
  [bloombergProcessor.name]: bloombergProcessor,
  [cctvProcessor.name]: cctvProcessor,
  [chosunProcessor.name]: chosunProcessor,
  [cnbcProcessor.name]: cnbcProcessor,
  [cnnProcessor.name]: cnnProcessor,
  [foxNewsProcessor.name]: foxNewsProcessor,
  [france24Processor.name]: france24Processor,
  [ftProcessor.name]: ftProcessor,
  [futuProcessor.name]: futuProcessor,
  [guardianProcessor.name]: guardianProcessor,
  [japanTimesProcessor.name]: japanTimesProcessor,
  [joongangProcessor.name]: joongangProcessor,
  [kbsProcessor.name]: kbsProcessor,
  [nhkProcessor.name]: nhkProcessor,
  [nprProcessor.name]: nprProcessor,
  [nytProcessor.name]: nytProcessor,
  [reutersProcessor.name]: reutersProcessor,
  [rthkProcessor.name]: rthkProcessor,
  [zaobaoProcessor.name]: zaobaoProcessor,
};

export const getAllSources = (): SourceProcessor[] => {
  return Object.values(sourceProcessors);
};

export const getSourceByName = (name: string): SourceProcessor | undefined => {
  return sourceProcessors[name];
};
