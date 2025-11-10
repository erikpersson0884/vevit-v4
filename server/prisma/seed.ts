import { PrismaClient } from "@prisma/client";
import achievements from "../src/achievements/achievements.json" with { type: "json" };
import { Achievement } from "@prisma/client";

const prisma = new PrismaClient();

function isAchievement(obj: any): obj is Achievement {
  return (
    typeof obj.id === "string" &&
    typeof obj.name === "string" &&
    typeof obj.description === "string" &&
    (obj.type === "wins" || obj.type === "games") &&
    typeof obj.threshold === "number"
  );
}


async function seedAchievements() {
    for (const achievement in achievements) {

        if (!isAchievement(achievement)) {
            console.error("Invalid achievement format:", achievement);
            continue;
        }

        await prisma.achievement.upsert({
            where: { id: achievement.id },
            update: {
                name: achievement.name,
                description: achievement.description,
            },
            create: {
                id: achievement.id,
                key: achievement.id,
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
