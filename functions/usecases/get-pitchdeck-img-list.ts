import { PitchDeckImage, StorageRepository } from "../repositories/storage-repo"

export function getPitchDeckImageList(storageRepo: StorageRepository, pdCode: string): Promise<PitchDeckImage[]> {
  // TODO: improve error handling
  return storageRepo.getPitchDeckImageList(pdCode)
}
