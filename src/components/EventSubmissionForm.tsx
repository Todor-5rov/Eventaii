"use client";

import { useState, FormEvent } from "react";
import { supabase } from "@/lib/supabase";

interface EventSubmissionFormProps {
  organizerId: string;
  onSuccess: () => void;
}

interface EventFormData {
  eventName: string;
  eventType: string;
  attendeeCount: string;
  eventCity: string;
  eventAddress: string;
  budget: string;
  needsVenue: boolean;
  needsCatering: boolean;
  needsTech: boolean;
  specialRequirements: string;
}

export function EventSubmissionForm({
  organizerId,
  onSuccess,
}: EventSubmissionFormProps) {
  const [formData, setFormData] = useState<EventFormData>({
    eventName: "",
    eventType: "",
    attendeeCount: "",
    eventCity: "",
    eventAddress: "",
    budget: "",
    needsVenue: true,
    needsCatering: true,
    needsTech: false,
    specialRequirements: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const { data, error } = await supabase
        .from("events")
        .insert([
          {
            organizer_id: organizerId,
            event_name: formData.eventName,
            event_type: formData.eventType || null,
            attendee_count: parseInt(formData.attendeeCount),
            event_city: formData.eventCity,
            event_address: formData.eventAddress || null,
            budget: parseFloat(formData.budget),
            needs_venue: formData.needsVenue,
            needs_catering: formData.needsCatering,
            needs_tech: formData.needsTech,
            special_requirements: formData.specialRequirements || null,
            status: "pending",
          },
        ])
        .select();

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      console.log("Event created successfully:", data);

      // Call n8n webhook with the created event
      try {
        const webhookUrl = "https://eventai.app.n8n.cloud/webhook-test/abc44e0c-a7de-4340-814e-884d5ac24488";
        
        // Prepare the event data
        const eventData = {
          event_id: data[0].event_id,
          organizer_id: data[0].organizer_id,
          event_name: data[0].event_name,
          event_type: data[0].event_type,
          attendee_count: data[0].attendee_count,
          event_city: data[0].event_city,
          event_address: data[0].event_address,
          budget: data[0].budget,
          needs_venue: data[0].needs_venue,
          needs_catering: data[0].needs_catering,
          needs_tech: data[0].needs_tech,
          special_requirements: data[0].special_requirements,
          status: data[0].status,
        };

        // Send as text (JSON string) instead of JSON
        const webhookResponse = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
          },
          body: JSON.stringify(eventData), // Send as text
        });

        if (webhookResponse.ok) {
          console.log("Webhook triggered successfully");
        } else {
          console.error("Webhook call failed:", webhookResponse.status);
        }
      } catch (webhookError) {
        console.error("Error calling webhook:", webhookError);
        // Don't fail the event creation if webhook fails
      }

      setSubmitStatus("success");

      // Call success callback after a short delay
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } catch (error) {
      console.error("Error submitting event:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Event Name */}
      <div>
        <label
          htmlFor="eventName"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Event Name *
        </label>
        <input
          type="text"
          id="eventName"
          name="eventName"
          value={formData.eventName}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
          placeholder="Annual Company Conference 2024"
        />
      </div>

      {/* Event Type */}
      <div>
        <label
          htmlFor="eventType"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Event Type
        </label>
        <select
          id="eventType"
          name="eventType"
          value={formData.eventType}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
        >
          <option value="">Select type</option>
          <option value="conference">Conference</option>
          <option value="wedding">Wedding</option>
          <option value="corporate">Corporate Event</option>
          <option value="party">Party</option>
          <option value="seminar">Seminar/Workshop</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Attendee Count and Budget */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="attendeeCount"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Number of Attendees *
          </label>
          <input
            type="number"
            id="attendeeCount"
            name="attendeeCount"
            value={formData.attendeeCount}
            onChange={handleChange}
            required
            min="1"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
            placeholder="100"
          />
        </div>

        <div>
          <label
            htmlFor="budget"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Budget ($) *
          </label>
          <input
            type="number"
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
            placeholder="10000"
          />
        </div>
      </div>

      {/* City */}
      <div>
        <label
          htmlFor="eventCity"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          City *
        </label>
        <input
          type="text"
          id="eventCity"
          name="eventCity"
          value={formData.eventCity}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
          placeholder="New York"
        />
      </div>

      {/* Address */}
      <div>
        <label
          htmlFor="eventAddress"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Preferred Address/Area
        </label>
        <input
          type="text"
          id="eventAddress"
          name="eventAddress"
          value={formData.eventAddress}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
          placeholder="Downtown Manhattan"
        />
      </div>

      {/* Services Needed */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Services Needed *
        </label>
        <div className="space-y-3">
          <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary-300 transition-colors">
            <input
              type="checkbox"
              name="needsVenue"
              checked={formData.needsVenue}
              onChange={handleChange}
              className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
            />
            <div>
              <div className="font-semibold">Venue</div>
              <div className="text-sm text-gray-600">
                Event space or location
              </div>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary-300 transition-colors">
            <input
              type="checkbox"
              name="needsCatering"
              checked={formData.needsCatering}
              onChange={handleChange}
              className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
            />
            <div>
              <div className="font-semibold">Catering</div>
              <div className="text-sm text-gray-600">
                Food and beverage services
              </div>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary-300 transition-colors">
            <input
              type="checkbox"
              name="needsTech"
              checked={formData.needsTech}
              onChange={handleChange}
              className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
            />
            <div>
              <div className="font-semibold">Tech/AV Equipment</div>
              <div className="text-sm text-gray-600">
                Audio, video, lighting, etc.
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* Special Requirements */}
      <div>
        <label
          htmlFor="specialRequirements"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Special Requirements
        </label>
        <textarea
          id="specialRequirements"
          name="specialRequirements"
          value={formData.specialRequirements}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors resize-none"
          placeholder="Any specific requests, dietary restrictions, accessibility needs, etc."
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
              Event created successfully! Our AI is now finding the best vendors
              for you.
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
              Error creating event. Please try again.
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
        {isSubmitting ? "Creating Event..." : "Create Event"}
      </button>
    </form>
  );
}

