import React, { useState } from 'react';
import LighthouseAudit from './Componenets/LighthouseAudit';
import './App.css';

const App = () => {
  const [activeForm, setActiveForm] = useState(null); // Track active form (null, 'login', 'signup')

  const toggleForm = (form) => {
    setActiveForm(form === activeForm ? null : form); // Toggle the form
  };

  const closeForm = () => {
    setActiveForm(null); // Close form
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-left">
          <img src="path-to-your-logo.png" alt="Logo" />
          <h1>Website Analysis Tool</h1>
        </div>
        <div className="header-right">
          <a href="#home">Home</a>
          <a href="#contact">Contact</a>
          <a href="#info">Info</a>
          <button onClick={() => toggleForm('login')}>Login</button>
          <button onClick={() => toggleForm('signup')}>Signup</button>
        </div>
      </header>

      <main>
        {activeForm && (
          <div className="sidebar">
            <div className="form-container">
              <button className="close-btn" onClick={closeForm}>&#10005;</button> {/* Close button */}
              {activeForm === 'login' ? <LoginForm /> : <SignupForm />}
            </div>
          </div>
        )}
        <div className={`content ${activeForm ? 'shifted' : ''}`}>
          <LighthouseAudit />
        </div>
      </main>

      <footer className="App-footer">
        <p>© 2024 Website Analysis Tool. All rights reserved.</p>
      </footer>
    </div>
  );
};

const LoginForm = () => (
  <form className="form">
    <h2>Login</h2>
    <input type="text" placeholder="User ID" required />
    <input type="password" placeholder="Password" required />
    <Captcha />
    <button type="submit">Login</button>
  </form>
);

const SignupForm = () => (
  <form className="form">
    <h2>Signup</h2>
    <input type="text" placeholder="Full Name" required />
    <input type="text" placeholder="User ID" required />
    <input type="email" placeholder="Email" required />
    <input type="password" placeholder="Password" required />
    <Captcha />
    <button type="submit">Signup</button>
  </form>
);

const Captcha = () => (
  <div className="captcha">
    <p>Prove you're human</p>
    <input type="text" placeholder="Enter captcha" required />
  </div>
);

export default App;
