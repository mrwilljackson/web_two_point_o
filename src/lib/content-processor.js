/**
 * Content Processor for WordPress Shortcodes
 * Converts WordPress shortcodes into beautiful Astro components
 */

/**
 * Process Key Insight shortcode
 * WordPress: [key_insight]Your insight text here[/key_insight]
 * WordPress: [key_insight icon="💡" title="Key Insight"]Your insight text here[/key_insight]
 */
function processKeyInsight(content) {
  // More flexible regex that handles HTML formatting around shortcodes
  const keyInsightRegex = /(?:<[^>]*>)*\[key_insight(?:\s+icon="([^"]*)")?(?:\s+title="([^"]*)")?\](?:<[^>]*>)*(.*?)(?:<[^>]*>)*\[\/key_insight\](?:<[^>]*>)*/gs;

  return content.replace(keyInsightRegex, (match, icon, title, text) => {
    const displayIcon = icon || '💡';
    const displayTitle = title || 'Key Insight';

    // Clean up the text content by removing HTML tags and decoding entities
    const cleanText = text
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/&quot;/g, '"')
      .replace(/&#8217;/g, "'")
      .replace(/&#8211;/g, "–")
      .replace(/&amp;/g, "&")
      .trim();

    return `
      <div class="key-insight-panel">
        <h3 class="key-insight-title">
          <span class="key-insight-icon">${displayIcon}</span>
          ${displayTitle}
        </h3>
        <p class="key-insight-text">${cleanText}</p>
      </div>
    `;
  });
}

/**
 * Process Statistics Cards shortcode
 * WordPress: [stats_cards]
 *   [stat value="94%" label="Therapy Adherence Rate" color="cyan"]
 *   [stat value="67%" label="Improvement in Lung Function" color="emerald"]
 *   [stat value="89%" label="Families Found Therapy Enjoyable" color="purple"]
 * [/stats_cards]
 */
function processStatsCards(content) {
  // More flexible regex that handles HTML formatting around shortcodes
  const statsCardsRegex = /(?:<[^>]*>)*\[stats_cards\](?:<[^>]*>)*(.*?)(?:<[^>]*>)*\[\/stats_cards\](?:<[^>]*>)*/gs;

  return content.replace(statsCardsRegex, (match, cardsContent) => {
    let statsHtml = '';

    // Clean up the cards content and decode HTML entities more aggressively
    const cleanCardsContent = cardsContent
      .replace(/<[^>]*>/g, ' ') // Replace all HTML tags with spaces
      .replace(/&quot;/g, '"')
      .replace(/&#8220;/g, '"')
      .replace(/&#8221;/g, '"')
      .replace(/&amp;/g, "&")
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();

    // Much more flexible stat regex that handles the cleaned content with spaces around =
    const statRegex = /\[stat\s+value\s*=\s*["']([^"']*)["'](?:\s+label\s*=\s*["']([^"']*)["'])?(?:\s+color\s*=\s*["']([^"']*)["'])?\]/g;
    let statMatch;

    while ((statMatch = statRegex.exec(cleanCardsContent)) !== null) {
      const [, value, label, color] = statMatch;
      const colorClass = getColorClass(color || 'cyan');

      statsHtml += `
        <div class="stat-card">
          <div class="stat-value ${colorClass}">${value}</div>
          <div class="stat-label">${label || ''}</div>
        </div>
      `;
    }

    return `
      <div class="stats-cards-container">
        ${statsHtml}
      </div>
    `;
  });
}

/**
 * Process Quote shortcode
 * WordPress: [quote author="Dr. Michael Rodriguez" title="Children's Hospital of Philadelphia"]
 *   PlayPhysio has transformed our approach to pediatric respiratory therapy. The engagement levels we see are unprecedented.
 * [/quote]
 */
function processQuote(content) {
  // Handle quotes that are split across multiple <p> tags
  // First, let's try a simpler approach that looks for the pattern across the entire content
  const quotePattern = /(<p[^>]*>)?\[quote\s+author="([^"]*)"(?:\s+title="([^"]*)")?\](<\/p>)?\s*(<p[^>]*>)?(.*?)(<\/p>)?\s*(<p[^>]*>)?\[\/quote\](<\/p>)?/gs;

  return content.replace(quotePattern, (match, p1, author, title, p2, p3, text, p4, p5, p6) => {

    // Clean up the text content and remove HTML tags
    const cleanText = text
      .replace(/<[^>]*>/g, ' ') // Replace HTML tags with spaces
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();

    const attribution = author && title ? `${author}, ${title}` : author || '';

    return `
      <blockquote class="custom-quote">
        <p class="quote-text">${cleanText}</p>
        ${attribution ? `<footer class="quote-attribution">— ${attribution}</footer>` : ''}
      </blockquote>
    `;
  });
}

/**
 * Process Callout Box shortcode
 * WordPress: [callout type="info" title="Important Note"]Your callout content here[/callout]
 * WordPress: [callout type="warning"]Warning message[/callout]
 */
function processCallout(content) {
  // Simplified regex since entities are already decoded
  const calloutRegex = /(?:<[^>]*>)*\[callout(?:\s+type\s*=\s*["']([^"']*)["'])?(?:\s+title\s*=\s*["']([^"']*)["'])?\](?:<[^>]*>)*(.*?)(?:<[^>]*>)*\[\/callout\](?:<[^>]*>)*/gs;

  return content.replace(calloutRegex, (match, type, title, text) => {
    const calloutType = type || 'info';
    const typeClass = getCalloutTypeClass(calloutType);
    const icon = getCalloutIcon(calloutType);

    // Clean up the text content
    const cleanText = text
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .trim();

    return `
      <div class="callout-box ${typeClass}">
        ${title ? `
          <h4 class="callout-title">
            <span class="callout-icon">${icon}</span>
            ${title}
          </h4>
        ` : ''}
        <div class="callout-content">${cleanText}</div>
      </div>
    `;
  });
}

/**
 * Process Highlight Box shortcode
 * WordPress: [highlight color="blue"]Important highlighted text[/highlight]
 */
function processHighlight(content) {
  // More flexible regex that handles HTML formatting around shortcodes
  const highlightRegex = /(?:<[^>]*>)*\[highlight(?:\s+color=["']([^"']*)["'])?\](?:<[^>]*>)*(.*?)(?:<[^>]*>)*\[\/highlight\](?:<[^>]*>)*/gs;

  return content.replace(highlightRegex, (match, color, text) => {
    const colorClass = getHighlightColorClass(color || 'blue');

    // Clean up the text content
    const cleanText = text
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/&quot;/g, '"')
      .replace(/&#8217;/g, "'")
      .replace(/&#8211;/g, "–")
      .replace(/&#8221;/g, '"')
      .replace(/&amp;/g, "&")
      .trim();

    return `
      <span class="highlight-text ${colorClass}">${cleanText}</span>
    `;
  });
}

/**
 * Process References shortcode
 * WordPress: [references]
 *   [ref id="4" url="https://pmc.ncbi.nlm.nih.gov/articles/PMC10171344/"]Enhancing Respiratory Therapists' Well-Being: Battling Burnout in …[/ref]
 *   [ref id="12" url="https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0312504"]A qualitative study examining stressors among Respiratory … – PLOS[/ref]
 *   [ref id="16" url="https://scholarworks.waldenu.edu/cgi/viewcontent.cgi?article=17300&context=dissertations"][PDF] Effective Strategies Respiratory Managers Use to Reduce Burnout …[/ref]
 * [/references]
 */
function processReferences(content) {
  // First, extract reference data from the references section
  const referencesRegex = /(?:<[^>]*>)*\[references\](?:<[^>]*>)*(.*?)(?:<[^>]*>)*\[\/references\](?:<[^>]*>)*/gs;

  let referencesData = {};
  let referencesHtml = '';

  // Extract references and build lookup table
  const referencesMatch = referencesRegex.exec(content);
  if (referencesMatch) {
    const referencesContent = referencesMatch[1];

    // Clean up the references content
    const cleanReferencesContent = referencesContent
      .replace(/<[^>]*>/g, ' ') // Remove HTML tags
      .replace(/&quot;/g, '"')
      .replace(/&#8217;/g, "'")
      .replace(/&#8211;/g, "–")
      .replace(/&#8221;/g, '"')
      .replace(/&amp;/g, "&")
      .trim();

    // Extract individual references
    const refRegex = /\[ref\s+id\s*=\s*["']([^"']*)["'](?:\s+url\s*=\s*["']([^"']*)["'])?\](.*?)\[\/ref\]/g;
    let refMatch;

    while ((refMatch = refRegex.exec(cleanReferencesContent)) !== null) {
      const [, id, url, title] = refMatch;

      // Store reference data for inline citations
      referencesData[id] = {
        title: title.trim(),
        url: url || '#'
      };

      // Build the reference list item
      referencesHtml += `
        <li class="reference-item">
          <span class="reference-number">[${id}]</span>
          ${url ? `<a href="${url}" target="_blank" rel="noopener noreferrer" class="reference-link">` : ''}
          <span class="reference-title">${title.trim()}</span>
          ${url ? '</a>' : ''}
        </li>
      `;
    }
  }

  // Process inline citations in the content FIRST (before replacing the references section)
  // Look for patterns like [4], [12], [16] or [4][12][16]
  const citationRegex = /(\[(\d+)\])+/g;

  content = content.replace(citationRegex, (match) => {
    // Extract all citation numbers from the match
    const numberRegex = /\[(\d+)\]/g;
    let numberMatch;
    let citations = [];

    while ((numberMatch = numberRegex.exec(match)) !== null) {
      citations.push(numberMatch[1]);
    }

    // Create superscript citations with links
    const citationLinks = citations.map(num => {
      const ref = referencesData[num];
      if (ref && ref.url && ref.url !== '#') {
        return `<a href="${ref.url}" target="_blank" rel="noopener noreferrer" class="citation-link" title="${ref.title}">${num}</a>`;
      } else {
        return `<span class="citation-number" title="${ref ? ref.title : 'Reference ' + num}">${num}</span>`;
      }
    }).join('');

    return `<sup class="citation-group">${citationLinks}</sup>`;
  });

  // Now replace the references section with the formatted HTML
  content = content.replace(referencesRegex, () => {
    return `
      <div class="references-section">
        <h4 class="references-title">References</h4>
        <ol class="references-list">
          ${referencesHtml}
        </ol>
      </div>
    `;
  });

  return content;
}

/**
 * Helper function to get color classes for statistics
 */
function getColorClass(color) {
  const colorMap = {
    'cyan': 'text-cyan-600',
    'emerald': 'text-emerald-600',
    'purple': 'text-purple-600',
    'blue': 'text-blue-600',
    'green': 'text-green-600',
    'red': 'text-red-600',
    'yellow': 'text-yellow-600',
    'indigo': 'text-indigo-600'
  };
  return colorMap[color] || 'text-cyan-600';
}

/**
 * Helper function to get callout type classes
 */
function getCalloutTypeClass(type) {
  const typeMap = {
    'info': 'callout-info',
    'warning': 'callout-warning',
    'success': 'callout-success',
    'error': 'callout-error'
  };
  return typeMap[type] || 'callout-info';
}

/**
 * Helper function to get callout icons
 */
function getCalloutIcon(type) {
  const iconMap = {
    'info': 'ℹ️',
    'warning': '⚠️',
    'success': '✅',
    'error': '❌'
  };
  return iconMap[type] || 'ℹ️';
}

/**
 * Helper function to get highlight color classes
 */
function getHighlightColorClass(color) {
  const colorMap = {
    'blue': 'highlight-blue',
    'green': 'highlight-green',
    'yellow': 'highlight-yellow',
    'red': 'highlight-red',
    'purple': 'highlight-purple'
  };
  return colorMap[color] || 'highlight-blue';
}

/**
 * Decode HTML entities in content
 */
function decodeHtmlEntities(content) {
  return content
    .replace(/&quot;/g, '"')
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, "–")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

/**
 * Main function to process all shortcodes in content
 */
export function processShortcodes(content) {
  if (!content) return content;

  // First decode HTML entities to make regex matching easier
  let processedContent = decodeHtmlEntities(content);

  // Process all shortcodes in order
  processedContent = processKeyInsight(processedContent);
  processedContent = processStatsCards(processedContent);
  processedContent = processQuote(processedContent);
  processedContent = processCallout(processedContent);
  processedContent = processHighlight(processedContent);
  processedContent = processReferences(processedContent);

  return processedContent;
}

/**
 * Get CSS styles for all shortcode components
 */
export function getShortcodeStyles() {
  return `
    /* Key Insight Panel */
    .key-insight-panel {
      background: linear-gradient(135deg, #ecfeff 0%, #faf5ff 100%);
      border-radius: 0.75rem;
      padding: 1.5rem;
      margin: 2rem 0;
      border: 1px solid #e0e7ff;
    }

    .key-insight-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 0.75rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .key-insight-icon {
      font-size: 1.25rem;
    }

    .key-insight-text {
      color: #4b5563;
      line-height: 1.6;
      margin: 0;
    }

    /* Statistics Cards */
    .stats-cards-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin: 2rem 0;
    }

    .stat-card {
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 0.75rem;
      padding: 1.5rem;
      text-align: center;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .stat-value {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      font-size: 0.875rem;
      color: #6b7280;
    }

    /* Custom Quote */
    .custom-quote {
      border-left: 4px solid #22d3ee;
      padding: 1rem 0 1rem 1.5rem;
      margin: 2rem 0;
      background: #f9fafb;
      border-radius: 0 0.5rem 0.5rem 0;
    }

    .quote-text {
      font-size: 1.125rem;
      color: #4b5563;
      font-style: italic;
      margin: 0 0 0.5rem 0;
      line-height: 1.6;
    }

    .quote-attribution {
      font-size: 0.875rem;
      color: #6b7280;
      margin: 0;
    }

    /* Callout Boxes */
    .callout-box {
      border-radius: 0.75rem;
      padding: 1rem 1.5rem;
      margin: 1.5rem 0;
      border-left: 4px solid;
    }

    .callout-info {
      background: #eff6ff;
      border-left-color: #3b82f6;
    }

    .callout-warning {
      background: #fffbeb;
      border-left-color: #f59e0b;
    }

    .callout-success {
      background: #f0fdf4;
      border-left-color: #10b981;
    }

    .callout-error {
      background: #fef2f2;
      border-left-color: #ef4444;
    }

    .callout-title {
      font-size: 1rem;
      font-weight: 600;
      margin: 0 0 0.5rem 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .callout-content {
      color: #4b5563;
      line-height: 1.6;
    }

    /* Highlight Text */
    .highlight-text {
      padding: 0.125rem 0.375rem;
      border-radius: 0.25rem;
      font-weight: 500;
    }

    .highlight-blue {
      background: #dbeafe;
      color: #1e40af;
    }

    .highlight-green {
      background: #dcfce7;
      color: #166534;
    }

    .highlight-yellow {
      background: #fef3c7;
      color: #92400e;
    }

    .highlight-red {
      background: #fee2e2;
      color: #dc2626;
    }

    .highlight-purple {
      background: #f3e8ff;
      color: #7c3aed;
    }

    /* References Section */
    .references-section {
      margin-top: 3rem;
      padding-top: 2rem;
      border-top: 1px solid #e5e7eb;
      background: #fafafa;
      border-radius: 0.5rem;
      padding: 1.5rem;
    }

    .references-title {
      font-size: 1rem;
      font-weight: 600;
      color: #6b7280;
      margin: 0 0 1rem 0;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .references-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .reference-item {
      margin-bottom: 0.75rem;
      font-size: 0.875rem;
      line-height: 1.5;
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
    }

    .reference-number {
      color: #6b7280;
      font-weight: 500;
      flex-shrink: 0;
      min-width: 2rem;
    }

    .reference-link {
      color: #4b5563;
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .reference-link:hover {
      color: #1f2937;
      text-decoration: underline;
    }

    .reference-title {
      color: #4b5563;
    }

    /* Inline Citations */
    .citation-group {
      font-size: 0.75rem;
      line-height: 1;
    }

    .citation-link,
    .citation-number {
      color: #3b82f6;
      text-decoration: none;
      margin: 0 0.125rem;
      padding: 0.125rem 0.25rem;
      border-radius: 0.25rem;
      background: #eff6ff;
      transition: all 0.2s ease;
    }

    .citation-link:hover {
      background: #dbeafe;
      color: #1e40af;
    }

    .citation-number {
      color: #6b7280;
      background: #f3f4f6;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .stats-cards-container {
        grid-template-columns: 1fr;
      }

      .stat-value {
        font-size: 1.75rem;
      }

      .key-insight-panel,
      .callout-box {
        padding: 1rem;
      }

      .references-section {
        padding: 1rem;
        margin-top: 2rem;
      }

      .reference-item {
        font-size: 0.8rem;
      }
    }
  `;
}
