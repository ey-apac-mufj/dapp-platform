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

const navigation = [
  { name: "Community", href: "#" },
  { name: "Chat", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Forum", href: "#" },
];

export default function CommunityLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="antonFont">
      <header className="absolute inset-x-0 top-0">
        {/* Desktop header starts */}
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              {/* <span className="sr-only">Your Company</span> */}
              <h2 className="text-2xl font-bold text-purple-600">Medi</h2>
              {/* <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              /> */}
            </a>
          </div>
          <div className="flex lg:hidden z-50">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-4 z-50">
            <button
              type="button"
              className="text-sm font-thin flex cursor-pointer text-gray-900 menu-btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                />
              </svg>

              <span>Communication</span>
            </button>
            <button
              type="button"
              className="text-sm font-thin flex cursor-pointer text-gray-900 menu-btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
              <span> Community</span>
            </button>
            <button
              type="button"
              className="text-sm font-thin flex cursor-pointer text-gray-900 menu-btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                />
              </svg>
              Support
            </button>
            {/* {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {item.name}
              </a>
            ))} */}
          </div>
          {/* <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Explore <span aria-hidden="true">&rarr;</span>
            </a>
          </div> */}
        </nav>
        {/* Desktop header ends */}

        {/* Mobile header starts */}
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <h2 className="text-2xl font-bold text-purple-600">Medi</h2>
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Start your journey
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
        {/* Mobile header ends */}
      </header>

      <div className="relative isolate px-6 pt-0 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
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
              <h1 className="text-4xl font-semi-bold tracking-tight text-gray-900 sm:text-6xl">
                One stop Medi community for Everyone
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
                fugiat aliqua.
              </p>
              <div className="mt-6 gap-x-6">
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
          <div className="img mx-auto align-items-center">
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
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. <br />{" "}
              <span className="underline cursor-pointer">Learn More</span>
            </p>
          </div>
          <div className="mt-8 py-3 px-5 order-first md:order-none">
            <img
              src={NurseImage}
              className="mx-auto h-87 shadow-xl rounded-lg"
              alt=""
            />
          </div>
        </div>

        {/* first section ends */}

        {/* Second section starts */}
        <div className="grid grid-cols-1 md:grid-cols-2 antonFont mx-auto">
          <div className="mt-10 py-3 px-5 order-first md:order-none">
            <img src={nurse2} className="h-87 shadow-xl rounded-lg" alt="" />
          </div>
          <div className="mt-5 md:mt-10 py-3 px-5 ml-4">
            <h1 className="text-4xl uppercase">Students Community</h1>
            <p className="mt-5 text-sm font-thin">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. <br />{" "}
              <span className="underline cursor-pointer">Learn More</span>
            </p>
          </div>
        </div>

        {/* Second section ends */}
      </div>

      {/* Services Section starts */}
      <div className="h-full w-full bg-gray-100 py-14 px-8 md:px-20 mx-auto">
        <h5 className="font-semibold text-5xl text-center">Our Services</h5>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mx-auto mt-10">
          <div className="service-card">
            <img src={ser2} className="mx-auto h-20" alt="" />
            <h5 className="mt-6 text-center text-xl">Medi-EYE</h5>
            <p className="mt-3 font-thin text-sm text-center mb-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
          </div>
          <div className="service-card">
            <img src={ser1} className="mx-auto h-20" alt="" />
            <h5 className="mt-6 text-center text-xl">Medi-L</h5>
            <p className="mt-3 font-thin text-sm text-center mb-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
          </div>
          <div className="service-card">
            <img src={ser3} className="mx-auto h-20" alt="" />
            <h5 className="mt-6 text-center text-xl">Home-Care-Medi-EYE</h5>
            <p className="mt-3 font-thin text-sm text-center mb-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
          </div>
          <div className="service-card">
            <img src={ser4} className="mx-auto h-20" alt="" />
            <h5 className="mt-6 text-center text-xl">Medi-EYE×VR</h5>
            <p className="mt-3 font-thin text-sm text-center mb-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
          </div>
        </div>
      </div>

      {/* Services Section ends */}
    </div>
  );
}
