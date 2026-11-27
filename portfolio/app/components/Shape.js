export default function Shape({ type, c }) {
  const p = { fill: c, stroke: "#0f3899", strokeWidth: 4, strokeLinejoin: "round" };
  return (
    <svg viewBox="0 0 100 100" aria-hidden>
      {type === "circle" && <circle cx="50" cy="50" r="38" {...p} />}
      {type === "square" && <rect x="14" y="14" width="72" height="72" rx="10" {...p} />}
      {type === "tri" && <polygon points="50,12 90,86 10,86" {...p} />}
      {type === "star" && <polygon points="50,8 61,38 92,38 67,57 77,89 50,70 23,89 33,57 8,38 39,38" {...p} />}
    </svg>
  );
}
