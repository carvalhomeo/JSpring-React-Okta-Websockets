import { toast } from "react-toastify";

export const useNotification = () => {
  const notify = (message) => toast.info(message);

  return { notify };
};
