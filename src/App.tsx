import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import "./styles/_variables.scss";
import "./App.scss";
import LoginPage from "./pages/Login/Login";
import BookInfoPage from "./pages/BookInfoPage/bookInfoPage";
import SearchResultsPage from "./pages/SearchResultPage/searchResultsPage";
import { SearchResult } from "./types/types";
import { useState } from "react";
import SearchContext from "./context/SearchContext";
import PrivateRoutes from "./utils/privateRoutes";

export const serverURL = "http://localhost:8000";

export default function App() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <SearchContext.Provider value={{searchResults, setSearchResults, searchTerm, setSearchTerm}}>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="home" element={<HomePage />} />
            <Route path="searchresults" element={<SearchResultsPage />} />
            <Route path="bookinfo/:id" element={<BookInfoPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="login" element={<LoginPage />} />
        </Routes>
      </Router>
    </SearchContext.Provider>
  );
}
