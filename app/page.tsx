// import { Header } from "@/components/layout/header";
import { ChatArea } from "@/components/chat-area";
export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      {/* <Header /> */}
      <div className="flex-1 grid grid-cols-12 gap-4 p-4 md:p-6">
        <div className="col-span-12 md:col-span-9 lg:col-span-10">
          <ChatArea />
        </div>
      </div>
    </div>
  );
}
