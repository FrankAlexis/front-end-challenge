import React from 'react'
import { Card, CardMedia, CardContent } from '@mui/material'
import { Button } from '@frankalexis/ui-library'
import { Link } from 'react-router-dom'
import { categories, categoryImages } from '@/infra/utils'

const Home: React.FC = () => (
  <div className='flex flex-col items-center justify-center'>
    <h3 className='text-4xl font-bold text-gray-800'>Online Store</h3>
    <div className='flex flex-wrap justify-center gap-4 mt-4'>
      {categories.map((category) => (
        <Card key={category}>
          <CardMedia
            component='img'
            height='200'
            image={categoryImages[category]}
            alt={category}
          />
          <CardContent>
            <h3 className='text-center text-3xl'>{category}</h3>
          </CardContent>
        </Card>
      ))}
    </div>

    <div className='mt-5'>
      <Button variant='primary' component={Link} to='/products' size='large'>
        See products
      </Button>
    </div>
  </div>
)

export default Home
