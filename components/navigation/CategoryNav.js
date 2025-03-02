import { Box, Button } from '@mui/material'
import styles from '../../styles/Navigation.module.scss'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const CategoryNav = () => {
  const [activeIndex, setActiveIndex] = useState()
  const router = useRouter()

  // Button href, button label
  const buttonLabels = {
    '/': 'All Products',
    '/courses': 'Courses',
    '/indicators': 'Indicators',
    '/memberships': 'Memberships'
  }

  useEffect(() => {
    Object.keys(buttonLabels).find((key, index) => {
      if (key === router.asPath) {
        setActiveIndex(index)
      }
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box
      className={styles.category_nav}
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        my: 5,
        gap: {
          xs: 1,
          md: 4
        }
      }}
    >
      {Object.values(buttonLabels).map((item, index) => {
        return (
          <Button
            key={`category-button-${index}`}
            color="main"
            variant={index === activeIndex ? 'contained' : 'outlined'}
            href={Object.keys(buttonLabels)[index]}
            size="large"
            onClick={() => setActiveIndex(index)}
          >
            {item}
          </Button>
        )
      })}
    </Box>
  )
}

export default CategoryNav
