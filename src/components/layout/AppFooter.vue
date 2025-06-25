<template>
  <footer class="bg-base-200 text-base-content py-12 px-6">
    <!-- Services, Company, Legal Sections -->
    <div class="container mx-auto">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-10 sm:gap-x-8">
        <!-- Services -->
        <div class="flex flex-col items-center sm:items-start">
          <span class="footer-title mb-6">SERVICES</span>
          <ul class="footer-links flex flex-col space-y-3 items-center sm:items-start">
            <li><a class="link-hover">Meal Plans</a></li>
            <li><a class="link-hover">Corporate Catering</a></li>
            <li><a class="link-hover">Special Diets</a></li>
            <li><a class="link-hover">Nutrition Consulting</a></li>
          </ul>
        </div>

        <!-- Company -->
        <div class="flex flex-col items-center sm:items-start">
          <span class="footer-title mb-6">COMPANY</span>
          <ul class="footer-links flex flex-col space-y-3 items-center sm:items-start">
            <li><a class="link-hover">About us</a></li>
            <li><a class="link-hover">Contact</a></li>
            <li><a class="link-hover">Careers</a></li>
            <li><a class="link-hover">Press kit</a></li>
          </ul>
        </div>

        <!-- Legal -->
        <div class="flex flex-col items-center sm:items-start">
          <span class="footer-title mb-6">LEGAL</span>
          <ul class="footer-links flex flex-col space-y-3 items-center sm:items-start">
            <li><a class="link-hover">Terms of use</a></li>
            <li><a class="link-hover">Privacy policy</a></li>
            <li><a class="link-hover">Cookie policy</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>

  <footer class="bg-base-200 text-base-content border-t border-base-300 py-6 px-6">
    <div class="container mx-auto flex flex-col md:flex-row justify-between items-center">
      <!-- Branding dan Copyright -->
      <aside class="flex items-center mb-6 md:mb-0">
        <div class="avatar mr-4">
          <div class="w-12 rounded-full bg-primary/10 p-2">
            <img
              src="@/assets/food-tray.png"
              alt="SEA Catering Logo"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
        <div>
          <p class="font-bold text-lg">SEA Catering</p>
          <p class="text-sm">Healthy meals delivered across Indonesia</p>
        </div>
      </aside>

      <!-- Copyright -->
      <div class="text-center md:text-right text-sm">
        <p class="mb-1">© 2023 SEA Catering. All rights reserved.</p>
        <p>
          Contact:
          <a href="mailto:manager@seacatering.id" class="hover:text-primary"
            >manager@seacatering.id</a
          >
          | <a href="tel:+6281234567890" class="hover:text-primary">+62 812-3456-789</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
}
</script>

<style scoped>
footer {
  background-color: #1a1a1a;
  color: #e0e0e0;
}

.footer-title {
  color: #ffffff;
  font-size: 1.125rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  position: relative;
  display: inline-block;
}

.footer-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 2px;
  background-color: #3cb371;
}

@media (min-width: 640px) {
  .footer-title::after {
    left: 0;
    transform: none;
  }
}

.link-hover {
  position: relative;
  transition: all 0.3s ease;
  padding: 4px 0;
}

.link-hover:hover {
  color: #3cb371;
  transform: translateX(5px);
}

.border-t {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  width: 100%;
  text-align: center;
}

.footer-links li a {
  display: inline-block;
  padding: 4px 0;
  transition: all 0.3s ease;
  position: relative;
}

.footer-links li a:hover {
  color: #3cb371;
}

@media (min-width: 640px) {
  .footer-links li {
    text-align: left;
  }
}
</style>
