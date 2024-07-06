import Head from 'next/head'
import { useRouter } from 'next/router'
import { common2 } from '../locales/common2'

export default function SEO({
  title,
  description,
  image = 'https://api.damda.uz/storage/images/residences/cottages/1674-1669717437.png',
  keywords,
}) {
  const { locale } = useRouter()

  return (
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta charSet='utf-8' />
      <title>{title || 'Damda'}</title>
      <meta
        name='description'
        content={description || common2[locale].site_description}
      />
      <meta name='keywords' content={keywords || common2[locale].keywords} />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={title || 'Damda'} key='ogtitle' />
      <meta
        property='og:description'
        content={description || common2[locale].site_description}
        key='ogdesc'
      />
      <meta
        name='author'
        property='og:author'
        content='Damda.uz'
        key='ogtitle'
      />
      <meta property='og:site_name' content='Damda.uz' key='ogsitename' />
      <meta name='image' property='og:image' content={image} key='ogimage' />
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:title' content={title || 'Damda'} />
      <meta
        name='twitter:description'
        content={description || common2[locale].site_description}
      />
      <meta name='twitter:site' content='Damda.uz' />
      <meta name='twitter:creator' content='Damda.uz' />
      <meta name='twitter:image' content={image} />
      <link rel='icon' href='/favicon.png' style={{ width: '100px' }} />
    </Head>
  )
}
