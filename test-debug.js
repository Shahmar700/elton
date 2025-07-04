// Debug script for testing navigation
console.log('Debug started')

// Test navigation link matching
const testNavigation = () => {
  console.log('Current URL:', window.location.href)
  console.log('Current path:', window.location.pathname)
  
  // Find navigation links
  const navLinks = document.querySelectorAll('.nav-links a')
  navLinks.forEach(link => {
    console.log('Nav link:', link.href, 'Text:', link.textContent.trim())
  })
}

// Run test after page load
window.addEventListener('load', testNavigation)

// Run test when navigation changes
window.addEventListener('popstate', testNavigation)
