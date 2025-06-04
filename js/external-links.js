// Automatically open external links in new tabs
document.addEventListener('DOMContentLoaded', function() {
    // Get all links
    var links = document.getElementsByTagName('a');
    
    // Loop through all links
    for (var i = 0; i < links.length; i++) {
        var link = links[i];
        var href = link.getAttribute('href');
        
        // Check if it's an external link
        if (href && (href.indexOf('http://') === 0 || href.indexOf('https://') === 0)) {
            // Check if it's not a link to the current domain
            if (href.indexOf(window.location.hostname) === -1) {
                // Add target="_blank" if not already present
                if (!link.getAttribute('target')) {
                    link.setAttribute('target', '_blank');
                }
                // Add rel="noopener noreferrer" for security
                link.setAttribute('rel', 'noopener noreferrer');
            }
        }
    }
});