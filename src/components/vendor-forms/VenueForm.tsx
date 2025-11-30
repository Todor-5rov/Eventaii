"use client";

import { useState, FormEvent } from "react";
import { supabase } from "@/lib/supabase";

interface VenueFormData {
  venueName: string;
  venueCapacity: string;
  venueCity: string;
  venueAddress: string;
  pricePerEvent: string;
  contactEmail: string;
  contactPhone: string;
}

export function VenueForm() {
  const [formData, setFormData] = useState<VenueFormData>({
    venueName: "",
    venueCapacity: "",
    venueCity: "",
    venueAddress: "",
    pricePerEvent: "",
    contactEmail: "",
    contactPhone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
        .from("venues")
        .insert([
          {
            venue_name: formData.venueName,
            venue_capacity: parseInt(formData.venueCapacity),
            venue_city: formData.venueCity,
            venue_address: formData.venueAddress,
            price_per_event: parseFloat(formData.pricePerEvent),
            contact_email: formData.contactEmail,
            contact_phone: formData.contactPhone || null,
          },
        ])
        .select();

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      console.log("Venue registered successfully:", data);
      setSubmitStatus("success");

      // Reset form
      setFormData({
        venueName: "",
        venueCapacity: "",
        venueCity: "",
        venueAddress: "",
        pricePerEvent: "",
        contactEmail: "",
        contactPhone: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl p-8 border-2 border-gray-100 shadow-xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Register Your Venue</h2>
        <p className="text-gray-600">
          Fill in the details about your venue space
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Venue Name */}
        <div>
          <label
            htmlFor="venueName"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Venue Name *
          </label>
          <input
            type="text"
            id="venueName"
            name="venueName"
            value={formData.venueName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
            placeholder="e.g., Grand Ballroom"
          />
        </div>

        {/* Capacity */}
        <div>
          <label
            htmlFor="venueCapacity"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Capacity (Number of People) *
          </label>
          <input
            type="number"
            id="venueCapacity"
            name="venueCapacity"
            value={formData.venueCapacity}
            onChange={handleChange}
            required
            min="1"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
            placeholder="e.g., 200"
          />
        </div>

        {/* City */}
        <div>
          <label
            htmlFor="venueCity"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            City *
          </label>
          <input
            type="text"
            id="venueCity"
            name="venueCity"
            value={formData.venueCity}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
            placeholder="e.g., New York"
          />
        </div>

        {/* Address */}
        <div>
          <label
            htmlFor="venueAddress"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Full Address *
          </label>
          <textarea
            id="venueAddress"
            name="venueAddress"
            value={formData.venueAddress}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors resize-none"
            placeholder="123 Main Street, Suite 100"
          />
        </div>

        {/* Price */}
        <div>
          <label
            htmlFor="pricePerEvent"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Price Per Event ($) *
          </label>
          <input
            type="number"
            id="pricePerEvent"
            name="pricePerEvent"
            value={formData.pricePerEvent}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
            placeholder="e.g., 2500.00"
          />
        </div>

        {/* Contact Email */}
        <div>
          <label
            htmlFor="contactEmail"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Contact Email *
          </label>
          <input
            type="email"
            id="contactEmail"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
            placeholder="contact@venue.com"
          />
        </div>

        {/* Contact Phone */}
        <div>
          <label
            htmlFor="contactPhone"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Contact Phone
          </label>
          <input
            type="tel"
            id="contactPhone"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
            placeholder="+1 (555) 123-4567"
          />
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
                Registration successful! We&apos;ll review your application
                soon.
              </span>
            </div>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg">
            <div className="flex items-center gap-2 text-red-800">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-semibold">
                Error submitting form. Please try again.
              </span>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-lg font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isSubmitting ? "Submitting..." : "Register Venue"}
        </button>
      </form>
    </div>
  );
}
