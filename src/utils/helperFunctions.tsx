/**
 * Removes duplicate authors from a given array of authors and returns a specified amount of authors
 * @param authors {string[]} - an array of authors
 * @param maxAuthors {number} - the maximum number of authors to return
 * @returns {string}
 */
export const getAuthors = (authors: string[], maxAuthors: number) => {
  const uniqueAuthors = authors.filter((author, index) => authors.indexOf(author) === index);
  const maxNumAuthors = uniqueAuthors.length > maxAuthors ? uniqueAuthors.splice(0, maxAuthors) : uniqueAuthors.splice(0, uniqueAuthors.length);
  return maxNumAuthors.join(", ");
};

/**
 * Filters out the subjects that are not alphanumeric and returns a specified amount of subjects
 * @param genres {string | string[]} - a string of genres separated by a comma or a string array of genres
 * @param maxGenres {number} - the maximum number of genres to return
 * @returns {string[]}
 */
export const getGenres = (genres: string | string[], maxGenres: number) => {
  if (Array.isArray(genres)) {
    genres = genres.join(", ");
  }
  const genresArray = genres.split(", ");
  const filteredArray = genresArray.filter((genre) => {
    return /^[A-Za-z0-9 ]+$/.test(genre);
  });
  return filteredArray.slice(0, maxGenres);
};