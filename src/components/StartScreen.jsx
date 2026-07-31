export function StartScreen({ texts, brand, onStart }) {
  return (
    <section className="screen screen--start" aria-labelledby="quiz-title">
      <div className="hero-glow" aria-hidden="true" />
      <div className="avatar">
        <img
          className="avatar__img"
          src={`${import.meta.env.BASE_URL}maria.png`}
          alt={brand.name}
          width={128}
          height={128}
          decoding="async"
        />
      </div>
      <p className="brand-line">
        <span className="brand-line__name">{brand.name}</span>
        <span className="brand-line__dot" aria-hidden="true" />
        <span className="brand-line__role">{brand.role}</span>
      </p>
      <h1 id="quiz-title" className="screen__title">
        {texts.title}
      </h1>
      <p className="screen__subtitle">{texts.subtitle}</p>
      <button type="button" className="btn btn--primary" onClick={onStart}>
        {texts.cta}
      </button>
    </section>
  );
}
