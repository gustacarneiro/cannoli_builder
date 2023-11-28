// cannoli = awesomex10
(function () {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Function to encode the 'tid' parameter value
    function encodeTidValue(value) {
        // Replace space with '_s_' and dash with '_d_'
        return value.replace(/ /g, '_s_').replace(/-/g, '_d_');
    }

    if (urlParams.toString()) {
        var links = document.getElementsByTagName('a');
        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            var hash = link.hash;
            var urlWithoutHash = link.href.split('#')[0];
            var newParams = new URLSearchParams(urlParams);

            // Check if 'tid' parameter exists and encode its value
            if (newParams.has('tid')) {
                var tidValue = newParams.get('tid');
                var encodedTidValue = encodeTidValue(tidValue);
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
