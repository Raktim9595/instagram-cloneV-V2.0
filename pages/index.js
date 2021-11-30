import Head from 'next/head';

import { Header, Feed, Modal } from "../components";

export default function Home() {
  return (
    <div className="bg-gray-50 relative">
      <Head>
        <title>Instagram || Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {/* feed  */}
      <Feed />
      
      {/* modal  */}
      <Modal />
    </div>
  )
}
