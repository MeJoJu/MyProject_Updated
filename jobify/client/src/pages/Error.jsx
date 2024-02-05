import React from "react";
import { Link, useRouteError } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage.js";
import img from "../assets/images/not-found.svg";

const Error = () => {
  const error = useRouteError();
  if (error.status===404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt="not found" />
          <h3>Ooh! The page not found</h3>
          <p>we can't seem to find the page you looking for</p>
          <Link to="/dashboard">Back to Home</Link>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h3>something went wrong</h3>

      <Link to="/">back home</Link>
    </Wrapper>
  );
};

export default Error;
