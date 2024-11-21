import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useUserAuth = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!token || role !== "user") {
      navigate("/");
    }
  }, [token, role, navigate]);
};

export default useUserAuth;
