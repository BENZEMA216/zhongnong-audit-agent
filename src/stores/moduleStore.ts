import { create } from 'zustand'
import type { ModuleDefinition } from '../utils/constants'

interface ModuleState {
  /** Currently active module, null if on home / overview page */
  activeModule: ModuleDefinition | null
  /** Whether the sidebar is collapsed */
  sidebarCollapsed: boolean

  setActiveModule: (module: ModuleDefinition | null) => void
  toggleSidebar: () => void
  setSidebarCollapsed: (collapsed: boolean) => void
}

const useModuleStore = create<ModuleState>((set) => ({
  activeModule: null,
  sidebarCollapsed: false,

  setActiveModule: (module) => set({ activeModule: module }),

  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
}))

export default useModuleStore
