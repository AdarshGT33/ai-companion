"use client"

import axios from "axios"
import * as z from "zod"
import { Wand2 } from "lucide-react"
import { useForm } from "react-hook-form"

import { Category, Companion } from "@prisma/client"

import { zodResolver } from "@hookform/resolvers/zod"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { ImageUpload } from "@/components/image-upload"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Toast } from "@/components/ui/toast"
import { useRouter } from "next/navigation"



interface CompanionFormProps{
    initialData: Companion | null,
    categories: Category[],
}

const PREAMBLE = `Hi! you are Narendra Damodar Das Modi. Narendra Modi, the 14th Prime Minister of India, has been a transformative leader whose dynamic vision and decisive governance have significantly shaped the nation's trajectory. Born on September 17, 1950, in Vadnagar, Gujarat, Modi's journey from a humble background to the pinnacle of political power exemplifies resilience and determination. His tenure as Chief Minister of Gujarat from 2001 to 2014 was marked by rapid economic growth and development, earning him national prominence.

Since assuming the office of Prime Minister in May 2014, Modi has spearheaded numerous initiatives aimed at economic reform, digital transformation, and social welfare. His flagship programs, such as "Make in India," "Digital India," and "Swachh Bharat Abhiyan," have garnered global attention and contributed to India's burgeoning status on the world stage. Modi's leadership is characterized by a forward-looking approach, aiming to position India as a global powerhouse while fostering inclusive growth and development for all its citizens.`

const  SEED_CHAT = `Human: Hi Modi ji! How's your day's been?
Modi Ji: Busy as always, been shuffling among international states to make India a powerful ally and economy. How are you?

Human: Just a regular day for me. How's the progress with the "Atmanirbhar Bharat" mission?

Modi Ji: In our third tenure, we are fully focused on developing and taking every state of India in this transformational journey. In the light of this mission, in our new budget we have allocated special funds to Bihar towards its infrastructural development.
Also we have successfully uplifted the healthcare access for poor which helps them save approx 50K ruppess on medical expenses.
We have also asked the youth of India for thier support by acknowledging the social media creators that impacts positively to this country and society overall. This award show also recognise that being a social media influencer is not a bad thing or a taboo but a legitemate carrer to pursue.
With increasing educational reforms and constant improvement in the syllabus, we are determined to give the children of this country a bright future which makes them the strong citizen this country needs and will need.

Human: I am fascinated to see this unfold. An ambitious leader like yourself with such aspirations will surely make India a country that will make a positive impact on the world with its culture and heritage as its corner stone for development alongside with technological reforms and infrastructural advancements.
It's always great to see what you are doing and have done on the global scale and the intention with which you handle and cater
the international disputes is phenomenal.`

const formSchema = z.object({
    name: z.string().min(1,{
        message: "Name is required."
    }),
    description: z.string().min(1,{
        message: "Description is required."
    }),
    instruction: z.string().min(200,{
        message: "Instruction is required."
    }),
    seed: z.string().min(200,{
        message: "Seed is required."
    }),
    src: z.string().min(1,{
        message: "Image is required."
    }),
    categoryId: z.string().min(1,{
        message: "Category is required."
    }),
})


export const CompanionForm = ({initialData, categories}: CompanionFormProps) => {
    const router = useRouter()
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            description: "",
            instruction: "",
            seed: "",
            src: "",
            categoryId: undefined,
        },
    })

    const isLoading = form.formState.isSubmitting

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if (initialData){
                await axios.patch(`/api/companion/${initialData.id}`, values)
            } else{
                await axios.post("/api/companion", values)
            }
            toast({
                description: "Success!"
            })

            router.refresh()
            router.push("/")
            
        } catch (error) {
            toast({
                variant: "destructive",
                description: "Something went wrong"
            })
        }
    }

    return (
        <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-10">
                    <div className="w-full space-y-2">
                        <div>
                            <h3 className="text-lg font-medium">General Information</h3>
                            <p className="text-sm text-muted-foreground">General information about your companion</p>
                        </div>
                        <Separator className="bg-primary/10"/>
                    </div>
                    <FormField
                    name="src"
                    render={({field}) => (
                        <FormItem className="flex flex-col items-center justify-center space-y-4">
                            <FormControl>
                                <ImageUpload
                                disabled={isLoading}
                                onChange={field.onChange}
                                value={field.value}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                        name="name"
                        control={form.control}
                        render={( {field} ) => (
                            <FormItem className="col-span-2 md:col-span-1">
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                    disabled={isLoading}
                                    placeholder="Modi Ji"
                                    {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is how the name of your AI compnaion will look like
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                        <FormField
                        name="description"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="col-span-2 md:col-span-1">
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input
                                    disabled={isLoading}
                                    placeholder="Leader of World's Largest Democracy"
                                    {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    short description of your AI companion
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                        <FormField
                        name="categoryId"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select
                                disabled={isLoading}
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="bg-background">
                                            <SelectValue
                                            defaultValue={field.value}
                                            placeholder="Select a Category"
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem
                                            key={category.id}
                                            value={category.id}
                                            >
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    Select a category for your AI
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                    </div>
                    <div className="space-y-2 w-full">
                        <div>
                            <h3 className="text-lg font-medium">Configuration</h3>
                            <p className="text-sm text-muted-foreground">Detailed Instructions for AI Behaviour</p>
                        </div>
                        <Separator className="bg-primary/10"/>
                    </div>
                    <FormField
                        name="instruction"
                        control={form.control}
                        render={( {field} ) => (
                            <FormItem className="col-span-2 md:col-span-1">
                                <FormLabel>Instructions</FormLabel>
                                <FormControl>
                                    <Textarea
                                    className="bg-background resize-none"
                                    rows={7}
                                    disabled={isLoading}
                                    placeholder= {PREAMBLE}
                                    {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Give your AI companion a backstory
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                    <FormField
                        name="seed"
                        control={form.control}
                        render={( {field} ) => (
                            <FormItem className="col-span-2 md:col-span-1">
                                <FormLabel>Example Conversation</FormLabel>
                                <FormControl>
                                    <Textarea
                                    className="bg-background resize-none"
                                    rows={7}
                                    disabled={isLoading}
                                    placeholder= {SEED_CHAT}
                                    {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Give your AI companion a backstory
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <div className="w-full flex justify-center">
                        <Button size={"lg"} disabled={isLoading}>
                            {initialData ? "Edit Your Comapnion" : "Create New Comapanion"}
                            <Wand2 className="w-4 h-4 ml-2"/>
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}