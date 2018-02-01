  <?php
  $prova = '{
    "id": "39fc339cf058bd22176771b3e3187329", 
    "text": "A note I wrote",                 
    "quote": "the text that was annotated", 
    "uri": "http://example.com", 
    "ranges": [                             
      {
        "start": "/p[69]/span/span",        
        "end": "/p[70]/span/span",            
        "startOffset": 0,                     
        "endOffset": 120                     
      }
    ],
    "user": "alice",                           
    "consumer": "annotateit",                 
    "tags": [ "review", "error" ],             
    "permissions": {                          
      "read": ["group:__world__"],
      "admin": [],
      "update": [],
      "delete": []
    }
  }';

  $gigi = json_decode($prova,true);
  print_r($gigi);
  echo $gigi;

  ?>