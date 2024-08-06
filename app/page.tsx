
import { Header } from "@/components/layout/header"
import { ChatArea } from "@/components/chat-area"

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 overflow-hidden">
        <div className="h-full max-w-4xl mx-auto px-4">
          <ChatArea />
        </div>
      </main>
    </div>
  )
}

// import { Header } from "@/components/layout/header"
// import { ChatArea } from "@/components/chat-area"

// export default function Home() {
//   return (
//     <div className="flex flex-col h-screen overflow-hidden layout-container">
//       <Header />
//       <main className="flex-1 overflow-hidden">
//         <div className="max-w-4xl mx-auto h-full">
//           <ChatArea />
//         </div>
//       </main>
//     </div>
//   )
// }
