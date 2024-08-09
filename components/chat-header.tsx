"use client"

import { Companion, Message } from "@prisma/client"
import { Button } from "./ui/button"
import { ChevronLeft, Edit, MessageSquare, MoreVertical, Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { BotAvatar } from "./bot-avatar"
import { useUser } from "@clerk/nextjs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useToast } from "./ui/use-toast"
import axios from "axios"

interface ChatHeaderProps{
    companion : Companion & {
        messages: Message[]
        _count: {
            messages: number
        }
    }
};

export const ChatHeader = ({companion}: ChatHeaderProps) => {
    const router = useRouter()
    const { user } = useUser()
    const { toast } = useToast()

    const onDelete = async () => {
        try {
            await axios.delete(`/api/companion/${companion.id}`)

            toast({
                description: "Success."
            })

            router.refresh()
            router.push("/")

        } catch (error) {
            toast({
                description: "Something went wrong.",
                variant: "destructive"
            })
        }
    }

    return (
        <div className="flex w-full items-center justify-between border-b border-primary/10 pb-4">
            <div className="flex items-center gap-x-2">
                <Button onClick={() => router.back()} size={"icon"} variant={"ghost"}>
                    <ChevronLeft className="h-8 w-8"/>
                </Button>
                <BotAvatar src={companion.src}/>
                <div className="flex flex-col gap-y-1">
                    <div className="flex items-center gap-x-2">
                        <p className="font-bold">
                            {companion.name}
                        </p>
                        <div className="flex items-center text-sm text-muted-foreground">
                            <MessageSquare className="h-3 w-3 mr-1"/>
                            {companion._count.messages}
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Created by {companion.username}
                    </p>
                </div>
            </div>
            {user?.id === companion.userId && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="secondary">
                            <MoreVertical/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => router.push(`/companion/${companion.id}`)}>
                            <Edit className="h-3 w-3 mr-2"/>
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={onDelete}>
                            <Trash className="h-3 w-3 mr-2"/>
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    )
}