import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import styles from "../scss/blog.module.scss"
import Seo from "../components/SEO"

export default ({ data }) => {
  console.log(data)

  return (
    <Layout>
      <Seo />
      <h1>
        The <h1 style={{color:'blue', display:'inline'}}  >Quantum Ville</h1> is a curated resource for your journey through quantum computing education.
      </h1>
      <h4 className={styles.feature}>
        {data.allMarkdownRemark.totalCount} Featured 
      </h4>
      
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <article className={styles.item}>
          <div className={styles.title}>
            <h2>
              <Link to={node.frontmatter.path}>{node.frontmatter.title}</Link>
            </h2>
          </div>
          <div className={styles.content}>
            <p>{node.excerpt}</p>
            <div className={styles.meta}>
              <Link to={node.frontmatter.path}>
                <button className="btn">Read Article</button>
              </Link>
              <h4>{node.frontmatter.date}</h4>
            </div>
          </div>
        </article>
      ))}
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 3
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YY")
            path
          }
          excerpt
        }
      }
    }
  }
`
