# QuickDeal: Full-Stack Marketplace Platform 🛒

A full-stack web application for buying and selling products, similar to OLX. It features a secure REST API backend built with Node.js/Express and a responsive frontend built with React.

---

### ✨ Key Features

* **Secure User Authentication:** Implemented JWT-based authentication and authorization for secure user sessions and protected routes.
* **Product Listings:** Full CRUD (Create, Read, Update, Delete) functionality for product listings.
* **Image Uploads:** Allows users to upload product images which are processed and stored by the backend.
* **RESTful API:** A well-structured API for seamless communication between the frontend and backend.
* **Responsive Design:** A clean, modern UI that is fully responsive and works across all devices.

---

### 🛠️ Tech Stack

| Category         | Technology                               |
| :--------------- | :--------------------------------------- |
| **Frontend** | React, React Router, Axios               |
| **Backend** | Node.js, Express.js                      |
| **Database** | PostgreSQL / MongoDB *(Update with the one you used)* |
| **Authentication** | JSON Web Tokens (JWT), bcrypt.js         |

---

### ⚙️ Setup and Installation

To run this project locally:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Pvk1294/QuickDeal.git](https://github.com/Pvk1294/QuickDeal.git)
    cd QuickDeal
    ```

2.  **Setup the Backend:**
    ```bash
    cd server
    npm install
    
    # Create a .env file from the example
    cp .env.example .env
    
    # Add your database URL and JWT secret to the new .env file
    npm run dev
    ```

3.  **Setup the Frontend:**
    ```bash
    # Open a new terminal window
    cd client
    npm install
    npm start
    ```
