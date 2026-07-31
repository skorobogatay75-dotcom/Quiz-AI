export function ThankYouScreen({ texts }) {
  return (
    <section className="screen screen--thanks" aria-labelledby="thanks-title">
      <div className="thanks-mark" aria-hidden="true">
        ✓
      </div>
      <h2 id="thanks-title" className="screen__title">
        {texts.title}
      </h2>
      {texts.lines.map((line) => (
        <p key={line} className="screen__subtitle screen__subtitle--tight">
          {line}
        </p>
      ))}
    </section>
  );
}
