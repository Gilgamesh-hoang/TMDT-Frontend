import { WEBSOCKER_URL } from "@/types/constant";
import { Client, Message } from "@stomp/stompjs";
import { useCallback, useEffect, useRef, useState } from "react";

export const useStomp = (username: string) => {
  const [connected, setConnected] = useState<boolean>(false);
  const stompClient = useRef<Client | null>(null);
  useEffect(() => {
    const client = new Client({
      brokerURL: WEBSOCKER_URL,
      connectHeaders: {
        username: username,
      },
      onConnect: (frame) => {
        console.log("Connected", frame), setConnected(true);
      },
      onDisconnect: () => {
        console.log("Disconected");
        setConnected(false);
      },
      onWebSocketClose: (event) => {
        console.log("websocketclose", event);
      },
      reconnectDelay: 10000,
    });
    stompClient.current = client;
    if (!client.active) {
      client.activate();
    }
    return () => {
      client.deactivate();
      stompClient.current = null;
    };
  }, [username]);
  const subscribeToTopic = useCallback(
    (topic: string, callback: (payload: Message) => void) => {
      const client = stompClient.current;
      if (!client || !connected) {
        console.log("No connection");
        return () => {};
      }
      const subscription = client.subscribe(topic, (message: Message) => {
        try {
          callback(message);
        } catch (error) {
          console.error("Error parsing message", error);
        }
      });
      return () => {
        subscription.unsubscribe();
      };
    },
    [connected],
  );
  return { subscribeToTopic, connected, stompClient };
};
