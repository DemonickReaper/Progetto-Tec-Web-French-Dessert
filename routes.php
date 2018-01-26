<?php
$app->get('/', 'Controller@index');
$app->get('/annotation/search', 'ApiController@search');
$app->post('/annotation/store', 'ApiController@store');
$app->put('/annotation/update/{id}', 'ApiController@update');
$app->delete('/annotation/delete/{id}', 'ApiController@delete');
?>