import { atom } from "jotai"

export interface Task {
  id: string
  title: string
  done: boolean
  createdAt: string
}

export const tasksAtom = atom<Task[]>([])
export const isLoadingAtom = atom<boolean>(true)
export const errorAtom = atom<string | null>(null)