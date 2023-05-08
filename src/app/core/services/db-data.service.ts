import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class DbDataService implements InMemoryDbService {
  createDb() {
    const departments = [
      {
        id: 1,
        name: 'Marketing',
        users: [1, 2],
      },
      {
        id: 2,
        name: 'Sales',
        users: [3, 4],
      },
    ];

    const users = [
      {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@company.com',
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'janesmith@company.com',
      },
      {
        id: 3,
        name: 'Bob Johnson',
        email: 'bobjohnson@company.com',
      },
      {
        id: 4,
        name: 'Alice Brown',
        email: 'alicebrown@company.com',
      },
    ];

    return { departments, users };
  }
}
