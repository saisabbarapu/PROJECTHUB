import React from "react";
import styles from "./home.module.css";

const Homepage = () => {
  return (
    <div className={styles.maincont}>
      <h1 className={styles.title}>ProjectHub</h1>

      <p className={styles.description}>
        ProjectHub is an innovative platform designed to showcase, explore, and collaborate on projects across various domains. Whether you are a student, developer, or entrepreneur, ProjectHub offers a seamless way to build your portfolio, discover inspiring projects, and connect with like-minded individuals.
      </p>

      <p className={styles.description}>
        <strong>Aim:</strong> To empower creators by providing a centralized hub for project presentation, networking, and skill development. ProjectHub facilitates transparency and growth by enabling users to share their work, receive feedback, and find collaboration opportunities.
      </p>

      <p className={styles.description}>
        <strong>Key Features:</strong> User-friendly project submission, interactive project galleries, personalized profiles, community ratings, and a streamlined login system for quick access. ProjectHub encourages innovation and professional growth by bridging gaps between talent and opportunity.
      </p>

      <p className={styles.description}>
        <strong>Branch-wise Details:</strong> Projects are categorized according to branches like Computer Science, Mechanical, Electrical, Civil, Electronics, and more. This organization helps users explore projects relevant to their field, learn branch-specific technologies, and collaborate effectively with peers from the same domain.
      </p>

      <p className={styles.description}>
        <strong>Why ProjectHub?</strong> In today’s fast-paced world, it’s crucial to have a platform that not only highlights your achievements but also fosters continuous learning. ProjectHub offers tutorials, mentorship programs, and regular challenges to keep the community engaged and motivated.
      </p>

      <p className={styles.description}>
        <strong>Community & Collaboration:</strong> Collaboration is at the heart of innovation. ProjectHub enables users to join groups, participate in forums, and collaborate on projects in real-time. Networking events and hackathons organized regularly ensure users stay connected.
      </p>

      <p className={styles.description}>
        <strong>Security & Privacy:</strong> ProjectHub prioritizes your data security with robust encryption and privacy controls. You decide what to share and with whom, ensuring your intellectual property stays protected.
      </p>

      <p className={styles.description}>
        <strong>Getting Started:</strong> Signing up is quick and easy. Once logged in, you can create your profile, upload projects, and start exploring what others have built. Whether you want to showcase a school assignment or a professional project, ProjectHub is the perfect place to start.
      </p>

      <button className={styles.exploreButton}>Explore Now</button>
    </div>
  );
};

export default Homepage;
