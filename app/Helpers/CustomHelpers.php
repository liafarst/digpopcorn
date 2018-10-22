<?php

namespace App\Helpers;


class CustomHelpers {

    public static function initials($name) {
        $names = explode(" ", $name);
        $result = "";
        foreach ($names as $name) {
            $result .= $name[0] . ". ";
        }
        return $result;
    }

    public static function timeToMinutes($time) {
        $segments = explode(".", $time);
        $minutes = $segments[0] * 60 + $segments[1];
        return $minutes;
    }

    public static function germanStatus($status) {
        switch($status){
            case "IN PROGRESS":
                return "Bestellt";
            case "READY TO COLLECT":
                return "Fertig zur Abholung";
            case "RECEIVED":
                return "Abgeholt";
            default:
                return "Unknown status.";
        }
    }


}
