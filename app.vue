<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(20px);
  filter: blur(4px);
}
.page-enter-to,
.page-leave-from {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}
</style>