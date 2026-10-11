import { create } from 'zustand';
import { MenuItem, WPPost, WPPage, WPCategory, WPSearchResult } from '@/types/wordpress';
import { OFFICIAL_MENUS, getMenus, searchContent } from '@/services/wordpress';

interface AppState {
  // Navigation Menus
  menus: MenuItem[];
  isMenuLoading: boolean;
  activeMenuSlug: string | null;

  // Active Document State
  activePost: WPPost | null;
  activePage: WPPage | null;
  activeCategory: WPCategory | null;

  // Global Search
  searchQuery: string;
  searchResults: WPSearchResult[];
  isSearching: boolean;
  searchHistory: string[];

  // Global UI States
  mobileMenuOpen: boolean;
  sidebarOpen: boolean;
  globalError: string | null;

  // Actions
  fetchAndHydrateMenus: () => Promise<void>;
  setActivePost: (post: WPPost | null) => void;
  setActivePage: (page: WPPage | null) => void;
  setActiveCategory: (cat: WPCategory | null) => void;
  setSearchQuery: (query: string) => void;
  executeSearch: (term: string) => Promise<void>;
  clearSearch: () => void;
  toggleMobileMenu: (open?: boolean) => void;
  toggleSidebar: (open?: boolean) => void;
  setGlobalError: (error: string | null) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  menus: OFFICIAL_MENUS,
  isMenuLoading: false,
  activeMenuSlug: null,

  activePost: null,
  activePage: null,
  activeCategory: null,

  searchQuery: '',
  searchResults: [],
  isSearching: false,
  searchHistory: [],

  mobileMenuOpen: false,
  sidebarOpen: true,
  globalError: null,

  fetchAndHydrateMenus: async () => {
    try {
      set({ isMenuLoading: true });
      const dynamicMenus = await getMenus();
      if (dynamicMenus && dynamicMenus.length > 0) {
        set({ menus: dynamicMenus, isMenuLoading: false });
      } else {
        set({ menus: OFFICIAL_MENUS, isMenuLoading: false });
      }
    } catch (err) {
      console.warn('Failed hydrating dynamic menus, using official fallback:', err);
      set({ menus: OFFICIAL_MENUS, isMenuLoading: false });
    }
  },

  setActivePost: (post) => set({ activePost: post, activePage: null }),
  setActivePage: (page) => set({ activePage: page, activePost: null }),
  setActiveCategory: (category) => set({ activeCategory: category }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  executeSearch: async (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) {
      set({ searchResults: [], isSearching: false });
      return;
    }

    set({ isSearching: true, searchQuery: trimmed });
    try {
      const results = await searchContent(trimmed);
      const history = Array.from(new Set([trimmed, ...get().searchHistory])).slice(0, 8);
      set({ searchResults: results, isSearching: false, searchHistory: history });
    } catch (err) {
      console.warn('Search execution encountered error:', err);
      set({ searchResults: [], isSearching: false });
    }
  },

  clearSearch: () => set({ searchQuery: '', searchResults: [], isSearching: false }),

  toggleMobileMenu: (open) =>
    set((state) => ({ mobileMenuOpen: open !== undefined ? open : !state.mobileMenuOpen })),

  toggleSidebar: (open) =>
    set((state) => ({ sidebarOpen: open !== undefined ? open : !state.sidebarOpen })),

  setGlobalError: (error) => set({ globalError: error }),
}));
