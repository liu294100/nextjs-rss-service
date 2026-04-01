import { SourceProcessor } from './types';
import { world8Processor } from './singapore/8world';
import { abcProcessor } from './global/abc';
import { apProcessor } from './usa/ap';
import { asahiProcessor } from './japan/asahi';
import { bbcProcessor } from './uk/bbc';
import { bloombergProcessor } from './usa/bloomberg';
import { cctvProcessor } from './china/cctv';
import { chinaPressProcessor } from './malaysia/chinapress';
import { chosunProcessor } from './korea/chosun';
import { cnbcProcessor } from './usa/cnbc';
import { cnnProcessor } from './usa/cnn';
import { eastMoneyProcessor } from './china/eastmoney';
import { foxNewsProcessor } from './usa/foxnews';
import { france24Processor } from './france/france24';
import { ftProcessor } from './uk/ft';
import { futuProcessor } from './hongkong/futu';
import { guardianProcessor } from './uk/guardian';
import { japanTimesProcessor } from './japan/japantimes';
import { joongangProcessor } from './korea/joongang';
import { kbsProcessor } from './korea/kbs';
import { nhkProcessor } from './japan/nhk';
import { nprProcessor } from './usa/npr';
import { nytProcessor } from './usa/nyt';
import { reutersProcessor } from './uk/reuters';
import { rthkProcessor } from './hongkong/rthk';
import { sankeiProcessor } from './japan/sankei';
import { sinChewProcessor } from './malaysia/sinchew';
import { yahooFinanceProcessor } from './usa/yahoo-finance';
import { zaobaoProcessor } from './singapore/zaobao';

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
