// =============================================================================
// SEARCH CONTEXT — SHARED SEARCH STATE ACROSS ALL PAGES
// =============================================================================
// Provides a global searchTerm that any page can read and write.
// The Home page and Category pages use this to filter the product grid
// in real-time as the user types in the search overlay.
// =============================================================================

"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// ====================== CONTEXT TYPE ======================

interface SearchContextType {
  /** Current search query string. Empty string means "no filter". */
  searchTerm: string;
  /** Updates the search term — called by the search input onChange. */
  setSearchTerm: (term: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

// ====================== PROVIDER ======================

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
}

// ====================== HOOK ======================

/**
 * Hook to access search state from any component.
 * Must be used within a <SearchProvider>.
 * Usage: const { searchTerm, setSearchTerm } = useSearch();
 */
export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
