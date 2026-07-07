import type { AnalyticsCard, ChartSeriesPoint } from "../types/admin";

interface ChartsSectionProps {
  cards: AnalyticsCard[];
}

function LineChart({ data }: { data: ChartSeriesPoint[] }) {
  const max = Math.max(...data.map((point) => point.value));
  const points = data
    .map((point, index) => {
      const x = (index / Math.max(1, data.length - 1)) * 100;
      const y = 100 - (point.value / max) * 80 - 10;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="chart-shell">
      <svg viewBox="0 0 100 100" className="chart-svg" aria-hidden="true">
        <polyline points={points} className="chart-line-area" />
        <polyline points={points} className="chart-line-stroke" />
      </svg>
      <div className="chart-label-row">
        {data.map((point) => (
          <span key={point.label}>{point.label}</span>
        ))}
      </div>
    </div>
  );
}

function BarChart({ data }: { data: ChartSeriesPoint[] }) {
  const max = Math.max(...data.map((point) => point.value));

  return (
    <div className="chart-shell">
      <div className="bar-chart">
        {data.map((point) => (
          <div key={point.label} className="bar-column">
            <div className="bar-track">
              <div className="bar-fill" style={{ height: `${(point.value / max) * 100}%` }} />
            </div>
            <span>{point.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DonutChart({ data }: { data: ChartSeriesPoint[] }) {
  const total = data.reduce((sum, point) => sum + point.value, 0);
  const gradientStops = ["#635BFF", "#8B85FF", "#0F9D8A", "#F59E0B"];

  let cumulative = 0;
  const segments = data.map((point, index) => {
    const start = cumulative / total;
    cumulative += point.value;
    const end = cumulative / total;
    return {
      ...point,
      color: gradientStops[index % gradientStops.length],
      offset: `${start * 100}% ${end * 100}%`,
    };
  });

  return (
    <div className="donut-layout">
      <div
        className="donut-chart"
        style={{
          background: `conic-gradient(${segments
            .map((segment) => `${segment.color} ${segment.offset}`)
            .join(", ")})`,
        }}
      >
        <div className="donut-center">
          <strong>{total}</strong>
          <span>Claims</span>
        </div>
      </div>

      <div className="donut-legend">
        {segments.map((segment) => (
          <div key={segment.label} className="legend-item">
            <span className="legend-dot" style={{ backgroundColor: segment.color }} />
            <span>{segment.label}</span>
            <strong>{segment.value}%</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChartsSection({ cards }: ChartsSectionProps) {
  return (
    <section className="analytics-grid">
      {cards.map((card) => (
        <article key={card.id} className="surface-card analytics-card">
          <div className="section-header">
            <div>
              <h2>{card.title}</h2>
              <p>{card.summary}</p>
            </div>
          </div>

          {card.type === "line" ? <LineChart data={card.data} /> : null}
          {card.type === "bar" ? <BarChart data={card.data} /> : null}
          {card.type === "donut" ? <DonutChart data={card.data} /> : null}
        </article>
      ))}
    </section>
  );
}
