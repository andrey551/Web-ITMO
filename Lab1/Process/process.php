<?php
  define( "MIN_X", -5);
  define( "MAX_X", 3);
  define( "Y_VAL", array(-4, -3, -2, -1, 0, 1, 2, 3, 4));
  define("R_VAL", array(1, 2, 3, 4, 5));
  $start_time = microtime(true);
  $x = $_REQUEST["x"];
  $y = $_REQUEST["y"];
  $r = $_REQUEST["r"];
  $start_time = microtime(true);
  if(!validateX($x) && !validateY($y) && !validateR($r)) echo "";

  $res;
  if(checkHit($x, $y, $r)) $res = "hit";
  else $res = "miss";

  $executionTime = round(microtime(true) -$start_time, 8);
  $currentTime = date('d-m-y h:i:s');

  echo json_encode(
    array(
        "result" => $res,
        "current-time" => $currentTime,
        "time-execute" => $executionTime
    ));

    function validateX($x) {
      if(!is_float($x)) return false;
      if(MIN_X > $x || MAX_X < $x) return false;
      return true;
    }

    function validateY($y) {
      if(!is_int($y)) return false;;
      if(in_array($y, Y_VAL)) return true;
        return false;
    }

    function validateR($r) {
      if(!is_int($r)) return false;
      if(in_array($r, R_VAL)) return true;
      return false;
    }

    function isInPiece($x, $y, $r) {
      if($x <= 0 && $y >= 0) {
        if(sqrt($x * $x + $y * $y)<= $r) return true;
      }

      return false;
    }

    function isInSquare($x, $y , $r) {
      if($x >= 0 && $y <= 0) {
        if($x <= $r && $y >= -$r) return true;
      }

      return false;
    }

    function isInTriangle($x, $y, $r) {
      if($x >= 0 && $y >= 0) {
        if($x + $y <= $r) return true;
      }

      return false;
    }

    function checkHit($x, $y, $r) {
      return isInPiece($x, $y, $r) || isInSquare($x, $y, $r) || isInTriangle($x, $y, $r);
    } 
?>