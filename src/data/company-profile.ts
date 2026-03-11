export interface CompanyProfile {
  name: string;
  shortName: string;
  established: string;
  registeredCapital: number;
  totalAssets: number;
  employees: number;
  branches: string[];
  ceo: string;
}

export const companyProfile: CompanyProfile = {
  name: '中国农业再保险股份有限公司',
  shortName: '中农再',
  established: '2020-09-01',
  registeredCapital: 16_100_000_000,
  totalAssets: 89_200_000_000,
  employees: 486,
  branches: ['北京总部', '上海分公司', '深圳分公司'],
  ceo: '李华',
};
