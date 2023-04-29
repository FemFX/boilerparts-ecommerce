import { Connection } from 'typeorm';
import { faker } from '@faker-js/faker';

const boilerManufacturers = [
  'Ariston',
  'Chaffoteaux&Maury',
  'Baxi',
  'Bongioanni',
  'Saunier Duval',
  'Buderus',
  'Strategist',
  'Henry',
  'Northwest',
];
const partsManufacturers = [
  'Azure',
  'Gloves',
  'Cambridgeshire',
  'Salmon',
  'Montana',
  'Sensor',
  'Lesly',
  'Radian',
  'Gasoline',
  'Croatia',
];

// export class ProductSeeder {
//   public static async seed(connection: Connection): Promise<void> {
//     const productRepository = connection.getRepository(Product);

//     for (let i = 0; i < 100; i++) {
//       // Создание объекта Product
//       const product = {
//         boiler_manufacturer: boilerManufacturers[
//           Math.floor(Math.random() * boilerManufacturers.length)
//         ] as string,
//         parts_manufacturer: partsManufacturers[
//           Math.floor(Math.random() * partsManufacturers.length)
//         ] as string,
//         price: +faker.random.numeric(4),
//         name: faker.lorem.sentence(2),
//         description: faker.lorem.sentence(10),
//         images: JSON.stringify(
//           [...Array(7)].map(
//             () =>
//               `${faker.image.technics()}?random=${faker.random.numeric(30)}`,
//           ),
//         ),
//         vendor_code: faker.internet.password(),
//         in_stock: +faker.random.numeric(1),
//         bestseller: faker.datatype.boolean(),
//         new: faker.datatype.boolean(),
//         popularity: +faker.random.numeric(3),
//         compatibility: +faker.lorem.sentence(7),
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       };

//       // Сохранение объектов в базу данных
//       await productRepository.save(product);
//     }
//   }
// }
import { Factory, Seeder } from 'typeorm-seeding';
import { Product } from 'src/products/products.entity';

export default class CreateProducts implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    for (let i = 0; i < 100; i++) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(Product)
        .values({
          boiler_manufacturer: boilerManufacturers[
            Math.floor(Math.random() * boilerManufacturers.length)
          ] as string,
          parts_manufacturer: partsManufacturers[
            Math.floor(Math.random() * partsManufacturers.length)
          ] as string,
          price: +faker.random.numeric(4),
          name: faker.lorem.sentence(2),
          description: faker.lorem.sentence(10),
          images: JSON.stringify(
            [...Array(7)].map(
              () =>
                `${faker.image.technics()}?random=${faker.random.numeric(30)}`,
            ),
          ),
          vendor_code: faker.internet.password(),
          in_stock: +faker.random.numeric(1),
          bestseller: faker.datatype.boolean(),
          new: faker.datatype.boolean(),
          popularity: +faker.random.numeric(3),
          compatibility: faker.lorem.sentence(7),
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .execute();
    }
  }
}
