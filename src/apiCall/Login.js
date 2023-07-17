import { apiurl } from "../../const/yourDetails";

// import Cookies from "universal-cookie";
// const cookies = new Cookies();

class Login {
  initiateLogin = async (walletAddress) => {
    // const token = cookies.get("token"); // get token from cookie when sending JWT in API request header
    try {
      let initiateLogin = await fetch(`${apiurl}/login/initiate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer " + token // --> this is for authorized call
          // Add any additional headers here
        },
        body: JSON.stringify({
          walletAddress: walletAddress,
        }),
      });
      let initiateLoginRes = await initiateLogin.json();
      return initiateLoginRes;
    } catch (error) {
      return {
        message: "Something went wrong! Please try again.",
        status: 400,
      };
    }
  };
}

export default new Login();