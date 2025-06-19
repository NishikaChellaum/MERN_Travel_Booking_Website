import React, { useState } from "react";
import "../styles/Contact.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import mountain from "../assets/mountain.jpg";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (email === "" || mobile === "" || message === "") {
      toast.error("Please fill in all required fields.😕", {
        position: "top-right",
        autoClose: 5000,
        theme: "colored",
      });
      return;
    }

    const payload = {
      email,
      mobile,
      message,
    };

    const apiUrl = process.env.REACT_APP_API_URL;

    fetch(`${apiUrl}/messages/create`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        toast.success("Thanks for contacting us! 😊 We'll be in touch soon!", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored",
        });
        setEmail("");
        setMobile("");
        setMessage("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div id="contact">
      <div className="contactContainer">
        <img id="contactImg" src={mountain} alt="Mountain background" />

        <div id="contactText">
          <h1 className="main-heading">Get in touch</h1>
          <div className="textText">
            <div className="desc">
              <h2>
                Don't wait, reach out to us now and let us help you plan your
                next vacation. Our dedicated team is always here to answer your
                questions and make your travel dreams a reality.
              </h2>
            </div>
          </div>

          <div className="contactInfo">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>

          <input
            type="text"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button id="btn" onClick={handleSubmit}>
            Send
          </button>
        </div>

        <ToastContainer
          position="top-center"
          autoClose={5000}
          theme="colored"
        />
      </div>
    </div>
  );
};

export default Contact;
