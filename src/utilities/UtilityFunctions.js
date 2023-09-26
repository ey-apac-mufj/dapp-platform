import { t } from "i18next";
import { toast } from "react-toastify";

class UtilityFunctions {
  copyText = (text) => {
    navigator.clipboard.writeText(text);
    return toast.success(t("Text is copied to your clipboard"), {
      position: "bottom-right",
      autoClose: 3000,
    });
  };
}

export default new UtilityFunctions();
