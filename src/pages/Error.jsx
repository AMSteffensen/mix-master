import styled from "styled-components";
import { Link, useRouteError, Navigate } from "react-router-dom";
import img from "../assets/not-found.svg";

const Wrapper = styled.div`
  min-height: 100vh;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 90vw;
    max-width: 600px;
    display: block;
    margin-bottom: 2rem;
    margin-top: -3rem;
  }
  h3 {
    margin-bottom: 0.5rem;
  }

  p {
    line-height: 1.5;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    color: var(--grey-500);
  }
  a {
    color: var(--primary-500);
    text-transform: capitalize;
  }
`;

const Error = () => {
  const error = useRouteError();
  return (
    <Wrapper>
      {error.status === 404 ? (
        <div>
          <h1>Error 404</h1>
          <img src={img} alt="" />
          {error.data}
          <Link to="/">Go back home</Link>
        </div>
      ) : (
        <Navigate to="/"></Navigate>
      )}
    </Wrapper>
  );
};
export default Error;
