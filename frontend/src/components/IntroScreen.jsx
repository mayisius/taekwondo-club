import girlBlack from "../assets/girl-black.png";

function IntroScreen({ onStart }) {
  return (
    <section className="intro-screen" onClick={onStart}>
      <div className="intro-overlay">
        <h1 className="intro-title">
          Bienvenido al Club Taekwondo Villanueva del Pardillo
        </h1>

        <img
          src={girlBlack}
          alt="Taekwondo silhouette"
          className="intro-girl"
        />

        <p className="intro-text">Haz clic para descubrir la disciplina</p>
      </div>
    </section>
  );
}

export default IntroScreen;