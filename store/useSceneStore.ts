import { create } from "zustand";
import type { Object3D } from "three";

type SceneState = {
  hoveredSlug: string | null;
  selectedSlug: string | null;
  planetObjects: Record<string, Object3D>;
  setHovered: (slug: string | null) => void;
  selectPlanet: (slug: string) => void;
  closePanel: () => void;
  registerPlanet: (slug: string, obj: Object3D | null) => void;
};

export const useSceneStore = create<SceneState>((set) => ({
  hoveredSlug: null,
  selectedSlug: null,
  planetObjects: {},
  setHovered: (slug) => set({ hoveredSlug: slug }),
  selectPlanet: (slug) =>
    set((state) => ({ selectedSlug: state.selectedSlug === slug ? null : slug })),
  closePanel: () => set({ selectedSlug: null }),
  registerPlanet: (slug, obj) =>
    set((state) => {
      const planetObjects = { ...state.planetObjects };
      if (obj) {
        planetObjects[slug] = obj;
      } else {
        delete planetObjects[slug];
      }
      return { planetObjects };
    }),
}));
