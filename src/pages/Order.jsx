import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageTransition from '../components/ui/PageTransition'
import { orderSchema, getMinDeliveryDate } from '../lib/validation'
import { FLAVORS, WEBHOOK_URL, WHATSAPP_URL } from '../lib/constants'

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-charcoal/20 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 outline-none transition-colors bg-white font-body'
const labelClass = 'block text-sm font-medium text-charcoal mb-2'
const errorClass = 'text-red-500 text-sm mt-1'

export default function Order() {
  const [formState, setFormState] = useState('idle')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      customerName: '',
      email: '',
      phone: '',
      flavors: [],
      quantity: 1,
      deliveryDate: '',
      message: '',
    },
  })

  const messageValue = watch('message') || ''
  const selectedFlavors = watch('flavors') || []

  async function onSubmit(data) {
    setFormState('loading')
    try {
      if (!WEBHOOK_URL) {
        await new Promise((r) => setTimeout(r, 1500))
        setFormState('success')
        return
      }
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, timestamp: new Date().toISOString() }),
      })
      if (!res.ok) throw new Error('Failed to submit')
      setFormState('success')
    } catch {
      setFormState('error')
    }
  }

  return (
    <PageTransition>
      {/* Page Header */}
      <section className="py-32 pt-40 px-6 bg-cream text-center">
        <h1 className="font-heading text-5xl text-charcoal">Place Your Order</h1>
        <div className="w-20 h-1 bg-gold mx-auto mt-4" />
        <p className="text-charcoal-light mt-4">
          Fill out the form below and we'll confirm your order within 24 hours
        </p>
      </section>

      {/* Order Form */}
      <section className="max-w-2xl mx-auto py-16 px-6">
        {formState === 'success' ? (
          <div className="text-center py-16">
            <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" strokeWidth={1.5} />
            <h2 className="font-heading text-3xl text-charcoal mb-4">Order Received!</h2>
            <p className="text-charcoal-light mb-8">
              We'll confirm your order via email within 24 hours. Thank you!
            </p>
            <Link
              to="/"
              className="inline-block bg-terracotta text-white py-3 px-8 rounded-full font-semibold hover:bg-terracotta-dark transition-colors"
            >
              Back to Home
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
            {/* Customer Name */}
            <div>
              <label className={labelClass}>Customer Name</label>
              <input
                type="text"
                className={inputClass}
                placeholder="Your full name"
                {...register('customerName')}
              />
              {errors.customerName && (
                <p className={errorClass}>{errors.customerName.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                className={inputClass}
                placeholder="you@example.com"
                {...register('email')}
              />
              {errors.email && <p className={errorClass}>{errors.email.message}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className={labelClass}>Phone</label>
              <input
                type="tel"
                className={inputClass}
                placeholder="(346) 000-0000"
                {...register('phone')}
              />
              {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
            </div>

            {/* Flavors */}
            <div>
              <label className={labelClass}>Flavors</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FLAVORS.map((flavor) => {
                  const isSelected = selectedFlavors.includes(flavor.id)
                  return (
                    <label
                      key={flavor.id}
                      className={`border rounded-xl p-4 flex items-center gap-3 cursor-pointer transition-colors ${
                        isSelected
                          ? 'border-terracotta bg-terracotta/5'
                          : 'border-charcoal/20 bg-white hover:border-terracotta/40'
                      }`}
                    >
                      <input
                        type="checkbox"
                        value={flavor.id}
                        className="w-4 h-4 accent-terracotta"
                        {...register('flavors')}
                      />
                      <div>
                        <p className="font-medium text-charcoal text-sm">{flavor.name}</p>
                        <p className="text-xs text-charcoal-light leading-snug mt-0.5">
                          {flavor.shortName}
                        </p>
                      </div>
                    </label>
                  )
                })}
              </div>
              {errors.flavors && <p className={errorClass}>{errors.flavors.message}</p>}
            </div>

            {/* Quantity */}
            <div>
              <label className={labelClass}>Quantity (per order)</label>
              <input
                type="number"
                min={1}
                max={24}
                className={inputClass}
                placeholder="1"
                {...register('quantity', { valueAsNumber: true })}
              />
              {errors.quantity && <p className={errorClass}>{errors.quantity.message}</p>}
            </div>

            {/* Delivery Date */}
            <div>
              <label className={labelClass}>Delivery Date</label>
              <input
                type="date"
                min={getMinDeliveryDate()}
                className={inputClass}
                {...register('deliveryDate')}
              />
              {errors.deliveryDate && (
                <p className={errorClass}>{errors.deliveryDate.message}</p>
              )}
            </div>

            {/* Special Message */}
            <div>
              <label className={labelClass}>
                Special Message{' '}
                <span className="text-charcoal-light font-normal">(optional)</span>
              </label>
              <textarea
                rows={4}
                maxLength={500}
                className={`${inputClass} resize-none`}
                placeholder="Any special requests, allergies, or notes..."
                {...register('message')}
              />
              <p className="text-xs text-charcoal-light mt-1 text-right">
                {messageValue.length}/500
              </p>
              {errors.message && <p className={errorClass}>{errors.message.message}</p>}
            </div>

            {/* Error state */}
            {formState === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-600 font-medium mb-2">Something went wrong.</p>
                <p className="text-red-500 text-sm mb-3">
                  Please try again or reach out to us directly.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => setFormState('idle')}
                    className="text-sm text-red-600 underline font-medium"
                  >
                    Try again
                  </button>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-whatsapp font-medium underline"
                  >
                    Having trouble? Contact us directly on WhatsApp
                  </a>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={formState === 'loading'}
              className="w-full bg-terracotta text-white py-4 rounded-full font-semibold text-lg hover:bg-terracotta-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {formState === 'loading' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Place Order'
              )}
            </button>
          </form>
        )}
      </section>
    </PageTransition>
  )
}
