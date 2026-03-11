export type RiskLevel = '低风险' | '中低风险' | '中风险' | '中高风险' | '高风险';

export interface InvestmentAsset {
  id: string;
  assetClass: string;
  amount: number;
  proportion: number;
  returnRate: number;
  riskLevel: RiskLevel;
  benchmark: string;
  benchmarkRate: number;
  excessReturn: number;
  detail: string;
}

export interface InvestmentSummary {
  totalAmount: number;
  weightedReturnRate: number;
  benchmarkReturnRate: number;
  reportDate: string;
}

export const investmentSummary: InvestmentSummary = {
  totalAmount: 60_800_000_000,
  weightedReturnRate: 0.0438,
  benchmarkReturnRate: 0.0380,
  reportDate: '2025-09-30',
};

export const investmentPortfolio: InvestmentAsset[] = [
  {
    id: 'INV-001',
    assetClass: '国债',
    amount: 15_200_000_000,
    proportion: 0.25,
    returnRate: 0.032,
    riskLevel: '低风险',
    benchmark: '中债国债总指数',
    benchmarkRate: 0.030,
    excessReturn: 0.002,
    detail: '持有1-10年期国债，久期4.5年。以持有至到期策略为主，票面利率2.8%-3.5%。包括2025年新发行的30年期超长期特别国债配置5亿元。',
  },
  {
    id: 'INV-002',
    assetClass: '政策性金融债',
    amount: 12_160_000_000,
    proportion: 0.20,
    returnRate: 0.038,
    riskLevel: '低风险',
    benchmark: '中债政策性金融债指数',
    benchmarkRate: 0.035,
    excessReturn: 0.003,
    detail: '国开债、农发债为主，久期3-7年。免税优势显著，实际税后收益率优于同期限国债。农发债占比45%，契合公司农业再保险定位。',
  },
  {
    id: 'INV-003',
    assetClass: '企业债及公司债',
    amount: 7_296_000_000,
    proportion: 0.12,
    returnRate: 0.048,
    riskLevel: '中低风险',
    benchmark: '中债企业债AAA指数',
    benchmarkRate: 0.042,
    excessReturn: 0.006,
    detail: '全部为AAA及AA+级别，行业以电力、交通基建为主。单一发行人集中度不超过5%。含绿色债券配置12亿元。',
  },
  {
    id: 'INV-004',
    assetClass: '银行存款',
    amount: 9_120_000_000,
    proportion: 0.15,
    returnRate: 0.028,
    riskLevel: '低风险',
    benchmark: '一年期定期存款基准利率',
    benchmarkRate: 0.025,
    excessReturn: 0.003,
    detail: '协议存款及大额存单为主，分散存放于工商银行、建设银行、农业银行、中国银行等国有大行。平均存期1.2年。',
  },
  {
    id: 'INV-005',
    assetClass: '股票',
    amount: 6_080_000_000,
    proportion: 0.10,
    returnRate: 0.082,
    riskLevel: '中高风险',
    benchmark: '沪深300指数',
    benchmarkRate: 0.065,
    excessReturn: 0.017,
    detail: '蓝筹股为主，重仓金融、农业、新能源板块。前五大重仓：中国平安、招商银行、北大荒、隆基绿能、牧原股份。仓位控制在权益类上限以内。',
  },
  {
    id: 'INV-006',
    assetClass: '基金',
    amount: 4_864_000_000,
    proportion: 0.08,
    returnRate: 0.056,
    riskLevel: '中风险',
    benchmark: '偏股混合基金指数',
    benchmarkRate: 0.048,
    excessReturn: 0.008,
    detail: '含债券型基金30亿元（占比62%）、混合型基金15亿元、货币基金3.64亿元。委托管理人包括易方达、南方、华夏等头部基金公司。',
  },
  {
    id: 'INV-007',
    assetClass: '不动产',
    amount: 6_080_000_000,
    proportion: 0.10,
    returnRate: 0.052,
    riskLevel: '中风险',
    benchmark: '保险资金不动产投资平均收益率',
    benchmarkRate: 0.045,
    excessReturn: 0.007,
    detail: '含北京金融街办公楼自用物业15亿元、上海陆家嘴商业地产投资25亿元、基础设施债权计划20.8亿元（交通、水利项目）。',
  },
];
