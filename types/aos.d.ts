declare module 'aos' {
  interface AOSOptions {
    duration?: number
    once?: boolean
    offset?: number
    delay?: number
    easing?: string
    anchorPlacement?: string
  }

  interface AOSInstance {
    init(options?: AOSOptions): void
    refresh(): void
    refreshHard(): void
  }

  const AOS: AOSInstance
  export default AOS
} 