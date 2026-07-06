interface BrandLogoProps {
  compact?: boolean;
}

export function BrandLogo({ compact = false }: BrandLogoProps) {
  return (
    <div className={`brand-logo ${compact ? "compact" : ""}`}>
      <div className="brand-logo-mark" aria-hidden="true">
        <span />
        <span />
      </div>
      {!compact ? (
        <div className="brand-logo-text" aria-label="FinScrybe">
          <span className="brand-logo-fin">Fin</span>
          <span className="brand-logo-scrybe">Scrybe</span>
        </div>
      ) : null}
    </div>
  );
}
