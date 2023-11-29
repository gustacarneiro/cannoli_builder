// cannoli = awesomex10
(function () {
    const urlParams = new URLSearchParams(window.location.search);

    // Function to encode the parameter values
    function encodeValue(value) {
        // Replace space with '_s_' and dash with '_d_'
        return value.replace(/ /g, '_s_').replace(/-/g, '_d_');
    }

    if (urlParams.toString()) {
        var links = document.getElementsByTagName('a');
        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            var hash = link.hash;
            var urlWithoutHash = link.href.split('#')[0];
            var linkParams = new URL(urlWithoutHash).searchParams;

            // Get the value of 'gclid', 'msclkid', or 'fbclid' parameters
            var cnlidValue = urlParams.get('gclid') || urlParams.get('msclkid') || urlParams.get('fbclid');

            // Check if 'tid' parameter exists in the link and encode cnlid value
            if (linkParams.has('tid') && cnlidValue) {
                cnlidValue = encodeValue(cnlidValue);
            }

            // Replace [cnlid] with the encoded value from 'gclid', 'msclkid', or 'fbclid'
            if (cnlidValue && urlWithoutHash.includes('[cnlid]')) {
                urlWithoutHash = urlWithoutHash.replace('[cnlid]', cnlidValue);
            }

            var newParams = new URLSearchParams(urlParams);

            // Check if 'tid' parameter exists and encode its value
            if (newParams.has('tid')) {
                var tidValue = newParams.get('tid');
                var encodedTidValue = encodeValue(tidValue);
                newParams.set('tid', encodedTidValue);
            }

            // Construct the new URL with modified parameters
            var paramString = newParams.toString();
            if (urlWithoutHash.indexOf('?') === -1) {
                urlWithoutHash += '?' + paramString;
            } else {
                urlWithoutHash += '&' + paramString;
            }
            link.href = urlWithoutHash + hash;
        }
    }
})();
