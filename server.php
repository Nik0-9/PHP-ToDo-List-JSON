<?php

$todoJson = file_get_contents("js/data.json");
$method = $_SERVER['REQUEST_METHOD'];

if($method !== 'GET') {
    $toDo = json_decode($todoJson, true);
    if($method === 'POST'){
        //converto il json in un array php
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
    } elseif($method === 'DELETE'){
        $obj = json_decode(file_get_contents('php://input'), true);
        $id = $obj['id'];
        array_splice($toDo, $id, 1);
        
    } elseif ($method === 'PUT') {
        $obj = json_decode(file_get_contents('php://input'), true);
        $index = $obj['inde'];
        $toDo[$index]['done'] = $obj['done'];
    }
    $todoJson = json_encode($toDo, JSON_PRETTY_PRINT);
    file_put_contents('js/data.json', $todoJson);
}

header("Content-Type: application/json");
echo $todoJson;