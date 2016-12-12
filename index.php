<?php

    include "controller/atributos.php";
    include "controller/instances.php";

    if(isset($_POST["value"])){

        if($_POST["value"] == "start"){
            $attr = new Atributos;
            echo json_encode($attr);
        }

        if($_POST["value"] == "instances"){
            echo json_encode($instances);
        }

        if($_POST["value"] == "question"){
            $attr = $_POST["attributes"];
            $instances = $_POST["instances"];
            $result = getQuestion($attr, $instances);
            if($result == -1){
                echo "Nenhum personagem encontrado.0";
            }
            else {
                if(is_int($result))
                    echo $instances[$result]["name"] . "0";
                else
                    echo $result;
            }
        }

        if($_POST["value"] == "skipInstances"){
            $instances = $_POST["instances"];
            $question = $_POST["question"];
            $instances = skipInstances($instances, $question);
            echo json_encode($instances);
        }

        if($_POST["value"] == "characters"){
                $characters = "";
                for($i = 0; $i < count($instances); $i++){
                    $characters = $characters . "<div class='col s6'>" . $instances[$i]->name . "</div>";
                }
                echo $characters;
        }

    }

    function getQuestion($attr, $instances){
        for($i = 0; $i < count($instances); $i++){
            if($instances[$i]["skip"] == 0){
                for($j = 0; $j < count($instances[$i]["attributes"]); $j++){
                    if($attr["attributes"][$instances[$i]["attributes"][$j]] == 0){
                        $question = $instances[$i]["attributes"][$j];
                        $j = count($instances[$i]["attributes"]);
                        $i = count($instances);
                        break;
                    }
                }
            }
        }
        for($i = 0; $i < count($instances); $i++){
            if($instances[$i]["skip"] == 0){
                for($j = 0; $j < count($instances[$i]["attributes"]); $j++){
                    $val = $attr["attributes"][$instances[$i]["attributes"][$j]];
                    if($val == 0 || $val == -1){
                        break;
                    }
                    if($val == 1 && ($j == count($instances[$i]["attributes"])-1)){
                        $champion = $i;
                    }
                }
            }
        }
        if(!isset($champion) && !isset($question))
            return -1;
        if(isset($champion))
            return $champion;
        return $question;
    }

    function skipInstances($instances, $question){
        for($i = 0; $i < count($instances); $i++){
            for($j = 0; $j < count($instances[$i]["attributes"]); $j++){
                if($instances[$i]["attributes"][$j] == $question){
                    $instances[$i]["skip"] = 1;
                    $j = count($instances[$i]["attributes"]);
                }
            }
        }
        return $instances;
    }


 ?>
