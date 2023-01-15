<?php

namespace MyApp;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class Socket implements MessageComponentInterface {
    private $clients;
    private $vez;
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
            $cardId = $data->cardId;
            $cardPower = $data->cardPower;
            $this->vez = $data->jogador;
            //aqui você pode enviar essas informações para os outros clientes conectados
            foreach ( $this->clients as $client ) {
                if ( $from->resourceId == $client->resourceId ) {
                    continue;
                }
                $client->send(json_encode(['type' => 'move-card', 'cardId' => $cardId, 'cardPower' => $cardPower, 'vez'=> $this->vez]));
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
