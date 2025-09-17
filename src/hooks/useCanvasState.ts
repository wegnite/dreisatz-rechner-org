'use client';

import { create } from 'zustand';

export interface CanvasText {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  fill: string;
  stroke?: string;
  strokeWidth?: number;
  rotation: number;
  scaleX: number;
  scaleY: number;
}

export interface CanvasImage {
  id: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  scaleX: number;
  scaleY: number;
}

export interface CanvasTemplate {
  id: string;
  name: string;
  backgroundImage?: string;
  backgroundColor?: string;
  width: number;
  height: number;
}

export interface CanvasState {
  // Canvas dimensions
  width: number;
  height: number;

  // Current template
  template: CanvasTemplate | null;

  // Canvas elements
  texts: CanvasText[];
  images: CanvasImage[];

  // Selection state
  selectedElementId: string | null;
  selectedElementType: 'text' | 'image' | null;

  // History for undo/redo
  history: {
    texts: CanvasText[];
    images: CanvasImage[];
  }[];
  historyIndex: number;

  // Export settings
  exportSettings: {
    format: 'png' | 'jpg';
    quality: number;
    scale: number;
    includeWatermark: boolean;
  };
}

export interface CanvasActions {
  // Template actions
  setTemplate: (template: CanvasTemplate) => void;

  // Text actions
  addText: (text: Omit<CanvasText, 'id'>) => void;
  updateText: (id: string, updates: Partial<CanvasText>) => void;
  removeText: (id: string) => void;

  // Image actions
  addImage: (image: Omit<CanvasImage, 'id'>) => void;
  updateImage: (id: string, updates: Partial<CanvasImage>) => void;
  removeImage: (id: string) => void;

  // Selection actions
  selectElement: (id: string | null, type: 'text' | 'image' | null) => void;

  // History actions
  saveHistory: () => void;
  undo: () => void;
  redo: () => void;

  // Canvas actions
  clearCanvas: () => void;
  setCanvasSize: (width: number, height: number) => void;

  // Export actions
  updateExportSettings: (
    settings: Partial<CanvasState['exportSettings']>
  ) => void;
}

const initialState: CanvasState = {
  width: 400,
  height: 300,
  template: null,
  texts: [],
  images: [],
  selectedElementId: null,
  selectedElementType: null,
  history: [],
  historyIndex: -1,
  exportSettings: {
    format: 'png',
    quality: 0.9,
    scale: 1,
    includeWatermark: true,
  },
};

export const useCanvasStore = create<CanvasState & CanvasActions>(
  (set, get) => ({
    ...initialState,

    setTemplate: (template) => {
      set({
        template,
        width: template.width,
        height: template.height,
        texts: [],
        images: [],
        selectedElementId: null,
        selectedElementType: null,
      });
      get().saveHistory();
    },

    addText: (textData) => {
      const id = `text-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const newText: CanvasText = { ...textData, id };

      set((state) => ({
        texts: [...state.texts, newText],
        selectedElementId: id,
        selectedElementType: 'text',
      }));
      get().saveHistory();
    },

    updateText: (id, updates) => {
      let updated = false;
      set((state) => {
        let changed = false;
        const texts = state.texts.map((text) => {
          if (text.id !== id) return text;
          const shouldUpdate = (
            Object.entries(updates) as [
              keyof CanvasText,
              CanvasText[keyof CanvasText] | undefined,
            ][]
          ).some(([key, value]) => {
            if (value === undefined) return false;
            return text[key] !== value;
          });
          if (!shouldUpdate) {
            return text;
          }
          changed = true;
          return { ...text, ...updates };
        });

        if (!changed) {
          return state;
        }

        updated = true;
        return { texts };
      });

      if (updated) {
        get().saveHistory();
      }
    },

    removeText: (id) => {
      set((state) => ({
        texts: state.texts.filter((text) => text.id !== id),
        selectedElementId:
          state.selectedElementId === id ? null : state.selectedElementId,
        selectedElementType:
          state.selectedElementId === id ? null : state.selectedElementType,
      }));
      get().saveHistory();
    },

    addImage: (imageData) => {
      const id = `image-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const newImage: CanvasImage = { ...imageData, id };

      set((state) => ({
        images: [...state.images, newImage],
        selectedElementId: id,
        selectedElementType: 'image',
      }));
      get().saveHistory();
    },

    updateImage: (id, updates) => {
      let updated = false;
      set((state) => {
        let changed = false;
        const images = state.images.map((image) => {
          if (image.id !== id) return image;
          const shouldUpdate = (
            Object.entries(updates) as [
              keyof CanvasImage,
              CanvasImage[keyof CanvasImage] | undefined,
            ][]
          ).some(([key, value]) => {
            if (value === undefined) return false;
            return image[key] !== value;
          });
          if (!shouldUpdate) {
            return image;
          }
          changed = true;
          return { ...image, ...updates };
        });

        if (!changed) {
          return state;
        }

        updated = true;
        return { images };
      });

      if (updated) {
        get().saveHistory();
      }
    },

    removeImage: (id) => {
      set((state) => ({
        images: state.images.filter((image) => image.id !== id),
        selectedElementId:
          state.selectedElementId === id ? null : state.selectedElementId,
        selectedElementType:
          state.selectedElementId === id ? null : state.selectedElementType,
      }));
      get().saveHistory();
    },

    selectElement: (id, type) => {
      set({
        selectedElementId: id,
        selectedElementType: type,
      });
    },

    saveHistory: () => {
      const { texts, images, history, historyIndex } = get();
      const newHistoryEntry = { texts: [...texts], images: [...images] };

      // Remove any history after current index (for when we undo then make new changes)
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newHistoryEntry);

      // Limit history to 50 entries
      if (newHistory.length > 50) {
        newHistory.shift();
      }

      set({
        history: newHistory,
        historyIndex: newHistory.length - 1,
      });
    },

    undo: () => {
      const { history, historyIndex } = get();
      if (historyIndex > 0) {
        const previousState = history[historyIndex - 1];
        set({
          texts: [...previousState.texts],
          images: [...previousState.images],
          historyIndex: historyIndex - 1,
          selectedElementId: null,
          selectedElementType: null,
        });
      }
    },

    redo: () => {
      const { history, historyIndex } = get();
      if (historyIndex < history.length - 1) {
        const nextState = history[historyIndex + 1];
        set({
          texts: [...nextState.texts],
          images: [...nextState.images],
          historyIndex: historyIndex + 1,
          selectedElementId: null,
          selectedElementType: null,
        });
      }
    },

    clearCanvas: () => {
      set({
        texts: [],
        images: [],
        selectedElementId: null,
        selectedElementType: null,
      });
      get().saveHistory();
    },

    setCanvasSize: (width, height) => {
      set({ width, height });
    },

    updateExportSettings: (settings) => {
      set((state) => ({
        exportSettings: { ...state.exportSettings, ...settings },
      }));
    },
  })
);
