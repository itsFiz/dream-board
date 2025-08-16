import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
  }).format(date)
}

export function getMonthName(month: number): string {
  const date = new Date(2024, month - 1, 1)
  return date.toLocaleDateString('en-US', { month: 'long' })
}

export function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'high':
      return 'text-red-700 bg-red-100 border-red-300'
    case 'medium':
      return 'text-yellow-700 bg-yellow-100 border-yellow-300'
    case 'low':
      return 'text-green-700 bg-green-100 border-green-300'
    default:
      return 'text-gray-700 bg-gray-100 border-gray-300'
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'completed':
      return 'text-green-700 bg-green-100 border-green-300'
    case 'in_progress':
      return 'text-blue-700 bg-blue-100 border-blue-300'
    case 'planning':
      return 'text-purple-700 bg-purple-100 border-purple-300'
    case 'on_hold':
      return 'text-gray-700 bg-gray-100 border-gray-300'
    default:
      return 'text-gray-700 bg-gray-100 border-gray-300'
  }
}
