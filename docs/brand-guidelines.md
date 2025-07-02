# PlayPhysio® Brand Guidelines

## 🎯 Brand Overview

PlayPhysio® is a pioneering digital health platform that transforms respiratory therapy into an engaging, game-based experience for children. Our brand embodies innovation, playfulness, medical credibility, and hope for better health outcomes.

### **Mission Statement**
Transform respiratory therapy into an exciting adventure that makes breathing exercises fun, engaging, and effective for children.

### **Brand Values**
- **Innovation**: Cutting-edge technology meets healthcare
- **Playfulness**: Making therapy enjoyable and engaging
- **Medical Credibility**: Evidence-based, clinically validated solutions
- **Accessibility**: Healthcare solutions for all children
- **Hope**: Empowering families with better health outcomes

---

## 🎨 Visual Identity

### **Primary Logo**
- **File**: `docs/playphysio-p-logo.svg`
- **Alternative Location**: `src/assets/playphysio-p-logo.svg`
- **Usage**: Primary brand mark for digital applications
- **Format**: SVG (scalable vector graphics)
- **Background**: Transparent or white backgrounds

### **Horizontal Logo**
- **File**: `public/images/playphysio-logo-horizontal.svg`
- **Usage**: Website headers, business cards, letterheads
- **Format**: SVG with text "PLAYPHYSIO®"
- **Minimum Width**: 120px for digital, 1 inch for print

### **Favicon**
- **File**: `public/favicon.svg`
- **Design**: Simplified P logo optimized for small sizes
- **Usage**: Browser tabs, bookmarks, app icons

---

## 🌈 Color Palette

### **Primary Brand Colors**

#### **Playphysio Purple** (Brand Primary)
- **Hex**: `#812C7C`
- **RGB**: `129, 44, 124`
- **HSL**: `304°, 49%, 34%`
- **Usage**: Logo, primary branding elements, headers
- **Accessibility**: WCAG AA compliant with white text

#### **PlayPhysio Blue** (Primary Accent)
- **Hex**: `#4DBBFA`
- **RGB**: `77, 187, 250`
- **HSL**: `203°, 94%, 64%`
- **Usage**: Primary buttons, links, interactive elements
- **CSS Variable**: `--playphysio-blue`

#### **PlayPhysio Green** (Secondary Accent)
- **Hex**: `#58D68D`
- **RGB**: `88, 214, 141`
- **HSL**: `142°, 71%, 60%`
- **Usage**: Success states, positive actions, secondary buttons
- **CSS Variable**: `--playphysio-green`

### **Extended Color Palette**

#### **PlayPhysio Yellow**
- **Hex**: `#F4D03F`
- **RGB**: `244, 208, 63`
- **Usage**: Highlights, badges, attention-grabbing elements

#### **PlayPhysio Pink**
- **Hex**: `#FF6B81`
- **RGB**: `255, 107, 129`
- **Usage**: Playful elements, children-focused content

#### **PlayPhysio Orange**
- **Hex**: `#F39C12`
- **RGB**: `243, 156, 18`
- **Usage**: Warning states, energy, enthusiasm

#### **PlayPhysio Cyan**
- **Hex**: `#22D3EE`
- **RGB**: `34, 211, 238`
- **Usage**: Fresh, clean, medical technology

### **Neutral Colors**

#### **Text Colors**
- **Primary Text**: `#111827` (Gray-900)
- **Secondary Text**: `#6B7280` (Gray-500)
- **Muted Text**: `#9CA3AF` (Gray-400)

#### **Background Colors**
- **Primary Background**: `#FFFFFF` (White)
- **Secondary Background**: `#F9FAFB` (Gray-50)
- **Card Background**: `#FFFFFF` with subtle shadows

---

## 🎨 Gradients

### **Primary Brand Gradient**
```css
background: linear-gradient(135deg, #4DBBFA 0%, #58D68D 100%);
```
- **Usage**: Primary buttons, hero sections, key CTAs
- **Direction**: 135° diagonal
- **Colors**: Blue to Green

### **Secondary Brand Gradient**
```css
background: linear-gradient(135deg, #9B59B6 0%, #FF6B81 100%);
```
- **Usage**: Secondary elements, playful sections
- **Direction**: 135° diagonal
- **Colors**: Purple to Pink

### **Accent Gradients**
```css
/* Yellow-Orange */
background: linear-gradient(135deg, #F4D03F 0%, #F39C12 100%);

/* Cyan-Blue */
background: linear-gradient(135deg, #22D3EE 0%, #4DBBFA 100%);
```

---

## 📝 Typography

### **Primary Font Family**
- **Font**: Inter
- **Weights**: 100, 200, 300, 400, 500, 600, 700, 800, 900
- **Source**: Google Fonts
- **Fallback**: `'Inter', system-ui, sans-serif`

### **Typography Scale**

#### **Headings**
- **H1**: `text-5xl md:text-7xl` (48px/112px) - Hero titles
- **H2**: `text-4xl md:text-5xl` (36px/48px) - Section headers
- **H3**: `text-2xl md:text-3xl` (24px/30px) - Subsection headers
- **H4**: `text-xl md:text-2xl` (20px/24px) - Card titles

#### **Body Text**
- **Large**: `text-lg md:text-xl` (18px/20px) - Hero descriptions
- **Regular**: `text-base` (16px) - Standard body text
- **Small**: `text-sm` (14px) - Captions, metadata
- **Extra Small**: `text-xs` (12px) - Fine print, labels

