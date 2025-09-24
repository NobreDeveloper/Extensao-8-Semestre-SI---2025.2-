/*
  Warnings:

  - You are about to drop the column `user_id` on the `produtor` table. All the data in the column will be lost.
  - You are about to drop the `post` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `produtor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `produtor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `produtor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."post" DROP CONSTRAINT "post_autor_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."produtor" DROP CONSTRAINT "produtor_user_id_fkey";

-- DropIndex
DROP INDEX "public"."produtor_user_id_key";

-- AlterTable
ALTER TABLE "public"."produtor" DROP COLUMN "user_id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "biografia" DROP NOT NULL,
ALTER COLUMN "contato_email" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."usuario" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "public"."post";

-- CreateTable
CREATE TABLE "public"."produto" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "descricao" TEXT NOT NULL,
    "foto_produto" VARCHAR(255) NOT NULL,
    "produtorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."postagem" (
    "id" SERIAL NOT NULL,
    "titulo" VARCHAR(255) NOT NULL,
    "conteudo" TEXT NOT NULL,
    "data_publicacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "autorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "postagem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "produtor_userId_key" ON "public"."produtor"("userId");

-- AddForeignKey
ALTER TABLE "public"."produtor" ADD CONSTRAINT "produtor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."produto" ADD CONSTRAINT "produto_produtorId_fkey" FOREIGN KEY ("produtorId") REFERENCES "public"."produtor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."postagem" ADD CONSTRAINT "postagem_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "public"."usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
