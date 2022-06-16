import { toast } from 'react-toastify';

export const catchHandler = (response: any) => {
  toast.error(response);
};
