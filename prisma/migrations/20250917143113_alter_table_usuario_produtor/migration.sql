/*
  Warnings:

  - You are about to drop the `posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `produtores` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuarios` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."posts" DROP CONSTRAINT "posts_autor_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."produtores" DROP CONSTRAINT "produtores_user_id_fkey";

-- DropTable
DROP TABLE "public"."posts";

-- DropTable
DROP TABLE "public"."produtores";

-- DropTable
DROP TABLE "public"."usuarios";

-- CreateTable
CREATE TABLE "public"."usuario" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "papel" "public"."Papel" NOT NULL DEFAULT 'PRODUTOR',

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."produtor" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "biografia" TEXT NOT NULL,
    "foto_perfil" VARCHAR(255) NOT NULL,
    "contato_whatsapp" VARCHAR(20) NOT NULL,
    "contato_email" VARCHAR(255) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "produtor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."post" (
    "id" SERIAL NOT NULL,
    "titulo" VARCHAR(255) NOT NULL,
    "conteudo" TEXT NOT NULL,
    "data_publicacao" TIMESTAMP(3) NOT NULL,
    "autor_id" INTEGER NOT NULL,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "public"."usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "produtor_user_id_key" ON "public"."produtor"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "post_autor_id_key" ON "public"."post"("autor_id");

-- AddForeignKey
ALTER TABLE "public"."produtor" ADD CONSTRAINT "produtor_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."post" ADD CONSTRAINT "post_autor_id_fkey" FOREIGN KEY ("autor_id") REFERENCES "public"."usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
