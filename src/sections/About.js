import React from 'react';
import Qualifications from '../components/Qualifications';
function About() {
  return (
    <section id='about' className='about-section'>
      <div className='container'>
        <h2>About Me</h2>
        <p>
          <strong>Education:</strong> [Placeholder for education details]
        </p>
        <p>
          <strong>Skills:</strong> [Placeholder for skills]
        </p>
        <p>
          <strong>Experience:</strong> [Placeholder for experience]
        </p>
        <Qualifications />
      </div>
    </section>
  );
}

export default About;
