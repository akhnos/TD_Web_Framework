<?php
/**
 * Created by PhpStorm.
 * User: akhnos
 * Date: 3/28/15
 * Time: 10:46 AM
 */
$document = (array_key_exists("doc",$_GET)) ? $_GET["doc"] : "grid_base_layout";
$language = (array_key_exists("lang",$_GET)) ? $_GET["lang"] : "tr";
?>
<!DOCTYPE html>
<html>
<head>
    <?php include "head.html" ?>
</head>
<body>
    <div class="display-none">
        <?php include "docs/language/".$language.".html" ?>
    </div>
    <div class=" dw-16 bg-color">
        <?php include "docs/".$document.".html" ?>
    </div>
    <div class=" dw-8 bg-color">
        <?php include "navigator.html" ?>
    </div>
</body>
</html>
