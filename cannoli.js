// cannoli = awesomex10
(function () {
    const urlParams = new URLSearchParams(window.location.search);

    // Function to encode the parameter values
    function encodeValue(value) {
        // Replace space with '_s_' and dash with '_d_'
        return value.replace(/ /g, '_s_').replace(/-/g, '_d_');
    }

    // Get the value of 'gclid', 'msclkid', or 'fbclid' parameters
    var cnlidValue = urlParams.get('gclid') || urlParams.get('msclkid') || urlParams.get('fbclid');

    if (urlParams.toString()) {
        var links = document.getElementsByTagName('a');
        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            var hash = link.hash;
            var urlWithoutHash = link.href.split('#')[0];
            var linkParams = new URL(urlWithoutHash).searchParams;

            var replacementValue = cnlidValue;

            // Check if 'tid' parameter exists in the link's URL and encode cnlid value
            if (linkParams.has('tid') && cnlidValue) {
                replacementValue = encodeValue(cnlidValue);
            }

            // Replace [cnlid] with the appropriate value
            if (replacementValue && urlWithoutHash.includes('[cnlid]')) {
                urlWithoutHash = urlWithoutHash.replace('[cnlid]', replacementValue);
            }

            // Construct the new URL with modified parameters
            var paramString = urlParams.toString();
            if (urlWithoutHash.indexOf('?') === -1) {
                urlWithoutHash += '?' + paramString;
            } else {
                urlWithoutHash += '&' + paramString;
            }
            link.href = urlWithoutHash + hash;
        }
    }
})();
