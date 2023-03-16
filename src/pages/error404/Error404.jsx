import React from 'react'
import "./error404.scss"
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const Error404 = () => {

    return (
        <div className="error404">
          <SentimentVeryDissatisfiedIcon className="icon" />
          <h1>404</h1>
          <h2>Page not found</h2>
          <h5>The page you are looking for doesn't exist or other error occurred.</h5>
          <h5>Go back.</h5>
        </div>
    )
  }
  
  export default Error404