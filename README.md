
# 🎥 FilmBaz - Movie Recommender Setup Guide

This guide provides step-by-step instructions to set up the backend and frontend components of the **FilmBaz Movie Recommender** project.

---

## 📋 Prerequisites

Ensure you have the following tools installed before proceeding:

- **Python**: Version 3.8+ for the backend.
- **Node.js**: Version 14+ for the frontend.
- **Code Editor**: (Optional) A code editor like **Visual Studio Code** for an enhanced development experience.

---

## ⚙️ Backend Setup

1. **Navigate to the Backend Folder**:
   - Open the folder in your preferred code editor (e.g., VS Code).

2. **Run the Movie Recommender Notebook**:
   - Open the `MovieRecommender.ipynb` file in a Jupyter Notebook environment or within VS Code.
   - Download the dataset from [Kaggle](https://www.kaggle.com/datasets/aayushsoni4/tmdb-6000-movie-dataset-with-ratings).
   - Place the dataset in the specified directory as mentioned in the notebook.
   - Execute the notebook cells to generate the `movie_list.pkl` and `similarity.pkl` files.

3. **Install Required Dependencies**:
   Run the following commands in your terminal to install the necessary Python packages:
   ```bash
   pip install pickle5
   pip install pandas
   pip install requests
   pip install fastapi
   pip install uvicorn
   ```

4. **Start the Backend Server**:
   Use the following command to run the backend server:
   ```bash
   uvicorn main:app --reload
   ```

---

## 🌐 Frontend Setup

1. **Navigate to the Frontend Folder**:
   - Open a terminal and change to the `frontend` directory.

2. **Install Dependencies**:
   Run the following command to install the required Node.js packages:
   ```bash
   npm i
   ```

3. **Start the Frontend Server**:
   Launch the frontend server using:
   ```bash
   npm run dev
   ```

4. **Access the Frontend**:
   - Open your browser and navigate to: [http://localhost:3000](http://localhost:3000).

---

## 🚀 Project Ready!

Once both the backend and frontend servers are running:
- The **backend** will handle movie recommendations and data processing.
- The **frontend** will provide a user-friendly interface for interacting with the recommender system.

---

Feel free to reach out for any questions or contributions! 😊
