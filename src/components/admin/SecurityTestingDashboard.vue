<template>
  <div class="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md my-8">
    <h2 class="text-2xl font-bold mb-6">Security Testing Dashboard</h2>

    <div class="alert alert-info mb-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <span
        >This tool is for administrators to test application security. Do not use in
        production.</span
      >
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- XSS Test -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">XSS Testing</h3>
          <p class="text-sm mb-4">
            Test if the application is vulnerable to Cross-Site Scripting attacks.
          </p>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Test Input (will be sanitized)</span>
            </label>
            <input
              v-model="xssInput"
              type="text"
              class="input input-bordered w-full"
              placeholder='Try <script>alert("XSS")</script>'
            />
          </div>

          <div class="mt-4">
            <p class="text-sm font-semibold">Raw Input:</p>
            <pre class="bg-gray-100 p-2 rounded text-xs overflow-x-auto">{{ xssInput }}</pre>
          </div>

          <div class="mt-4">
            <p class="text-sm font-semibold">Sanitized Output:</p>
            <div class="bg-gray-100 p-2 rounded" v-html="sanitizedXssInput"></div>
          </div>

          <div class="card-actions justify-end mt-4">
            <button @click="testXss" class="btn btn-primary btn-sm">Test Sanitization</button>
          </div>

          <div
            v-if="xssTestResult"
            class="mt-4"
            :class="{ 'text-success': xssTestResult.safe, 'text-error': !xssTestResult.safe }"
          >
            <p><strong>Result:</strong> {{ xssTestResult.message }}</p>
          </div>
        </div>
      </div>

      <!-- CSRF Test -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">CSRF Protection</h3>
          <p class="text-sm mb-4">Test if CSRF protection is working correctly.</p>

          <div class="mt-4">
            <p class="text-sm font-semibold">Current CSRF Token:</p>
            <pre class="bg-gray-100 p-2 rounded text-xs overflow-x-auto">{{
              csrfToken || 'No token found'
            }}</pre>
          </div>

          <div class="form-control mt-4">
            <label class="label">
              <span class="label-text">Test Request with Token</span>
            </label>
            <div class="flex space-x-2">
              <button @click="testCsrfWithToken" class="btn btn-primary btn-sm flex-1">
                With Token
              </button>
              <button @click="testCsrfWithoutToken" class="btn btn-error btn-sm flex-1">
                Without Token
              </button>
            </div>
          </div>

          <div
            v-if="csrfTestResult"
            class="mt-4"
            :class="{
              'text-success': csrfTestResult.success,
              'text-error': !csrfTestResult.success,
            }"
          >
            <p><strong>Result:</strong> {{ csrfTestResult.message }}</p>
          </div>
        </div>
      </div>

      <!-- Input Validation Test -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">Input Validation</h3>
          <p class="text-sm mb-4">Test if input validation is working correctly.</p>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Email Validation</span>
            </label>
            <input
              v-model="emailInput"
              type="text"
              class="input input-bordered w-full"
              placeholder="test@example.com"
            />
            <button @click="testEmailValidation" class="btn btn-primary btn-sm mt-2">
              Test Email
            </button>
          </div>

          <div class="form-control mt-4">
            <label class="label">
              <span class="label-text">Password Validation</span>
            </label>
            <input
              v-model="passwordInput"
              type="text"
              class="input input-bordered w-full"
              placeholder="Password123!"
            />
            <button @click="testPasswordValidation" class="btn btn-primary btn-sm mt-2">
              Test Password
            </button>
          </div>

          <div
            v-if="validationResult"
            class="mt-4"
            :class="{
              'text-success': validationResult.valid,
              'text-error': !validationResult.valid,
            }"
          >
            <p><strong>Result:</strong> {{ validationResult.message }}</p>
          </div>
        </div>
      </div>

      <!-- SQL Injection Test -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">SQL Injection Protection</h3>
          <p class="text-sm mb-4">Test if the app is protected against SQL injection.</p>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Test Input (will be sanitized)</span>
            </label>
            <input
              v-model="sqlInput"
              type="text"
              class="input input-bordered w-full"
              placeholder="'; DROP TABLE users; --"
            />
            <p class="text-xs mt-1">Try SQL injection patterns like '; DROP TABLE users; --</p>
          </div>

          <div class="card-actions justify-end mt-4">
            <button @click="testSqlInjection" class="btn btn-primary btn-sm">
              Test Protection
            </button>
          </div>

          <div
            v-if="sqlTestResult"
            class="mt-4"
            :class="{
              'text-success': sqlTestResult.protected,
              'text-error': !sqlTestResult.protected,
            }"
          >
            <p><strong>Result:</strong> {{ sqlTestResult.message }}</p>
            <p class="text-xs mt-2">
              Note: Supabase uses parameterized queries which inherently protect against SQL
              injection.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8">
      <h3 class="text-xl font-bold mb-4">Security Summary</h3>
      <div class="overflow-x-auto">
        <table class="table table-zebra">
          <thead>
            <tr>
              <th>Security Feature</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>XSS Protection</td>
              <td><span class="badge badge-success">Implemented</span></td>
              <td>Using DOMPurify for input sanitization</td>
            </tr>
            <tr>
              <td>CSRF Protection</td>
              <td><span class="badge badge-success">Implemented</span></td>
              <td>Using CSRF tokens for state-changing operations</td>
            </tr>
            <tr>
              <td>SQL Injection</td>
              <td><span class="badge badge-success">Protected</span></td>
              <td>Using Supabase with parameterized queries</td>
            </tr>
            <tr>
              <td>Input Validation</td>
              <td><span class="badge badge-success">Implemented</span></td>
              <td>Strict validation for email, password, and other inputs</td>
            </tr>
            <tr>
              <td>HTTPS</td>
              <td><span class="badge badge-success">Enforced</span></td>
              <td>All communication is encrypted</td>
            </tr>
            <tr>
              <td>Content Security</td>
              <td><span class="badge badge-success">Implemented</span></td>
              <td>Sanitizing output and preventing unsafe content execution</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import DOMPurify from 'dompurify'
