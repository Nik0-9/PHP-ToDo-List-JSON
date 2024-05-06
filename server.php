<?php

$todoJson = file_get_contents("js/data.json");

$method = $_SERVER['REQUEST_METHOD'];
if($method !== 'GET') {
    if($method === 'POST'){
        //converto il json in un array php
        $toDo = json_decode($todoJson, true);
        if(isset($_POST['id'])) {
            //creo un nuovo array associativo per il nuovo toDo
            $task = [
                'id' => (int) $_POST['id'],
                'text'=> $_POST['text'],
                'done'=> !(bool)$_POST['done'],
            ];
            //aggiungo il nuovo toDo all'array dei toDo
            $toDo[] = $task;
        }
    }
    $todoJson = json_encode($toDo, JSON_PRETTY_PRINT);
    file_put_contents('js/data.json', $todoJson);
}
header("Content-Type: application/json");
echo $todoJson;
