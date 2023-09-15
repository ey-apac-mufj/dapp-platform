import { apiurl } from "../../const/yourDetails";


class User {
  getUserInfo = async(address) => {
    try {
      let getUser = await fetch(`${apiurl}/api/get_other/${address}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: 'GET',
        credentials: 'include',
      });
      let getUserRes = await getUser.json();
      if (getUserRes.status === 200) {
        return getUserRes.data
      } else {
        console.log('get_other API call error ', getUserRes);
      }
    } catch (error) {
      console.log('get_other API call error ', error);
      return {
        message: error,
        status: 400,
      }
    }
  }
}

export default new User();
