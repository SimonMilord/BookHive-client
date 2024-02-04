import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import "./styles/_variables.scss";
import "./App.scss";
import LoginPage from "./pages/Login/Login";
import BookInfoPage from "./pages/BookInfoPage/bookInfoPage";
import SearchResultsPage from "./pages/SearchResultPage/searchResultsPage";
import { Book, SearchResult } from "./types/types";
import { useState } from "react";
import SearchContext from "./context/SearchContext";

const mockBookData: Book = {
  id: '1',
  title: 'The Lord Of The Rings',
  author: 'J.R.R. Tolkien',
  image: "https://covers.openlibrary.org/b/isbn/0261102214-M.jpg",
  status: 'To Read',
  isbn: '123456789',
  pageCount: 899,
  language: 'english',
  genre: 'fantasy',
  publisher: 'penguin',
  datePublished: '1954',
  startDate: '2022-01-01',
  finishedDate: null,
  excerpt: 'Since it was first published in 1954, The Lord of the Rings has been a book people have treasured. Steeped in unrivalled magic and otherworldliness, its sweeping fantasy and epic adventure has touched the hearts of young and old alike. Over 150 million copies of its many editions have been sold around the world, and occasional collectors’ editions become prized and valuable items of publishing.',
  rating: 5,
  notes: [{id: '1', date: '2024-01-01', content: 'I really enjoyed the book.'},
    {id: '2', date: '2024-01-02', content: 'I can really relate to Frodo.'},
    {id: '3', date: '2024-01-03', content: 'They did Faramir dirty.'}
  ],
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      {/* to change later */}
      <Route path="searchresults" element={<SearchResultsPage />} />
      <Route path="bookinfo/:id" element={<BookInfoPage book={mockBookData}/>} />
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
