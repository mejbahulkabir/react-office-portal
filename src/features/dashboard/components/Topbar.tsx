import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";

const Topbar = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="topbar d-flex justify-content-between align-items-center">
      <input
        type="text"
        placeholder="Search..."
        className="form-control w-25"
      />

      <div>
        <span className="me-4">Wallet</span>
        <span className="me-4">Invoices</span>
        {user && <span>Hi, {user.name} 👋</span>}
      </div>
    </div>
  );
};

export default Topbar;
