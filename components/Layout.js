import React from 'react'
import Header from './header/header'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import Footer from './footer/footer'

const routesWithoutLayout = ['login', 'registration', 'forgotPassword']

function Layout({ children }) {
  const { pathname } = useRouter()

  const isAuthRoute = routesWithoutLayout.find((item) =>
    pathname.includes(item)
  )

  if (isAuthRoute) return children

  return (
    <>
      <Header />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ type: 'linear' }}
      >
        {children}
        <Footer />
      </motion.div>
    </>
  )
}

export default Layout
