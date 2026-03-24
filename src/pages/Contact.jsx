import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Phone, Mail, MapPin, Loader2, CheckCircle2 } from 'lucide-react'
import PageTransition from '../components/ui/PageTransition'
import { contactSchema } from '../lib/validation'
import { WHATSAPP_URL, BUSINESS_EMAIL, WEBHOOK_URL } from '../lib/constants'

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-charcoal/20 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 outline-none transition-colors bg-white font-body'
const labelClass = 'block text-sm font-medium text-charcoal mb-2'
const errorClass = 'text-red-500 text-sm mt-1'

export default function Contact() {
  const [formState, setFormState] = useState('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', message: '' },
  })

  async function onSubmit(data) {
    setFormState('loading')
    try {
      if (!WEBHOOK_URL) {
        await new Promise((r) => setTimeout(r, 1200))
        setFormState('success')
        return
      }
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, type: 'contact', timestamp: new Date().toISOString() }),
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
        <h1 className="font-heading text-5xl text-charcoal">Get in Touch</h1>
        <div className="w-20 h-1 bg-gold mx-auto mt-4" />
        <p className="text-charcoal-light mt-4">We'd love to hear from you</p>
      </section>

      {/* Contact Cards */}
      <section className="max-w-4xl mx-auto py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* WhatsApp Card */}
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-whatsapp/10 rounded-full flex items-center justify-center mx-auto">
              <Phone className="w-7 h-7 text-whatsapp" strokeWidth={1.5} />
            </div>
            <h3 className="font-heading text-xl text-charcoal mt-4">WhatsApp</h3>
            <p className="text-charcoal-light mt-2">(346) 820-7669</p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-whatsapp font-medium mt-3 inline-block hover:underline"
            >
              Message Us
            </a>
          </div>

          {/* Email Card */}
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto">
              <Mail className="w-7 h-7 text-terracotta" strokeWidth={1.5} />
            </div>
            <h3 className="font-heading text-xl text-charcoal mt-4">Email</h3>
            <p className="text-charcoal-light mt-2">{BUSINESS_EMAIL}</p>
            <a
              href={`mailto:${BUSINESS_EMAIL}`}
              className="text-terracotta font-medium mt-3 inline-block hover:underline"
            >
              Send Email
            </a>
          </div>

          {/* Location Card */}
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-plum/10 rounded-full flex items-center justify-center mx-auto">
              <MapPin className="w-7 h-7 text-plum" strokeWidth={1.5} />
            </div>
            <h3 className="font-heading text-xl text-charcoal mt-4">Location</h3>
            <p className="text-charcoal-light mt-2">Katy, Texas</p>
            <p className="text-charcoal-light text-sm mt-1">Local delivery available</p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="max-w-xl mx-auto py-8 px-6">
        <h2 className="font-heading text-2xl text-center text-charcoal mb-8">
          Send Us a Message
        </h2>

        {formState === 'success' ? (
          <div className="text-center py-12">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" strokeWidth={1.5} />
            <h3 className="font-heading text-2xl text-charcoal mb-2">Message Sent!</h3>
            <p className="text-charcoal-light">We'll get back to you as soon as possible.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            {/* Name */}
            <div>
              <label className={labelClass}>Name</label>
              <input
                type="text"
                className={inputClass}
                placeholder="Your name"
                {...register('name')}
              />
              {errors.name && <p className={errorClass}>{errors.name.message}</p>}
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

            {/* Message */}
            <div>
              <label className={labelClass}>Message</label>
              <textarea
                rows={5}
                className={`${inputClass} resize-none`}
                placeholder="How can we help you?"
                {...register('message')}
              />
              {errors.message && <p className={errorClass}>{errors.message.message}</p>}
            </div>

            {/* Error state */}
            {formState === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-600 text-sm font-medium mb-1">Something went wrong.</p>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setFormState('idle')}
                    className="text-sm text-red-600 underline"
                  >
                    Try again
                  </button>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-whatsapp underline"
                  >
                    Contact us on WhatsApp
                  </a>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={formState === 'loading'}
              className="bg-terracotta text-white py-3 px-8 rounded-full font-semibold hover:bg-terracotta-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {formState === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        )}
      </section>

      {/* Map Placeholder */}
      <section className="py-8 px-6 max-w-4xl mx-auto">
        <div className="bg-cream rounded-2xl p-8 text-center">
          <div className="w-14 h-14 bg-plum/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-7 h-7 text-plum" strokeWidth={1.5} />
          </div>
          <p className="font-heading text-xl text-charcoal">
            Katy, Texas · Houston Metro Area
          </p>
          <p className="text-charcoal-light mt-3 text-sm">
            Delivering fresh cake jars across the Katy and greater Houston area
          </p>
        </div>
      </section>
    </PageTransition>
  )
}
