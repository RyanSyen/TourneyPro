// lib/api/client.ts
class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new ApiError(
          errorData.message || 'API request failed',
          response.status,
          errorData
        )
      }

      return response.json()
    } catch (error) {
      if (error instanceof ApiError) throw error
      throw new ApiError('Network error', 0, { originalError: error })
    }
  }
}

export const apiClient = new ApiClient()

// Global error handler
export function useGlobalErrorHandler() {
  return {
    onError: (error: Error) => {
      if (error instanceof ApiError) {
        // Handle API errors
        console.error('API Error:', error.message, error.status)

        if (error.status === 401) {
          // Redirect to login
          window.location.href = '/login'
        }
      } else {
        // Handle other errors
        console.error('Unexpected error:', error)
      }
    }
  }
}
