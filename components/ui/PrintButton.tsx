'use client';

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="sk-print-btn"
      aria-label="Save as PDF (browser print)"
    >
      <span aria-hidden="true" className="sk-print-btn-icon">
        ⤓
      </span>
      <span>Save as PDF</span>
    </button>
  );
}
