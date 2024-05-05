import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
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
import PrivateRoute from './components/PrivateRoute/privateRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<LoginPage />} />
      {/* <Route path="home" element={<PrivateRoute><HomePage /></PrivateRoute>} /> */}
      <Route path="home" element={<HomePage />} />
      {/* <Route path="searchresults" element={<PrivateRoute><SearchResultsPage /></PrivateRoute>} /> */}
      <Route path="searchresults" element={<SearchResultsPage />} />
      {/* <Route path="bookinfo/:id" element={<PrivateRoute><BookInfoPage /></PrivateRoute>} /> */}
      <Route path="bookinfo/:id" element={<BookInfoPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
)

export default function App() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <SearchContext.Provider value={{searchResults, setSearchResults, searchTerm, setSearchTerm}}>
      <RouterProvider router={router}/>
    </SearchContext.Provider>
  );
}
