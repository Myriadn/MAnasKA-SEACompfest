<template>
  <footer class="footer p-10 bg-neutral text-neutral-content">
    <div class="container mx-auto">
      <!-- Brand Section Top Center -->
      <div class="w-full text-center mb-10">
        <div class="flex justify-center mb-4">
          <div class="avatar">
            <div class="w-16 rounded-full bg-success-content p-2">
              <span class="text-success text-xl font-bold">SEA</span>
            </div>
          </div>
        </div>
        <h2 class="text-2xl font-bold">SEA Catering</h2>
        <p class="mt-2">Healthy meals delivered across Indonesia</p>
        <p>Making nutrition accessible to everyone</p>
      </div>

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
          <div class="flex flex-col space-y-2">
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

      <div class="divider mt-10 mb-6"></div>

      <!-- Copyright & Contact Info -->
      <div class="flex flex-col items-center">
        <p>© 2023 SEA Catering. All rights reserved.</p>
        <p class="mt-2">Contact: manager@seacatering.id | +62 812-3456-789</p>
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
}

.link-hover:hover {
  transform: translateX(5px);
  transition: transform 0.3s ease;
}

.divider {
  border-color: rgba(255, 255, 255, 0.1);
  margin: 2rem auto;
  width: 80%;
}
</style>
