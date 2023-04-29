import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createProducts1682399672851 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'product',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'boiler_manufacturer',
            type: 'varchar',
          },
          {
            name: 'parts_manufacturer',
            type: 'varchar',
          },
          {
            name: 'vendor_name',
            type: 'varchar',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'images',
            type: 'text',
          },
          {
            name: 'in_stock',
            type: 'integer',
            default: 0,
          },
          {
            name: 'bestsellers',
            type: 'boolean',
            default: false,
          },
          {
            name: 'new',
            type: 'boolean',
            default: false,
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 10,
            scale: 2,
            default: 0,
          },
          {
            name: 'popularity',
            type: 'integer',
          },
          {
            name: 'compatibility',
            type: 'integer',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('product');
  }
}
