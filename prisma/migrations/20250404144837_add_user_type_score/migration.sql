-- CreateTable
CREATE TABLE "user_type_scores" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "cleanliness" INTEGER NOT NULL,
    "noise" INTEGER NOT NULL,
    "sharedItems" INTEGER NOT NULL,
    "communication" INTEGER NOT NULL,
    "sleepPattern" INTEGER NOT NULL,
    "sensitivity" INTEGER NOT NULL,
    "patience" INTEGER NOT NULL,
    "attention" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_type_scores_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_type_scores_userId_key" ON "user_type_scores"("userId");

-- AddForeignKey
ALTER TABLE "user_type_scores" ADD CONSTRAINT "user_type_scores_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
