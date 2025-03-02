import { Box, Pagination, PaginationItem } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useState, useEffect } from 'react'

const StorePagination = (products) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [productsLength, setProductsLength] = useState(1)
  const productsPerPage = 6
  const maxPage = Math.ceil(products.length / productsPerPage)
  const count = Math.ceil(products.length / productsPerPage)

  function jump(e, page) {
    const pageNumber = Math.max(1, page)
    setCurrentPage(currentPage => Math.min(pageNumber, maxPage))
  }

  function visibleProducts() {
    const begin = (currentPage - 1) * productsPerPage
    const end = begin + productsPerPage
    return products.slice(begin, end)
  }

  useEffect(() => {
    if (productsLength !== products.length) {
      setProductsLength(products.length)
      setCurrentPage(1)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const paginationElement = (
    <Pagination
      variant="outlined"
      color="main"
      size="large"
      perpage={productsPerPage}
      count={count}
      page={currentPage}
      onChange={jump}
      renderItem={(item) => (
        <PaginationItem
          components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
          {...item}
        />
      )}
    />
  )

  return { visibleProducts, paginationElement }
}

export default StorePagination
