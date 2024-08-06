'use client'

import { useState, useRef, useEffect } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type MessageRole = 'assistant' | 'user'

interface Message {
    role: MessageRole
    content: string
}

export function ChatArea() {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "Hi! I'm the Headstarter support assistant. How can I help you today?" },
    ])
    const [message, setMessage] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [messages])

    const sendMessage = async (): Promise<void> => {
        if (message.trim() && !isLoading) {
            setIsLoading(true)
            const newMessages: Message[] = [...messages, { role: 'user', content: message.trim() }]
            setMessages(newMessages)
            setMessage('')

            try {
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ messages: newMessages }),
                })

                if (!response.ok) {
                    throw new Error('Failed to fetch response')
                }

                const reader = response.body?.getReader()
                if (!reader) {
                    throw new Error('Failed to get reader')
                }

                let assistantMessage = ''
                setMessages(prev => [...prev, { role: 'assistant', content: '' }])

                while (true) {
                    const { done, value } = await reader.read()
                    if (done) {
                        break
                    }

                    const text = new TextDecoder().decode(value)
                    assistantMessage += text

                    setMessages(prev => [
                        ...prev.slice(0, -1),
                        { role: 'assistant', content: assistantMessage }
                    ])
                }
            } catch (error) {
                console.error('Error:', error)
                setMessages(prev => [
                    ...prev,
                    { role: 'assistant', content: "I'm sorry, I encountered an error. Please try again." }
                ])
            } finally {
                setIsLoading(false)
            }
        }
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            sendMessage()
        }
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-4 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                        {msg.role === 'assistant' && (
                            <Avatar className="w-8 h-8 flex-shrink-0">
                                <AvatarImage src="/placeholder-assistant.jpg" alt="Assistant" />
                                <AvatarFallback>AI</AvatarFallback>
                            </Avatar>
                        )}
                        <div className={`rounded-lg p-3 max-w-[75%] break-words ${msg.role === 'assistant' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                            }`}>
                            <p>{msg.content}</p>
                        </div>
                        {msg.role === 'user' && (
                            <Avatar className="w-8 h-8 flex-shrink-0">
                                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                                <AvatarFallback>US</AvatarFallback>
                            </Avatar>
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="border-t p-4 bg-background">
                <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex gap-2">
                    <Input
                        type="text"
                        placeholder="Type your message..."
                        className="flex-1"
                        value={message}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
                        disabled={isLoading}
                        onKeyPress={handleKeyPress}
                    />
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Sending...' : 'Send'}
                    </Button>
                </form>
            </div>
        </div>
    )
}

// 'use client'

// import { useState, useRef, useEffect } from 'react'
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"

// type MessageRole = 'assistant' | 'user'

// interface Message {
//     role: MessageRole
//     content: string
// }

// export function ChatArea() {
//     const [messages, setMessages] = useState<Message[]>([
//         { role: 'assistant', content: "Hi! I'm the Headstarter support assistant. How can I help you today?" },
//     ])
//     const [message, setMessage] = useState<string>('')
//     const scrollAreaRef = useRef<HTMLDivElement | null>(null)

//     const sendMessage = async (): Promise<void> => {
//         if (message.trim()) {
//             setMessages(prevMessages => [
//                 ...prevMessages,
//                 { role: 'user', content: message.trim() }
//             ])
//             setMessage('')
//             // Simulate assistant response
//             setTimeout(() => {
//                 setMessages(prevMessages => [
//                     ...prevMessages,
//                     { role: 'assistant', content: "Thank you for your message. How else can I assist you?" }
//                 ])
//             }, 1000)
//         }
//     }

//     useEffect(() => {
//         if (scrollAreaRef.current) {
//             const scrollContainer = scrollAreaRef.current.querySelector<HTMLDivElement>('[data-radix-scroll-area-viewport]');
//             if (scrollContainer) {
//                 scrollContainer.scrollTop = scrollContainer.scrollHeight;
//             }
//         }
//     }, [messages])

//     return (
//         <div className="flex flex-col h-full">
//             <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
//                 <div className="space-y-4">
//                     {messages.map((msg, index) => (
//                         <div key={index} className={`flex items-start gap-4 ${msg.role === 'user' ? 'justify-end' : ''}`}>
//                             {msg.role === 'assistant' && (
//                                 <Avatar className="w-8 h-8">
//                                     <AvatarImage src="/placeholder-assistant.jpg" alt="Assistant" />
//                                     <AvatarFallback>AI</AvatarFallback>
//                                 </Avatar>
//                             )}
//                             <div className={`rounded-lg p-3 max-w-[80%] ${msg.role === 'assistant' ? 'bg-primary text-primary-foreground' : 'bg-muted'
//                                 }`}>
//                                 <p>{msg.content}</p>
//                             </div>
//                             {msg.role === 'user' && (
//                                 <Avatar className="w-8 h-8">
//                                     <AvatarImage src="/placeholder-user.jpg" alt="User" />
//                                     <AvatarFallback>US</AvatarFallback>
//                                 </Avatar>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             </ScrollArea>
//             <div className="border-t p-4 bg-background">
//                 <div className="flex gap-2 max-w-4xl mx-auto">
//                     <Input
//                         type="text"
//                         placeholder="Type your message..."
//                         className="flex-1"
//                         value={message}
//                         onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
//                         onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && sendMessage()}
//                     />
//                     <Button onClick={sendMessage}>Send</Button>
//                 </div>
//             </div>
//         </div>
//     )
// }
