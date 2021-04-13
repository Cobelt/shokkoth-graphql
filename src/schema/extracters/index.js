import { adminAccess } from '../utils/auth';
import { extractBreeds } from '../resolvers/extracters';

export default function useExtracters(schemaComposer, { BreedsTC, SetsTC, EquipmentsTC, StuffsTC, CharactersTC, UsersTC }) {
  
  BreedsTC.addResolver({
    kind: 'mutation',
    name: 'extract',
    type: [BreedsTC],
    resolve: extractBreeds,
  })

  schemaComposer.Mutation.addFields({
    ...adminAccess({
      extractBreeds: BreedsTC.get('$extract'),
    }),
  });
}
