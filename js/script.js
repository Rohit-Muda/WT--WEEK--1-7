(() => {
  // Books Data
  const books = [
    {id: 1, name: 'The Night Circus', author: 'Erin Morgenstern', price: 12.99, desc: 'A magical competition between two young illusionists.', img: 'https://images-na.ssl-images-amazon.com/images/I/91uJ0H38ZiL.jpg'},
    {id: 2, name: 'The Name of the Wind', author: 'Patrick Rothfuss', price: 15.49, desc: 'The story of a magically gifted young man.', img: 'https://images-na.ssl-images-amazon.com/images/I/81sxwWhE36L.jpg'},
    {id: 3, name: 'Dune', author: 'Frank Herbert', price: 14.00, desc: 'Epic science fiction saga on desert planet.', img: 'https://images-na.ssl-images-amazon.com/images/I/91Vok7yEkdL.jpg'},
    {id: 4, name: 'The Hobbit', author: 'J.R.R. Tolkien', price: 10.99, desc: 'A classic fantasy adventure.', img: 'https://images-na.ssl-images-amazon.com/images/I/91b0C2YNSrL.jpg'},
    {id: 5, name: '1984', author: 'George Orwell', price: 8.99, desc: 'Dystopian novel about surveillance and control.', img: 'https://images-na.ssl-images-amazon.com/images/I/71kxa1-0mfL.jpg'}
  ];

  // Elements
  const mainContent = document.getElementById('main-content');
  const navLinks = document.querySelectorAll('#sidebar a[data-section]');
  const userPanel = document.getElementById('user-panel');
  const logoutLink = document.getElementById('logout-link');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const toastEl = document.getElementById('toast');
  const toastBody = toastEl.querySelector('.toast-body');
  const toast = new bootstrap.Toast(toastEl);
  const modalEl = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalMessage = document.getElementById('modal-message');
  const modalConfirmBtn = document.getElementById('modal-confirm-btn');
  const modalCancelBtn = document.getElementById('modal-cancel-btn');
  const modal = new bootstrap.Modal(modalEl);
  let modalCallback = null;

  // State
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  let currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');

  function saveState() {
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('cart', JSON.stringify(cart));
    updateUserPanel();
  }

  function showToast(message) {
    toastBody.textContent = message;
    toast.show();
  }

  function confirmAction(title, message, callback) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modal.show();
    modalCallback = callback;
  }

  modalConfirmBtn.onclick = () => {
    if (modalCallback) modalCallback(true);
    modal.hide();
  };
  modalCancelBtn.onclick = () => {
    if (modalCallback) modalCallback(false);
    modal.hide();
  };

  function updateUserPanel() {
    if (currentUser) {
      userPanel.innerHTML = `Hello, <strong>${currentUser.name}</strong> | <button class="btn btn-sm btn-danger" id="logout-btn">Logout</button>`;
      logoutLink.style.display = 'block';
      navLinks.forEach(link => {
        if (['login','register'].includes(link.dataset.section)) {
          link.style.display = 'none';
        } else {
          link.style.display = 'block';
        }
      });
      document.getElementById('logout-btn').onclick = () => {
        confirmAction('Logout', 'Are you sure?', confirmed => {
          if (confirmed) {
            currentUser = null;
            cart = [];
            saveState();
            loadSection('login');
            showToast('Logged out successfully');
          }
        });
      };
    } else {
      userPanel.textContent = 'You are not logged in';
      logoutLink.style.display = 'none';
      navLinks.forEach(link => {
        if (['login','register'].includes(link.dataset.section)) {
          link.style.display = 'block';
        } else {
          link.style.display = 'none';
        }
      });
    }
  }

  function highlightNav(section) {
    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.section === section);
    });
  }

  function loadSection(section) {
    highlightNav(section);
    switch (section) {
      case 'login': renderLogin(); break;
      case 'register': renderRegister(); break;
      case 'catalogue': renderCatalogue(); break;
      case 'cart': renderCart(); break;
      case 'profile': renderProfile(); break;
      default: renderLogin();
    }
  }

  // Renders
  function renderLogin() {
    if (currentUser) return loadSection('catalogue');
    mainContent.innerHTML = `
      <h2>Login</h2>
      <form class="card p-3 shadow-sm" id="login-form">
        <div class="mb-3">
          <label class="form-label">Username</label>
          <input class="form-control" name="username" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input type="password" class="form-control" name="password" required>
        </div>
        <button class="btn btn-danger w-100">Login</button>
      </form>
    `;
    document.getElementById('login-form').onsubmit = e => {
      e.preventDefault();
      const {username, password} = e.target;
      const user = users.find(u => u.name.toLowerCase() === username.value.toLowerCase());
      if (!user) return showToast('User not found');
      if (user.password !== password.value) return showToast('Incorrect password');
      currentUser = {...user};
      cart = JSON.parse(localStorage.getItem(`cart_${currentUser.name}`) || '[]');
      saveState();
      showToast('Login successful');
      loadSection('catalogue');
    };
  }

  function renderRegister() {
    if (currentUser) return loadSection('catalogue');
    mainContent.innerHTML = `
      <h2>Register</h2>
      <form class="card p-3 shadow-sm" id="register-form">
        <div class="mb-3">
          <label class="form-label">Username</label>
          <input class="form-control" name="username" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input type="email" class="form-control" name="email">
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input type="password" class="form-control" name="password" required>
        </div>
        <button class="btn btn-danger w-100">Register</button>
      </form>
    `;
    document.getElementById('register-form').onsubmit = e => {
      e.preventDefault();
      const {username, email, password} = e.target;
      if (users.find(u => u.name.toLowerCase() === username.value.toLowerCase())) return showToast('Username already taken');
      if (username.value.length < 3) return showToast('Username must be at least 3 characters');
      if (password.value.length < 6) return showToast('Password must be at least 6 characters');
      const newUser = {name: username.value, email: email.value || null, password: password.value};
      users.push(newUser);
      currentUser = {...newUser};
      cart = [];
      saveState();
      showToast('Registration successful');
      loadSection('catalogue');
    };
  }

  function renderCatalogue() {
    if (!currentUser) return loadSection('login');
    mainContent.innerHTML = `
      <h2>Book Catalogue</h2>
      <input class="form-control mb-3" id="search-input" placeholder="Search books...">
      <div id="books-list"></div>
    `;
    const searchInput = document.getElementById('search-input');
    const booksList = document.getElementById('books-list');
    function renderBooks(filter = '') {
      const filtered = books.filter(b =>
        b.name.toLowerCase().includes(filter.toLowerCase()) ||
        b.author.toLowerCase().includes(filter.toLowerCase())
      );
      booksList.innerHTML = filtered.map(book => `
        <div class="book-item">
          <h5>${book.name}</h5>
          <p><em>${book.author}</em></p>
          <p>${book.desc}</p>
          <p><strong>$${book.price.toFixed(2)}</strong></p>
          <button class="btn btn-danger btn-sm" data-id="${book.id}">Add to Cart</button>
        </div>
      `).join('');
      booksList.querySelectorAll('button').forEach(btn => {
        btn.onclick = () => addToCart(parseInt(btn.dataset.id));
      });
    }
    renderBooks();
    searchInput.oninput = () => renderBooks(searchInput.value);
  }

  function addToCart(id) {
    const book = books.find(b => b.id === id);
    if (!book) return;
    const existing = cart.find(item => item.book.id === id);
    if (existing) existing.qty++; else cart.push({book, qty: 1});
    localStorage.setItem(`cart_${currentUser.name}`, JSON.stringify(cart));
    saveState();
    showToast(`Added ${book.name}`);
  }

  function renderCart() {
    if (!currentUser) return loadSection('login');
    mainContent.innerHTML = `
      <h2>Your Cart</h2>
      ${cart.length === 0 ? '<p>Your cart is empty.</p>' : `
        <table class="table table-dark table-striped align-middle">
          <thead>
            <tr><th>Book</th><th>Price</th><th>Qty</th><th>Total</th><th></th></tr>
          </thead>
          <tbody>
            ${cart.map(item => `
              <tr data-id="${item.book.id}">
                <td>${item.book.name}</td>
                <td>$${item.book.price.toFixed(2)}</td>
                <td>
                  <button class="btn btn-sm btn-secondary qty-btn" data-action="decrease">-</button>
                  ${item.qty}
                  <button class="btn btn-sm btn-secondary qty-btn" data-action="increase">+</button>
                </td>
                <td>$${(item.book.price*item.qty).toFixed(2)}</td>
                <td><button class="btn btn-sm btn-danger remove-btn">Remove</button></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <p><strong>Total: $${cart.reduce((sum,i)=>sum+i.book.price*i.qty,0).toFixed(2)}</strong></p>
        <button class="btn btn-success" id="checkout-btn">Checkout</button>
      `}
    `;
    if (cart.length) {
      mainContent.querySelector('tbody').onclick = e => {
        const tr = e.target.closest('tr'); if (!tr) return;
        const bookId = parseInt(tr.dataset.id);
        const item = cart.find(i => i.book.id === bookId);
        if (e.target.classList.contains('qty-btn')) {
          if (e.target.dataset.action === 'increase') item.qty++; else item.qty = Math.max(1, item.qty-1);
          localStorage.setItem(`cart_${currentUser.name}`, JSON.stringify(cart));
          saveState(); renderCart();
        }
        if (e.target.classList.contains('remove-btn')) {
          cart = cart.filter(i => i.book.id !== bookId);
          localStorage.setItem(`cart_${currentUser.name}`, JSON.stringify(cart));
          saveState(); renderCart(); showToast('Removed from cart');
        }
      };
      document.getElementById('checkout-btn').onclick = () => {
        confirmAction('Checkout', 'Confirm purchase?', confirmed => {
          if (confirmed) {
            cart = [];
            localStorage.setItem(`cart_${currentUser.name}`, JSON.stringify(cart));
            saveState(); renderCart(); showToast('Purchase successful');
          }
        });
      };
    }
  }

    function renderProfile() {
  if (!currentUser) return loadSection('login');
  mainContent.innerHTML = `
    <h2>User Profile</h2>
    <div class="card bg-dark text-light p-4 shadow-sm">
      <h3 class="text-danger mb-3">${currentUser.name}</h3>
      <p><strong>Email:</strong> ${currentUser.email || 'Not provided'}</p>
      <hr>
      <h5 class="text-warning">About Me</h5>
      <p>Motivated and passionate developer with an interest in building scalable applications and exploring new technologies.</p>
      <hr>
      <h5 class="text-warning">Skills</h5>
      <ul>
        <li>JavaScript, HTML, CSS, Bootstrap</li>
        <li>React, Node.js, Express</li>
        <li>Data Structures & Algorithms</li>
        <li>Database Management (MySQL, MongoDB)</li>
      </ul>
      <hr>
      <h5 class="text-warning">Experience</h5>
      <p>Worked on academic and personal projects, including e-commerce applications, data analysis tools, and web automation scripts. Strong teamwork and problem-solving skills with an eagerness to learn.</p>
      <hr>
      <h5 class="text-warning">Education</h5>
      <p>B.Tech in Computer Science and Engineering (Specialization in Data Science)</p>
      <hr>
      <h5 class="text-warning">Interests</h5>
      <p>Artificial Intelligence, Machine Learning, Web Development, Open Source Contributions</p>
    </div>
  `;
}
  // Sidebar toggle (for small screens)
  sidebarToggle.onclick = () => {
    document.getElementById('sidebar').classList.toggle('d-none');
  };

  // Navigation
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const section = link.dataset.section;
      loadSection(section);
    });
  });

  // Logout link (duplicate shortcut)
  logoutLink.addEventListener('click', e => {
    e.preventDefault();
    if (currentUser) {
      confirmAction('Logout', 'Are you sure?', confirmed => {
        if (confirmed) {
          currentUser = null;
          cart = [];
          saveState();
          loadSection('login');
          showToast('Logged out successfully');
        }
      });
    }
  });

  // Init
  updateUserPanel();
  loadSection(currentUser ? 'catalogue' : 'login');
})();