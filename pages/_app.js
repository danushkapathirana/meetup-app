import Layout from '@/components/layout/layout'

import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return(
    <Layout>
      <Component {...pageProps} />
    </Layout>
    
  )
}

/**
 * Component is a prop that hold the actual page content that
 * should be rendered
 * 
 * pageProps are specific props our might be getting
 * 
 * All the pages wrap around with <Layout> component
 */
