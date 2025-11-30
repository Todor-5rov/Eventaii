"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { EventSubmissionForm } from "@/components/EventSubmissionForm";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface Organizer {
  organizer_id: string;
  full_name: string;
  email: string;
  company_name?: string;
}

interface Event {
  event_id: string;
  event_name: string;
  event_city: string;
  attendee_count: number;
  budget: number;
  status: string;
  needs_venue: boolean;
  needs_catering: boolean;
  needs_tech: boolean;
  venue_approved: boolean;
  catering_approved: boolean;
  tech_approved: boolean;
  created_at: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [organizer, setOrganizer] = useState<Organizer | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is signed in
    const storedOrganizer = localStorage.getItem("organizer");
    if (!storedOrganizer) {
      router.push("/signin");
      return;
    }

    const org = JSON.parse(storedOrganizer);
    setOrganizer(org);
    loadEvents(org.organizer_id);
  }, [router]);

  async function loadEvents(organizerId: string) {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("organizer_id", organizerId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error("Error loading events:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSignOut() {
    localStorage.removeItem("organizer");
    router.push("/");
  }

  function handleEventCreated() {
    setShowEventForm(false);
    if (organizer) {
      loadEvents(organizer.organizer_id);
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "matched":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "completed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (!organizer) {
    return null;
  }

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />

      <div className="flex-grow pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">
                  Welcome back,{" "}
                  <span className="text-gradient">{organizer.full_name}</span>
                </h1>
                <p className="text-gray-600">
                  {organizer.company_name || "Personal Events"} •{" "}
                  {organizer.email}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowEventForm(true)}
                  className="px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                >
                  + New Event
                </button>
                <button
                  onClick={handleSignOut}
                  className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-all"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Event Submission Form Modal */}
          {showEventForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
              <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Create New Event</h2>
                  <button
                    onClick={() => setShowEventForm(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="p-8">
                  <EventSubmissionForm
                    organizerId={organizer.organizer_id}
                    onSuccess={handleEventCreated}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 border-2 border-gray-100">
              <div className="text-3xl font-bold text-gradient mb-1">
                {events.length}
              </div>
              <div className="text-gray-600">Total Events</div>
            </div>
            <div className="bg-white rounded-xl p-6 border-2 border-gray-100">
              <div className="text-3xl font-bold text-gradient mb-1">
                {events.filter((e) => e.status === "pending").length}
              </div>
              <div className="text-gray-600">Pending</div>
            </div>
            <div className="bg-white rounded-xl p-6 border-2 border-gray-100">
              <div className="text-3xl font-bold text-gradient mb-1">
                {events.filter((e) => e.status === "confirmed").length}
              </div>
              <div className="text-gray-600">Confirmed</div>
            </div>
            <div className="bg-white rounded-xl p-6 border-2 border-gray-100">
              <div className="text-3xl font-bold text-gradient mb-1">
                {events.filter((e) => e.status === "completed").length}
              </div>
              <div className="text-gray-600">Completed</div>
            </div>
          </div>

          {/* Events List */}
          <div className="bg-white rounded-xl border-2 border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold">Your Events</h2>
            </div>

            {isLoading ? (
              <div className="p-12 text-center text-gray-500">
                Loading events...
              </div>
            ) : events.length === 0 ? (
              <div className="p-12 text-center">
                <svg
                  className="w-16 h-16 text-gray-300 mx-auto mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <h3 className="text-lg font-semibold mb-2">No events yet</h3>
                <p className="text-gray-600 mb-6">
                  Create your first event to get started
                </p>
                <button
                  onClick={() => setShowEventForm(true)}
                  className="px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                >
                  Create Event
                </button>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {events.map((event) => (
                  <div
                    key={event.event_id}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold">
                            {event.event_name}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                              event.status
                            )}`}
                          >
                            {event.status.charAt(0).toUpperCase() +
                              event.status.slice(1)}
                          </span>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>
                            {event.attendee_count} attendees
                          </div>
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            {event.event_city}
                          </div>
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            ${event.budget.toLocaleString()}
                          </div>
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            {new Date(event.created_at).toLocaleDateString()}
                          </div>
                        </div>

                        {/* Vendor Approvals */}
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="text-xs font-semibold text-gray-700 mb-2">
                            Vendor Approvals:
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {event.needs_venue && (
                              <div
                                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                                  event.venue_approved
                                    ? "bg-green-100 text-green-800 border border-green-200"
                                    : "bg-gray-100 text-gray-600 border border-gray-200"
                                }`}
                              >
                                {event.venue_approved ? (
                                  <svg
                                    className="w-3 h-3"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                ) : (
                                  <svg
                                    className="w-3 h-3"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                )}
                                <span>Venue</span>
                              </div>
                            )}
                            {event.needs_catering && (
                              <div
                                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                                  event.catering_approved
                                    ? "bg-green-100 text-green-800 border border-green-200"
                                    : "bg-gray-100 text-gray-600 border border-gray-200"
                                }`}
                              >
                                {event.catering_approved ? (
                                  <svg
                                    className="w-3 h-3"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                ) : (
                                  <svg
                                    className="w-3 h-3"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                )}
                                <span>Catering</span>
                              </div>
                            )}
                            {event.needs_tech && (
                              <div
                                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                                  event.tech_approved
                                    ? "bg-green-100 text-green-800 border border-green-200"
                                    : "bg-gray-100 text-gray-600 border border-gray-200"
                                }`}
                              >
                                {event.tech_approved ? (
                                  <svg
                                    className="w-3 h-3"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                ) : (
                                  <svg
                                    className="w-3 h-3"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                )}
                                <span>Tech</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <button className="ml-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
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
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

