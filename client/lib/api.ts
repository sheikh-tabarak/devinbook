class ApiClient {
  private baseURL = "http://192.168.1.21:5000/api"

  private getAuthHeaders() {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
    return {
      "Content-Type": "application/json",
      ...(token && token !== "undefined" && { Authorization: `Bearer ${token}` }),
    }
  }

  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.getAuthHeaders(),
          ...options.headers,
        },
      })

      let data: any = null
      const contentType = response.headers.get("content-type")
      if (contentType && contentType.includes("application/json")) {
        data = await response.json()
      }

      if (!response.ok) {
        const errorMessage = data?.message || data?.error || response.statusText || "Unknown API Error"
        throw new Error(errorMessage)
      }

      return data
    } catch (error) {
      if (error instanceof Error) {
        // If it's a fetch error (like connection refused)
        if (error.name === "TypeError" && error.message === "Failed to fetch") {
          throw new Error("Server is not responding. Please check your connection.")
        }
        throw error
      }
      throw new Error("An unexpected error occurred")
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  }

  async register(name: string, email: string, password: string) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    })
  }

  // Categories
  async getCategories() {
    return this.request("/categories")
  }

  async createCategory(name: string, type: "income" | "expense" = "expense", icon?: string) {
    return this.request("/categories", {
      method: "POST",
      body: JSON.stringify({ name, type, icon }),
    })
  }

  async updateCategory(id: string, name: string) {
    return this.request(`/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify({ name }),
    })
  }

  async deleteCategory(id: string) {
    return this.request(`/categories/${id}`, {
      method: "DELETE",
    })
  }

  // Items
  async getItems() {
    return this.request("/items")
  }

  async createItem(name: string, categoryId: string) {
    return this.request("/items", {
      method: "POST",
      body: JSON.stringify({ name, categoryId }),
    })
  }

  async updateItem(id: string, name: string, categoryId: string) {
    return this.request(`/items/${id}`, {
      method: "PUT",
      body: JSON.stringify({ name, categoryId }),
    })
  }

  async deleteItem(id: string) {
    return this.request(`/items/${id}`, {
      method: "DELETE",
    })
  }

  // Transactions
  async getTransactions() {
    return this.request("/transactions")
  }

  async createTransaction(transaction: {
    amount: number
    type: "income" | "expense"
    categoryId: string
    itemId?: string
    description?: string
    date: string
  }) {
    return this.request("/transactions", {
      method: "POST",
      body: JSON.stringify(transaction),
    })
  }

  async updateTransaction(
    id: string,
    transaction: {
      amount: number
      type: "income" | "expense"
      categoryId: string
      itemId?: string
      description?: string
      date: string
    },
  ) {
    return this.request(`/transactions/${id}`, {
      method: "PUT",
      body: JSON.stringify(transaction),
    })
  }

  async deleteTransaction(id: string) {
    return this.request(`/transactions/${id}`, {
      method: "DELETE",
    })
  }

  // Stats
  async getDashboardStats() {
    return this.request("/dashboard/stats")
  }

  async getDailyStats() {
    return this.request("/dashboard/daily")
  }

  async getWeeklyStats() {
    return this.request("/dashboard/weekly")
  }

  async getMonthlyStats() {
    return this.request("/dashboard/monthly")
  }

  async getMonthWiseStats() {
    return this.request("/dashboard/month-wise")
  }
}

export const api = new ApiClient()
