import {MigrationInterface, QueryRunner} from "typeorm";

export class MigrationFile1659183482083 implements MigrationInterface {
    name = 'MigrationFile1659183482083'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ent_user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" bigint NOT NULL, "updatedAt" bigint NOT NULL, "version" integer NOT NULL, CONSTRAINT "PK_31554b950f0d538a9f15e10422e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ent_artist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL, "favouritesId" uuid, CONSTRAINT "PK_90fc3e41514182012ea8bacc407" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ent_track" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "artistId" character varying, "albumId" character varying, "duration" integer NOT NULL, "favouritesId" uuid, CONSTRAINT "PK_c81d0507645497490d5675cafdf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ent_favourites" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_bfa4f31975b4ebae7ecf7b69d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ent_album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" character varying, "favouritesId" uuid, CONSTRAINT "PK_2adab3480530d5b2edfa25c1e59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ent_artist" ADD CONSTRAINT "FK_602354de7fb6c3cc53601cb8c53" FOREIGN KEY ("favouritesId") REFERENCES "ent_favourites"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ent_track" ADD CONSTRAINT "FK_347b445bbfbfe7386baa609e0eb" FOREIGN KEY ("favouritesId") REFERENCES "ent_favourites"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ent_album" ADD CONSTRAINT "FK_0da716280951b86c43900ccc5cc" FOREIGN KEY ("favouritesId") REFERENCES "ent_favourites"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ent_album" DROP CONSTRAINT "FK_0da716280951b86c43900ccc5cc"`);
        await queryRunner.query(`ALTER TABLE "ent_track" DROP CONSTRAINT "FK_347b445bbfbfe7386baa609e0eb"`);
        await queryRunner.query(`ALTER TABLE "ent_artist" DROP CONSTRAINT "FK_602354de7fb6c3cc53601cb8c53"`);
        await queryRunner.query(`DROP TABLE "ent_album"`);
        await queryRunner.query(`DROP TABLE "ent_favourites"`);
        await queryRunner.query(`DROP TABLE "ent_track"`);
        await queryRunner.query(`DROP TABLE "ent_artist"`);
        await queryRunner.query(`DROP TABLE "ent_user"`);
    }

}
