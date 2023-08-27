# Recipe-Sharing-App

This is a web application for sharing and discovering recipes. Users can create, view, update, delete, save, search for recipes and create a shopping list, as well as browse recipes shared by other users.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and authorization
- Create, view, update, and delete recipes
- Browse and search for recipes
- Save favorite recipes
- Upload images for recipes
- API endpoints for interacting with recipes and users

## Getting Started

### Prerequisites

- Node.js (v14.x or higher)
- MongoDB database (either locally or cloud-based)
- Cloudinary account for image uploads (optional)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/recipe-sharing-app.git
   cd recipe-sharing-app
   
2. Install dependencies
- npm install

3. Set up environment variables:

- Create a .env file in the root directory and add the following variables:
  `PORT=3000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret-key>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>`

4. Run the app:

- npm start

## Usage

- Open a web browser and navigate to http://localhost:3000.

- Register an account or log in if you already have one.

- Create and share your recipes or browse recipes shared by other users.

- Enjoy exploring and sharing delicious recipes!



## Technologies

- Node.js
- Express.js
- MongoDB
- Cloudinary (for image uploads)
- JSON Web Tokens (JWT) for authentication
- Other dependencies as listed in the package.json file

  
## Contributing

- Contributions are welcome! If you find a bug or have an enhancement in mind, please open an issue or submit a pull request.

