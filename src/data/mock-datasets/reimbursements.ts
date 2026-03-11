export type ReimbursementType = '差旅' | '办公' | '招待' | '培训';
export type RiskFlagSeverity = 'low' | 'medium' | 'high';
export type AIReviewResult = 'pass' | 'review' | 'reject';

export interface RiskFlag {
  type: string;
  description: string;
  severity: RiskFlagSeverity;
  evidence: string;
}

export interface ReimbursementItem {
  description: string;
  amount: number;
  category: string;
  receipt: boolean;
}

export interface Reimbursement {
  id: string;
  applicant: string;
  department: string;
  type: ReimbursementType;
  amount: number;
  submitDate: string;
  items: ReimbursementItem[];
  riskScore: number;
  riskFlags: RiskFlag[];
  aiReviewResult: AIReviewResult;
  aiReviewComment: string;
}

export const reimbursements: Reimbursement[] = [
  // ========== 正常报销记录 ==========
  {
    id: 'RB-2025-001',
    applicant: '张明远',
    department: '承保部',
    type: '差旅',
    amount: 4_850,
    submitDate: '2025-01-15',
    items: [
      { description: '北京-郑州高铁二等座', amount: 590, category: '交通', receipt: true },
      { description: '如家酒店2晚', amount: 560, category: '住宿', receipt: true },
      { description: '出差餐费补贴3天', amount: 300, category: '餐饮', receipt: false },
      { description: '市内交通（网约车）', amount: 200, category: '交通', receipt: true },
      { description: '河南省农险现场查勘交通费', amount: 3_200, category: '交通', receipt: true },
    ],
    riskScore: 15,
    riskFlags: [],
    aiReviewResult: 'pass',
    aiReviewComment: '费用合理，票据齐全，符合差旅报销标准。',
  },
  {
    id: 'RB-2025-002',
    applicant: '王丽华',
    department: '精算部',
    type: '办公',
    amount: 2_380,
    submitDate: '2025-01-20',
    items: [
      { description: '精算软件年度授权费（分摊）', amount: 1_500, category: '软件', receipt: true },
      { description: '专业图书采购', amount: 580, category: '图书', receipt: true },
      { description: '打印耗材', amount: 300, category: '办公用品', receipt: true },
    ],
    riskScore: 8,
    riskFlags: [],
    aiReviewResult: 'pass',
    aiReviewComment: '办公用品采购合规，金额在部门预算范围内。',
  },
  {
    id: 'RB-2025-003',
    applicant: '陈志强',
    department: '理赔部',
    type: '差旅',
    amount: 6_200,
    submitDate: '2025-02-05',
    items: [
      { description: '北京-哈尔滨机票（经济舱）', amount: 1_580, category: '交通', receipt: true },
      { description: '全季酒店3晚', amount: 1_020, category: '住宿', receipt: true },
      { description: '出差餐费补贴4天', amount: 400, category: '餐饮', receipt: false },
      { description: '黑龙江省洪灾现场查勘用车', amount: 3_200, category: '交通', receipt: true },
    ],
    riskScore: 12,
    riskFlags: [],
    aiReviewResult: 'pass',
    aiReviewComment: '理赔查勘差旅，费用标准合规，已关联案件号CLM-2025-008。',
  },
  {
    id: 'RB-2025-004',
    applicant: '刘雪梅',
    department: '人力部',
    type: '培训',
    amount: 3_600,
    submitDate: '2025-02-18',
    items: [
      { description: '新员工入职培训场地费', amount: 2_000, category: '场地', receipt: true },
      { description: '培训材料印刷', amount: 800, category: '物料', receipt: true },
      { description: '培训午餐（30人）', amount: 800, category: '餐饮', receipt: true },
    ],
    riskScore: 10,
    riskFlags: [],
    aiReviewResult: 'pass',
    aiReviewComment: '新员工培训费用合理，人均餐标未超标。',
  },
  {
    id: 'RB-2025-005',
    applicant: '赵国庆',
    department: '投资部',
    type: '招待',
    amount: 1_880,
    submitDate: '2025-02-25',
    items: [
      { description: '客户工作午餐（4人）', amount: 680, category: '餐饮', receipt: true },
      { description: '会议室茶歇', amount: 200, category: '餐饮', receipt: true },
      { description: '客户伴手礼', amount: 1_000, category: '礼品', receipt: true },
    ],
    riskScore: 22,
    riskFlags: [],
    aiReviewResult: 'pass',
    aiReviewComment: '商务招待费用适当，人均餐标170元在标准范围内。',
  },

  // ========== 高风险报销记录（riskScore > 70）==========

  // 风险1: 五星级酒店关键词
  {
    id: 'RB-2025-006',
    applicant: '孙伟东',
    department: '市场部',
    type: '差旅',
    amount: 18_600,
    submitDate: '2025-03-10',
    items: [
      { description: '北京-上海高铁商务座', amount: 1_748, category: '交通', receipt: true },
      { description: '上海外滩五星级酒店豪华房3晚', amount: 8_400, category: '住宿', receipt: true },
      { description: '商务宴请（6人）', amount: 4_200, category: '餐饮', receipt: true },
      { description: '市内专车接送', amount: 2_400, category: '交通', receipt: true },
      { description: '出差餐费补贴4天', amount: 400, category: '餐饮', receipt: false },
      { description: '商务礼品', amount: 1_452, category: '礼品', receipt: true },
    ],
    riskScore: 82,
    riskFlags: [
      {
        type: 'accommodation_excess',
        description: '住宿标准超标：五星级酒店单价¥2,800/晚，超出公司差旅标准（¥800/晚）250%',
        severity: 'high',
        evidence: '发票显示：上海外滩五星级酒店豪华房，单价¥2,800×3晚=¥8,400',
      },
      {
        type: 'transport_excess',
        description: '高铁选择商务座而非二等座',
        severity: 'medium',
        evidence: '商务座票价¥1,748，同程二等座票价¥553',
      },
    ],
    aiReviewResult: 'reject',
    aiReviewComment: 'AI审核不通过：住宿选择五星级酒店严重超标，高铁座位等级不合规。建议退回修改，按标准报销差额部分由个人承担。',
  },

  // 风险2: 景区关键词
  {
    id: 'RB-2025-007',
    applicant: '周建国',
    department: '综合部',
    type: '差旅',
    amount: 12_800,
    submitDate: '2025-04-08',
    items: [
      { description: '北京-成都机票（经济舱）', amount: 1_680, category: '交通', receipt: true },
      { description: '九寨沟景区附近酒店4晚', amount: 3_200, category: '住宿', receipt: true },
      { description: '九寨沟景区门票', amount: 250, category: '其他', receipt: true },
      { description: '景区观光车', amount: 90, category: '交通', receipt: true },
      { description: '租车费用（4天）', amount: 2_800, category: '交通', receipt: true },
      { description: '出差餐费补贴5天', amount: 500, category: '餐饮', receipt: false },
      { description: '四川分保业务对接资料费', amount: 4_280, category: '其他', receipt: true },
    ],
    riskScore: 78,
    riskFlags: [
      {
        type: 'destination_anomaly',
        description: '出差目的地为旅游景区（九寨沟景区），与业务关联性存疑',
        severity: 'high',
        evidence: '住宿地址：九寨沟景区附近酒店；报销含景区门票¥250及景区观光车¥90',
      },
      {
        type: 'purpose_unclear',
        description: '出差事由"四川分保业务对接"与景区目的地不符',
        severity: 'medium',
        evidence: '四川省分保业务合作公司注册地在成都市区，九寨沟距成都约450公里',
      },
    ],
    aiReviewResult: 'reject',
    aiReviewComment: 'AI审核不通过：出差目的地为著名旅游景区，行程包含景区门票和观光车费用，疑似借公务出差之名进行旅游。需补充说明业务必要性。',
  },

  // 风险3: 单次餐费过高
  {
    id: 'RB-2025-008',
    applicant: '李建军',
    department: '市场部',
    type: '招待',
    amount: 8_500,
    submitDate: '2025-04-22',
    items: [
      { description: '客户答谢晚宴（8人）——含高端海鲜及酒水', amount: 3_200, category: '餐饮', receipt: true },
      { description: '商务午餐（4人）', amount: 880, category: '餐饮', receipt: true },
      { description: '茅台酒2瓶', amount: 3_600, category: '酒水', receipt: true },
      { description: '会议茶点', amount: 220, category: '餐饮', receipt: true },
      { description: '客户接送交通费', amount: 600, category: '交通', receipt: true },
    ],
    riskScore: 85,
    riskFlags: [
      {
        type: 'meal_excess',
        description: '单次餐费¥3,200（8人），人均¥400，超出公司招待餐标（人均¥200）100%',
        severity: 'high',
        evidence: '发票：某高端海鲜餐厅，消费¥3,200，就餐人数8人，人均¥400',
      },
      {
        type: 'alcohol_excess',
        description: '酒水费用¥3,600（茅台酒2瓶），超出招待酒水标准',
        severity: 'high',
        evidence: '茅台酒2瓶共¥3,600，公司规定招待用酒单价不超过¥500/瓶',
      },
    ],
    aiReviewResult: 'reject',
    aiReviewComment: 'AI审核不通过：单次招待餐费人均超标100%，茅台酒单价超出公司招待用酒标准。建议：1）餐费按标准报销¥1,600；2）酒水按标准报销¥1,000，差额个人承担。',
  },

  // 风险4: 频率异常
  {
    id: 'RB-2025-009',
    applicant: '吴志远',
    department: '承保部',
    type: '差旅',
    amount: 22_400,
    submitDate: '2025-05-28',
    items: [
      { description: '5月2日-4日 郑州出差（高铁+酒店）', amount: 3_200, category: '差旅', receipt: true },
      { description: '5月8日-10日 济南出差（高铁+酒店）', amount: 3_800, category: '差旅', receipt: true },
      { description: '5月13日-15日 合肥出差（高铁+酒店）', amount: 3_400, category: '差旅', receipt: true },
      { description: '5月19日-22日 长沙出差（机票+酒店）', amount: 5_600, category: '差旅', receipt: true },
      { description: '5月26日-28日 南京出差（高铁+酒店）', amount: 3_200, category: '差旅', receipt: true },
      { description: '各次出差市内交通合计', amount: 1_800, category: '交通', receipt: true },
      { description: '出差餐费补贴合计14天', amount: 1_400, category: '餐饮', receipt: false },
    ],
    riskScore: 75,
    riskFlags: [
      {
        type: 'frequency_anomaly',
        description: '当月出差频次异常：5月份出差5次，累计14天，显著高于部门月均1.5次',
        severity: 'high',
        evidence: '5月出差记录：5/2郑州、5/8济南、5/13合肥、5/19长沙、5/26南京，月内5次出差',
      },
      {
        type: 'pattern_anomaly',
        description: '出差城市分散，无明确业务线关联',
        severity: 'medium',
        evidence: '5个城市分布4省，承保部当月无跨省项目排期记录',
      },
    ],
    aiReviewResult: 'review',
    aiReviewComment: 'AI审核需人工复核：当月出差频率异常偏高（5次/月），远超部门平均水平。各次出差城市分散，建议核实各行程的业务必要性及审批记录。',
  },

  // 风险5: 金额异常
  {
    id: 'RB-2025-010',
    applicant: '马晓峰',
    department: '风控部',
    type: '差旅',
    amount: 28_500,
    submitDate: '2025-06-15',
    items: [
      { description: '北京-乌鲁木齐往返机票（经济舱）', amount: 4_200, category: '交通', receipt: true },
      { description: '乌鲁木齐某酒店7晚', amount: 5_600, category: '住宿', receipt: true },
      { description: '新疆棉花险项目调研租车费', amount: 8_500, category: '交通', receipt: true },
      { description: '调研物资及设备采购', amount: 6_800, category: '物资', receipt: true },
      { description: '出差餐费补贴8天', amount: 800, category: '餐饮', receipt: false },
      { description: '当地向导及翻译费用', amount: 2_600, category: '服务费', receipt: true },
    ],
    riskScore: 73,
    riskFlags: [
      {
        type: 'amount_anomaly',
        description: '单次出差总额¥28,500，超出公司单次差旅费用上限（¥15,000）90%',
        severity: 'high',
        evidence: '单次差旅总金额¥28,500，公司规定单次出差费用超过¥15,000需副总裁审批',
      },
      {
        type: 'item_anomaly',
        description: '调研物资及设备采购¥6,800应走固定资产/物资采购流程',
        severity: 'medium',
        evidence: '差旅报销中包含"调研物资及设备采购"¥6,800，非差旅常规支出项目',
      },
    ],
    aiReviewResult: 'review',
    aiReviewComment: 'AI审核需人工复核：单次差旅金额异常偏高，超出审批权限。其中设备采购项¥6,800应走独立采购流程。建议拆分报销，设备部分转入固定资产采购审批。',
  },

  // ========== 其他正常报销记录 ==========

  {
    id: 'RB-2025-011',
    applicant: '韩雪',
    department: '财务部',
    type: '培训',
    amount: 5_800,
    submitDate: '2025-03-05',
    items: [
      { description: 'IFRS17准则培训课程报名费', amount: 3_800, category: '培训费', receipt: true },
      { description: '培训教材', amount: 600, category: '图书', receipt: true },
      { description: '培训期间交通及餐费', amount: 1_400, category: '差旅', receipt: true },
    ],
    riskScore: 5,
    riskFlags: [],
    aiReviewResult: 'pass',
    aiReviewComment: '专业培训费用，在年度培训预算内，票据齐全。',
  },
  {
    id: 'RB-2025-012',
    applicant: '林志伟',
    department: 'IT部',
    type: '办公',
    amount: 15_200,
    submitDate: '2025-03-18',
    items: [
      { description: '服务器硬盘扩容（2TB×4）', amount: 8_800, category: '硬件', receipt: true },
      { description: '网络安全扫描工具授权', amount: 4_200, category: '软件', receipt: true },
      { description: '数据线及转接头等配件', amount: 2_200, category: '配件', receipt: true },
    ],
    riskScore: 18,
    riskFlags: [],
    aiReviewResult: 'pass',
    aiReviewComment: 'IT设备采购在审批预算内，已关联采购申请单IT-PO-2025-012。',
  },
  {
    id: 'RB-2025-013',
    applicant: '杨芳',
    department: '精算部',
    type: '差旅',
    amount: 3_600,
    submitDate: '2025-04-02',
    items: [
      { description: '北京-天津城际高铁往返', amount: 110, category: '交通', receipt: true },
      { description: '天津分公司对接住宿1晚', amount: 450, category: '住宿', receipt: true },
      { description: '市内交通', amount: 140, category: '交通', receipt: true },
      { description: '精算数据现场核验工时补贴', amount: 2_900, category: '补贴', receipt: false },
    ],
    riskScore: 28,
    riskFlags: [],
    aiReviewResult: 'pass',
    aiReviewComment: '精算部业务出差，费用合理。工时补贴金额偏高但在审批范围内。',
  },
  {
    id: 'RB-2025-014',
    applicant: '黄强',
    department: '理赔部',
    type: '差旅',
    amount: 7_800,
    submitDate: '2025-05-10',
    items: [
      { description: '北京-武汉高铁二等座往返', amount: 1_040, category: '交通', receipt: true },
      { description: '汉庭酒店4晚', amount: 1_160, category: '住宿', receipt: true },
      { description: '湖北省暴雨灾害现场查勘交通', amount: 3_800, category: '交通', receipt: true },
      { description: '出差餐费补贴5天', amount: 500, category: '餐饮', receipt: false },
      { description: '查勘防护装备（雨具等）', amount: 1_300, category: '物资', receipt: true },
    ],
    riskScore: 20,
    riskFlags: [],
    aiReviewResult: 'pass',
    aiReviewComment: '灾害理赔查勘出差，费用合理，已关联灾害事件ER-2025-HB-001。',
  },
  {
    id: 'RB-2025-015',
    applicant: '徐晓明',
    department: '投资部',
    type: '招待',
    amount: 2_400,
    submitDate: '2025-05-20',
    items: [
      { description: '基金公司路演招待午餐（6人）', amount: 1_200, category: '餐饮', receipt: true },
      { description: '会议室使用及茶歇', amount: 600, category: '会务', receipt: true },
      { description: '投资分析报告打印装订', amount: 600, category: '物料', receipt: true },
    ],
    riskScore: 15,
    riskFlags: [],
    aiReviewResult: 'pass',
    aiReviewComment: '投资业务招待，人均餐标¥200合规，已关联投资项目INV-2025-018。',
  },
  {
    id: 'RB-2025-016',
    applicant: '郑海燕',
    department: '综合部',
    type: '办公',
    amount: 4_500,
    submitDate: '2025-06-01',
    items: [
      { description: '会议室翻新（窗帘更换）', amount: 2_800, category: '维修', receipt: true },
      { description: '绿植租赁季度费', amount: 1_200, category: '租赁', receipt: true },
      { description: '饮水机滤芯更换', amount: 500, category: '维护', receipt: true },
    ],
    riskScore: 12,
    riskFlags: [],
    aiReviewResult: 'pass',
    aiReviewComment: '行政办公日常维护费用，在部门季度预算内。',
  },
  {
    id: 'RB-2025-017',
    applicant: '曹文斌',
    department: '风控部',
    type: '培训',
    amount: 8_200,
    submitDate: '2025-06-12',
    items: [
      { description: '银保监会合规培训报名费', amount: 5_000, category: '培训费', receipt: true },
      { description: '培训往返交通（北京-深圳）', amount: 2_400, category: '交通', receipt: true },
      { description: '培训期间住宿', amount: 800, category: '住宿', receipt: true },
    ],
    riskScore: 8,
    riskFlags: [],
    aiReviewResult: 'pass',
    aiReviewComment: '监管合规培训，属于必要性培训支出，费用合理。',
  },
  {
    id: 'RB-2025-018',
    applicant: '蒋明月',
    department: '承保部',
    type: '差旅',
    amount: 5_100,
    submitDate: '2025-06-25',
    items: [
      { description: '北京-长春高铁二等座往返', amount: 1_060, category: '交通', receipt: true },
      { description: '锦江之星酒店3晚', amount: 840, category: '住宿', receipt: true },
      { description: '吉林省水稻种植险续保实地调研', amount: 2_400, category: '交通', receipt: true },
      { description: '出差餐费补贴4天', amount: 400, category: '餐饮', receipt: false },
      { description: '调研材料复印', amount: 400, category: '办公', receipt: true },
    ],
    riskScore: 10,
    riskFlags: [],
    aiReviewResult: 'pass',
    aiReviewComment: '承保业务续保调研差旅，费用标准合规，票据完整。',
  },
  {
    id: 'RB-2025-019',
    applicant: '沈伟',
    department: '财务部',
    type: '办公',
    amount: 1_200,
    submitDate: '2025-07-05',
    items: [
      { description: '财务报表装订（Q2）', amount: 400, category: '印刷', receipt: true },
      { description: '审计底稿文件夹及标签', amount: 300, category: '办公用品', receipt: true },
      { description: '快递费（寄送分支机构报表）', amount: 500, category: '快递', receipt: true },
    ],
    riskScore: 3,
    riskFlags: [],
    aiReviewResult: 'pass',
    aiReviewComment: '日常办公费用，金额较小，票据齐全。',
  },
  {
    id: 'RB-2025-020',
    applicant: '钱晓芳',
    department: '人力部',
    type: '招待',
    amount: 3_200,
    submitDate: '2025-07-15',
    items: [
      { description: '校园招聘宣讲会场地费', amount: 1_500, category: '场地', receipt: true },
      { description: '招聘宣传材料印刷', amount: 700, category: '物料', receipt: true },
      { description: '面试候选人午餐（10人）', amount: 1_000, category: '餐饮', receipt: true },
    ],
    riskScore: 10,
    riskFlags: [],
    aiReviewResult: 'pass',
    aiReviewComment: '校园招聘活动费用，在年度招聘预算范围内。',
  },
  {
    id: 'RB-2025-021',
    applicant: '陆天宇',
    department: 'IT部',
    type: '差旅',
    amount: 4_300,
    submitDate: '2025-07-22',
    items: [
      { description: '北京-上海高铁二等座往返', amount: 1_106, category: '交通', receipt: true },
      { description: '上海分公司附近酒店2晚', amount: 900, category: '住宿', receipt: true },
      { description: '上海分公司系统部署现场支持', amount: 1_600, category: '交通', receipt: true },
      { description: '出差餐费补贴3天', amount: 300, category: '餐饮', receipt: false },
      { description: '临时采购网线及工具', amount: 394, category: '物资', receipt: true },
    ],
    riskScore: 14,
    riskFlags: [],
    aiReviewResult: 'pass',
    aiReviewComment: 'IT运维出差，费用合理，已关联工单IT-WO-2025-089。',
  },
  {
    id: 'RB-2025-022',
    applicant: '田静',
    department: '精算部',
    type: '培训',
    amount: 6_500,
    submitDate: '2025-08-05',
    items: [
      { description: '中国精算师协会年会注册费', amount: 3_000, category: '会议费', receipt: true },
      { description: '会议期间交通住宿', amount: 2_500, category: '差旅', receipt: true },
      { description: '学术期刊订阅费', amount: 1_000, category: '订阅', receipt: true },
    ],
    riskScore: 6,
    riskFlags: [],
    aiReviewResult: 'pass',
    aiReviewComment: '专业协会年会参会费用，属于行业必要学术活动。',
  },
  {
    id: 'RB-2025-023',
    applicant: '何军',
    department: '理赔部',
    type: '招待',
    amount: 1_500,
    submitDate: '2025-08-18',
    items: [
      { description: '地方农业局工作对接午餐（4人）', amount: 800, category: '餐饮', receipt: true },
      { description: '会议茶水', amount: 100, category: '餐饮', receipt: true },
      { description: '地方特产慰问品', amount: 600, category: '礼品', receipt: true },
    ],
    riskScore: 18,
    riskFlags: [],
    aiReviewResult: 'pass',
    aiReviewComment: '与地方农业主管部门工作对接招待，金额合理。',
  },
  {
    id: 'RB-2025-024',
    applicant: '邓丽萍',
    department: '市场部',
    type: '差旅',
    amount: 5_600,
    submitDate: '2025-09-02',
    items: [
      { description: '北京-广州机票（经济舱）', amount: 1_480, category: '交通', receipt: true },
      { description: '维也纳酒店3晚', amount: 1_320, category: '住宿', receipt: true },
      { description: '广东省农险推介会参会', amount: 1_800, category: '会务', receipt: true },
      { description: '出差餐费补贴4天', amount: 400, category: '餐饮', receipt: false },
      { description: '市内网约车', amount: 600, category: '交通', receipt: true },
    ],
    riskScore: 16,
    riskFlags: [],
    aiReviewResult: 'pass',
    aiReviewComment: '市场推广参会差旅，费用合规，已关联市场活动MKT-2025-015。',
  },
  {
    id: 'RB-2025-025',
    applicant: '范晓东',
    department: '投资部',
    type: '办公',
    amount: 3_800,
    submitDate: '2025-09-10',
    items: [
      { description: 'Bloomberg终端月度使用费（分摊）', amount: 2_500, category: '软件', receipt: true },
      { description: '投资分析报告数据库订阅', amount: 800, category: '订阅', receipt: true },
      { description: '部门文具及打印耗材', amount: 500, category: '办公用品', receipt: true },
    ],
    riskScore: 8,
    riskFlags: [],
    aiReviewResult: 'pass',
    aiReviewComment: '投资部专业工具订阅费用，在部门预算内。',
  },
];
