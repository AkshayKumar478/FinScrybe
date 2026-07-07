import { useMemo, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Eye, Filter, Search, X } from "lucide-react";
import type { CompanyRegistration } from "../types/admin";

interface CompaniesTableProps {
  rows: CompanyRegistration[];
  onApprove?: (companyId: string) => Promise<void>;
  onReject?: (companyId: string) => Promise<void>;
}

const ITEMS_PER_PAGE = 4;

export function CompaniesTable({ rows, onApprove, onReject }: CompaniesTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [pendingActionId, setPendingActionId] = useState<string | null>(null);

  const filteredRows = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return rows.filter((row) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        row.companyName.toLowerCase().includes(normalizedSearch) ||
        row.industry.toLowerCase().includes(normalizedSearch) ||
        row.companyEmail.toLowerCase().includes(normalizedSearch);

      const matchesStatus = statusFilter === "All" || row.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [rows, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);

  const paginatedRows = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRows.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, filteredRows]);

  function updateFilter(value: string) {
    setStatusFilter(value);
    setPage(1);
  }

  function updateSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  async function handleApprove(companyId: string) {
    if (!onApprove) {
      return;
    }

    setPendingActionId(companyId);
    try {
      await onApprove(companyId);
    } finally {
      setPendingActionId(null);
    }
  }

  async function handleReject(companyId: string) {
    if (!onReject) {
      return;
    }

    setPendingActionId(companyId);
    try {
      await onReject(companyId);
    } finally {
      setPendingActionId(null);
    }
  }

  return (
    <section className="surface-card">
      <div className="section-header">
        <div>
          <h2>Recent Company Registrations</h2>
          <p>Review onboarding activity and approve new organizations.</p>
        </div>
        <div className="toolbar">
          <div className="search-field">
            <Search size={16} />
            <input
              type="search"
              value={search}
              onChange={(event) => updateSearch(event.target.value)}
              placeholder="Search companies"
              aria-label="Search companies"
            />
          </div>

          <div className="filter-shell">
            <Filter size={16} />
            <select value={statusFilter} onChange={(event) => updateFilter(event.target.value)}>
              <option>All</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
              <option>Reviewing</option>
            </select>
          </div>
        </div>
      </div>

      <div className="table-shell">
        <table>
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Industry</th>
              <th>Company Email</th>
              <th>Registration Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRows.map((row) => (
              <tr key={row.id}>
                <td>
                  <div className="company-cell">
                    <div className="company-initials">
                      {row.companyName
                        .split(" ")
                        .slice(0, 2)
                        .map((part: string) => part[0])
                        .join("")}
                    </div>
                    <span>{row.companyName}</span>
                  </div>
                </td>
                <td>{row.industry}</td>
                <td>{row.companyEmail}</td>
                <td>{row.registrationDate}</td>
                <td>
                  <span className={`status-pill ${row.status.toLowerCase()}`}>{row.status}</span>
                </td>
                <td>
                  <div className="row-actions">
                    <button type="button" className="ghost-action">
                      <Eye size={14} />
                      View
                    </button>
                    <button
                      type="button"
                      className="ghost-action success"
                      disabled={pendingActionId === row.id}
                      onClick={() => void handleApprove(row.id)}
                    >
                      <Check size={14} />
                      Approve
                    </button>
                    <button
                      type="button"
                      className="ghost-action danger"
                      disabled={pendingActionId === row.id}
                      onClick={() => void handleReject(row.id)}
                    >
                      <X size={14} />
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-bar">
        <span>
          Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
          {Math.min(currentPage * ITEMS_PER_PAGE, filteredRows.length)} of {filteredRows.length}
        </span>
        <div className="pagination-actions">
          <button
            type="button"
            className="pagination-button"
            disabled={currentPage === 1}
            onClick={() => setPage((value) => Math.max(1, value - 1))}
          >
            <ChevronLeft size={16} />
          </button>
          <span className="pagination-page">
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            className="pagination-button"
            disabled={currentPage === totalPages}
            onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
