export const calculateDisplayedResults = (totalItemsCount, numberOfItemsPerPage = 6, page) => {
  const start = (page * numberOfItemsPerPage) - (numberOfItemsPerPage - 1)
  const end = Math.min(start + numberOfItemsPerPage - 1, totalItemsCount)
  return `${start}-${end} of ${totalItemsCount} results`
}
