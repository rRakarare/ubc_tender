/*
  Warnings:

  - Added the required column `color` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ColorSchema" AS ENUM ('whiteAlpha', 'blackAlpha', 'gray', 'red', 'orange', 'yellow', 'green', 'teal', 'blue', 'cyan', 'purple', 'pink');

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "color" "ColorSchema" NOT NULL;
