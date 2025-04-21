import { create } from "zustand";

interface SphereState {
  sphereCount: number;
  setSphereCount: (count: number) => void;
}

// Create a store for managing sphere-related state
export const useSphereStore = create<SphereState>((set) => ({
  // Default number of spheres
  sphereCount: 30,
  
  // Function to update sphere count
  setSphereCount: (count: number) => set({ sphereCount: count }),
}));
