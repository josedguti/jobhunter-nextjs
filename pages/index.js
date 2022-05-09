import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import DataTable from '../components/Table'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Job Hunter</title>
        <meta name="description" content="Manage your job applications" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DataTable />
    </div>
  )
}
