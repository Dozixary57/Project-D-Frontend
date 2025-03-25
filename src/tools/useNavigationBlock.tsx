import { useEffect } from "react";
import { useNavigate, useLocation, useBeforeUnload } from "react-router-dom";

const useNavigationBlock = (shouldBlock: boolean) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleNavigation = (event: Event) => {
      if (shouldBlock && !window.confirm("You have unsaved changes. Are you sure you want to leave the page?")) {
        event.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleNavigation);
    return () => window.removeEventListener("beforeunload", handleNavigation);
  }, [shouldBlock]);

  return (to: string) => {
    if (!shouldBlock || window.confirm("You have unsaved changes. Are you sure you want to leave the page?")) {
      navigate(to);
    }
  };
};

export default useNavigationBlock;