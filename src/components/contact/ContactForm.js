import React, { useState } from "react";
export default function ContactForm() {
  const [status, setStatus] = useState("");
  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = `Hello Sahil,\n\n${data.get("message")}\n\n${data.get("name")}\n${data.get("email")}`;
    window.location.href = `mailto:sahilsatishkumar7@gmail.com?subject=${encodeURIComponent(data.get("subject"))}&body=${encodeURIComponent(body)}`;
    setStatus(
      "If your email app opened, review and send the draft there. Otherwise, email sahilsatishkumar7@gmail.com.",
    );
  }
  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-pair">
        <label htmlFor="name">
          Name
          <input
            required
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Your name"
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            required
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
          />
        </label>
      </div>
      <label htmlFor="subject">
        Subject
        <input
          required
          id="subject"
          name="subject"
          placeholder="What's this about?"
        />
      </label>
      <label htmlFor="message">
        Message
        <textarea
          required
          id="message"
          name="message"
          rows="4"
          placeholder="Tell me what you have in mind."
        />
      </label>
      <button className="primary-button" type="submit">
        Compose email
      </button>
      <p className="form-note" role="status">
        {status ||
          "Opens your email app with a draft. Your message is not sent automatically."}
      </p>
    </form>
  );
}
