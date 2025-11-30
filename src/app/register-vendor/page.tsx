"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { VenueForm } from "@/components/vendor-forms/VenueForm";
import { CateringForm } from "@/components/vendor-forms/CateringForm";
import { TechForm } from "@/components/vendor-forms/TechForm";

type VendorType = "venue" | "catering" | "tech" | null;

export default function RegisterVendor() {
  const [selectedType, setSelectedType] = useState<VendorType>(null);

  const vendorTypes = [
    {
      type: "venue" as const,
      title: "Venue Provider",
      description: "Register your venue space for events",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      color: "from-blue-500 to-cyan-500",
    },
    {
      type: "catering" as const,
      title: "Catering Service",
      description: "Offer catering services for events",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      color: "from-purple-500 to-pink-500",
    },
    {
      type: "tech" as const,
      title: "Tech/Equipment",
      description: "Provide audio, video, or tech equipment",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      color: "from-orange-500 to-red-500",
    },
  ];

  function handleBack() {
    setSelectedType(null);
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navigation />

      <div className="flex-grow pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          {!selectedType ? (
            <>
              {/* Header */}
              <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                  Register as a <span className="text-gradient">Vendor</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Join our marketplace and get matched with event organizers
                  automatically
                </p>
              </div>

              {/* Vendor Type Selection */}
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {vendorTypes.map((vendor) => (
                  <button
                    key={vendor.type}
                    onClick={() => setSelectedType(vendor.type)}
                    className="group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-transparent hover:shadow-2xl transition-all text-left"
                  >
                    <div
                      className={`w-20 h-20 bg-gradient-to-br ${vendor.color} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}
                    >
                      {vendor.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{vendor.title}</h3>
                    <p className="text-gray-600 mb-4">{vendor.description}</p>
                    <div className="flex items-center text-primary-600 font-semibold">
                      Get Started
                      <svg
                        className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>

              {/* Benefits */}
              <div className="bg-white rounded-2xl p-8 border-2 border-gray-100">
                <h3 className="text-2xl font-bold mb-6 text-center">
                  Why Join Eventco?
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gradient mb-2">
                      3x
                    </div>
                    <div className="text-gray-600">More Bookings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gradient mb-2">
                      24/7
                    </div>
                    <div className="text-gray-600">Auto-Matching</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gradient mb-2">
                      0%
                    </div>
                    <div className="text-gray-600">Setup Fees</div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Back Button */}
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-8 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to vendor types
              </button>

              {/* Registration Form */}
              {selectedType === "venue" && <VenueForm />}
              {selectedType === "catering" && <CateringForm />}
              {selectedType === "tech" && <TechForm />}
            </>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
