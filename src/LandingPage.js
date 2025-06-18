import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "aos/dist/aos.css";

const LandingPage = () => {
  useEffect(() => {
    import("aos").then(AOS => {
      AOS.init({ once: true });
    });
  }, []);

  // Stat animation
  useEffect(() => {
    const animateStats = () => {
      const stats = document.querySelectorAll(".stat-number");
      stats.forEach(stat => {
        const target = +stat.getAttribute("data-target");
        let count = 0;
        const increment = target / 100;
        const updateCount = () => {
          count += increment;
          if (count < target) {
            stat.textContent = Math.ceil(count);
            requestAnimationFrame(updateCount);
          } else {
            stat.textContent = target.toLocaleString();
          }
        };
        updateCount();
      });
    };
    animateStats();
  }, []);

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <i className="fas fa-home-user"></i> HomeManager
        </div>
        <div className="nav-buttons">
          <Link to="/login">
            <i className="fas fa-sign-in-alt"></i> Log in
          </Link>
          <Link to="/register" className="signup">
            <i className="fas fa-user-plus"></i> Sign up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div
            className="hero-text"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            <h1>
              Manage Your Home{" "}
              <span className="highlight">Smarter</span>
            </h1>
            <p>
              All your home information in one place - organized, accessible, and effortless.
            </p>
            <div className="hero-buttons">
              <Link to="/register" className="primary-btn">
                <i className="fas fa-rocket"></i> Get Started
              </Link>
              <a href="#about" className="secondary-btn">
                <i className="fas fa-info-circle"></i> Learn More
              </a>
            </div>
          </div>
          <div
            className="hero-image"
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="300"
          >
            <img
              src="https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Smart Home"
            />
          </div>
        </div>
        <div className="wave-container">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stat-container" data-aos="fade-up" data-aos-delay="100">
          <i className="fas fa-users"></i>
          <div className="stat-number" data-target="15000">0</div>
          <p>Happy Users</p>
        </div>
        <div className="stat-container" data-aos="fade-up" data-aos-delay="200">
          <i className="fas fa-home"></i>
          <div className="stat-number" data-target="25000">0</div>
          <p>Homes Managed</p>
        </div>
        <div className="stat-container" data-aos="fade-up" data-aos-delay="300">
          <i className="fas fa-tasks"></i>
          <div className="stat-number" data-target="500000">0</div>
          <p>Tasks Completed</p>
        </div>
        <div className="stat-container" data-aos="fade-up" data-aos-delay="400">
          <i className="fas fa-clock"></i>
          <div className="stat-number" data-target="1000000">0</div>
          <p>Hours Saved</p>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="about">
        <div className="about-content">
          <div className="about-image" data-aos="fade-right">
            <img
              src="https://images.unsplash.com/photo-1558882224-dda166733046?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="About HomeManager"
            />
          </div>
          <div className="about-text" data-aos="fade-left">
            <h2>
              About <span className="highlight">HomeManager</span>
            </h2>
            <p>
              HomeManager is your all-in-one platform for managing household information, keeping everything organized and stress-free. Our intuitive system helps homeowners track everything from room inventories to maintenance schedules.
            </p>
            <p>
              Born from the need to simplify home management, our platform brings together all aspects of home ownership in one accessible place.
            </p>
            <a href="#features" className="text-btn">
              Explore our features <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <h2>
          Powerful <span className="highlight">Features</span>
        </h2>
        <p className="section-subtitle">
          Everything you need to manage your home efficiently
        </p>
        <div className="feature-list">
          <div className="feature-item" data-aos="zoom-in" data-aos-delay="100">
            <div className="feature-icon">
              <i className="fas fa-door-open"></i>
            </div>
            <h3>Room Management</h3>
            <p>
              Add, edit, and track all the rooms in your home with detailed inventories and floor plans.
            </p>
          </div>
          <div className="feature-item" data-aos="zoom-in" data-aos-delay="200">
            <div className="feature-icon">
              <i className="fas fa-lightbulb"></i>
            </div>
            <h3>Appliance Tracking</h3>
            <p>
              Monitor appliance details like warranties, repairs, energy use, and replacement schedules.
            </p>
          </div>
          <div className="feature-item" data-aos="zoom-in" data-aos-delay="300">
            <div className="feature-icon">
              <i className="fas fa-file-invoice-dollar"></i>
            </div>
            <h3>Bill Reminders</h3>
            <p>
              Never miss a payment with automatic reminders for utilities, mortgage, and maintenance fees.
            </p>
          </div>
          <div className="feature-item" data-aos="zoom-in" data-aos-delay="400">
            <div className="feature-icon">
              <i className="fas fa-tools"></i>
            </div>
            <h3>Maintenance Logs</h3>
            <p>
              Keep detailed records of home repairs, renovations, and regular maintenance tasks.
            </p>
          </div>
          <div className="feature-item" data-aos="zoom-in" data-aos-delay="500">
            <div className="feature-icon">
              <i className="fas fa-calendar-alt"></i>
            </div>
            <h3>Scheduling</h3>
            <p>
              Organize cleaning schedules, maintenance tasks, and home improvement projects.
            </p>
          </div>
          <div className="feature-item" data-aos="zoom-in" data-aos-delay="600">
            <div className="feature-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3>Home Analytics</h3>
            <p>
              Track expenses, energy usage, and maintenance trends to optimize your home's efficiency.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>
          What Our <span className="highlight">Users Say</span>
        </h2>
        <div className="testimonial-container">
          <div className="testimonial" data-aos="fade-up">
            <div className="testimonial-text">
              <i className="fas fa-quote-left"></i>
              <p>
                HomeManager has completely transformed how I manage my household. Everything is organized and accessible, saving me hours each week.
              </p>
            </div>
            <div className="testimonial-author">
              <img src="https://randomuser.me/api/portraits/women/24.jpg" alt="Sarah Johnson" />
              <div>
                <h4>Sarah Johnson</h4>
                <p>Homeowner</p>
              </div>
            </div>
          </div>
          <div className="testimonial" data-aos="fade-up" data-aos-delay="200">
            <div className="testimonial-text">
              <i className="fas fa-quote-left"></i>
              <p>
                The maintenance tracking feature has saved me thousands in preventative repairs. I can't imagine managing my home without this tool.
              </p>
            </div>
            <div className="testimonial-author">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Mark Williams" />
              <div>
                <h4>Mark Williams</h4>
                <p>Property Manager</p>
              </div>
            </div>
          </div>
          <div className="testimonial" data-aos="fade-up" data-aos-delay="400">
            <div className="testimonial-text">
              <i className="fas fa-quote-left"></i>
              <p>
                As someone who manages multiple properties, HomeManager has been a game-changer for keeping everything organized and well-maintained.
              </p>
            </div>
            <div className="testimonial-author">
              <img src="https://randomuser.me/api/portraits/women/48.jpg" alt="Lisa Chen" />
              <div>
                <h4>Lisa Chen</h4>
                <p>Real Estate Investor</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta" data-aos="zoom-in">
        <h2>Ready to simplify your home management?</h2>
        <p>Join thousands of homeowners who are saving time and reducing stress.</p>
        <Link to="/register" className="cta-button">Get Started Today</Link>
      </section>

      {/* Contact Section */}
      <section className="contact">
        <h2>
          Get In <span className="highlight">Touch</span>
        </h2>
        <div className="contact-container">
          <div className="contact-info" data-aos="fade-right">
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <div>
                <h3>Email</h3>
                <p>support@homemanager.com</p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <div>
                <h3>Phone</h3>
                <p>+123 456 7890</p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <h3>Address</h3>
                <p>123 Main Street, Cityville, State 12345</p>
              </div>
            </div>
            <div className="social-links">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
          <div className="contact-form" data-aos="fade-left">
            <form>
              <div className="form-group">
                <input type="text" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <input type="text" placeholder="Subject" />
              </div>
              <div className="form-group">
                <textarea placeholder="Your Message" rows="5" required></textarea>
              </div>
              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <i className="fas fa-home-user"></i> HomeManager
            <p>Smart home management made simple.</p>
          </div>
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h3>Legal</h3>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 HomeManager. All rights reserved.</p>
        </div>
      </footer>

      {/* All styles */}
      <style>
        {`
:root {
  --primary-color: #41644a;
  --primary-light: #71a37b;
  --primary-dark: #263a2d;
  --secondary-color: #e9b384;
  --text-dark: #252525;
  --text-light: #6b6b6b;
  --background-light: #f6f5f0;
  --white: #ffffff;
  --off-white: #f9f8f4;
  --gray-100: #f1f0ea;
  --gray-200: #e2e1d7;
  --shadow-sm: 0 1px 2px 0 rgba(0,0,0,0.05);
  --shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
  --border-radius: 0; 
  --transition: all 0.3s ease;
}

body {
  font-family: 'Poppins', sans-serif;
  color: var(--text-dark);
  line-height: 1.7;
  background-color: var(--background-light);
}
  
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
  
html {
  scroll-behavior: smooth;
}
  

  
a {
  text-decoration: none;
  color: inherit;
}
  
h1, h2, h3, h4 {
  line-height: 1.2;
  font-weight: 600;
}
  
h1 {
  font-size: 3.5rem;
  font-weight: 700;
  letter-spacing: -1px;
}
  
h2 {
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  letter-spacing: -0.5px;
}
  
.highlight {
  color: var(--secondary-color);
  position: relative;
}
  
.highlight::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 5px;
  background-color: rgba(233, 179, 132, 0.3);
  bottom: 4px;
  left: 0;
  z-index: -1;
}
  
.section-subtitle {
  color: var(--text-light);
  margin-bottom: 2rem;
  font-size: 1.1rem;
}
  
/* Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 8%;
  background-color: transparent;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}
  
.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--white);
  display: flex;
  align-items: center;
}
  
.logo i {
  margin-right: 0.5rem;
  font-size: 1.8rem;
}
  
.nav-buttons a {
  margin-left: 20px;
  color: var(--white);
  font-weight: 500;
  font-size: 1rem;
  transition: var(--transition);
}
  
.nav-buttons a:hover {
  color: var(--secondary-color);
}
  
.nav-buttons a i {
  margin-right: 5px;
}
  
.nav-buttons .signup {
  padding: 8px 16px;
  background-color: var(--white);
  color: var(--primary-color);
  border-radius: 0;
  font-weight: 500;
}
  
.nav-buttons .signup:hover {
  background-color: var(--secondary-color);
  color: var(--primary-dark);
  transform: translateY(-2px);
}
  
/* Hero Section */
.hero {
  background: linear-gradient(135deg, var(--primary-dark), var(--primary-color));
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}
  
.hero-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8% 8%;
  max-width: 1400px;
  margin: 0 auto;
}
  
.hero-text {
  flex: 1;
  color: var(--white);
  max-width: 600px;
}
  
.hero-text p {
  font-size: 1.2rem;
  margin: 1.5rem 0;
  opacity: 0.9;
}
  
.hero-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}
  
.primary-btn {
  padding: 12px 28px;
  background-color: var(--secondary-color);
  color: var(--primary-dark);
  border-radius: 0;
  font-weight: 500;
  transition: var(--transition);
  display: inline-flex;
  align-items: center;
}
  
.primary-btn i {
  margin-right: 8px;
}
  
.primary-btn:hover {
  background-color: var(--white);
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}
  
.secondary-btn {
  padding: 12px 28px;
  background-color: transparent;
  color: var(--white);
  border: 1px solid var(--white);
  border-radius: 0;
  font-weight: 500;
  transition: var(--transition);
  display: inline-flex;
  align-items: center;
}
  
.secondary-btn i {
  margin-right: 8px;
}
  
.secondary-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}
  
.hero-image {
  flex: 1;
  margin-left: 3rem;
  position: relative;
}
  
.hero-image img {
  width: 100%;
  max-width: 600px;
  border-radius: 0;
  box-shadow: var(--shadow-lg);
}
  
.wave-container {
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 100%;
}
  
/* Stats Section */
.stats {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 5rem 8%;
  background-color: var(--off-white);
  text-align: center;
}
  
.stat-container {
  flex: 1;
  min-width: 200px;
  padding: 1.5rem;
  transition: var(--transition);
}

.stat-container:hover {
  transform: translateY(-10px);
}
  
.stat-container i {
  font-size: 3rem;
  color: var(--secondary-color);
  margin-bottom: 1rem;
}
  
.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}
  
.stat-container p {
  color: var(--text-light);
  font-size: 1.1rem;
}
  
/* About Section */
.about {
  padding: 5rem 8%;
  background-color: var(--white);
}
  
.about-content {
  display: flex;
  align-items: center;
  gap: 4rem;
  max-width: 1200px;
  margin: 0 auto;
}
  
.about-image {
  flex: 1;
}
  
.about-image img {
  width: 100%;
  border-radius: 0;
  box-shadow: var(--shadow);
}
  
.about-text {
  flex: 1;
}
  
.about-text p {
  margin-bottom: 1.5rem;
  color: var(--text-light);
  font-size: 1.1rem;
}
  
.text-btn {
  color: var(--primary-color);
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  transition: var(--transition);
}
  
.text-btn i {
  margin-left: 8px;
  transition: var(--transition);
}
  
.text-btn:hover {
  color: var(--secondary-color);
}
  
.text-btn:hover i {
  transform: translateX(5px);
}
  
/* Features Section */
.features {
  padding: 5rem 8%;
  text-align: center;
  background-color: var(--background-light);
}
  
.feature-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
}
  
.feature-item {
  background-color: var(--white);
  border-radius: 0;
  padding: 2rem;
  width: 300px;
  box-shadow: var(--shadow);
  transition: var(--transition);
  position: relative;
  z-index: 1;
  border: 1px solid transparent;
  overflow: hidden;
}
  
.feature-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  opacity: 0;
  transition: var(--transition);
  z-index: -1;
}
  
.feature-item:hover {
  transform: translateY(-10px);
  border-color: var(--secondary-color);
}
  
.feature-item:hover::before {
  opacity: 1;
}
  
.feature-item:hover {
  color: var(--white);
}
  
.feature-icon {
  font-size: 3rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  transition: var(--transition);
}
  
.feature-item:hover .feature-icon {
  color: var(--white);
}
  
.feature-item h3 {
  margin-bottom: 1rem;
  font-size: 1.4rem;
  transition: var(--transition);
}
  
.feature-item p {
  color: var(--text-light);
  line-height: 1.6;
  transition: var(--transition);
}
  
.feature-item:hover p {
  color: rgba(255, 255, 255, 0.9);
}
  
/* Testimonials */
.testimonials {
  padding: 5rem 8%;
  background-color: var(--white);
  text-align: center;
}
  
.testimonial-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
}
  
.testimonial {
  background-color: var(--gray-100);
  border-radius: 0;
  padding: 2rem;
  width: 350px;
  box-shadow: var(--shadow);
  text-align: left;
  transition: var(--transition);
  border-left: 3px solid var(--primary-color);
}
  
.testimonial:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
  border-color: var(--secondary-color);
}
  
.testimonial-text {
  margin-bottom: 1.5rem;
  position: relative;
}
  
.testimonial-text i {
  color: var(--secondary-color);
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  opacity: 0.5;
}
  
.testimonial-text p {
  color: var(--text-light);
  font-style: italic;
}
  
.testimonial-author {
  display: flex;
  align-items: center;
}
  
.testimonial-author img {
  width: 50px;
  height: 50px;
  border-radius: 0;
  margin-right: 1rem;
  object-fit: cover;
}
  
.testimonial-author h4 {
  font-weight: 600;
  font-size: 1rem;
}
  
.testimonial-author p {
  color: var(--text-light);
  font-size: 0.9rem;
}
  
/* CTA Section */
.cta {
  background: linear-gradient(135deg, var(--primary-dark), var(--primary-color));
  color: var(--white);
  padding: 5rem 8%;
  text-align: center;
  position: relative;
  overflow: hidden;
}
  
.cta::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  opacity: 0.1;
}
  
.cta h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}
  
.cta p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}
  
.cta-button {
  display: inline-block;
  padding: 15px 30px;
  background-color: var(--secondary-color);
  color: var(--primary-dark);
  border-radius: 0;
  font-weight: 600;
  font-size: 1.1rem;
  transition: var(--transition);
}
  
.cta-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  background-color: var(--white);
}
  
/* Contact Section */
.contact {
  padding: 5rem 8%;
  background-color: var(--off-white);
  text-align: center;
}
  
.contact-container {
  display: flex;
  flex-wrap: wrap;
  gap: 4rem;
  margin-top: 3rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}
  
.contact-info {
  flex: 1;
  min-width: 300px;
  text-align: left;
}
  
.contact-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 2rem;
}
  
.contact-item i {
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-right: 1.5rem;
  margin-top: 5px;
}
  
.contact-item h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}
  
.contact-item p {
  color: var(--text-light);
}
  
.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}
  
.social-links a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 0;
  background-color: var(--gray-100);
  color: var(--primary-color);
  font-size: 1.2rem;
  transition: var(--transition);
}
  
.social-links a:hover {
  background-color: var(--primary-color);
  color: var(--white);
  transform: translateY(-3px);
}
  
.contact-form {
  flex: 1;
  min-width: 300px;
}
  
.form-group {
  margin-bottom: 1.5rem;
}
  
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 15px;
  border: 1px solid var(--gray-200);
  border-radius: 0;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  transition: var(--transition);
  background-color: var(--white);
}
  
.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(65, 100, 74, 0.2);
}
  
.submit-btn {
  background-color: var(--primary-color);
  color: var(--white);
  border: none;
  border-radius: 0;
  padding: 15px 30px;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: var(--transition);
}
  
.submit-btn:hover {
  background-color: var(--secondary-color);
  color: var(--primary-dark);
  transform: translateY(-2px);
}
  
/* Footer */
.footer {
  background-color: #252525;
  color: var(--white);
  padding: 4rem 8% 1.5rem;
}
  
.footer-content {
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  margin-bottom: 3rem;
}
  
.footer-logo {
  flex: 2;
  min-width: 200px;
  font-size: 1.5rem;
  font-weight: 700;
}
  
.footer-logo i {
  margin-right: 0.5rem;
}
  
.footer-logo p {
  font-size: 1rem;
  font-weight: 400;
  margin-top: 1rem;
  opacity: 0.7;
}
  
.footer-links {
  flex: 1;
  min-width: 150px;
}
  
.footer-links h3 {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: var(--secondary-color);
}
  
.footer-links ul {
  list-style: none;
}
  
.footer-links li {
  margin-bottom: 0.8rem;
}
  
.footer-links a {
  opacity: 0.7;
  transition: var(--transition);
}
  
.footer-links a:hover {
  opacity: 1;
  color: var(--secondary-color);
}
  
.footer-newsletter {
  flex: 2;
  min-width: 250px;
}
  
.footer-newsletter h3 {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: var(--secondary-color);
}
  
.footer-newsletter p {
  opacity: 0.7;
  margin-bottom: 1rem;
}
  
.footer-newsletter form {
  display: flex;
}
  
.footer-newsletter input {
  flex-grow: 1;
  padding: 10px 15px;
  border: none;
  border-radius: 0;
  font-family: 'Poppins', sans-serif;
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--white);
}

.footer-newsletter input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}
  
.footer-newsletter button {
  background-color: var(--secondary-color);
  color: var(--primary-dark);
  border: none;
  border-radius: 0;
  padding: 0 20px;
  cursor: pointer;
  transition: var(--transition);
}
  
.footer-newsletter button:hover {
  background-color: var(--white);
}
  
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1.5rem;
  text-align: center;
  opacity: 0.7;
  font-size: 0.9rem;
}
  
/* Animations for AOS fallback */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
  
@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
  
@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
  
/* Media Queries */
@media (max-width: 992px) {
  h1 {
    font-size: 2.5rem;
  }
    
  h2 {
    font-size: 2rem;
  }
    
  .hero-content {
    flex-direction: column;
    text-align: center;
    padding-top: 120px;
  }
    
  .hero-image {
    margin-left: 0;
    margin-top: 3rem;
  }
    
  .about-content {
    flex-direction: column;
    gap: 2rem;
  }
    
  .contact-container {
    flex-direction: column;
    gap: 3rem;
  }
}
  
@media (max-width: 768px) {
  .navbar {
    padding: 1rem 5%;
  }
    
  section {
    padding: 4rem 5%;
  }
    
  h1 {
    font-size: 2rem;
  }
    
  .feature-item, 
  .testimonial {
    width: 100%;
  }
    
  .footer-content {
    gap: 2rem;
  }
}
  
@media (max-width: 576px) {
  h1 {
    font-size: 1.8rem;
  }
    
  .hero-buttons {
    flex-direction: column;
  }
    
  .primary-btn, 
  .secondary-btn {
    width: 100%;
  }
}

`}
      </style>
    </div>
  );
};

export default LandingPage;