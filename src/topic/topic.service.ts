import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export async function getTopics() {

    const topics = await prisma.topics.findMany({
        orderBy: {
            topic: "asc",
        },
    });

    return topics;
}