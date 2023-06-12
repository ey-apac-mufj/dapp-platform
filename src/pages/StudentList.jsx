import React, { useState } from "react";
import ConnectWalletButton from "../components/ConnectWalletButton";
import CustomModal from "../components/CustomModal";
import StudentThumbnail from "../components/StudentThumbnail";
import StudentData from "../data.json";
import Student1 from "../images/student1.png";
import Student2 from "../images/student2.png";
import Student3 from "../images/student3.png";
import Student4 from "../images/student4.png";

export default function StudentList() {
  const [open, setOpen] = useState(false); // For modal
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const [inputs, setInputs] = useState({}); // For form

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const onHireSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
  };

  const onHire = () => {
    // console.log("on hire");
    onOpenModal();
  };

  return (
    <div className="container text-center mx-auto px-5 md:px-20 py-5 justify-center">
      <h5 className="text-center text-3xl font-thin antonFont">Student List</h5>
      <input
        type="text"
        className="w-90 md:w-80 mt-5 ml-2 pl-5 pr-3 py-2 rounded-full text-center"
        placeholder="Search Students"
      />
      <div className="mx-auto mt-4">
        <ConnectWalletButton customClass="connectWalletButton" />
      </div>
      <hr className="h-1 bg-gray-500" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mx-auto mt-8">
        {StudentData.students.map((student, i) => {
          student.image = eval("Student" + (i + 1));
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
              />
            </div>
          </div>
          <div className="mr-auto">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 rounded-lg px-3.5 py-2.5 text-sm text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-2 ml-auto"
            >
              Submit Details
            </button>
          </div>
        </form>
      </CustomModal>
    </div>
  );
}
