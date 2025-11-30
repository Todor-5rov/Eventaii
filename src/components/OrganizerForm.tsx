"use client";

import { useState, FormEvent } from "react";
import { supabase } from "@/lib/supabase";

interface OrganizerFormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  city: string;
  typicalEventSize: string;
  eventsPerYear: string;
}

export function OrganizerForm() {
  const [formData, setFormData] = useState<OrganizerFormData>({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    city: "",
    typicalEventSize: "",
    eventsPerYear: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const { data, error } = await supabase
        .from("organizers")
        .insert([
          {
            full_name: formData.fullName,
            company_name: formData.companyName || null,
            email: formData.email,
            phone: formData.phone || null,
            city: formData.city || null,
            typical_event_size: formData.typicalEventSize || null,
            events_per_year: formData.eventsPerYear
              ? parseInt(formData.eventsPerYear)
              : null,
          },
        ])
        .select();

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      console.log("Organizer registered successfully:", data);
      setSubmitStatus("success");

      // Reset form
      setFormData({
        fullName: "",
        companyName: "",
        email: "",
        phone: "",
        city: "",
        typicalEventSize: "",
        eventsPerYear: "",
      });
    } catch (error: any) {
      console.error("Error submitting form:", error);
      
      // Check if it's a connection error
      if (error?.message?.includes("Failed to fetch") || error?.message?.includes("fetch")) {
        setErrorMessage(
          "Cannot connect to database. Please check if Supabase environment variables are configured."
        );
      } else if (error?.message) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
      
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl p-8 border-2 border-gray-100 shadow-xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Create Your Account</h2>
        <p className="text-gray-600">
          Tell us a bit about yourself to get started
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
            placeholder="John Smith"
          />
        </div>

        {/* Company Name */}
        <div>
          <label
            htmlFor="companyName"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Company/Organization Name
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
            placeholder="Acme Corp"
          />
          <p className="text-sm text-gray-500 mt-1">
            Optional - leave blank if planning personal events
          </p>
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
            placeholder="john@example.com"
          />
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        {/* City */}
        <div>
          <label
            htmlFor="city"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
            placeholder="New York"
          />
          <p className="text-sm text-gray-500 mt-1">
            Where do you typically host events?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Typical Event Size */}
          <div>
            <label
              htmlFor="typicalEventSize"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Typical Event Size
            </label>
            <select
              id="typicalEventSize"
              name="typicalEventSize"
              value={formData.typicalEventSize}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
            >
              <option value="">Select size</option>
              <option value="small">Small (10-50 people)</option>
              <option value="medium">Medium (50-200 people)</option>
              <option value="large">Large (200-500 people)</option>
              <option value="xlarge">Extra Large (500+ people)</option>
              <option value="varies">Varies</option>
            </select>
          </div>

          {/* Events Per Year */}
          <div>
            <label
              htmlFor="eventsPerYear"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Events Per Year
            </label>
            <input
              type="number"
              id="eventsPerYear"
              name="eventsPerYear"
              value={formData.eventsPerYear}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
              placeholder="5"
            />
          </div>
        </div>

        {/* Submit Status Messages */}
        {submitStatus === "success" && (
          <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
            <div className="flex items-center gap-2 text-green-800">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-semibold">
                Registration successful! You can now start planning events.
              </span>
            </div>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg">
            <div className="text-red-800">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-semibold">Error submitting form</span>
              </div>
              <p className="text-sm">{errorMessage || "Please try again."}</p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-lg font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="#" className="text-primary-600 hover:text-primary-700 font-semibold">
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
}

