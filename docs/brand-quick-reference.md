# PlayPhysio® Brand Quick Reference

## 🎨 Colors (Hex Codes)

### **Primary Brand Colors**
```css
--playphysio-purple: #812C7C;  /* Brand Primary */
--playphysio-blue: #4DBBFA;    /* Primary Accent */
--playphysio-green: #58D68D;   /* Secondary Accent */
```

### **Extended Palette**
```css
--playphysio-yellow: #F4D03F;
--playphysio-pink: #FF6B81;
--playphysio-orange: #F39C12;
--playphysio-cyan: #22D3EE;
```

### **Neutrals**
```css
--text-primary: #111827;    /* Gray-900 */
--text-secondary: #6B7280;  /* Gray-500 */
--text-muted: #9CA3AF;      /* Gray-400 */
--background: #FFFFFF;      /* White */
```

---

## 🎨 Gradients

### **Primary Brand Gradient**
```css
background: linear-gradient(135deg, #4DBBFA 0%, #58D68D 100%);
```

### **Secondary Gradient**
```css
background: linear-gradient(135deg, #9B59B6 0%, #FF6B81 100%);
```

### **Accent Gradients**
```css
/* Yellow-Orange */
background: linear-gradient(135deg, #F4D03F 0%, #F39C12 100%);

/* Cyan-Blue */
background: linear-gradient(135deg, #22D3EE 0%, #4DBBFA 100%);
```

---

## 📝 Typography

### **Font Family**
```css
font-family: 'Inter', system-ui, sans-serif;
```

### **Common Text Classes**
```css
/* Hero Titles */
.hero-title { @apply text-5xl md:text-7xl font-extrabold; }

/* Section Headers */
.section-header { @apply text-4xl md:text-5xl font-bold; }

/* Body Text */
.body-large { @apply text-lg md:text-xl font-light; }
.body-regular { @apply text-base font-normal; }
.body-small { @apply text-sm font-normal; }

/* Gradient Text */
.gradient-text-blue {
  background: linear-gradient(135deg, #4DBBFA 0%, #58D68D 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.gradient-text-purple {
  background: linear-gradient(135deg, #9B59B6 0%, #FF6B81 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

---

## 🎯 Buttons

### **Primary Button**
```css
.btn-primary {
  background: linear-gradient(to right, #4DBBFA, #58D68D);
  color: white;
  border-radius: 9999px;
  padding: 1.5rem 2rem;
  font-weight: 700;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 25px rgba(77, 187, 250, 0.3);
}
```

### **Secondary Button**
```css
.btn-secondary {
  background: white;
  color: #374151;
  border: 2px solid #D1D5DB;
  border-radius: 9999px;
  padding: 1.5rem 2rem;
  font-weight: 600;
}

.btn-secondary:hover {
  background: #F9FAFB;
  transform: scale(1.05);
}
```

---

## 🏷️ Logo Usage

### **File Paths**
```
Primary Logo:     docs/playphysio-p-logo.svg (official)
Alternative:      src/assets/playphysio-p-logo.svg (development)
Horizontal Logo:  public/images/playphysio-logo-horizontal.svg
Favicon:          public/favicon.svg
```

### **HTML Usage**
```html
<!-- Primary Logo (official) -->
<img src="/docs/playphysio-p-logo.svg" alt="PlayPhysio" />

<!-- Primary Logo (development) -->
<img src="/src/assets/playphysio-p-logo.svg" alt="PlayPhysio" />

<!-- Horizontal Logo -->
<img src="/images/playphysio-logo-horizontal.svg" alt="PlayPhysio" />
```

---

## 🎮 Animation Standards

### **Durations**
```css
--duration-fast: 200ms;      /* Micro-interactions */
--duration-normal: 300ms;    /* Button hovers */
--duration-slow: 800ms;      /* Page transitions */
```

### **Easing**
```css
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### **Common Animations**
```css
/* Hover Lift */
.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

/* Scale on Hover */
.hover-scale:hover {
  transform: scale(1.05);
}

/* Fade In */
.fade-in {
  animation: fade-in 0.8s ease-out forwards;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

---

## 🎨 Card Styles

### **Standard Card**
```css
.card {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #F3F4F6;
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}
```

### **Feature Card**
```css
.feature-card {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #E5E7EB;
}
```

---

## 🌈 Background Patterns

### **Hero Background**
```css
.hero-bg {
  background: linear-gradient(to bottom, white, rgba(77, 187, 250, 0.05));
}
```

### **Section Background**
```css
.section-bg-light {
  background: linear-gradient(135deg, #F0FDFF 0%, #F8F4FF 100%);
}
```

---

## 🎯 Brand Voice Examples

### **Headlines**
- "Little Lungs, Big Wins!"
- "Transform Respiratory Therapy"
- "Making Breathing Fun"
- "Evidence-Based Gamification"

### **CTAs**
- "Get Started"
- "Learn More"
- "Try PlayPhysio"
- "Join the Adventure"
- "Transform Adherence"

### **Descriptive Text**
- "Transform respiratory therapy into an exciting adventure"
- "Making breathing exercises fun, engaging, and effective"
- "Evidence-based solutions for better health outcomes"
- "Empowering families through innovative healthcare technology"

---

## ♿ Accessibility Checklist

### **Color Contrast**
✅ All text meets WCAG AA standards (4.5:1 ratio)
✅ Interactive elements have sufficient contrast
✅ Focus indicators are clearly visible

### **Interactive Elements**
✅ Minimum 44px touch targets
✅ Keyboard navigation support
✅ Screen reader compatibility
✅ Alt text for all images

---

## 🚀 Quick Implementation

### **Tailwind Classes**
```html
<!-- Primary Button -->
<button class="bg-gradient-to-r from-playphysio-blue to-playphysio-green text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-all duration-300">
  Get Started
</button>

<!-- Hero Title -->
<h1 class="text-5xl md:text-7xl font-extrabold">
  <span class="gradient-text-blue">Little Lungs,</span>
  <br />
  <span class="gradient-text-purple">Big Wins!</span>
</h1>

<!-- Feature Card -->
<div class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
  <!-- Card content -->
</div>
```

---

## 📞 Quick Contact

**Questions?** Refer to the full brand guidelines at `docs/brand-guidelines.md`

*Last Updated: January 2025*
