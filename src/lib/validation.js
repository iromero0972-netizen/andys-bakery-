import { z } from 'zod'

const threeDaysFromNow = () => {
  const d = new Date()
  d.setDate(d.getDate() + 3)
  d.setHours(0, 0, 0, 0)
  return d
}

export const orderSchema = z.object({
  customerName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .min(10, 'Please enter a valid phone number')
    .max(20, 'Phone number is too long'),
  flavors: z
    .array(z.string())
    .min(1, 'Please select at least one flavor'),
  quantity: z
    .number({ invalid_type_error: 'Please enter a quantity' })
    .min(1, 'Minimum order is 1 jar')
    .max(24, 'Maximum order is 24 jars per flavor'),
  deliveryDate: z
    .string()
    .min(1, 'Please select a delivery date')
    .refine((val) => {
      const selected = new Date(val)
      return selected >= threeDaysFromNow()
    }, 'Delivery date must be at least 3 days from today'),
  message: z
    .string()
    .max(500, 'Message must be under 500 characters')
    .optional()
    .or(z.literal('')),
})

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message is too long'),
})

export function getMinDeliveryDate() {
  const d = threeDaysFromNow()
  return d.toISOString().split('T')[0]
}
