import { apiurl } from "../../const/yourDetails";


class OfferAPI {
  createOffer = async (offerID, talentWalletAddress, offerDetail) => {
    try {
      let formData = new FormData();
      formData.append('offerID', offerID);
      formData.append('talentWalletAddress', talentWalletAddress);
      formData.append('offerDetail', offerDetail);

      let response = await fetch(`${apiurl}/api/create_offer`, {
        method: "POST",
        body: formData,
        credentials: 'include',
      });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.log('createOffer API call error', error);
      return {
        message: "Something went wrong! Please try again.",
        status: 400,
      };
    }
  };
  getOffer = async (offerID) => {
    try {
      let response = await fetch(`${apiurl}/api/get_offer/${offerID}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: 'GET',
        credentials: 'include',
      });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.log('getOffer ', error);
      return {
        message: "Something went wrong! Please try again.",
        status: 400,
      };
    }
  };
  modifyOffer = async (offerID, offerStatus, offerDetail) => {
    try {
      let formData = new FormData();
      formData.append('offerStatus', offerStatus);
      formData.append('offerDetail', offerDetail);

      let response = await fetch(`${apiurl}/api/modify_offer/${offerID}`, {
        method: "POST",
        body: formData,
        credentials: 'include',
      });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.log('modifyOffer ', error);
      return {
        message: "Something went wrong! Please try again.",
        status: 400,
      };
    }
  };
}

export default new OfferAPI();
