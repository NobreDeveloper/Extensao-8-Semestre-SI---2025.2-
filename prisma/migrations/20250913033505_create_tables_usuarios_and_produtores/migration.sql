-- CreateEnum
CREATE TYPE "public"."Papel" AS ENUM ('ADMIN', 'PRODUTOR');

-- CreateTable
CREATE TABLE "public"."Usuarios" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "papel" "public"."Papel" NOT NULL DEFAULT 'PRODUTOR',

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Produtores" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "biografia" TEXT NOT NULL,
    "foto_perfil" VARCHAR(255) NOT NULL,
    "contato_whatsapp" VARCHAR(20) NOT NULL,
    "contato_email" VARCHAR(255) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Produtores_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_email_key" ON "public"."Usuarios"("email");
