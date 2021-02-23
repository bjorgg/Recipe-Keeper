// Dynamic routes file
//pages/[uid].js

import React from 'react'
import { Client } from '../../prismic-configuration'
import Prismic from '@prismicio/client'
import { RichText } from "prismic-reactjs";
import styles from '../../styles/Post.module.css'
import Header from '../../components/Header';

// Passing in data from the props object
export default function Post({ data }) {

  return (

    <React.Fragment>
      <Header/>

    <div className={styles.recipeContainer}>
        <img className={styles.postImage} src={data.image.url} />
   
      <h1>{RichText.asText(data.title)}</h1>
      <h4>{RichText.asText(data.subtitle)}</h4>
      
        
          {data.recipe_part.map((part, index) => (
            <div className={styles.recipeWrapper} key={index}>
              <h2>Hráefni:</h2>
              <div className={styles.postIngredients}>
                {RichText.render(part.ingredients)}
              </div>            
              <h2>Aðferð:</h2>
              <div className={styles.postInstructions}>
                {part.instructions}
              </div>
            </div>
          ))}
      

      <p>{data.notes}</p>
      <small>{RichText.render(data.attribute)}</small>
    </div>

    </React.Fragment>
  );
}


// Exporting static props function so Next.js will pre-render each 
// page at build time using the props returned.
// Passing in params from the static paths function, params contains 
// the route parameters for pages using dynamic routes.
export async function getStaticProps({params}) {
  const client = Client();
  // Fetching data from the API using Prismic client getByUID
  const { data } = (await client.getByUID('recipe', params.uid))

  // Passing the data receved to the props object 
  return {
    props: {
      data
    },
    // Revalidating at most once every second to re-render the page 
    // in the background as traffic comes in.
    revalidate: 1,
  };
}

// getStaticPaths statically pre-renders all the paths specified, 
// in this case the uid.
export async function getStaticPaths() {
  const client = Client();
  // Fetching data from the API using Prismic client query
   const { results } = await client.query(
    // Querying by document type
     Prismic.Predicates.at("document.type", "recipe")
   )

  // Get the paths we want to pre-render based on results
  const paths = results.map(post => ({
    params: {
      uid: post.uid,
    },
  }))

  // Pre-render only these paths at build time.
  // fallback: false, means other routes should return 404
   return {
    paths,
    fallback: false,
   }
 }
