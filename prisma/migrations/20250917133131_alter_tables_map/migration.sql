/*
  Warnings:

  - You are about to drop the `Postagem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Produtores` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuarios` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Postagem" DROP CONSTRAINT "Postagem_autor_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Produtores" DROP CONSTRAINT "Produtores_user_id_fkey";

-- DropTable
DROP TABLE "public"."Postagem";

-- DropTable
DROP TABLE "public"."Produtores";

-- DropTable
DROP TABLE "public"."Usuarios";

-- CreateTable
CREATE TABLE "public"."usuarios" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "papel" "public"."Papel" NOT NULL DEFAULT 'PRODUTOR',

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."produtores" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "biografia" TEXT NOT NULL,
    "foto_perfil" VARCHAR(255) NOT NULL,
    "contato_whatsapp" VARCHAR(20) NOT NULL,
    "contato_email" VARCHAR(255) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "produtores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."posts" (
    "id" SERIAL NOT NULL,
    "titulo" VARCHAR(255) NOT NULL,
    "conteudo" TEXT NOT NULL,
    "data_publicacao" TIMESTAMP(3) NOT NULL,
    "autor_id" INTEGER NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "public"."usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "produtores_user_id_key" ON "public"."produtores"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "posts_autor_id_key" ON "public"."posts"("autor_id");

-- AddForeignKey
ALTER TABLE "public"."produtores" ADD CONSTRAINT "produtores_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."posts" ADD CONSTRAINT "posts_autor_id_fkey" FOREIGN KEY ("autor_id") REFERENCES "public"."usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
