/**
 * Type of the individual book. This is used in the bookInfoPage
 */
export type Book = {
  id: string | number,
  title: string,
  author: string,
  image: string, // ?
  status: string, // To Read, Started, Finished + maybe change that to enum?
  isbn: string,
  pageCount: number,
  language: string,
  genre: string,
  publisher: string,
  datePublished: string,
  startDate: string | null,
  finishedDate: string | null,
  excerpt: string,
  rating: number | null,
  notes: Note[],
}

/**
 * Type of the results displayed in the SearchResultList after being searched
 */
export type SearchResult = {
  image: string | undefined, // ?
  title: string,
  author: string,
  pages: number,
  year: string | number,
  excerpt: string,
}

/**
 * Type of the notes that can be added on a specific book
 */
export type Note = {
  id: string,
  date: string,
  content: string,
}