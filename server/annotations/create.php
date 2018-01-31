<?php
$ curl -i -X POST \
       -H 'Content-Type: application/json' \
       -d '{"text": "Annotation text"}' \
       http://example.com/api/annotations
HTTP/1.0 303 SEE OTHER
Location: http://example.com/api/annotations/d41d8cd98f00b204e9800998ecf8427e
...
?>