import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SmilePlus, Smile, Frown, BadgeMinus } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const FeedbackRating = () => {
    const [rating, setRating] = useState<number | null>(0);
    const [feedbackActive, setFeedbackActive] = useState(false);
    const node = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (feedbackActive === true) {
            const handleClickOutside = (e: MouseEvent) => {
                if (node.current && !node.current.contains(e.target as Node)) {
                    setFeedbackActive(false);
                    setRating(null);
                }
            };
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, [feedbackActive]);

    return (
        <div
            ref={node}
            className={`flex gap-4 bg-zinc-950 px-6 py-3 rounded-md border-b border-b-white border-opacity-10 items-start transition-all duration-[0.3s] ease-in-out overflow-hidden flex-col max-[315px]:scale-95 ${feedbackActive ? "max-[374px]:h-[16rem] h-[13rem]" : "h-[3.5rem]"
                } ${feedbackActive ? "w-[19rem] max-[374px]:w-[15rem]" : "w-[12.3rem]"
                } ${feedbackActive ? "max-[374px]:justify-center" : "justify-end"}`}
        >
            <div className="w-full">
                <Textarea
                    className="w-full h-[8rem] p-2 bg-zinc-950 rounded-md border border-white border-opacity-10 resize-none -mb-1 text-white focus:outline-none focus:border-opacity-50 text-sm"
                    placeholder="Your feedback..."
                />
            </div>
            <div
                className={`flex justify-between w-full ${feedbackActive && "max-[374px]:flex-col"
                    } ${feedbackActive ? "gap-4" : "gap-8"}`}
            >
                <div
                    className={`flex items-center ${feedbackActive && "justify-center"
                        } gap-4`}
                >
                    {[
                        { icon: SmilePlus, value: 4, color: "lightgreen" },
                        { icon: Smile, value: 3, color: "white" },
                        { icon: Frown, value: 2, color: "orange" },
                        { icon: BadgeMinus, value: 1, color: "red" },
                    ].map((item) => (
                        <Button
                            key={item.value}
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                                setRating(item.value);
                                setFeedbackActive(true);
                            }}
                            className="active:scale-[.95] hover:scale-105 transition-all duration-400"
                        >
                            <item.icon
                                size={25}
                                className={`${rating === item.value ? "opacity-100" : "opacity-50"}`}
                                color={rating === item.value ? item.color : "white"}
                            />
                        </Button>
                    ))}
                </div>
                <Button className="text-sm px-2 py-1 max-[374px]:w-full max-[374px]:py-2">
                    Send
                </Button>
            </div>
        </div>
    );
};

export default FeedbackRating;