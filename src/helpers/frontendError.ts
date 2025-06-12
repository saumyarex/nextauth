import axios from "axios";
import toast from "react-hot-toast";

export const frontendErrors = (error :unknown) => {
    if (axios.isAxiosError(error)) {
    toast.error(error.response?.data.error);
  } else if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error("Something went wrong try again!");
  }
}