#### **Font Weights**
- **Light**: `font-light` (300) - Descriptive text
- **Regular**: `font-normal` (400) - Body text
- **Medium**: `font-medium` (500) - Emphasis
- **Semibold**: `font-semibold` (600) - Subheadings
- **Bold**: `font-bold` (700) - Headings
- **Extrabold**: `font-extrabold` (800) - Hero titles

---

## 🎮 Brand Voice & Tone

### **Brand Personality**
- **Innovative**: Forward-thinking, cutting-edge technology
- **Playful**: Fun, engaging, child-friendly
- **Professional**: Medical credibility, evidence-based
- **Empowering**: Giving families hope and control
- **Accessible**: Clear, understandable communication

### **Tone of Voice**

#### **For Healthcare Professionals**
- **Professional yet approachable**
- **Evidence-based and credible**
- **Clear and informative**
- **Respectful of expertise**

#### **For Parents/Caregivers**
- **Supportive and understanding**
- **Hopeful and encouraging**
- **Clear and reassuring**
- **Empowering and informative**

#### **For Children**
- **Fun and exciting**
- **Simple and clear**
- **Encouraging and positive**
- **Adventure-focused**

### **Key Messaging**
- "Transform respiratory therapy into an exciting adventure"
- "Little Lungs, Big Wins!"
- "Making breathing exercises fun, engaging, and effective"
- "Evidence-based gamification for better health outcomes"
- "Empowering families through innovative healthcare technology"

---

## 🎯 Logo Usage Guidelines

### **Do's**
✅ Use the official logo files provided
✅ Maintain minimum clear space (equal to the height of the "P")
✅ Use on white or light backgrounds for primary logo
✅ Scale proportionally - never stretch or distort
✅ Use high-resolution files for print applications

### **Don'ts**
❌ Don't alter the logo colors
❌ Don't add effects, shadows, or outlines
❌ Don't use on busy or low-contrast backgrounds
❌ Don't separate the icon from the wordmark
❌ Don't recreate or redraw the logo

### **Minimum Sizes**
- **Digital**: 32px height minimum
- **Print**: 0.5 inch height minimum
- **Favicon**: 16px × 16px optimized version

---

## 🎨 UI Component Guidelines

### **Buttons**

#### **Primary Button**
```css
background: linear-gradient(to right, #4DBBFA, #58D68D);
color: white;
border-radius: 9999px; /* Full rounded */
padding: 1.5rem 2rem;
font-weight: 700;
```

#### **Secondary Button**
```css
background: white;
color: #374151;
border: 2px solid #D1D5DB;
border-radius: 9999px;
```

#### **Outline Button**
```css
background: transparent;
color: #4DBBFA;
border: 2px solid #4DBBFA;
border-radius: 9999px;
```

### **Cards**
- **Background**: White with subtle shadow
- **Border Radius**: `0.75rem` (12px)
- **Shadow**: `0 1px 3px rgba(0, 0, 0, 0.1)`
- **Hover Effect**: Lift with increased shadow

### **Animations**
- **Duration**: 300ms for interactions, 800ms for page loads
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` for smooth motion
- **Hover Effects**: Scale (1.05), translate (-2px), shadow increase

---

## 📱 Responsive Design

### **Breakpoints**
- **Mobile**: `< 768px`
- **Tablet**: `768px - 1024px`
- **Desktop**: `> 1024px`

### **Layout Principles**
- **Mobile-first approach**
- **Flexible grid systems**
- **Scalable typography**
- **Touch-friendly interactions** (44px minimum touch targets)

---

## ♿ Accessibility Standards

### **Color Contrast**
- **WCAG AA compliance** for all text
- **Minimum 4.5:1 ratio** for normal text
- **Minimum 3:1 ratio** for large text (18px+)

### **Interactive Elements**
- **Focus indicators** for keyboard navigation
- **Alt text** for all images
- **Semantic HTML** structure
- **Screen reader compatibility**

---

## 📄 File Organization

### **Logo Files**
```
docs/
├── playphysio-p-logo.svg          # Primary P logo (official)
src/assets/
├── playphysio-p-logo.svg          # Primary P logo (development)
public/images/
├── playphysio-logo-horizontal.svg  # Horizontal logo
public/
├── favicon.svg                     # Favicon
├── favicon.ico                     # Legacy favicon
├── apple-touch-icon.png           # iOS icon
└── android-chrome-*.png           # Android icons
```

### **Brand Assets**
- **High-resolution PNGs** for presentations
- **SVG files** for web and scalable applications
- **PDF versions** for print materials

---

## 🚀 Implementation

### **CSS Variables**
```css
:root {
  --playphysio-purple: #812C7C;
  --playphysio-blue: #4DBBFA;
  --playphysio-green: #58D68D;
  --playphysio-yellow: #F4D03F;
  --playphysio-pink: #FF6B81;
  --playphysio-orange: #F39C12;
  --playphysio-cyan: #22D3EE;
}
```

### **Tailwind Configuration**
```javascript
colors: {
  'playphysio-blue': '#4DBBFA',
  'playphysio-green': '#58D68D',
  'playphysio-yellow': '#F4D03F',
  'playphysio-pink': '#FF6B81',
  'playphysio-purple': '#9B59B6',
  'playphysio-orange': '#F39C12',
  'playphysio-cyan': '#22D3EE',
}
```

---

## 📞 Brand Contact

For questions about brand usage, additional assets, or brand guidelines:
- **Email**: brand@playphysio.com
- **Documentation**: This file serves as the official brand guidelines
- **Updates**: Check this document for the latest brand standards

---

*Last Updated: January 2025*
*Version: 1.0*
*© 2025 PlayPhysio®. All rights reserved.*
