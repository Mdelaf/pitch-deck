import { PitchDeck, StorageRepository } from "../repositories/storage-repo"

export function getPitchDeckList(storageRepo: StorageRepository): Promise<PitchDeck[]> {
  // TODO: improve error handling
  return storageRepo.getPitchDeckList()
}
