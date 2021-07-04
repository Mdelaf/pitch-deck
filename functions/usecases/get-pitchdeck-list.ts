import { PitchDeck, StorageRepository } from "../domain/storage-repo"

export function getPitchDeckList(storageRepo: StorageRepository): Promise<PitchDeck[]> {
  return storageRepo.getPitchDeckList()
}
