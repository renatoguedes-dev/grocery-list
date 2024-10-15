# Grocery List

A web application for managing grocery lists and inventory, built with React and TypeScript.

<p float="left" style="display: flex; gap: 15px; flex-wrap: wrap; justify-content: center;">
  <img src="src\assets\images\projectpic1.png" alt="list section's picture" style="width: 350px; max-width: 350px; max-height: 530px">
  <img src="src\assets\images\projectpic2.png" alt="list detailed's picture" style="width: 350px; max-width: 350px; max-height: 530px">
</p>

## Features

- User authentication (signup, login, logout)
- Dashboard view
- Inventory management
- Custom list creation and management
- Profile management
- Responsive design

## Technologies Used

- React
- TypeScript
- React Router
- Axios
- CSS Modules
- JS-Cookie

## Deployment

The project is deployed using Netlify. You can view the live demo [here](https://grocery-planner.netlify.app/).

## Project Structure

The project is structured as follows:

- `src/`
  - `components/`: Reusable React components
  - `Pages/`: Main page components
  - `hooks/`: Custom React hooks
  - `utils/`: Utility functions
  - `assets/`: Static assets like images
  - `index.css`: Global styles
  - `index.tsx`: Entry point of the application
  - `routes.tsx`: Route definitions
  - `axios.ts`: Axios instance and API calls

## Main Components

- `App`: The main component that wraps the entire application
- `Header`: Navigation component
- `HomeContent`: Landing page content
- `Dashboard`: User dashboard
- `InventoryPage`: Inventory management
- `Lists`: List management
- `Profile`: User profile management
- `ListById`: Individual list view
- `InventoryList`: Inventory-based shopping list

## Routing

The application uses React Router for navigation. Routes are defined in `routes.tsx` and include:

- Home (`/`)
- Login (`/login`)
- Signup (`/signup`)
- Lists (`/lists`)
- Reset Password (`/reset-password`)
- Individual List (`/lists/:id`)
- Inventory List (`/inventory/list`)
- Inventory (`/inventory`)
- Profile (`/profile`)
- Logout (`/logout`)

## State Management

The application uses React's Context API for global state management, particularly for user authentication and page context.

## API Integration

API calls are made using Axios. The base URL for the API is defined in `axios.ts`.

## Styling

The project uses CSS Modules for component-specific styling, allowing for scoped and modular CSS.

## Notes

- The application handles token-based authentication, storing the token in a cookie.
- The project includes modals for adding new items to inventory and creating custom lists.
