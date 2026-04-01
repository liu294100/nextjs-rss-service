import { SourceProcessor } from './types';
import { world8Processor } from './8world';
import { abcProcessor } from './abc';
import { apProcessor } from './ap';
import { asahiProcessor } from './asahi';
import { bbcProcessor } from './bbc';
import { bloombergProcessor } from './bloomberg';
import { cctvProcessor } from './cctv';
import { chinaPressProcessor } from './chinapress';
import { chosunProcessor } from './chosun';
import { cnbcProcessor } from './cnbc';
import { cnnProcessor } from './cnn';
import { eastMoneyProcessor } from './eastmoney';
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
import { sankeiProcessor } from './sankei';
import { sinChewProcessor } from './sinchew';
import { yahooFinanceProcessor } from './yahoo-finance';
import { zaobaoProcessor } from './zaobao';

// 注册所有源处理器
const sourceProcessors: Record<string, SourceProcessor> = {
  [world8Processor.name]: world8Processor,
  [abcProcessor.name]: abcProcessor,
  [apProcessor.name]: apProcessor,
  [asahiProcessor.name]: asahiProcessor,
  [bbcProcessor.name]: bbcProcessor,
  [bloombergProcessor.name]: bloombergProcessor,
  [cctvProcessor.name]: cctvProcessor,
  [chinaPressProcessor.name]: chinaPressProcessor,
  [chosunProcessor.name]: chosunProcessor,
  [cnbcProcessor.name]: cnbcProcessor,
  [cnnProcessor.name]: cnnProcessor,
  [eastMoneyProcessor.name]: eastMoneyProcessor,
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
  [sankeiProcessor.name]: sankeiProcessor,
  [sinChewProcessor.name]: sinChewProcessor,
  [yahooFinanceProcessor.name]: yahooFinanceProcessor,
  [zaobaoProcessor.name]: zaobaoProcessor,
};

export const getAllSources = (): SourceProcessor[] => {
  return Object.values(sourceProcessors);
};

export const getSourceByName = (name: string): SourceProcessor | undefined => {
  return sourceProcessors[name];
};
