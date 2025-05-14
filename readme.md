# Fialho Gym 💪🏻

Welcome to **Fialho Gym**, a full-stack project designed to support your fitness journey.  
It includes a mobile application developed with [Expo](https://expo.dev/) and a backend API built with [Express](https://expressjs.com/).

## 📁 Project Structure

```
fialho-gym/
├── mobile/         # React Native app (Expo)
└── api/            # Node.js backend with Express
```

---

## 📱 Mobile (React Native + Expo)

### 📞 Technologies Used

- [Expo](https://expo.dev/) - Framework for developing React Native applications.
- [React Native](https://reactnative.dev/) - Library for building native mobile interfaces.
- [Gluestack](https://gluestack.io/) - Component library for a scalable and accessible UI.
- [Roboto Font](https://fonts.google.com/specimen/Roboto) - Custom font for a better visual experience.

### 🚀 How to Run the Mobile App

1. **Navigate to the `mobile` folder:**

   ```sh
   cd mobile
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Run the app:**

   ```sh
   npx expo start
   ```

---

## 🔗 API (Node.js + Express)

### ⚙️ Technologies Used

- [Express](https://expressjs.com/) - Web framework for Node.js.
- [SQLite](https://www.sqlite.org/) - Lightweight relational database.
- [Knex.js](https://knexjs.org/) - SQL query builder.
- [JWT](https://jwt.io/) - Authentication with JSON Web Tokens.
- [Multer](https://github.com/expressjs/multer) - Middleware for handling file uploads.
- [Swagger UI Express](https://www.npmjs.com/package/swagger-ui-express) - API documentation.
- [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js) - Password hashing.
- [Day.js](https://day.js.org/) - Date utility library.
- [UUID](https://www.npmjs.com/package/uuid) - Unique ID generator.

### 🚀 How to Run the API

1. **Navigate to the `api` folder:**

   ```sh
   cd api
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Run database migrations:**

   ```sh
   npm run migrate
   ```

4. **(Optional) Seed the database with sample data:**

   ```sh
   npm run seed
   ```

5. **Start the server:**

   - In development mode with Nodemon:

     ```sh
     npm run dev
     ```

   - Or in production mode:

     ```sh
     npm start
     ```

---

## 📌 Planned Features

- 📋 Workout management
- 📊 Progress tracking
- 🏅 Personalized exercise plans
- 🎯 Fitness goal setting

---

## 🛠️ Contributing

This project is under development, and all contributions are welcome!  
If you'd like to help, feel free to open an _issue_ or submit a _pull request_.

---

## 📝 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

**Stay tuned!** New updates are on the way. 🚀
