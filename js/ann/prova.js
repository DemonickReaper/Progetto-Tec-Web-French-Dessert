var content = $('#content').annotator();
    content.annotator('addPlugin', 'Store', {
      // The endpoint of the store on your server.
      prefix: '/data/endpoint',

      // Attach the uri of the current page to all annotations to allow search.
      annotationData: {
        'uri': 'http://localhost/progetto-qualcosa-che-si-mangia/visual.php'
      },

      // This will perform a "search" action when the plugin loads. Will
      // request the last 20 annotations for the current url.
      // eg. /store/endpoint/search?limit=20&uri=http://this/document/only
      loadFromSearch: {
        'limit': 20,
        'uri': 'http://localhost/progetto-qualcosa-che-si-mangia/visual.php'
      }
    });