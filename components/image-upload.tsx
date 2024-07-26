"use client"

import { useEffect, useState } from "react"
import { CldUploadButton } from "next-cloudinary"
import Image from "next/image"

interface ImageUploadProps{
    value: string,
    disabled?: boolean,
    onChange: (src: string) => void
}

export const ImageUpload = ({
    value,
    disabled,
    onChange,
}: ImageUploadProps ) => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted) return null

    return (
        <div className="space-y-4 w-full flex flex-col justify-center items-center">
            <CldUploadButton
            onSuccess={(result: any) => onChange(result.info.secure_url)}
            options={{maxFiles: 1}}
            uploadPreset="vvbtdvca"
            >
                <div className="
                flex
                flex-col
                space-y-2
                items-center
                justify-center
                p-4
                border-4
                border-dashed
                border-primary/10
                rounded-lg
                hover:opacity-75
                transition
                ">
                    <div className="relative h-40 w-40">
                        <Image
                        fill
                        sizes=""
                        alt="upload"
                        src={value || "/placeholder.svg"}
                        className="rounded-lg object-cover"
                        />
                    </div>
                </div>
            </CldUploadButton>
        </div>
    )
}