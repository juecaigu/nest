import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';

const factoryPerson = {
  provide: 'person_factory',
  useFactory: (
    personMock: { name: string; age: number },
    personService: PersonService,
  ) => {
    console.log('per', personService);
    return {
      name: personMock.name,
      age: personMock.age,
      personService: personService,
    };
  },
  inject: ['person_mock', PersonService],
};

@Module({
  controllers: [PersonController],
  providers: [
    PersonService,
    {
      provide: 'person_mock',
      useValue: {
        name: 'aaa',
        age: 18,
      },
    },
    factoryPerson,
  ],
  exports: [PersonService],
})
export class PersonModule {}
