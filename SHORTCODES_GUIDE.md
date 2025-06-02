# WordPress Shortcodes for Rich Blog Content

This guide explains how to add beautiful graphical elements to your WordPress blog posts that will be automatically rendered in your Astro static site.

## 🎯 Available Shortcodes

### 1. Key Insight Panel

Creates a beautiful highlighted panel with gradient background for important insights.

**Basic Usage:**
```
[key_insight]Traditional respiratory therapy methods achieve only 30-50% adherence rates in children, while PlayPhysio achieves 94% adherence through gamification.[/key_insight]
```

**Advanced Usage:**
```
[key_insight icon="🔬" title="Research Finding"]Our clinical study shows remarkable improvement in patient engagement when gamification principles are applied to respiratory therapy.[/key_insight]
```

**Parameters:**
- `icon` (optional): Custom emoji or icon (default: 💡)
- `title` (optional): Custom title (default: "Key Insight")

---

### 2. Statistics Cards

Creates a grid of professional statistics cards with large colored numbers.

**Usage:**
```
[stats_cards]
  [stat value="94%" label="Therapy Adherence Rate" color="cyan"]
  [stat value="67%" label="Improvement in Lung Function" color="emerald"]
  [stat value="89%" label="Families Found Therapy Enjoyable" color="purple"]
[/stats_cards]
```

**Parameters for [stat]:**
- `value` (required): The statistic value (e.g., "94%", "2.5x", "150+")
- `label` (optional): Description text below the value
- `color` (optional): Color theme - cyan, emerald, purple, blue, green, red, yellow, indigo

---

### 3. Professional Quotes

Creates beautifully formatted blockquotes with attribution.

**Usage:**
```
[quote author="Dr. Michael Rodriguez" title="Children's Hospital of Philadelphia"]
PlayPhysio has transformed our approach to pediatric respiratory therapy. The engagement levels we see are unprecedented.
[/quote]
```

**Parameters:**
- `author` (optional): Quote author name
- `title` (optional): Author's title or organization

---

### 4. Callout Boxes

Creates attention-grabbing callout boxes for different types of information.

**Usage:**
```
[callout type="info" title="Important Note"]
This feature requires WordPress 5.0 or higher to function properly.
[/callout]

[callout type="warning"]
Always consult with a healthcare professional before starting any new therapy regimen.
[/callout]

[callout type="success" title="Success Story"]
Over 1,000 families have successfully improved their therapy adherence using PlayPhysio.
[/callout]
```

**Parameters:**
- `type` (optional): info, warning, success, error (default: info)
- `title` (optional): Custom title for the callout

---

### 5. Highlight Text

Creates inline highlighted text with colored backgrounds.

**Usage:**
```
This is [highlight color="blue"]important information[/highlight] that needs attention.

Our [highlight color="green"]94% success rate[/highlight] speaks for itself.
```

**Parameters:**
- `color` (optional): blue, green, yellow, red, purple (default: blue)

---

## 🎨 Color Options

### Available Colors:
- **cyan**: Bright cyan/turquoise
- **emerald**: Green/emerald
- **purple**: Purple/violet
- **blue**: Standard blue
- **green**: Standard green
- **red**: Standard red
- **yellow**: Yellow/amber
- **indigo**: Deep blue/indigo

---

## 📝 Complete Example

Here's how you might structure a blog post with multiple shortcodes:

```
<h2>The Challenge of Traditional Therapy</h2>

<p>Respiratory therapy has long struggled with patient adherence issues...</p>

[key_insight]
Traditional respiratory therapy methods achieve only 30-50% adherence rates in children, while PlayPhysio achieves 94% adherence through gamification.
[/key_insight]

<h2>Clinical Results</h2>

<p>Our latest study involving 200 pediatric patients shows remarkable results:</p>

[stats_cards]
  [stat value="94%" label="Therapy Adherence Rate" color="cyan"]
  [stat value="67%" label="Improvement in Lung Function" color="emerald"]
  [stat value="89%" label="Families Found Therapy Enjoyable" color="purple"]
[/stats_cards]

<p>These results demonstrate the [highlight color="green"]transformative power[/highlight] of gamification in healthcare.</p>

[callout type="info" title="Study Details"]
This 6-month randomized controlled trial was conducted across 5 pediatric hospitals with IRB approval and full informed consent.
[/callout]

<h2>Expert Opinion</h2>

[quote author="Dr. Sarah Chen" title="Lead Researcher, PlayPhysio Clinical Team"]
The engagement levels we observe with gamified therapy are unlike anything we've seen in traditional approaches. Children actually look forward to their therapy sessions.
[/quote]

[callout type="success" title="Ready to Get Started?"]
Contact our team to learn how PlayPhysio can transform your respiratory therapy program.
[/callout]
```

---

## 🚀 Implementation Notes

### For Content Creators:
1. **Copy and paste** the shortcodes directly into your WordPress post editor
2. **Use the Text/HTML editor** (not Visual editor) for best results
3. **Preview your post** in WordPress to ensure shortcodes are working
4. **Test responsiveness** - all elements are mobile-friendly

### For Developers:
1. Shortcodes are processed during the Astro build process
2. All styles are automatically included and optimized
3. Components are fully responsive and accessible
4. Easy to extend with new shortcode types

---

## 🎯 Best Practices

### Content Strategy:
- **Use Key Insights** for your most important takeaways
- **Use Statistics Cards** to showcase quantitative results
- **Use Quotes** to add credibility and expert opinions
- **Use Callouts** for important notes, warnings, or CTAs
- **Use Highlights** sparingly for emphasis

### Design Consistency:
- Stick to the provided color palette for brand consistency
- Don't overuse shortcodes - they should enhance, not overwhelm
- Maintain good content hierarchy with proper headings
- Test on mobile devices to ensure readability

---

## 🔧 Troubleshooting

### Common Issues:
1. **Shortcodes not rendering**: Ensure you're using the Text/HTML editor in WordPress
2. **Styling issues**: Check that all shortcode tags are properly closed
3. **Mobile display**: All components are responsive by default
4. **Color not showing**: Verify color names match the available options

### Need Help?
Contact the development team if you encounter any issues or need additional shortcode types.
