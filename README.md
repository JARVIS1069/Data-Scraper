
# 📘 Book Data Scraper

This is a web-based **Book Data Scraper** built with a Vite + Tailwind frontend and a Flask backend using Selenium. The application scrapes book information such as title, price, and link from an online bookstore and displays the results in a clean, responsive UI with animation and live status updates.

## 🌐 Live Demo

👉 [Visit the Website](https://resonant-sorbet-4c146c.netlify.app/)  
_(hosted on Netlify)_

## 🚀 Features

- Beautiful, animated frontend built with Vite + TailwindCSS
- Scraping trigger button with status feedback
- Live scraping animation
- Table preview of scraped book data
- Download scraped data as a CSV
- Flask backend using Selenium for automated scraping

## 🖼️ UI Preview

![Book Scraper Screenshot](./screenshot.png) <!-- Optional: replace with actual image path -->

## 📦 Tech Stack

- **Frontend**: Vite + Tailwind CSS + JavaScript
- **Backend**: Python Flask
- **Scraping**: Selenium WebDriver
- **Hosting**: Netlify (Frontend), Render (optional for Backend)

## 📁 Project Structure

```
├── backend/
│   ├── app.py               # Flask server
│   ├── scraper.py           # Selenium scraping logic
│   └── books.csv            # Output CSV
├── frontend/
│   ├── index.html
│   ├── src/
│   ├── tailwind.config.js
│   └── ...
├── README.md
```

## ⚙️ How to Run Locally

### Prerequisites
- Python 3.x
- Node.js + npm

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Backend Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 3. Install Frontend Dependencies
```bash
cd frontend
npm install
```

### 4. Run the App
- Start Flask server:
```bash
cd backend
python app.py
```
- In a separate terminal, run the frontend:
```bash
cd frontend
npm run dev
```

Then visit `http://localhost:5173`

## 📄 License

MIT License. Free to use and modify.

---

### 📬 Contact

Feel free to raise issues or contribute!
