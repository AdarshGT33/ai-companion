"use client"

import { ChatRequestOptions } from "ai"
import { ChangeEvent, FormEvent } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { SendHorizonal } from "lucide-react"

interface ChatFormProps{
    input: string
    handleInputChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void
    onSubmit: (e: FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions | undefined) => void
    isLoading: boolean
}


export const ChatForm = ({
    input,
    handleInputChange,
    onSubmit,
    isLoading
}: ChatFormProps) => {
    return (
        <form className="border-t border-primary/10 py-4 flex items-center gap-x-2" onSubmit={onSubmit}>
            <Input
            disabled={isLoading}
            value={input}
            onChange={handleInputChange}
            placeholder="Start typing..."
            className="rounded-lg bg-primary/10"
            />
            <Button variant="ghost" disabled={isLoading}>
                <SendHorizonal className="h-5 w-5" />
            </Button>
        </form>
    )
}