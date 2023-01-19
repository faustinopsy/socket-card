<?php

namespace MyApp;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class Socket implements MessageComponentInterface {
    private $cardId;
    private $cardPower;
    private $clients;
    private $vez;
    private $targetDiv;
    private $playerName;
    private $rooms = array();
    private $playerRooms;
    public function __construct()
    {
        $this->clients = new \SplObjectStorage;
    }

    public function onOpen(ConnectionInterface $conn) {

        // Store the new connection in $this->clients
        $this->clients->attach($conn);

        echo "New connection! ({$conn->resourceId})\n";
    }
   
    public function onMessage(ConnectionInterface $from, $msg) {
        $data = json_decode($msg);
        var_dump($data);
    
        if (isset($data->type) && $data->type == 'create-room') {
            $roomId = uniqid();
            $this->rooms[$roomId] = [$from];
            $from->send(json_encode(['type' => 'create-room', 'roomId' => $roomId]));
        } elseif (isset($data->type) && $data->type == 'join-room') {
            // Adiciona o jogador a uma sala existente
            $roomId = $data->data->roomId;
            if (isset($this->rooms[$roomId]) && count($this->rooms[$roomId]) < 2) {
                $this->rooms[$roomId][] = $from;
                $from->send(json_encode(['type' => 'join-room', 'roomId' => $roomId]));
    
                foreach ($this->rooms[$roomId] as $client) {
                    if ($client !== $from) {
                        $client->send(json_encode(['type' => 'player-joined', 'playerName' => $data->data->playerName]));
                    }
                }
            } else {
                $from->send(json_encode(['type' => 'error', 'message' => 'Sala cheia ou não existe']));
            }
        } elseif (isset($data->type) && $data->type == 'move-card') {
            $this->cardId = $data->data->cardId;
            $this->cardPower = $data->data->cardPower;
            $this->targetDiv = $data->data->targetDiv;
            $this->playerName = $data->data->playerName;
            //aqui você pode enviar essas informações para os outros clientes conectados
            foreach ($this->clients as $client) {
                if ($from->resourceId == $client->resourceId) {
                    continue;
                }
                $client->send(json_encode(['type' => 'move-card', 'cardId' => $this->cardId, 'cardPower' => $this->cardPower, 'targetDiv' => $this->targetDiv, 'playerName' => $this->playerName]));
            }
        } else {
            //caso não seja uma mensagem de movimentação de carta, você pode tratar de forma normal
            foreach ($this->clients as $client) {
                if ($from->resourceId == $client->resourceId) {
                    continue;
                }
                $client->send($msg);
            }
        }
    }
    
    public function onClose(ConnectionInterface $conn) {
        // remove o jogador da sala quando ele desconecta
        foreach ($this->rooms as &$room) {
            if (($key = array_search($conn, $room)) !== false) {
                unset($room[$key]);
            }
        }
        $this->clients->detach($conn);
        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "An error has occurred: {$e->getMessage()}\n";
        $conn->close();
    }
}
