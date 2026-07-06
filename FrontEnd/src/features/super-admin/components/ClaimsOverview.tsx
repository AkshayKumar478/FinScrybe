import { ArrowRight } from "lucide-react";
import type { ClaimRecord } from "../../../types/admin";

interface ClaimsOverviewProps {
  claims: ClaimRecord[];
}

export function ClaimsOverview({ claims }: ClaimsOverviewProps) {
  return (
    <section className="surface-card">
      <div className="section-header">
        <div>
          <h2>Latest Claims</h2>
          <p>Prioritize operational issues across customer accounts.</p>
        </div>
      </div>

      <div className="table-shell">
        <table>
          <thead>
            <tr>
              <th>Claim Title</th>
              <th>Priority</th>
              <th>Company</th>
              <th>Status</th>
              <th>Created Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((claim) => (
              <tr key={claim.id}>
                <td>{claim.claimTitle}</td>
                <td>
                  <span className={`priority-badge ${claim.priority.toLowerCase()}`}>
                    {claim.priority}
                  </span>
                </td>
                <td>{claim.company}</td>
                <td>
                  <span className={`status-pill ${claim.status.toLowerCase()}`}>{claim.status}</span>
                </td>
                <td>{claim.createdDate}</td>
                <td>
                  <button type="button" className="ghost-action">
                    View Claim
                    <ArrowRight size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
