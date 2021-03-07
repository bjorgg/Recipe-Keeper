import Head from 'next/head'
import Link from "next/link";
import styles from '../styles/Home.module.css'
import { Client } from '../prismic-configuration'
import Prismic from '@prismicio/client'
import { RichText } from "prismic-reactjs";
import Header from '../components/Header';
// import {useEffect, useState} from "react"

// Passing in posts from props to this page component
export default function Home({ posts }) {
  console.log(posts)

  // const [tags, setTags] = useState([])

  // useEffect(() => {  
  //   // const prismicURL = `https://${process.env.PRISMIC_REPOSITORY}.cdn.prismic.io/api/v2?access_token=${process.env.PRISMIC_TOKEN}`
  //   // const prismicURL = process.env.NEXT_PUBLIC_PRISMIC_URL
  //   const queryTags = async () => {
  //     const res = await fetch(prismicURL);
  //     const prismicApi = await res.json()
  //     const tags = prismicApi.tags;
  //     console.log(prismicApi)
  //     console.log(tags)
  //     setTags(prismicApi.tags)
  //   }
  //   queryTags();
  // }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Recipe Keeper</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <Header/>
      <div className={styles.listContainer}>
        {/* Mapping posts to get each item from the array */}
        {posts.results.map((post) => (
          <div className={styles.listItem} key={post.uid}>
            {/* Linking each item to dynamic routes  */}
            <Link href="posts/[id]" as={`/posts/${post.uid}`}>
              <a>
                <img className={styles.listImage} src={post.data.image.url} />
                <h2>{RichText.asText(post.data.title)}</h2>
              </a>
            </Link>
            </div>

          ))}
      </div>
    </div>
  )
}


// Exporting static props function so Next.js will pre-render this page at build time
// using the props returned. Using the context parameter to pass props to the page component.
export async function getStaticProps(context) {
  const client = Client();
  // Fetching data from the API using Prismic client query
   const data = await client.query(
     // Querying by document type and ordering by last publication date
     Prismic.Predicates.at("document.type", "recipe"),
     {orderings: "[document.last_publication_date]" }
   )

   // If no data return a 404 status and page
   if (!data) {
     return {
       notFound: true,
     };
   }

   // Passing the data receved to the props object 
   return {
     props: {
       posts: data,
     },
    // Revalidating at most once every second to re-render the page 
    // in the background as traffic comes in.
     revalidate: 1,
   }
}