import { apiurl } from "../../const/yourDetails";


class OfferAPI {
  statusToString = (status) => {
    if (status === 0) {
      return 'Open'
    } else if (status === 1) {
      return 'Close'
    } else if (status === 2) {
      return 'Accept'
    } else if (status === 3) {
      return 'Decline'
    } else {
      return 'Unknown'
    }
  }
  contractToMediStatus = (status) => {
    if (status === 0) {
      return 10
    } else if (status === 1) {
      return 99
    } else if (status === 2) {
      return 100
    } else if (status === 3) {
      return 999
    } else {
      return 'Unknown'
    }
  }
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
      console.log('getOffer API call error', error);
      return {
        message: "Something went wrong! Please try again.",
        status: 400,
      };
    }
  };
  modifyOffer = async (offerID, offerStatus, offerDetail) => {
    try {
      let formData = new FormData();
      formData.append('offerID', offerID);
      if (offerStatus) {
        formData.append('offerStatus', offerStatus);
      }
      if (offerDetail) {
        formData.append('offerDetail', offerDetail);
      }

      let response = await fetch(`${apiurl}/api/modify_offer/${offerID}`, {
        method: "POST",
        body: formData,
        credentials: 'include',
      });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.log('modifyOffer API call error', error);
      return {
        message: "Something went wrong! Please try again.",
        status: 400,
      };
    }
  };
}

export default new OfferAPI();
