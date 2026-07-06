import type { SubscriptionPlan } from "../../../types/admin";

interface SubscriptionOverviewProps {
  plans: SubscriptionPlan[];
}

export function SubscriptionOverview({ plans }: SubscriptionOverviewProps) {
  return (
    <section className="surface-card">
      <div className="section-header">
        <div>
          <h2>Subscription Overview</h2>
          <p>Plan performance across the FinScrybe customer base.</p>
        </div>
      </div>

      <div className="subscription-grid">
        {plans.map((plan) => {
          const Icon = plan.icon;
          return (
            <article key={plan.id} className="subscription-card">
              <div className="subscription-icon">
                <Icon size={18} />
              </div>
              <div>
                <h3>{plan.name}</h3>
                <p>{plan.subscribers}</p>
                <strong>{plan.revenue}</strong>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
