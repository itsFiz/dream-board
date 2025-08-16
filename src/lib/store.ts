import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Dream {
  id: string
  title: string
  description?: string
  categoryId: string
  estimatedCost: number
  deadlineYear: number
  deadlineMonth: number
  priorityLevel: 'low' | 'medium' | 'high'
  emoji?: string
  timelineYear: number
  timelineMonth: number
  status: 'planning' | 'in_progress' | 'completed' | 'on_hold'
  dreamboardId: string
}

export interface DreamBoard {
  id: string
  title: string
  description?: string
  isPublic: boolean
  userId: string
  dreams: Dream[]
  incomeStreams: IncomeStream[]
}

export interface IncomeStream {
  id: string
  name: string
  amount: number
  frequency: 'weekly' | 'monthly' | 'yearly'
  startDate: Date
  growthPercentage: number
  isRecurring: boolean
  category?: string
  dreamboardId: string
}

export interface Category {
  id: string
  name: string
  color: string
  icon: string
}

interface DreamBoardStore {
  dreamboards: DreamBoard[]
  currentDreamboard: DreamBoard | null
  categories: Category[]
  isLoading: boolean
  
  // Actions
  setDreamboards: (dreamboards: DreamBoard[]) => void
  setCurrentDreamboard: (dreamboard: DreamBoard | null) => void
  addDreamboard: (dreamboard: DreamBoard) => void
  updateDreamboard: (id: string, updates: Partial<DreamBoard>) => void
  deleteDreamboard: (id: string) => void
  
  addDream: (dream: Dream) => void
  updateDream: (id: string, updates: Partial<Dream>) => void
  deleteDream: (id: string) => void
  
  addIncomeStream: (incomeStream: IncomeStream) => void
  updateIncomeStream: (id: string, updates: Partial<IncomeStream>) => void
  deleteIncomeStream: (id: string) => void
  
  setCategories: (categories: Category[]) => void
  setLoading: (loading: boolean) => void
}

export const useDreamBoardStore = create<DreamBoardStore>()(
  persist(
    (set) => ({
      dreamboards: [],
      currentDreamboard: null,
      categories: [],
      isLoading: false,
      
      setDreamboards: (dreamboards) => set({ dreamboards }),
      setCurrentDreamboard: (dreamboard) => set({ currentDreamboard: dreamboard }),
      
      addDreamboard: (dreamboard) => 
        set((state) => ({ 
          dreamboards: [...state.dreamboards, dreamboard] 
        })),
      
      updateDreamboard: (id, updates) =>
        set((state) => ({
          dreamboards: state.dreamboards.map(db => 
            db.id === id ? { ...db, ...updates } : db
          ),
          currentDreamboard: state.currentDreamboard?.id === id 
            ? { ...state.currentDreamboard, ...updates }
            : state.currentDreamboard
        })),
      
      deleteDreamboard: (id) =>
        set((state) => ({
          dreamboards: state.dreamboards.filter(db => db.id !== id),
          currentDreamboard: state.currentDreamboard?.id === id 
            ? null 
            : state.currentDreamboard
        })),
      
      addDream: (dream) =>
        set((state) => ({
          dreamboards: state.dreamboards.map(db =>
            db.id === dream.dreamboardId
              ? { ...db, dreams: [...db.dreams, dream] }
              : db
          ),
          currentDreamboard: state.currentDreamboard?.id === dream.dreamboardId
            ? { ...state.currentDreamboard, dreams: [...state.currentDreamboard.dreams, dream] }
            : state.currentDreamboard
        })),
      
      updateDream: (id, updates) =>
        set((state) => ({
          dreamboards: state.dreamboards.map(db => ({
            ...db,
            dreams: db.dreams.map(dream =>
              dream.id === id ? { ...dream, ...updates } : dream
            )
          })),
          currentDreamboard: state.currentDreamboard
            ? {
                ...state.currentDreamboard,
                dreams: state.currentDreamboard.dreams.map(dream =>
                  dream.id === id ? { ...dream, ...updates } : dream
                )
              }
            : null
        })),
      
      deleteDream: (id) =>
        set((state) => ({
          dreamboards: state.dreamboards.map(db => ({
            ...db,
            dreams: db.dreams.filter(dream => dream.id !== id)
          })),
          currentDreamboard: state.currentDreamboard
            ? {
                ...state.currentDreamboard,
                dreams: state.currentDreamboard.dreams.filter(dream => dream.id !== id)
              }
            : null
        })),
      
      addIncomeStream: (incomeStream) =>
        set((state) => ({
          dreamboards: state.dreamboards.map(db =>
            db.id === incomeStream.dreamboardId
              ? { ...db, incomeStreams: [...db.incomeStreams, incomeStream] }
              : db
          ),
          currentDreamboard: state.currentDreamboard?.id === incomeStream.dreamboardId
            ? { ...state.currentDreamboard, incomeStreams: [...state.currentDreamboard.incomeStreams, incomeStream] }
            : state.currentDreamboard
        })),
      
      updateIncomeStream: (id, updates) =>
        set((state) => ({
          dreamboards: state.dreamboards.map(db => ({
            ...db,
            incomeStreams: db.incomeStreams.map(stream =>
              stream.id === id ? { ...stream, ...updates } : stream
            )
          })),
          currentDreamboard: state.currentDreamboard
            ? {
                ...state.currentDreamboard,
                incomeStreams: state.currentDreamboard.incomeStreams.map(stream =>
                  stream.id === id ? { ...stream, ...updates } : stream
                )
              }
            : null
        })),
      
      deleteIncomeStream: (id) =>
        set((state) => ({
          dreamboards: state.dreamboards.map(db => ({
            ...db,
            incomeStreams: db.incomeStreams.filter(stream => stream.id !== id)
          })),
          currentDreamboard: state.currentDreamboard
            ? {
                ...state.currentDreamboard,
                incomeStreams: state.currentDreamboard.incomeStreams.filter(stream => stream.id !== id)
              }
            : null
        })),
      
      setCategories: (categories) => set({ categories }),
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'dreamboard-storage',
    }
  )
)
