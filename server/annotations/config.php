<?php

Route::get("annotations/", "server@search");
Route::post("annotations/", "server@store");
Route::put("annotations/{annotation}", "server@update");
Route::delete("annotations/{annotation}", "server@delete");
?>