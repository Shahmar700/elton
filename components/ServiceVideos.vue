<template>
  <div class="service-videos">
    <div class="video-container">
      <video 
        src="/assets/videos/Hepsinden-tamir.mp4" 
        controls
        class="video"
      ></video>
    </div>
    <div class="video-container">
      <video 
        src="/assets/videos/Mentese-tamiri.mp4" 
        controls
        class="video"
      ></video>
    </div>
    <div class="video-container">
      <video 
        src="/assets/videos/Bilgisayar-bakim.mp4" 
        controls
        class="video"
      ></video>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.service-videos {
  width: 270px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 20px;
  /* max-height: calc(100vh - 40px);  */
  overflow-y: auto;
}

.video-container {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 9/16;
  background: #000;
  min-height: 450px;
}

.video {
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 8px;
  object-fit: cover;
}

@media (max-width: 1024px) {
  .service-videos {
    width: 100%;
    position: static;
    max-height: none;
  }

  .video-container {
    aspect-ratio: 16/9;
    min-height: 300px;
  }
}
</style>    