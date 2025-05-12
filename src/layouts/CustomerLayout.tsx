import { Footer } from "@/components/customer/Footer";
import { Header, NavBar } from "@/components/customer/Header";
import { useMessageQueue } from "@/hooks/useMessageQueue";
import { useStomp } from "@/hooks/useStomp";
import { RootState } from "@/redux/store";
import { AppNotificationResponse } from "@/types/response";
import { IMessage } from "@stomp/stompjs";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const CustomerLayout = ({ children }: { children: React.ReactNode }) => {
  const { subscribeToTopic, connected } = useStomp("anynomous customer");
  const { currentMessage, addMessage } = useMessageQueue({ timeout: 8000 });
  const { me } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (!connected) return;
    if (!me) return;
    const topic = "/topic/notifications";
    const handleMessageComing = (message: IMessage) => {
      const payload = JSON.parse(message.body) as AppNotificationResponse;
      if (payload.sender != me?.id) addMessage(payload.message);
    };
    const unsubscribe = subscribeToTopic(topic, handleMessageComing);
    return unsubscribe;
  }, [connected, subscribeToTopic, addMessage, me]);

  return (
    <div className="w-full relative container mx-auto  px-40 flex flex-col space-y-1">
      <Header />
      {me?.id}
      <div className="border-b-1 border-b-gray-200"></div>
      <NavBar />
      {currentMessage && (
        <div className="fixed w-full z-10 top-30 bg-primary/80 p-2 rounded-sm overflow-hidden">
          <p className="inline-block whitespace-nowrap animate-marquee">
            {currentMessage}
          </p>
        </div>
      )}
      {children}
      <Footer />
    </div>
  );
};
