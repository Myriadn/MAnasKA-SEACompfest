<template>
  <footer class="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
    <!-- Services, Company, Legal Sections -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
      <!-- Services -->
      <div class="text-center md:text-left">
        <span class="footer-title text-base font-semibold opacity-100 block mb-4">SERVICES</span>
        <div class="flex flex-col space-y-2">
          <a class="link link-hover hover:text-primary transition-colors">Meal Plans</a>
          <a class="link link-hover hover:text-primary transition-colors">Corporate Catering</a>
          <a class="link link-hover hover:text-primary transition-colors">Special Diets</a>
          <a class="link link-hover hover:text-primary transition-colors">Nutrition Consulting</a>
        </div>
      </div>

      <!-- Company -->
      <div class="text-center md:text-left">
        <span class="footer-title text-base font-semibold opacity-100 block mb-4">COMPANY</span>
        <div class="flex center flex-col space-y-2">
          <a class="link link-hover hover:text-primary transition-colors">About us</a>
          <a class="link link-hover hover:text-primary transition-colors">Contact</a>
          <a class="link link-hover hover:text-primary transition-colors">Careers</a>
          <a class="link link-hover hover:text-primary transition-colors">Press kit</a>
        </div>
      </div>

      <!-- Legal -->
      <div class="text-center md:text-left">
        <span class="footer-title text-base font-semibold opacity-100 block mb-4">LEGAL</span>
        <div class="flex flex-col space-y-2">
          <a class="link link-hover hover:text-primary transition-colors">Terms of use</a>
          <a class="link link-hover hover:text-primary transition-colors">Privacy policy</a>
          <a class="link link-hover hover:text-primary transition-colors">Cookie policy</a>
        </div>
      </div>
    </div>
  </footer>

  <footer class="footer bg-base-200 text-base-content border-t border-base-300 px-10 py-4">
    <div class="container mx-auto flex flex-col md:flex-row justify-between items-center">
      <!-- Branding dan Copyright -->
      <aside class="flex items-center mb-4 md:mb-0">
        <div class="avatar mr-4">
          <div class="w-12 rounded-full bg-success-content p-2">
            <span class="text-success text-xl font-bold">SEA</span>
          </div>
        </div>
        <div>
          <p class="font-bold">SEA Catering</p>
          <p>Healthy meals delivered across Indonesia</p>
        </div>
      </aside>

      <!-- Copyright -->
      <div class="text-center md:text-right">
        <p>© 2023 SEA Catering. All rights reserved.</p>
        <p>Contact: manager@seacatering.id | +62 812-3456-789</p>
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
.footer {
  background-color: #1a1a1a;
  color: #e0e0e0;
}

.footer-title {
  color: #ffffff;
  font-size: 1.125rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
}

.link-hover:hover {
  color: #3cb371;
  transform: translateX(5px);
  transition: transform 0.3s ease;
}

.border-t {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
