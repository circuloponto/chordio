import Footer from '@/components/footer'
import Navbar from '@/components/navbarnew'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { NextPageContext } from 'next'
import AppContext from '../components/AppContext';
import { useState } from 'react'
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic'
export default function App({ Component, pageProps }: AppProps) {
  const NoSSR = dynamic(() => import('@/components/navbarnew'), { ssr: false })
  const [me, setMe] = useState({})
  return (
    <AppContext.Provider value={{ me, setMe }}>

      <NoSSR />
      <Component {...pageProps} />
      <Footer />
    </AppContext.Provider>

  )
}
