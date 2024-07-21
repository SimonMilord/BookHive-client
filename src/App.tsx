import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "src/pages/HomePage/HomePage";
import LoginPage from "src/pages/Login/Login";
import BookInfoPage from "src/pages/BookInfoPage/bookInfoPage";
import SearchResultsPage from "src/pages/SearchResultPage/searchResultsPage";
import { SearchResult } from "./types/types";
import { useEffect, useState } from "react";
import SearchContext from "./context/SearchContext";
import AuthProfileContext from "./context/AuthProfileContext";
import PrivateRoutes from "./utils/privateRoutes";
import { checkAuth } from "./utils/authRequests";

export const serverURL = "http://localhost:8000";
export default function App() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [authProfile, setAuthProfile] = useState({});

  useEffect(() => {
    const fetchProfileData = async () => {
      const profile = await checkAuth();
      setAuthProfile(profile);
    };

    fetchProfileData();
  }, []);

  return (
    <AuthProfileContext.Provider value={{ authProfile, setAuthProfile }}>
      <SearchContext.Provider
        value={{ searchResults, setSearchResults, searchTerm, setSearchTerm }}
      >
        <Router>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="home" element={<HomePage />} />
              <Route path="searchresults" element={<SearchResultsPage />} />
              <Route path="bookinfo/:id" element={<BookInfoPage />} />
              <Route path="*" element={<HomePage />} />
            </Route>
            <Route path="login" element={<LoginPage />} />
          </Routes>
        </Router>
      </SearchContext.Provider>
    </AuthProfileContext.Provider>
  );
}
