document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();

  // Smooth scrolling for navigation links
  document.querySelectorAll('a.nav-link, .hero .btn, .btn-ghost').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust for fixed header height
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Sample Product Categories Data
  const sampleProductCategories = [
    {
      id: 'notebooks',
      name: 'Notebooks & Journals',
      description: 'Capture your thoughts on premium paper. From minimalist designs to luxurious leather-bound journals.',
      image: 'https://picsum.photos/400/300?random=10',
      priceRange: '₹199 - ₹1,499'
    },
    {
      id: 'pens',
      name: 'Pens & Writing Tools',
      description: 'Find your perfect writing companion. Gel pens, fountain pens, rollerballs, and fine liners.',
      image: 'https://picsum.photos/400/300?random=11',
      priceRange: '₹99 - ₹2,999'
    },
    {
      id: 'art-supplies',
      name: 'Art & Craft Supplies',
      description: 'Unleash your creativity with our range of watercolours, sketchbooks, brushes, and drawing tools.',
      image: 'https://picsum.photos/400/300?random=12',
      priceRange: '₹299 - ₹3,499'
    },
    {
      id: 'office-essentials',
      name: 'Office & Desk Essentials',
      description: 'Organize your workspace with stylish and functional desk accessories, files, and planners.',
      image: 'https://picsum.photos/400/300?random=13',
      priceRange: '₹149 - ₹1,899'
    },
    {
      id: 'calligraphy',
      name: 'Calligraphy & Lettering',
      description: 'Start your journey into the beautiful art of calligraphy with our specialized pens, inks, and guides.',
      image: 'https://picsum.photos/400/300?random=14',
      priceRange: '₹499 - ₹2,499'
    }
  ];

  // Function to render product categories
  const renderProductCategories = () => {
    const productCategoriesGrid = document.getElementById('productCategoriesGrid');
    const emptyCategories = document.getElementById('emptyCategories');
    let categories = JSON.parse(localStorage.getItem('productCategories')) || [];

    if (categories.length === 0) {
      // If no categories, populate with samples and save
      categories = sampleProductCategories;
      localStorage.setItem('productCategories', JSON.stringify(categories));
    }

    productCategoriesGrid.innerHTML = ''; // Clear existing content

    if (categories.length > 0) {
      emptyCategories.style.display = 'none';
      categories.forEach((category, index) => {
        const card = document.createElement('div');
        card.classList.add('card', 'product-card', 'animate');
        card.style.animationDelay = `${0.25 + index * 0.1}s`; // Stagger animation
        card.innerHTML = `
          <img src="${category.image}" alt="${category.name}" onerror="this.style.display='none'">
          <h3>${category.name}</h3>
          <p class="text-2">${category.description}</p>
          <span class="price">${category.priceRange}</span>
          <button class="btn">View Category</button>
        `;
        productCategoriesGrid.appendChild(card);
      });
    } else {
      emptyCategories.style.display = 'flex';
    }
  };

  renderProductCategories(); // Initial render of product categories

  // Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        formStatus.textContent = 'Please fill in all fields.';
        formStatus.className = 'form-status error';
        formStatus.style.display = 'block';
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        formStatus.textContent = 'Please enter a valid email address.';
        formStatus.className = 'form-status error';
        formStatus.style.display = 'block';
        return;
      }

      // Simulate form submission
      formStatus.textContent = 'Sending message...';
      formStatus.className = 'form-status';
      formStatus.style.display = 'block';

      setTimeout(() => {
        // In a real app, you'd send this data to a server
        console.log('Contact Form Submitted:', { name, email, message });
        formStatus.textContent = 'Thank you for your message! We will get back to you soon.';
        formStatus.className = 'form-status success';
        contactForm.reset(); // Clear form
      }, 1500);
    });
  }
});