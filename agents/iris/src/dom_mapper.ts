
/**
 * dom_mapper.ts
 * Injected script to map interactive elements and draw visual labels.
 */

export const MAP_SCRIPT = `
(function() {
    // 1. Cleanup existing labels
    const oldContainer = document.getElementById('gaia-labels-container');
    if (oldContainer) oldContainer.remove();

    const container = document.createElement('div');
    container.id = 'gaia-labels-container';
    container.style.position = 'absolute';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999999';
    document.body.appendChild(container);

    const interactiveSelectors = [
        'a', 'button', 'input', 'select', 'textarea',
        '[role="button"]', '[role="link"]', '[role="checkbox"]', '[role="menuitem"]',
        '[onclick]', '.btn', '.button', 'svg', 'i',
        '[style*="cursor: pointer"]', '[style*="cursor:pointer"]'
    ];

    const elements = document.querySelectorAll(interactiveSelectors.join(','));
    const map = [];
    let idCounter = 1;

    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        
        // Visibility check
        if (rect.width === 0 || rect.height === 0) return;
        const style = window.getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return;

        const id = idCounter++;
        el.setAttribute('data-gaia-id', id.toString());

        // Draw Label
        const label = document.createElement('div');
        label.innerText = id.toString();
        label.style.position = 'absolute';
        label.style.top = (rect.top + window.scrollY) + 'px';
        label.style.left = (rect.left + window.scrollX) + 'px';
        label.style.backgroundColor = 'red';
        label.style.color = 'white';
        label.style.fontSize = '12px';
        label.style.fontWeight = 'bold';
        label.style.padding = '2px 5px';
        label.style.borderRadius = '3px';
        label.style.boxShadow = '0 0 4px black';
        label.style.zIndex = '10000000';
        container.appendChild(label);

        map.push({
            id: id,
            tag: el.tagName.toLowerCase(),
            text: el.textContent?.trim().slice(0, 50) || '',
            ariaLabel: el.getAttribute('aria-label') || '',
            placeholder: el.placeholder || '',
            role: el.getAttribute('role') || '',
            type: el.type || ''
        });
    });

    return map;
})()
`;
