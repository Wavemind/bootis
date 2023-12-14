/**
 * The external imports
 */
import React, { FC } from 'react'
import { NextSeo } from 'next-seo'

/**
 * Type imports
 */
import { IChildren } from '../lib/types'

/**
 * Type definitions
 */
interface IPage extends IChildren {
  title: string
  description: string
}

const Page: FC<IPage> = ({ children, title, description }) => (
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
