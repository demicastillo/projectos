type Item = { q: string; a: string };

export function Faq({ items }: { items: Item[] }) {
  return (
    <div className="card faq">
      {items.map((item) => (
        <details key={item.q}>
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}
