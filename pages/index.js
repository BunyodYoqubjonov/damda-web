import SEO from '../components/SEO'
import Hero from '../components/hero/hero'
import dynamic from 'next/dynamic'
import UsefulBlogSection from '../components/usefulBlogSection/usefulBlogSection'

const Categories = dynamic(() => import('../components/categories/categories'))
const ServiceCard = dynamic(() =>
  import('../components/serviceCard/serviceCard')
)

export default function Home() {
  return (
    <div>
      <SEO />
      <Hero />
      <Categories />
      <ServiceCard />
      <UsefulBlogSection />
    </div>
  )
}