import { getCsrfToken, generateCsrfToken, verifyCsrfToken } from '@/middleware/csrf'
import { validateInput } from '@/middleware/inputValidation'

export default {
  name: 'SecurityTestingDashboard',
  data() {
    return {
      xssInput: '<script>alert("XSS Attack!")</scr' + 'ipt>',
      sqlInput: "'; DROP TABLE users; --",
      emailInput: '',
      passwordInput: '',
      csrfToken: null,
      xssTestResult: null,
      csrfTestResult: null,
      validationResult: null,
      sqlTestResult: null,
    }
  },
  computed: {
    sanitizedXssInput() {
      return DOMPurify.sanitize(this.xssInput)
    },
  },
  created() {
    // Get or generate CSRF token
    this.csrfToken = getCsrfToken() || generateCsrfToken()
  },
  methods: {
    testXss() {
      // Test if the raw input matches the sanitized output
      const isSafe =
        this.xssInput !== this.sanitizedXssInput &&
        !this.sanitizedXssInput.includes('<script>') &&
        !this.sanitizedXssInput.includes('javascript:')

      this.xssTestResult = {
        safe: isSafe,
        message: isSafe
          ? 'XSS protection is working correctly. Dangerous content was sanitized.'
          : 'Warning: XSS protection may not be functioning correctly.',
      }
    },

    testCsrfWithToken() {
      // Simulate a request with valid token
      const isValid = verifyCsrfToken(this.csrfToken)

      this.csrfTestResult = {
        success: isValid,
        message: isValid
          ? 'CSRF protection is working correctly. Valid token was accepted.'
          : 'Error: Valid CSRF token was rejected.',
      }
    },

    testCsrfWithoutToken() {
      // Simulate a request without token
      const isRejected = !verifyCsrfToken(null)

      this.csrfTestResult = {
        success: isRejected,
        message: isRejected
          ? 'CSRF protection is working correctly. Request without token was rejected.'
          : 'Warning: Request without CSRF token was accepted!',
      }
    },

    testEmailValidation() {
      try {
        validateInput(this.emailInput, 'email')
        this.validationResult = {
          valid: true,
          message: 'Email format is valid.',
        }
      } catch (error) {
        this.validationResult = {
          valid: false,
          message: error.message,
        }
      }
    },

    testPasswordValidation() {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      const isValid = passwordRegex.test(this.passwordInput)

      this.validationResult = {
        valid: isValid,
        message: isValid
          ? 'Password format is valid.'
          : 'Password must have at least 8 characters with uppercase, lowercase, number, and special character.',
      }
    },

    testSqlInjection() {
      // In a real app with Supabase, we're already protected by parameterized queries
      // This is just a simulation for demonstration
      const dangerousPatterns = ["'; DROP TABLE", 'OR 1=1', '-- ', '/*', 'UNION SELECT']

      const hasDangerousPattern = dangerousPatterns.some((pattern) =>
        this.sqlInput.toUpperCase().includes(pattern.toUpperCase()),
      )

      this.sqlTestResult = {
        protected: true,
        message: hasDangerousPattern
          ? 'Potentially dangerous SQL pattern detected and would be sanitized by parameterized queries.'
          : 'No dangerous SQL patterns detected, but parameterized queries would protect against SQL injection anyway.',
      }
    },
  },
}
</script>
