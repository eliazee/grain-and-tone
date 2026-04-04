import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './firebase'
import type { Recipe, RecipeFormValues } from './types'

const RECIPES = 'recipes'

export async function addRecipe(userId: string, values: RecipeFormValues): Promise<string> {
  const ref = await addDoc(collection(db, RECIPES), {
    ...values,
    userId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return ref.id
}

export async function updateRecipe(id: string, values: Partial<RecipeFormValues>): Promise<void> {
  await updateDoc(doc(db, RECIPES, id), {
    ...values,
    updatedAt: serverTimestamp(),
  })
}

export async function deleteRecipe(id: string): Promise<void> {
  await deleteDoc(doc(db, RECIPES, id))
}

export async function getRecipe(id: string): Promise<Recipe | null> {
  const snap = await getDoc(doc(db, RECIPES, id))
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() } as Recipe
}

export async function toggleFavorite(id: string, current: boolean): Promise<void> {
  await updateDoc(doc(db, RECIPES, id), {
    is_favorite: !current,
    updatedAt: serverTimestamp(),
  })
}

export function recipesQuery(userId: string) {
  return query(
    collection(db, RECIPES),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  )
}
