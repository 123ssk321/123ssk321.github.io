import React from "react";
import Section from "../layout/Section";
import SocialLinks from "../home/SocialLinks";
import ContactForm from "./ContactForm";
export default function Contact() {
  return (
    <Section id="contact" showTitle={false}>
      <div className="contact-layout">
        <div>
          <h2>
            Let's work
            <br />
            together.
          </h2>
          <p>
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your visions.
          </p>
          <SocialLinks />
        </div>
        <ContactForm />
      </div>
    </Section>
  );
}
