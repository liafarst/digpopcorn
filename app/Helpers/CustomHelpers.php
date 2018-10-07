<?php

namespace App\Helpers;


class CustomHelpers {

    public static function initials($name){
        $names = explode(" ", $name);
        $result = "";
        foreach($names as $name){
            $result .= $name[0] . ". ";
        }
        return $result;
    }


}