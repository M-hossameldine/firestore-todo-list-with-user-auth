# Todo App

A simple Todo web application built with React and Firebase.

## 🚀 Live Demo

[Click here to view the live demo](https://fir-9-auth-5b31f.web.app/todos)

## 🛠 Technologies Used

- **Frontend**: React, React-Router-Dom, Vite, Ant Design
- **Backend**: Firebase Authentication
- **Database**: Firebase Firestore
- **Hosting**: Firebase Hosting

## 📌 Features

- User authentication (Sign up, Login, Logout)
- CRUD operations on todos (Add, Edit, Delete, Retrieve)
- Secure Firestore database access with rules

## 📂 Setup Instructions

1. **Clone this repository**

   ```bash
   git clone https://github.com/YOUR_GITHUB_USERNAME/todo-app.git
   cd todo-app
   ```

2. **Install Dependencies**

   ```
   npm install
   ```

3. **Handle Environment Variables For local development**

   Inside your project, create a .env file and add your Firebase config:

   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Handle Environment Variables for Production (Hosting)**

- These secrets should be added to GitHub **Actions → Repository Settings → Secrets and Variables → Actions**.
- Required Secrets
  ```
  - FIREBASE_API_KEY
  - FIREBASE_AUTH_DOMAIN
  - FIREBASE_PROJECT_ID
  - FIREBASE_STORAGE_BUCKET
  - FIREBASE_MESSAGING_SENDER_ID
  - FIREBASE_APP_ID
  ```

## Scripts

- `dev`/`start` - start dev server and open browser
- `build` - build for production
- `preview` - locally preview production build
- `test` - launch test runner
