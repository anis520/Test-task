import { toast } from "react-toastify";

export const CreateTost = (msg, type = "success") => {
  toast[type](msg);
};
