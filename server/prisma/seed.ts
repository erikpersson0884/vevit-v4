import { PrismaClient } from "@prisma/client";
import ACHIEVEMENTS from "../src/achievements/achievements.ts";

const prisma = new PrismaClient();

async function seedAchievements() {
    for (const key in ACHIEVEMENTS) {
        const achievement = ACHIEVEMENTS[key as keyof typeof ACHIEVEMENTS];

        await prisma.achievement.upsert({
            where: { id: achievement.id },
            update: {
                name: achievement.name,
                description: achievement.description,
            },
            create: {
                id: achievement.id,
                name: achievement.name,
                description: achievement.description,
            },
        });
    }

    console.log("Achievements seeded successfully");
}

async function main() {
    await seedAchievements();
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
