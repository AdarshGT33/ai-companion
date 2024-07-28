import prismadb from "@/lib/prismadb"
import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function PATCH(
    req: Request,
    { params } : { params: { companionId : string } }
    ){
    try {
        const body = await req.json()
        const user = await currentUser()
        const{ src, name, description, instruction, categoryId, seed } = body

        if( !params.companionId){
            return new NextResponse("CompanionId is required", { status: 400 })
        }

        if( !user || !user.id || !user.firstName){
            return new NextResponse("Unauthorized Access Denied", { status: 401 })
        }

        if( !src || !name || !description || !instruction || !categoryId || !seed ){
            return new NextResponse("Required Fields Missing", { status: 400 })
        }

        const companion = await prismadb.companion.update({
            where:{
                id: params.companionId
            },
            data: {
                categoryId,
                userId : user.id,
                username : user.firstName,
                src,
                name,
                description,
                instruction,
                seed,
            }
        })

        return NextResponse.json(companion)

    } catch (error) {
        console.log("[COMPANION_PATCH]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}