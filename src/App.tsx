import "./App.css";
import NoteTab from "./NoteTab";

function App() {
  return (
    <div className="main-container">
      <NoteTab />

      <section className="section-1">
        <div className="video-container">
          <iframe
            src="https://www.youtube.com/embed/feUYwoLhE_4"
            title="YouTube Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <div className="video-description">
            <h2>Video Title</h2>
            <p>
              This video is about [video topic]. During the video, [key points]
              are discussed. For more information, you can visit{" "}
              <a
                href="https://www.youtube.com/watch?v=feUYwoLhE_4"
                target="_blank"
                rel="noopener noreferrer"
              >
                this link
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="section-2">Section 2</section>
      <section className="section-3">Section 3</section>
    </div>
  );
}

export default App;
