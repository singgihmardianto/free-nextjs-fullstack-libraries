# NextJS Boilerplate Project

## Dependencies

1. Node v20
1. [TailAdmin v2.0.2](https://github.com/TailAdmin/free-nextjs-admin-dashboard)

## Contributors

1. [Singgih Soephomo](singgihmardianto@gmail.com)

## How to

### Using Server Components with Libraries

Server Components in Next.js allow you to run code on the server, reducing the JavaScript sent to the client. This project includes a library structure that leverages server components with TypeORM for database operations.

#### Using AbstractService with Entities

The project provides an AbstractService pattern that makes it easy to create new services for your entities. Here's how to use it:

1. **Create a new Entity**

```typescript
// src/libraries/_entites/your-entity.ts
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("your_table_name")
export class YourEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  // Add more columns as needed
}
```

2. **Create a Service for your Entity**

```typescript
// src/libraries/_services/YourEntityService.ts
import { YourEntity } from "@/libraries/_entites/your-entity";
import AbstractService from "./AbstractService";

// AbstractService is base CRUD server component
// Help you to fasten the development
export default async function YourEntityService() {
  const service = await AbstractService<YourEntity>(YourEntity);
  return service;
}
```

3. **Use the Service in a Server Component**

```typescript
// src/app/your-page/page.tsx
import { YourEntity } from "@/libraries/_entites/your-entity";
import YourEntityService from "@/libraries/_services/YourEntityService";

export default async function YourPage() {
  // Get the service and call the index method
  const items: YourEntity[] = await (await YourEntityService()).index();

  return (
    <div>
      <h1>Your Entities</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

#### Extending AbstractService

If you need to add custom methods to your service, you can extend the BaseService type:

```typescript
// src/libraries/_services/YourCustomService.ts
import { YourEntity } from "@/libraries/_entites/your-entity";
import AbstractService, { BaseService } from "./AbstractService";

// Extend the BaseService type with custom methods
interface YourCustomService extends BaseService<YourEntity> {
  findByName: (name: string) => Promise<YourEntity | null>;
}

export default async function createYourCustomService(): Promise<YourCustomService> {
  const baseService = await AbstractService<YourEntity>(YourEntity);
  const ds = await getDataSource();
  const repo = ds.getRepository(YourEntity);

  // Return the extended service with custom methods
  return {
    ...baseService,
    findByName: async (name: string) => {
      return await repo.findOne({ where: { name } });
    },
  };
}
```

This pattern allows you to easily create type-safe services for your entities while leveraging the power of server components in Next.js.
