/**
 * The external imports
 */
import React from 'react'
import { NextSeo } from 'next-seo'

const Page = ({ children, title, description }) => (
  <React.Fragment>
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        title: title,
        description: description,
        images: [
          {
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.svg`,
            alt: 'Bootis',
          },
        ],
      }}
    />
    {children}
  </React.Fragment>
)

export default Page
