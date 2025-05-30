<template>
       <a
        href="https://200soft.com/"
        target="_blank"
        class="cursor-pointer transition-all duration-300 hover:transform hover:scale-105 group"
        @mouseenter="scramble = true"
        @mouseleave="scramble = false"
    >
        <span class="dynamic-text">
            <span class="code-block">
                <TextScramble text="200" :scramble="scramble" />
                <span class="code-soft">Soft</span>
            </span>
            <span class="code-cursor"/>
        </span>
    </a>
</template>

<script setup>
import TextScramble from './TextScramble.vue';
import { ref } from 'vue'

const scramble = ref(false);

</script>

<style scoped>
.code-block {
    display: inline-flex;
    gap: 0.5rem;
    position: relative;
    padding: 0.2rem 0.5rem;
    background: linear-gradient(90deg, #f3e8ff 0%, #e0eaff 100%);
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06);
}

.code-line {
    color: #7c3aed; /* əsas bənövşəyi */
    position: relative;
    display: inline-block;
}

.code-line::before {
    content: '>';
    position: absolute;
    left: -1.2rem;
    color: #0099ff; /* mavi vurğu */
    opacity: 0;
    animation: blink 1s infinite;
}

.code-soft {
    color: #23272f; /* tünd göy-bənövşəyi, ağ fonda yaxşı görünür */
    position: relative;
    display: inline-block;
    opacity: 0.92;
    transition: all 0.3s ease;
    font-weight: 500;
}

.code-cursor {
    display: inline-block;
    width: 2px;
    height: 1.2em;
    background: #0099ff; /* mavi vurğu */
    margin-left: 0.2rem;
    animation: cursor-blink 1s infinite;
    vertical-align: middle;
}

.code-block::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(
        90deg,
        transparent,
        #7c3aed 30%,
        #0099ff 70%,
        transparent
    );
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
}

.group:hover .code-block::after {
    transform: scaleX(1);
}
.group:hover .code-soft {
    color: #7c3aed;
    opacity: 1;
    transform: translateX(2px);
}
.dynamic-text {
    display: inline-flex;
    align-items: center;
    font-family: 'Tomorrow', 'SF Mono', 'Fira Code', monospace;
    position: relative;
}

.code-block::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(0, 153, 255, 0.10),
        transparent
    );
    transform: translateX(-100%);
    animation: scan 3s linear infinite;
}

@keyframes scan {
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(100%);
    }
}

@keyframes cursor-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
}

@keyframes blink {
    0%, 100% { opacity: 0; }
    50% { opacity: 1; }
}

.group:hover .code-block::before {
    animation: scan 1.5s linear infinite;
}
</style>