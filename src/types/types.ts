/**
 * Type of the individual book. This is used in the bookInfoPage
 */
export type Book = {
  id: string | number,
  title: string,
  author: string,
  image: string, // ?
  status: BookStatus,
  isbn: string,
  pageCount: number,
  language: string,
  genre: string,
  publisher: string,
  datePublished: string,
  startDate: string | null,
  finishedDate: string | null,
  excerpt?: string,
  first_sentence: string,
  rating: number | null,
  notes: Note[],
}

enum BookStatus {
  TO_READ = 'To Read',
  STARTED = 'Started',
  FINISHED = 'Finished',
}
/**
 * Type of the results displayed in the SearchResultList after being searched
 */
export type SearchResult = {
  key: string,
  title: string,
  author_name: string[],
  first_publish_year: number,
  isbn: number[],
  ratings_average: number,
  ratings_count: number,
  cover_i: string,
  number_of_pages_median: number,
  first_sentence: string,
  subject: string[],
}

/**
 * Type of the notes that can be added on a specific book
 */
export type Note = {
  id: string,
  date: string,
  content: string,
}