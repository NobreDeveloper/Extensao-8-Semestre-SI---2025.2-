-- CreateEnum
CREATE TYPE "public"."Papel" AS ENUM ('ADMIN', 'PRODUTOR');

-- CreateTable
CREATE TABLE "public"."usuario" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "papel" "public"."Papel" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."produtor" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "biografia" TEXT,
    "foto_perfil" VARCHAR(255) NOT NULL,
    "contato_whatsapp" VARCHAR(20) NOT NULL,
    "contato_email" VARCHAR(255),
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "produtor_pkey" PRIMARY KEY ("id")
);

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
    "banner" VARCHAR(255) NOT NULL,
    "autorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "postagem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "public"."usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "produtor_userId_key" ON "public"."produtor"("userId");

-- AddForeignKey
ALTER TABLE "public"."produtor" ADD CONSTRAINT "produtor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."produto" ADD CONSTRAINT "produto_produtorId_fkey" FOREIGN KEY ("produtorId") REFERENCES "public"."produtor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."postagem" ADD CONSTRAINT "postagem_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "public"."usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
