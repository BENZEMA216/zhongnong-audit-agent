import { useState, useMemo } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  Layout,
  Menu,
  Breadcrumb,
  Badge,
  Avatar,
  Button,
  Drawer,
  Tooltip,
} from 'antd'
import type { MenuProps } from 'antd'
import {
  HomeOutlined,
  CalculatorOutlined,
  AuditOutlined,
  BarChartOutlined,
  AccountBookOutlined,
  FileProtectOutlined,
  AlertOutlined,
  DatabaseOutlined,
  BookOutlined,
  SafetyCertificateOutlined,
  StockOutlined,
  TeamOutlined,
  LaptopOutlined,
  BellOutlined,
  RobotOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { MODULES, getModuleByPath } from '../utils/constants'
import useModuleStore from '../stores/moduleStore'
import ChatPanel from '../components/chat/ChatPanel'

const { Header, Sider, Content } = Layout

/* ── Icon map ── */
const iconMap: Record<string, React.ReactNode> = {
  CalculatorOutlined: <CalculatorOutlined />,
  AuditOutlined: <AuditOutlined />,
  BarChartOutlined: <BarChartOutlined />,
  AccountBookOutlined: <AccountBookOutlined />,
  FileProtectOutlined: <FileProtectOutlined />,
  AlertOutlined: <AlertOutlined />,
  DatabaseOutlined: <DatabaseOutlined />,
  BookOutlined: <BookOutlined />,
  SafetyCertificateOutlined: <SafetyCertificateOutlined />,
  StockOutlined: <StockOutlined />,
  TeamOutlined: <TeamOutlined />,
  LaptopOutlined: <LaptopOutlined />,
}

/* ── Category labels ── */
const categoryGroups = [
  { key: '财务管理', label: '财务管理' },
  { key: '业务管理', label: '业务管理' },
  { key: '合规与知识', label: '合规与知识' },
  { key: '投资与运营', label: '投资与运营' },
] as const

/* ── Build sidebar menu items ── */
function buildMenuItems(): MenuProps['items'] {
  const items: MenuProps['items'] = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: '首页',
    },
  ]

  for (const group of categoryGroups) {
    const children = MODULES.filter((m) => m.category === group.key).map((m) => ({
      key: m.path,
      icon: iconMap[m.icon] || null,
      label: m.name,
    }))

    items.push({
      key: group.key,
      label: group.label,
      type: 'group' as const,
      children,
    })
  }

  return items
}

/* ── Breadcrumb map ── */
function getBreadcrumbItems(pathname: string) {
  const items = [{ title: '首页', href: '/' }]
  if (pathname === '/') return items

  const mod = getModuleByPath(pathname)
  if (mod) {
    items.push({ title: mod.category, href: '' })
    items.push({ title: mod.name, href: '' })
  }
  return items
}

export default function MainLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { sidebarCollapsed, toggleSidebar, setActiveModule } = useModuleStore()
  const [chatOpen, setChatOpen] = useState(false)

  const menuItems = useMemo(() => buildMenuItems(), [])
  const breadcrumbItems = useMemo(
    () => getBreadcrumbItems(location.pathname),
    [location.pathname],
  )

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key)
    const mod = getModuleByPath(key)
    setActiveModule(mod || null)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* ── Left Sidebar ── */}
      <Sider
        width={240}
        collapsedWidth={60}
        collapsed={sidebarCollapsed}
        style={{
          background: '#0f172a',
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 100,
        }}
      >
        {/* Logo */}
        <div
          style={{
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
            padding: sidebarCollapsed ? '0' : '0 20px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            cursor: 'pointer',
          }}
          onClick={() => {
            navigate('/')
            setActiveModule(null)
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <AuditOutlined style={{ color: '#fff', fontSize: 18 }} />
          </div>
          {!sidebarCollapsed && (
            <span
              style={{
                color: '#fff',
                fontSize: 16,
                fontWeight: 600,
                marginLeft: 12,
                whiteSpace: 'nowrap',
              }}
            >
              中农再
            </span>
          )}
        </div>

        {/* Navigation Menu */}
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={handleMenuClick}
          items={menuItems}
          style={{
            background: 'transparent',
            borderRight: 'none',
            padding: '8px 0',
          }}
          theme="dark"
        />

        {/* Collapse Toggle */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '12px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            justifyContent: sidebarCollapsed ? 'center' : 'flex-end',
          }}
        >
          <Button
            type="text"
            icon={sidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleSidebar}
            style={{ color: 'rgba(255,255,255,0.65)' }}
          />
        </div>
      </Sider>

      {/* ── Right Part ── */}
      <Layout
        style={{
          marginLeft: sidebarCollapsed ? 60 : 240,
          transition: 'margin-left 0.2s',
        }}
      >
        {/* Top Header */}
        <Header
          style={{
            height: 56,
            lineHeight: '56px',
            padding: '0 24px',
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            position: 'sticky',
            top: 0,
            zIndex: 90,
          }}
        >
          {/* Left: Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} />

          {/* Center: Title */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: 16,
              fontWeight: 600,
              color: '#1a365d',
              whiteSpace: 'nowrap',
            }}
          >
            AI智能审计平台
          </div>

          {/* Right: Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Tooltip title="通知">
              <Badge count={3} size="small">
                <Button
                  type="text"
                  icon={<BellOutlined style={{ fontSize: 18 }} />}
                  style={{ color: '#64748b' }}
                />
              </Badge>
            </Tooltip>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Avatar
                size={32}
                icon={<UserOutlined />}
                style={{ backgroundColor: '#1a365d' }}
              />
              <span style={{ fontSize: 14, color: '#334155' }}>张明</span>
            </div>

            <Tooltip title="AI审计助手">
              <Button
                type="primary"
                icon={<RobotOutlined />}
                onClick={() => setChatOpen(true)}
                style={{ borderRadius: 20 }}
              >
                AI助手
              </Button>
            </Tooltip>
          </div>
        </Header>

        {/* Content Area */}
        <Content
          style={{
            padding: 24,
            minHeight: 'calc(100vh - 56px)',
            background: '#f0f2f5',
          }}
        >
          <Outlet />
        </Content>
      </Layout>

      {/* ── Floating Chat Button (visible when drawer is closed) ── */}
      {!chatOpen && (
        <div
          style={{
            position: 'fixed',
            right: 24,
            bottom: 24,
            zIndex: 1000,
          }}
        >
          <Button
            type="primary"
            shape="circle"
            size="large"
            icon={<RobotOutlined style={{ fontSize: 24 }} />}
            onClick={() => setChatOpen(true)}
            style={{
              width: 56,
              height: 56,
              boxShadow: '0 4px 16px rgba(26, 54, 93, 0.3)',
            }}
          />
        </div>
      )}

      {/* ── Chat Drawer ── */}
      <Drawer
        title={null}
        placement="right"
        width={420}
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        styles={{ body: { padding: 0, display: 'flex', flexDirection: 'column' } }}
        closable={false}
      >
        <ChatPanel onClose={() => setChatOpen(false)} />
      </Drawer>
    </Layout>
  )
}
