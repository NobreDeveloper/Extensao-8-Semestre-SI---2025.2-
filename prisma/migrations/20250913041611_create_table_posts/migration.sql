/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Produtores` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "public"."Postagem" (
    "id" SERIAL NOT NULL,
    "titulo" VARCHAR(255) NOT NULL,
    "conteudo" TEXT NOT NULL,
    "data_publicacao" TIMESTAMP(3) NOT NULL,
    "autor_id" INTEGER NOT NULL,

    CONSTRAINT "Postagem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Postagem_autor_id_key" ON "public"."Postagem"("autor_id");

-- CreateIndex
CREATE UNIQUE INDEX "Produtores_user_id_key" ON "public"."Produtores"("user_id");

-- AddForeignKey
ALTER TABLE "public"."Produtores" ADD CONSTRAINT "Produtores_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Postagem" ADD CONSTRAINT "Postagem_autor_id_fkey" FOREIGN KEY ("autor_id") REFERENCES "public"."Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
