
'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { SmilePlus, Smile, Frown, BadgeMinus } from "lucide-react"

interface FeedbackRatingProps {
    onSubmit: (rating: number, feedback: string) => void
    onClose: () => void
}

export function FeedbackRating({ onSubmit, onClose }: FeedbackRatingProps) {
    const [rating, setRating] = useState<number | null>(null)
    const [feedback, setFeedback] = useState("")

    const handleSubmit = () => {
        if (rating === null) return
        onSubmit(rating, feedback)
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">Rate your experience</h2>
                <div className="flex justify-between mb-4">
                    {[
                        { icon: SmilePlus, value: 4, color: "green" },
                        { icon: Smile, value: 3, color: "blue" },
                        { icon: Frown, value: 2, color: "orange" },
                        { icon: BadgeMinus, value: 1, color: "red" },
                    ].map((item) => (
                        <Button
                            key={item.value}
                            variant="ghost"
                            size="icon"
                            onClick={() => setRating(item.value)}
                            className={`${rating === item.value ? 'bg-gray-200' : ''}`}
                        >
                            <item.icon size={25} color={item.color} />
                        </Button>
                    ))}
                </div>
                <Textarea
                    placeholder="Your feedback (optional)"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="mb-4"
                />
                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSubmit} disabled={rating === null}>Submit</Button>
                </div>
            </div>
        </div>
    )
}