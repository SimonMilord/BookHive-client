/**
 * Type of the individual book. This is used in the bookInfoPage
 */
export type Book = {
  id: string,
  title: string,
  author: string,
  coverId: string,
  status: BookStatus,
  isbn: string,
  pageCount: number,
  language: string,
  genre: string,
  publisher: string,
  yearPublished: string,
  startDate: string,
  finishedDate: string | null,
  currentPage: number,
  excerpt?: string,
  firstSentence: string,
  rating: number,
  ratingsCount: number,
  notes: Note[],
}

export enum BookStatus {
  TO_READ = 'To Read',
  STARTED = 'Started',
  FINISHED = 'Finished',
}

/**
 * Type of the notes that can be added on a specific book
 */
export type Note = {
  id: string,
  date: string,
  content: string,
  book_id: string,
}

/**
 * Type of the results displayed in the SearchResultList after being searched
 */
export type SearchResult = {
  id: string,
  title: string,
  author_name: string[],
  cover_i: string,
  isbn: string[],
  number_of_pages_median: number,
  language: string[],
  subject: string[],
  publisher: string[],
  first_publish_year: number,
  first_sentence: string,
  ratings_average: number,
  ratings_count: number,
}

