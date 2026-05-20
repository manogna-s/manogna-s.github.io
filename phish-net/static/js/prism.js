// Add clipboard icon copy button to all Prism code blocks.
// Replaces any text button already added by index.js.
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('pre[class*="language-"]').forEach(function (pre) {
        if (!navigator.clipboard) return;

        // Remove any existing copy button (e.g. added by index.js)
        var existing = pre.querySelector('button');
        if (existing) existing.remove();

        var button = document.createElement('button');
        button.innerHTML = '<i class="fa fa-copy"></i>';
        button.title = 'Copy to clipboard';
        button.addEventListener('click', function () {
            var code = pre.querySelector('code');
            navigator.clipboard.writeText(code.innerText).then(function () {
                button.innerHTML = '<i class="fa fa-check"></i>';
                setTimeout(function () {
                    button.innerHTML = '<i class="fa fa-copy"></i>';
                }, 2000);
            });
        });
        pre.appendChild(button);
    });
});
