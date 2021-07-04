import { PitchDeckImage, StorageRepository } from "../domain/storage-repo"

export function getPitchDeckImageList(storageRepo: StorageRepository, pdCode: string): Promise<PitchDeckImage[]> {
  return storageRepo.getPitchDeckImageList(pdCode)
}
