import React, { useState, useEffect } from "react";
import ConnectWalletButton from "../components/ConnectWalletButton";
import CustomModal from "../components/CustomModal";
import StudentThumbnail from "../components/StudentThumbnail";
import StudentData from "../data.json";
import Student1 from "../images/student1.png";
import Student2 from "../images/student2.png";
import Student3 from "../images/student3.png";
import Student4 from "../images/student4.png";
import { useSDK } from "@thirdweb-dev/react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiurl } from "../../const/yourDetails";


import {
  stablecoinAddress,
  splitMainAddress,
  splitDestinations,
  splitPercentages,
  platformAddress,
  nurseAddress,
  depositAmount,
  splitABI,
  stablecoinABI,
} from "../../const/yourDetails";

export default function StudentList() {
  const sdk = useSDK(); // Get SDK
  const [signature, setSignature] = useState(null);
  const [open, setOpen] = useState(false); // For modal
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const navigate = useNavigate();

  const imgArr = [Student1, Student2, Student3, Student4];
  const [students, setStudents] = useState([]);

  const [inputs, setInputs] = useState({}); // For form

  useEffect(() => {
    const fetchData = async () => {
      try {
        let getData = await fetch(`${apiurl}/api/get_talents`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: 'GET',
          credentials: 'include',
        });
        let getDataRes = await getData.json();
        console.log('--------------------------------------');
        console.log('getDataRes ',  getDataRes);
        if (getDataRes.status === 200) {
          setStudents(getDataRes.data);
        }
      } catch (error) {
        console.log('checkLogInStatus error ', error);
      }
    }
    fetchData();
  },[]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const onHireSubmit = async (e) => {
    e.preventDefault();

    try {
      const stablecoinContract = await sdk.getContract(
        stablecoinAddress,
        stablecoinABI
      );

      const rc = await stablecoinContract.call("approve", [
        splitMainAddress,
        depositAmount,
      ]);

      if (rc && rc != undefined) {
        const splitMainContract = await sdk.getContract(
          splitMainAddress,
          splitABI
        );
        const PERCENTAGE_SCALE = 1000000;
        const percentAllocations = [
          PERCENTAGE_SCALE * splitPercentages[0],
          PERCENTAGE_SCALE * splitPercentages[1],
          PERCENTAGE_SCALE * splitPercentages[2],
        ];
        const data = await splitMainContract.call("createOfferAndDeposit", [
          splitDestinations,
          percentAllocations,
          nurseAddress,
          depositAmount,
        ]);
        onCloseModal();
        toast.success("Your transaction is Successful!", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onHire = () => {
    // console.log("on hire");
    onOpenModal();
  };

  return (
    <div className="container text-center mx-auto px-5 md:px-20 py-5 justify-center">
      <h5 className="text-center text-3xl font-thin antonFont">Talent List</h5>
      <input
        type="text"
        className="w-90 md:w-80 mt-5 ml-2 pl-5 pr-3 py-2 rounded-full text-center"
        placeholder="Search Talents"
      />
      <div className="mx-auto mt-4">
        <ConnectWalletButton customClass="connectWalletButton" />
      </div>
      <hr className="h-1 bg-gray-500" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mx-auto mt-8">
        {students.map((student, i) => {
          student.image = imgArr[i];
          return <StudentThumbnail student={student} onHire={onHire} key={i} />;
        })}
      </div>
      <CustomModal
        open={open}
        onCloseModal={onCloseModal}
        title="Submit Job Details"
      >
        <form method="POST" onSubmit={onHireSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto text-left mt-8">
            <div>
              <label>Company Name</label>
              <input
                name="companyName"
                value={inputs.companyName || ""}
                onChange={handleChange}
                placeholder="Enter Company Name"
                type="text"
                className="form-control"
                required
              />
            </div>
            <div>
              <label>Salary</label>
              <input
                name="salary"
                value={inputs.salary || ""}
                onChange={handleChange}
                type="text"
                placeholder="Enter Salary details"
                className="form-control"
                required
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label>Job Description</label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Enter Job Description"
                name="jobDescription"
                value={inputs.jobDescription || ""}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mr-auto text-right">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 rounded-lg px-3.5 py-2.5 text-sm text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-2 ml-auto"
            >
              Submit Details
            </button>
          </div>
        </form>
      </CustomModal>
      <ToastContainer />
    </div>
  );
}
