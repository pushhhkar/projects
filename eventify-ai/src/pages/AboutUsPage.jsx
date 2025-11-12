import React from 'react';

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
    lineHeight: '1.6',
  },
  title: {
    fontSize: '2.5rem',
    color: '#1f2937',
    borderBottom: '2px solid #eee',
    paddingBottom: '0.5rem',
  },
  text: {
    fontSize: '1.1rem',
    color: '#333',
  }
};

export default function AboutUsPage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>About Eventify</h1>
      <p style={styles.text}>
        Welcome to Eventify, your all-in-one solution for planning, managing,
        and executing flawless events.
      </p>
      <p style={styles.text}>
        Our mission is to make event planning simple, intuitive, and stress-free,
        whether you're organizing a small party, a large wedding, or a corporate conference.
        With AI-powered suggestions, easy vendor management, and beautiful customizable templates,
        we bring your vision to life.
      </p>
    </div>
  );
}