import { useLoaderData, Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

// The loader function to fetch cocktail data
export const loader = async ({ params }) => {
  const { id } = params;

  // Update this URL to point to your local Express server
  const response = await axios.get(`http://localhost:3000/api/cocktails/${id}`);

  return { id, data: response.data };
};

const Cocktail = () => {
  const { id, data } = useLoaderData();

  const singleDrink = data;

  const {
    strDrink: name,
    strDrinkThumb: image,
    strAlcoholic: info,
    strCategory: category,
    strGlass: glass,
    strInstructions: instructions,
  } = singleDrink;

  const validIngredients = Object.keys(singleDrink)
    .filter(
      (key) => key.startsWith("strIngredient") && singleDrink[key] !== null
    )
    .map((key) => singleDrink[key]);

  return (
    <Wrapper>
      <header>
        <Link to="/" className="btn">
          back home
        </Link>
        <h3>{name}</h3>
      </header>
      <div>
        <div className="drink">
          <img src={image} alt={name} className="img" />
          <div className="drink-info">
            <p>
              <span className="drink-data">name :</span>
              {name}
            </p>
            <p>
              <span className="drink-data">category :</span>
              {category}
            </p>
            <p>
              <span className="drink-data">info :</span>
              {info}
            </p>
            <p>
              <span className="drink-data">glass :</span>
              {glass}
            </p>
            <p>
              <span className="drink-data">instructions :</span>
              {instructions}
            </p>
            <p>
              <span className="drink-data">ingredients :</span>
              {validIngredients.map((item, index) => (
                <span className="ing" key={item}>
                  {item}
                  {index < validIngredients.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Cocktail;

export const Wrapper = styled.div`
  header {
    text-align: center;
    margin-bottom: 3rem;
    .btn {
      margin-bottom: 1rem;
    }
  }
  .img {
    border-radius: var(--borderRadius);
  }
  .drink-info {
    padding-top: 2rem;
  }
  .drink p {
    font-weight: 700;
    text-transform: capitalize;
    line-height: 2;
    margin-bottom: 1rem;
  }
  .drink-data {
    margin-right: 0.5rem;
    background: var(--primary-300);
    padding: 0.25rem 0.5rem;
    border-radius: var(--borderRadius);
    color: var(--primary-700);
    letter-spacing: var(--letterSpacing);
  }
  .ing {
    display: inline-block;
    margin-right: 0.5rem;
  }
  @media (min-width: 992px) {
    .drink {
      display: grid;
      grid-template-columns: 2fr 3fr;
      gap: 3rem;
      align-items: center;
    }
    .drink-info {
      padding-top: 0;
    }
  }
`;
