import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ Component }) => {
  const [user, _] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();

  useEffect(() => {
    if (!Object.keys(user || {}).length > 0) {
      navigate(`/auth/login`);
    }
  }, []);

  return <Component />;
};

export default ProtectedRoute;
