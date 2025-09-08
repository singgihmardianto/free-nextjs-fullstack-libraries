import { BaseEntity, EntityTarget } from "typeorm";
import { getDataSource } from "../connection";

/**
 * Abstract Service
 * Base server component service, add basic CRUD method
 * @param EntitySchema entity
 * @return Service
 */
export type BaseService<T extends BaseEntity = BaseEntity> = {
  index: () => Promise<T[]>;
  create: () => void;
};

export default async function AbstractService<T extends BaseEntity>(
  entity: EntityTarget<T>
): Promise<BaseService<T>> {
  const ds = await getDataSource();
  const repo = ds.getRepository(entity);

  return {
    index: async () => {
      return (await repo.find()) as T[];
    },
    create: () => {},
  };
}
