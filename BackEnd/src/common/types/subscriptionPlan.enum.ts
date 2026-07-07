export const SubscriptionPlan = {
  MONTHLY: "MONTHLY",
  YEARLY: "YEARLY"
} as const;

export type SubscriptionPlan = (typeof SubscriptionPlan)[keyof typeof SubscriptionPlan];
