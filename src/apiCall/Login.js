import { apiurl } from "../../const/yourDetails";

// import Cookies from "universal-cookie";
// const cookies = new Cookies();

class Login {
  login = async (walletAddress, message, signature) => {
    // const token = cookies.get("token"); // get token from cookie when sending JWT in API request header
    try {
      let formData = new FormData();
      formData.append('walletAddress', walletAddress);
      formData.append('message', message);
      formData.append('signature', signature);

      let login = await fetch(`${apiurl}/api/verify_user`, {
        method: "POST",
        body: formData,
      });
      let loginRes = await login.json();
      return loginRes;
    } catch (error) {
      console.log(error);
      return {
        message: "Something went wrong! Please try again.",
        status: 400,
      };
    }
  };
}

export default new Login();
