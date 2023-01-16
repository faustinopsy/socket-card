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
       
        if(isset($data->type) && $data->type == 'move-card'){
            $this->cardId = $data->data->cardId;
            $this->cardPower = $data->data->cardPower;
            $this->targetDiv =$data->data->targetDiv;
            $this->playerName = $data->data->playerName;
            //aqui você pode enviar essas informações para os outros clientes conectados
            foreach ( $this->clients as $client ) {
                if ( $from->resourceId == $client->resourceId ) {
                    continue;
                }
                $client->send(json_encode(['type' => 'move-card', 'cardId' => $this->cardId, 'cardPower' => $this->cardPower, 'targetDiv'=> $this->targetDiv,'playerName'=>$this->playerName]));
            }
        }else{
            //caso não seja uma mensagem de movimentação de carta, você pode tratar de forma normal
            foreach ( $this->clients as $client ) {
                if ( $from->resourceId == $client->resourceId ) {
                    continue;
                }
                $client->send( $msg );
            }
        }
    }
    

    public function onClose(ConnectionInterface $conn) {
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
    }
}
