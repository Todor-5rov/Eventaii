'use client'

import { useState, FormEvent } from 'react'
import { supabase } from '@/lib/supabase'

interface CateringFormData {
  companyName: string
  serviceCapacity: string
  serviceCity: string
  pricePerPerson: string
  cuisineType: string
  contactEmail: string
  contactPhone: string
}

export function CateringForm() {
  const [formData, setFormData] = useState<CateringFormData>({
    companyName: '',
    serviceCapacity: '',
    serviceCity: '',
    pricePerPerson: '',
    cuisineType: '',
    contactEmail: '',
    contactPhone: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const { data, error } = await supabase
        .from('catering')
        .insert([{
          company_name: formData.companyName,
          service_capacity: parseInt(formData.serviceCapacity),
          service_city: formData.serviceCity,
          price_per_person: parseFloat(formData.pricePerPerson),
          cuisine_type: formData.cuisineType || null,
          contact_email: formData.contactEmail,
          contact_phone: formData.contactPhone || null,
        }])
        .select()

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }

      console.log('Catering service registered successfully:', data)
      setSubmitStatus('success')
      
      // Reset form
      setFormData({
        companyName: '',
        serviceCapacity: '',
        serviceCity: '',
        pricePerPerson: '',
        cuisineType: '',
        contactEmail: '',
        contactPhone: '',
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl p-8 border-2 border-gray-100 shadow-xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Register Your Catering Service</h2>
        <p className="text-gray-600">Tell us about your catering business</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Name */}
        <div>
          <label htmlFor="companyName" className="block text-sm font-semibold text-gray-700 mb-2">
            Company Name *
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
            placeholder="e.g., Gourmet Catering Co."
          />
        </div>

        {/* Service Capacity */}
        <div>
          <label htmlFor="serviceCapacity" className="block text-sm font-semibold text-gray-700 mb-2">
            Service Capacity (Max People) *
          </label>
          <input
            type="number"
            id="serviceCapacity"
            name="serviceCapacity"
            value={formData.serviceCapacity}
            onChange={handleChange}
            required
            min="1"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
            placeholder="e.g., 500"
          />
        </div>

        {/* City */}
        <div>
          <label htmlFor="serviceCity" className="block text-sm font-semibold text-gray-700 mb-2">
            Service City *
          </label>
          <input
            type="text"
            id="serviceCity"
            name="serviceCity"
            value={formData.serviceCity}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
            placeholder="e.g., Los Angeles"
          />
        </div>

        {/* Price Per Person */}
        <div>
          <label htmlFor="pricePerPerson" className="block text-sm font-semibold text-gray-700 mb-2">
            Price Per Person ($) *
          </label>
          <input
            type="number"
            id="pricePerPerson"
            name="pricePerPerson"
            value={formData.pricePerPerson}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
            placeholder="e.g., 35.00"
          />
        </div>

        {/* Cuisine Type */}
        <div>
          <label htmlFor="cuisineType" className="block text-sm font-semibold text-gray-700 mb-2">
            Cuisine Type
          </label>
          <select
            id="cuisineType"
            name="cuisineType"
            value={formData.cuisineType}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
          >
            <option value="">Select cuisine type</option>
            <option value="American">American</option>
            <option value="Italian">Italian</option>
            <option value="Mexican">Mexican</option>
            <option value="Asian">Asian</option>
            <option value="Mediterranean">Mediterranean</option>
            <option value="Indian">Indian</option>
            <option value="Mixed">Mixed/Variety</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Contact Email */}
        <div>
          <label htmlFor="contactEmail" className="block text-sm font-semibold text-gray-700 mb-2">
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
            placeholder="contact@catering.com"
          />
        </div>

        {/* Contact Phone */}
        <div>
          <label htmlFor="contactPhone" className="block text-sm font-semibold text-gray-700 mb-2">
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
        {submitStatus === 'success' && (
          <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
            <div className="flex items-center gap-2 text-green-800">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">Registration successful! We&apos;ll review your application soon.</span>
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg">
            <div className="flex items-center gap-2 text-red-800">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">Error submitting form. Please try again.</span>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isSubmitting ? 'Submitting...' : 'Register Catering Service'}
        </button>
      </form>
    </div>
  )
}

