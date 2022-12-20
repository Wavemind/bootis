/**
 * The external imports
 */
import React, { FC } from 'react'
import { NextSeo } from 'next-seo'

/**
 * Type imports
 */
import { PageType } from '../lib/types'

const Page: FC<PageType> = ({ children, title, description }) => (
  <React.Fragment>
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        title: title,
        description: description,
        images: [
          {
            url: `${process.env.NEXT_PUBLIC_FRONT_URL}/logo.svg`,
            alt: 'Bootis',
          },
        ],
      }}
    />
    {children}
  </React.Fragment>
)

export default Page
