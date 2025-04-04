-- CreateTable
CREATE TABLE "user_patterns" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "sleepTime" TEXT NOT NULL,
    "wakeTime" TEXT NOT NULL,
    "isSmoker" BOOLEAN NOT NULL,
    "isDrinker" BOOLEAN NOT NULL,
    "cleaningCycle" INTEGER NOT NULL,
    "noiseSensitivity" INTEGER NOT NULL,
    "allowVisitors" BOOLEAN NOT NULL,
    "studyTime" INTEGER NOT NULL,
    "preferredTemp" DOUBLE PRECISION NOT NULL,
    "personality" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_patterns_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_patterns_userId_key" ON "user_patterns"("userId");

-- AddForeignKey
ALTER TABLE "user_patterns" ADD CONSTRAINT "user_patterns_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
