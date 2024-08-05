import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function ChatArea() {
    return (
        <Card className="h-full">
            <CardContent className="flex flex-col h-[500px]">
                <ScrollArea className="flex-1 p-4 space-y-4">
                    <div className="flex items-start gap-4">
                        <Avatar className="w-8 h-8">
                            <AvatarImage src="/placeholder-user.jpg" alt="User" />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                            <p>Hi, I have a question about your product. Can you help me?</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 justify-end">
                        <div className="bg-primary rounded-lg p-3 max-w-[80%] text-primary-foreground">
                            <p>Sure, what would you like to know?</p>
                        </div>
                        <Avatar className="w-8 h-8">
                            <AvatarImage src="/placeholder-user.jpg" alt="Agent" />
                            <AvatarFallback>AG</AvatarFallback>
                        </Avatar>
                    </div>
                    {/* Add more messages as needed */}
                </ScrollArea>
                <div className="border-t p-4 flex gap-2">
                    <Input type="text" placeholder="Type your message..." />
                    <Button>Send</Button>
                </div>
            </CardContent>
        </Card>
    )
}