import React from "react";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import MediConnect from "./MediConnect";
import NurseImage from "../images/nurse.jpeg";
import nurse1 from "../images/med-1.jpeg";
import nurse2 from "../images/med-2.jpeg";
import ser1 from "../images/healthcare.png";
import ser2 from "../images/studying.png";
import ser3 from "../images/nurse.png";
import ser4 from "../images/headset.png";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const mobileNavigation = [
  { name: "Community", href: "#" },
  { name: "Communication", href: "#" },
  { name: "Support", href: "#" },
];

export default function CommunityLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // For mobile menu
  return (
    <>
      <Navbar />
      <div className="antonFont">
        <div className="relative isolate px-6 pt-0 lg:px-8 z-0">
          <div
            className="absolute  pointer-events-none inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className="py-32 sm:py-48 lg:py-18 grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto items-center">
            <div className="px-3">
              <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                <div className="relative mr-auto rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                  Announcing our next round of funding.{" "}
                  <a href="#" className="font-thin text-indigo-600">
                    <span className="absolute inset-0" aria-hidden="true" />
                    Read more <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
              <div className="text-left">
                <h1 className="text-4xl font-semi-bold tracking-tight text-gray-900 mt-6 md:mt-3 sm:text-6xl">
                  One stop Medi community for Everyone
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                  qui lorem cupidatat commodo. Elit sunt amet fugiat veniam
                  occaecat fugiat aliqua.
                </p>
                <div className="mt-6 gap-x-6">
                  {/* Button For connecting to Medi API  */}
                  <MediConnect />
                  {/* <a
                href="#"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Learn more <span aria-hidden="true">→</span>
              </a> */}
                </div>
              </div>
            </div>
            <div className="img mx-auto align-items-center order-first md:order-none">
              <img
                src={nurse1}
                className="mx-auto shadow-xl rounded-2xl"
                alt=""
              />
            </div>
          </div>
          {/* <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div> */}
        </div>
        <div className="bg-white px-5 md:px-20 py-10 justify-center mx-auto">
          {/* first section starts */}
          <div className="grid grid-cols-1 md:grid-cols-2 antonFont mx-auto">
            <div className="mt-5 py-3 px-5">
              <h1 className="text-4xl uppercase">Nursing Curriculum</h1>
              <p className="mt-5 text-sm font-thin">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. <br />{" "}
                <span className="underline cursor-pointer">Learn More</span>
              </p>
            </div>
            <div className="mt-8 py-3 px-5 order-first md:order-none">
              <img
                src={NurseImage}
                className="mx-auto h-87 shadow-xl rounded-xl"
                alt=""
              />
            </div>
          </div>

          {/* first section ends */}

          {/* Second section starts */}
          <div className="grid grid-cols-1 md:grid-cols-2 antonFont mx-auto">
            <div className="mt-10 py-3 px-5 order-first md:order-none">
              <img src={nurse2} className="h-87 shadow-xl rounded-xl" alt="" />
            </div>
            <div className="mt-5 md:mt-10 py-3 px-5 ml-4">
              <h1 className="text-4xl uppercase">Students Community</h1>
              <p className="mt-5 text-sm font-thin">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. <br />{" "}
                <span className="underline cursor-pointer">Learn More</span>
              </p>
              {/* Redirect Employer to student profile listing page */}
              <Link to="/student-list">
                <button className="bg-indigo-600 hover:bg-indigo-500 rounded-xl font-thin px-3.5 py-2.5 text-sm text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-8">
                  Student Profiles
                </button>
              </Link>
            </div>
          </div>

          {/* Second section ends */}
        </div>

        {/* Services Section starts */}
        <div className="h-full w-full bg-gray-100 py-14 px-8 md:px-20 mx-auto">
          <h5 className="font-semibold text-5xl text-center">Our Services</h5>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mx-auto mt-10">
            <div className="white-card">
              <img src={ser2} className="mx-auto h-20" alt="" />
              <h5 className="mt-6 text-center text-xl">Medi-EYE</h5>
              <p className="mt-3 font-thin text-sm text-center mb-2">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </p>
            </div>
            <div className="white-card">
              <img src={ser1} className="mx-auto h-20" alt="" />
              <h5 className="mt-6 text-center text-xl">Medi-L</h5>
              <p className="mt-3 font-thin text-sm text-center mb-2">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </p>
            </div>
            <div className="white-card">
              <img src={ser3} className="mx-auto h-20" alt="" />
              <h5 className="mt-6 text-center text-xl">Home-Care-Medi-EYE</h5>
              <p className="mt-3 font-thin text-sm text-center mb-2">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </p>
            </div>
            <div className="white-card">
              <img src={ser4} className="mx-auto h-20" alt="" />
              <h5 className="mt-6 text-center text-xl">Medi-EYE×VR</h5>
              <p className="mt-3 font-thin text-sm text-center mb-2">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </p>
            </div>
          </div>
        </div>

        {/* Services Section ends */}
      </div>
    </>
  );
}
