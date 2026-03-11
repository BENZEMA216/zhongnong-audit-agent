import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import antdTheme from './theme/antd-theme'
import MainLayout from './layouts/MainLayout'
import Dashboard from './modules/dashboard/Dashboard'
import AccountingPage from './modules/accounting/AccountingPage'
import FinancialReviewPage from './modules/financial-review/FinancialReviewPage'
import FinancialAnalysisPage from './modules/financial-analysis/FinancialAnalysisPage'
import TaxPage from './modules/tax/TaxPage'
import ContractPage from './modules/contract/ContractPage'
import RiskMonitoringPage from './modules/risk-monitoring/RiskMonitoringPage'
import AgriculturalDataPage from './modules/agricultural-data/AgriculturalDataPage'
import KnowledgeCenterPage from './modules/knowledge-center/KnowledgeCenterPage'
import CompliancePage from './modules/compliance/CompliancePage'
import InvestmentPage from './modules/investment/InvestmentPage'
import HRPage from './modules/hr/HRPage'
import ITProjectPage from './modules/it-project/ITProjectPage'

function App() {
  return (
    <ConfigProvider theme={antdTheme} locale={zhCN}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/accounting" element={<AccountingPage />} />
            <Route path="/financial-review" element={<FinancialReviewPage />} />
            <Route path="/financial-analysis" element={<FinancialAnalysisPage />} />
            <Route path="/tax" element={<TaxPage />} />
            <Route path="/contract" element={<ContractPage />} />
            <Route path="/risk-monitoring" element={<RiskMonitoringPage />} />
            <Route path="/agricultural-data" element={<AgriculturalDataPage />} />
            <Route path="/knowledge-center" element={<KnowledgeCenterPage />} />
            <Route path="/compliance" element={<CompliancePage />} />
            <Route path="/investment" element={<InvestmentPage />} />
            <Route path="/hr" element={<HRPage />} />
            <Route path="/it-project" element={<ITProjectPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
