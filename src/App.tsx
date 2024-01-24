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


const mockSearchResults: SearchResult[] = [
  {
    // image: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1566425108l/33.jpg',
    image: 'https://covers.openlibrary.org/b/isbn/0261102214-M.jpg',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    pages: 250,
    year: 1954,
    excerpt: 'Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, rarely travelling further than the pantry of his hobbit-hole in Bag End. But his contentment is disturbed when the wizard, Gandalf, and a company of thirteen dwarves arrive on his doorstep one day to whisk him away on an unexpected journey ‘there and back again’. They have a plot to raid the treasure hoard of Smaug the Magnificent, a large and very dangerous dragon…',
  },
  {
    image: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1566425108l/33.jpg',
    title: 'MoneyBall',
    author: 'Michael Lewis',
    pages: 350,
    year: 2003,
    excerpt: 'Moneyball is a quest for the secret of success in baseball. Following the low-budget Oakland Athletics, their larger-than-life general manger, Billy Beane, and the strange brotherhood of amateur baseball enthusiasts, Michael Lewis has written not only "the single most influential baseball book ever" (Rob Neyer, Slate) but also what "may be the best book ever written on business"',
  },
  {
    image: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1566425108l/33.jpg',
    title: 'The Lord Of The Rings',
    author: 'J.R.R. Tolkien',
    pages: 990,
    year: 1955,
    excerpt: 'Sauron, the Dark Lord, has gathered to him all the Rings of Power – the means by which he intends to rule Middle-earth. All he lacks in his plans for dominion is the One Ring – the ring that rules them all – which has fallen into the hands of the hobbit, Bilbo Baggins.',
  }
];

const mockQuery = 'J.R.R. Tolkien';

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
  startDate: null,
  finishedDate: null,
  excerpt: 'Since it was first published in 1954, The Lord of the Rings has been a book people have treasured. Steeped in unrivalled magic and otherworldliness, its sweeping fantasy and epic adventure has touched the hearts of young and old alike. Over 150 million copies of its many editions have been sold around the world, and occasional collectors’ editions become prized and valuable items of publishing.',
  rating: 5,
  notes: [{id: '1', date: 'feb 1 2024', content: 'I really enjoyed the book.'}],
}
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      {/* to change later */}
      <Route path="searchresults" element={<SearchResultsPage results={mockSearchResults} query={mockQuery}/>} />
      <Route path="bookinfo/:id" element={<BookInfoPage book={mockBookData}/>} />
      <Route path="login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
)

export default function App() {
  return (
    <RouterProvider router={router}/>
  );
}
