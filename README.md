# 📚 Online Bookstore Web App  

An interactive **Bookstore Web Application** built using **Bootstrap, CSS, and JavaScript**, developed as part of the **Week 1–7 program**.  
This project demonstrates **frontend design**, **state management**, **user authentication**, and **dynamic UI rendering** using only **vanilla JavaScript + Bootstrap** (no backend server).  

---

## 🚀 Features  

### 🔐 User Management  
- Register new users (username, email, password).  
- Secure login/logout with session persistence (stored in `localStorage`).  
- User-specific cart (cart saved as `cart_username`).  

### 📖 Book Catalogue  
- Displays a collection of books with details (title, author, description, price, cover).  
- Real-time **search bar** (filter by title or author).  
- Add books to the cart directly from catalogue.  

### 🛒 Shopping Cart  
- Increase/decrease quantity.  
- Remove items.  
- Automatic total calculation.  
- Persistent cart for each user.  
- Checkout with confirmation modal.  

### 👤 User Profile (Mini Résumé)  
- Every user sees a **common résumé template** with:  
  - Name (dynamic based on user).  
  - Email.  
  - About Me, Skills, Experience, Education, Interests.  
- Styled as a professional résumé card using Bootstrap.  

### 🎨 UI/UX Enhancements  
- Responsive design with **Bootstrap grid system**.  
- **Sidebar navigation** with active state highlighting.  
- **Bootstrap Modals** for confirmation (Logout, Checkout).  
- **Bootstrap Toasts** for notifications (login success, errors, cart updates).  
- Mobile-friendly with a **sidebar toggle button**.  

---

## 🛠️ Tech Stack  

- **HTML5** – Structure  
- **CSS3 + Bootstrap 5** – Styling & Layout  
- **JavaScript (ES6)** – Logic & Interactivity  
- **LocalStorage** – Persistent data storage (users, cart, session)  

---

## 📂 Project Structure  
📦 Online-Bookstore
├── index.html # Main entry page
├── style.css # Custom styles (Bootstrap overrides)
├── script.js # All application logic (login, cart, catalogue, profile)
├── README.md # Project documentation


## 📅 Week-wise Development Progress  

### ✅ Week 1–2: HTML + CSS Foundations  
- Designed layout structure (Header, Sidebar, Main Content).  
- Added Bootstrap grid and responsive classes.  

### ✅ Week 3: Navigation & Sections  
- Implemented **sidebar navigation** with sections (Login, Register, Catalogue, Cart, Profile).  
- Highlight active section dynamically.  

### ✅ Week 4: User Authentication  
- Built **Register/Login forms** with validations.  
- Added state persistence via **localStorage**.  

### ✅ Week 5: Book Catalogue  
- Added **book dataset** (title, author, price, desc, image).  
- Displayed catalogue using Bootstrap cards.  
- Implemented **search filter**.  

### ✅ Week 6: Shopping Cart  
- Implemented **Add to Cart** functionality.  
- Quantity increase/decrease, remove items.  
- Checkout with **confirmation modal**.  

### ✅ Week 7: User Profile (Mini Résumé)  
- Created a **common résumé template** for all users.  
- Dynamic name + email from logged-in user.  
- Styled using Bootstrap components.  

---

## 📸 Screenshots  

<img width="1919" height="946" alt="Screenshot 2025-09-09 103237" src="https://github.com/user-attachments/assets/b95aba6b-14e9-41f8-8aa3-d8a564253f1d" />

---<img width="1918" height="947" alt="Screenshot 2025-09-09 103223" src="https://github.com/user-attachments/assets/6f2f28da-d3d7-4f00-bbb3-9702ed687785" />

<img width="1919" height="947" alt="Screenshot 2025-09-09 103137" src="https://github.com/user-attachments/assets/25a1caf9-fd31-4eed-83bf-a1980a6c3dd2" />

<img width="1919" height="949" alt="Screenshot 2025-09-09 103151" src="https://github.com/user-attachments/assets/f343e993-3d11-468d-9645-c7ddb5d29da6" />

<img width="1919" height="945" alt="Screenshot 2025-09-09 103207" src="https://github.com/user-attachments/assets/26acd530-93f8-4141-a1a6-8e3d6983aff2" />


## ▶️ How to Run  

1. Clone or download the project.  
2. Open `index.html` in any browser.  
3. Register a new account → Login → Explore catalogue → Add books to cart → Checkout → View Profile.  

---

## 📌 Future Improvements  
- Add **Order History** for users.  
- Enable **Download Resume as PDF** feature.  
- Improve book catalogue with categories & ratings.  
- Implement backend (Node.js/Express + Database).  

---

✍️ **Author:** Muda Rohit 
📅 **Program:** Week 1–7 (Bootstrap, CSS, JavaScript)  
