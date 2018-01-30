<?php
$ curl -i -X PUT \
       -H 'Content-Type: application/json' \
       -d '{"text": "Updated annotation text"}' \
       http://example.com/api/annotations/d41d8cd98f00b204e9800998ecf8427e
HTTP/1.0 303 SEE OTHER
Location: http://example.com/api/annotations/d41d8cd98f00b204e9800998ecf8427e
...
?>