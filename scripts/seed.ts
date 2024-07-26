const { PrismaClient } = require("@prisma/client")

const db = new PrismaClient()

async function main(){
    try {
        await db.category.createMany({
            data: [
                {name: "Entrepenuers"},
                {name: "Influencers"},
                {name: "Movie & TV"},
                {name: "Musicians"},
                {name: "Flora & Fauna"},
                {name: "Dinosaurs"},
                {name: "Thinkers"},
                {name: "Scientists"},
                {name: "Sport Personlaities"},
                {name: "Popular World Leaders"},
            ]
        })
    } catch (error) {
        console.error("Error seeding values into categories", error)
    } finally{
        await db.$disconnect();
    }
}

main()