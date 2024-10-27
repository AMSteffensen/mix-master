# Mixmaster Monorepo
This application utilizes a modern tech stack to provide a seamless experience for cocktail enthusiasts. The Mixmaster project is structured as a monorepo, integrating both frontend and backend components for efficient development and deployment.

## Technologies Used
- Frontend: Built with React and Vite, the frontend provides a fast and interactive user interface. Vite’s hot module replacement enables rapid development, allowing for a smooth development experience.

- Backend: The backend is powered by Node.js and Express, providing a robust API for fetching cocktail data. The server handles requests and interacts with external APIs to deliver real-time data.

- Data Caching: We leverage Redis for caching responses from the Cocktail DB API, significantly improving performance and reducing response times. This allows for quick retrieval of frequently accessed data.

- State Management: TanStack Query is used for data fetching and caching in the frontend, ensuring a reactive and efficient management of server state and data synchronization.

- Styling: The application employs styled-components for CSS-in-JS styling, enabling component-level styles and enhancing the maintainability of the codebase.

- Deployment: The application is deployed to Netlify
https://main--teal-kitten-73072d.netlify.app/



#### Figma File

[MixMaster Design](https://www.figma.com/community/file/1255860657910062828)

## Steps

#### Install and Setup

- npm install
- npm run dev


### Running local redis database
setup env config variables
see .env.example for examples. 

install redis cli

first run 
- make start


