import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Eye, Search } from "lucide-react";
import type { CompanyRegistration } from "../types/admin";

interface CompaniesTableProps {
  rows: CompanyRegistration[];
}

const ITEMS_PER_PAGE = 4;

export function CompaniesTable({ rows }: CompaniesTableProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filteredRows = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return rows.filter((row) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        row.companyName.toLowerCase().includes(normalizedSearch) ||
        row.industry.toLowerCase().includes(normalizedSearch) ||
        row.companyEmail.toLowerCase().includes(normalizedSearch);

      return matchesSearch;
    });
  }, [rows, search]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);

  const paginatedRows = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRows.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, filteredRows]);

  function updateSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  return (
    <section className="surface-card">
      <div className="section-header">
        <div>
          <h2>Recent Company Registrations</h2>
          <p>Browse registered companies and their contact details.</p>
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
                  <div className="row-actions">
                    <button type="button" className="ghost-action">
                      <Eye size={14} />
                      View
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
