import { useEffect, useState } from 'react';
import { getPayroll } from '../api';

export default function PayrollPage() {
  const [payroll, setPayroll] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPayroll();
  }, []);

  const fetchPayroll = async () => {
    try {
      setLoading(true);
      const res = await getPayroll();
      setPayroll(res.data.data.data);
    } catch (error) {
      console.error('Failed to fetch payroll', error);
    } finally {
      setLoading(false);
    }
  };

  const openPdf = (id: number) => {
    console.log('Payroll id:', id);

    window.open(`https://portal.natwoodfurniture.in/public/employee/payroll/${id}`, '_blank');
  };
  const downloadPdf = (id: number) => {
    console.log('Payroll id:', id);

    window.open(`https://portal.natwoodfurniture.in/public/employee/payroll/${id}/pdf`, '_blank');
  };
  return (
    <div className="container-fluid py-4">
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold mb-0">Payroll</h3>
      </div>

      {/* Card Wrapper */}
      <div className="card shadow-sm border-0 rounded-4">
        <div className="card-body p-4">
          {loading && (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" />
            </div>
          )}

          {!loading && payroll.length === 0 && (
            <div className="text-center text-muted py-5">No payroll records found</div>
          )}

          {!loading && payroll.length > 0 && (
            <div className="table-responsive">
              <table className="table align-middle table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Month</th>
                    <th>Year</th>
                    <th>Net Salary</th>
                    <th>Working Days</th>
                    <th className="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {payroll.map((item) => (
                    <tr key={item.id}>
                      <td className="fw-medium">{item.month}</td>
                      <td>{item.year}</td>
                      <td>₹ {item.net_salary}</td>
                      <td>
                        <span className="badge bg-success-subtle text-success px-3 py-2">
                          {item.working_days} Days
                        </span>
                      </td>
                      

                      <td className="text-end">
                        <div className="d-inline-flex gap-2">
                          <button
                            className="btn btn-sm btn-outline-primary rounded-pill px-3"
                            onClick={() => openPdf(item.id)}
                          >
                            View PDF
                          </button>
                          <button
                            className="btn btn-sm btn-outline-dark rounded-pill px-3"
                            onClick={() => downloadPdf(item.id)}
                          >
                            Download PDF
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
