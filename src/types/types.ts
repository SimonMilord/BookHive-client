/**
 * Type of the individual book. This is used in the bookInfoPage
 */
export type Book = {
  id: string | number,
  title: string,
  author: string,
  image: string, // ?
  status: string, // To Read, Started, Finished
  isbn: string,
  pageCount: number,
  Language: string,
  Subject: string,
  Publisher: string,
  datePublished: string,
  startDate: string | null,
  finishedDate: string | null,
  readTime: string | number,
  progress: number,
}

/**
 * Type of the results displayed in the SearchResultList after being searched
 */
export type SearchResult = {
  image: string | null, // ?
  title: string,
  author: string,
  pages: number,
  excerpt: string,
}