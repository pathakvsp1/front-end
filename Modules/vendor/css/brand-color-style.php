<?php
    header("Content-type: text/css; charset: UTF-8");
    $brandColor = $staffmember->brand_color;

    try {
          $teamColor = $business->brand_color;
        }

    //catch exception
    catch(Exception $e) {
      $teamColor = $staffmember->brand_color;
    }

    
?>
<style>
 :root{
     --brand-color :<?php echo $brandColor; ?>;
     --teamColor :<?php echo $teamColor; ?>;
}
</style>