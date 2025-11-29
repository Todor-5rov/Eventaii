export function ForOrganizers() {
  const benefits = [
    {
      stat: '95%',
      label: 'Time Saved',
      description: 'Spend minutes instead of weeks planning your event',
    },
    {
      stat: '30%',
      label: 'Cost Reduction',
      description: 'AI optimization finds the best value vendors',
    },
    {
      stat: '100%',
      label: 'Coordination',
      description: 'All vendors managed from a single dashboard',
    },
  ]

  const features = [
    'Instant vendor matching in under 2 minutes',
    'Real-time availability confirmation',
    'Automated contract generation and signing',
    'Integrated payment processing',
    'Event reminders and coordination',
    'Post-event feedback collection',
  ]

  return (
    <section id="for-organizers" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-6">
              For Event Organizers
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Plan Events <span className="text-gradient">Without the Stress</span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Stop juggling endless emails, phone calls, and spreadsheets. Our AI handles vendor selection, 
              booking, and coordination automatically, so you can focus on creating amazing experiences.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {benefits.map((benefit) => (
                <div key={benefit.stat} className="text-center">
                  <div className="text-3xl font-bold text-gradient mb-2">{benefit.stat}</div>
                  <div className="text-sm font-semibold text-gray-900 mb-1">{benefit.label}</div>
                  <div className="text-xs text-gray-600">{benefit.description}</div>
                </div>
              ))}
            </div>

            {/* Features list */}
            <div className="space-y-4 mb-8">
              {features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <button className="px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-lg font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transition-all">
              Start Planning Your Event
            </button>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-primary-100 to-secondary-100 rounded-3xl p-8 shadow-2xl">
              {/* Mock Dashboard */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-primary-600 to-secondary-600 px-6 py-4">
                  <div className="text-white font-semibold">Your Event Dashboard</div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold">Grand Ballroom</div>
                        <div className="text-sm text-gray-600">Venue • Confirmed</div>
                      </div>
                    </div>
                    <div className="text-green-600 font-bold">$2,500</div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold">Gourmet Catering</div>
                        <div className="text-sm text-gray-600">Catering • Confirmed</div>
                      </div>
                    </div>
                    <div className="text-green-600 font-bold">$3,200</div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold">Pro Audio/Visual</div>
                        <div className="text-sm text-gray-600">Tech • Confirmed</div>
                      </div>
                    </div>
                    <div className="text-green-600 font-bold">$1,800</div>
                  </div>
                </div>
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Event Cost</span>
                    <span className="text-2xl font-bold text-gradient">$7,500</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-4 border-2 border-green-500">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-semibold">Booked in 1m 43s</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

