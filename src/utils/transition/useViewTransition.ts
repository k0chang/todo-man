import { useNavigate } from "react-router-dom";

declare global {
  interface Document {
    startViewTransition: (callback: () => void) => any;
  }
}

export const useViewTransition = () => {
  const navigate = useNavigate();
  const viewTransition = (path: string) => {
    if (document.startViewTransition) {
      document.startViewTransition(() => navigate(path));
    } else {
      navigate(path);
    }
  };
  return viewTransition;
};
