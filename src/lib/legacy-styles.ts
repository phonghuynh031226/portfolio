/** Run in the document head before hydration, without fetching CSS on modern browsers. */
export function legacyStylesheetLoader(href: string): string {
  const safeHref = JSON.stringify(href).replace(/</g, "\\u003c");
  return `(function(){
    if (window.CSS && CSS.supports('color', 'oklch(0.5 0.1 120)')) return;
    if (document.getElementById('legacy-styles')) return;
    var link = document.createElement('link');
    link.id = 'legacy-styles';
    link.rel = 'stylesheet';
    link.href = ${safeHref};
    document.head.appendChild(link);
  })();`;
}
