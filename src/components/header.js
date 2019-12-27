import React, { useState } from "react"
import styled from "styled-components"
import { useStaticQuery, Link, graphql } from "gatsby"
import "../scss/main.scss"

export default ({ children }) => {
  const [menuStatus, menuChange] = useState(false)

  const ListLink = props => (
    <li className="nav-link">
      <Link to={props.to}>{props.children}</Link>
    </li>
  )

  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )

  const HeaderCont = styled.div`
    @media (max-width: 767px) {
      .nav-cont {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        bottom: 0;
        right: 0;
        background-color: #fff;
        z-index: 2;
        transform: translateX(100%);
        transition: var(--transMed);

        ul {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      }

      .menu-open {
        position: relative;
        z-index: 2;

        .nav-cont {
          transform: translateX(0%);
        }
      }

      .header-cont {
        button {
          z-index: 3;
          font-size: 1.15rem;
        }
      }
    }

    .header-cont {
      z-index: 3;
      position: fixed;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-between;
      grid-template-columns: 200px auto;
      grid-gap: 1rem;
      padding: 1rem 2rem;
      background-color: #fff;

      .logo-cont {
        display: flex;
        flex-direction: column;
        justify-content: center;
        z-index: 3;

        a {
          display: inline-block;
          line-height: 2.5rem;
          color: var(--black);
          text-decoration: none;
          transition: var(--transMed);
          position: relative;

          &::after {
            content: "";
            background-color: var(--primaryColor);
            height: 3px;
            width: 100%;
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            transition: var(--transMed);
          }

          &:hover {
            color: var(--primaryColor);

            &::after {
              left: 100%;
              width: 0;
            }
          }
        }

        h2 {
          margin: 0;
          font-size: 1.5rem;

          @media (min-width: 768px) {
            font-size: 1.75rem;
          }
        }
      }

      @media (min-width: 768px) {
        button {
          display: none;
        }
      }
      .nav-cont {
        ul {
          height: 100%;
          margin: 0;
          padding: 0;
          display: flex;

          li {
            padding-left: 2rem;
            margin-top: 1rem;
            margin-bottom: 1rem;
            font-size: 1.15rem;
          }
        }

        @media (min-width: 768px) {
          ul {
            align-items: center;
            li {
              padding-left: 2rem;
              justify-content: flex-end;
            }
          }
        }
      }
    }
  `

  return (
    <HeaderCont>
      <div className={`${menuStatus ? "menu-open" : "menu-closed"}`}>
        <header className="header-cont">
          <div className="logo-cont">
            <Link to="/">
              <h2>{data.site.siteMetadata.title}</h2>
            </Link>
          </div>
          <button className="btn" onClick={() => menuChange(!menuStatus)}>
            Menu
          </button>
          <nav className="nav-cont">
            <ul>
              <ListLink to="/">Home</ListLink>
              <ListLink to="/profile/">Profile</ListLink>
              <ListLink to="/blog/">Blog</ListLink>
              <ListLink to="/contact/">Contact</ListLink>
            </ul>
          </nav>
        </header>
      </div>
    </HeaderCont>
  )
}
