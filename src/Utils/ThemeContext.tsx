import { createContext, useCallback, useContext, useEffect, useState } from "react";

// ── Theme definitions ──────────────────────────────────────────────────────
export type ThemeId = "dark" | "midnight" | "ocean";

export interface Theme {
    id: ThemeId;
    label: string;
    emoji: string;
    /** CSS custom-property overrides applied to <html data-theme="..."> */
    vars: Record<string, string>;
}

export const THEMES: Theme[] = [
    {
        id: "dark",
        label: "Dark",
        emoji: "🌑",
        vars: {
            "--bg-base": "#111115",
            "--bg-card": "#1e1e26",
            "--bg-nav": "#1e1e26",
            "--bg-nav-scroll": "#141418",
            "--bg-surface": "#1a1a22",
            "--bg-surface-2": "#252530",
            "--accent": "#2eade7",
            "--accent-light": "#60c8f5",
            "--accent-dark": "#1a8fc7",
            "--border": "rgba(255,255,255,0.08)",
            "--text-muted": "rgba(255,255,255,0.45)",
        },
    },
    {
        id: "midnight",
        label: "Midnight",
        emoji: "🌌",
        vars: {
            "--bg-base": "#08080f",
            "--bg-card": "#14141c",
            "--bg-nav": "#10101a",
            "--bg-nav-scroll": "#0c0c14",
            "--bg-surface": "#121219",
            "--bg-surface-2": "#1a1a24",
            "--accent": "#a855f7",
            "--accent-light": "#c084fc",
            "--accent-dark": "#7c3aed",
            "--border": "rgba(168,85,247,0.12)",
            "--text-muted": "rgba(255,255,255,0.40)",
        },
    },
    {
        id: "ocean",
        label: "Ocean",
        emoji: "🌊",
        vars: {
            "--bg-base": "#040d1a",
            "--bg-card": "#0a1628",
            "--bg-nav": "#071122",
            "--bg-nav-scroll": "#050e1c",
            "--bg-surface": "#091424",
            "--bg-surface-2": "#0f1e34",
            "--accent": "#06b6d4",
            "--accent-light": "#22d3ee",
            "--accent-dark": "#0891b2",
            "--border": "rgba(6,182,212,0.12)",
            "--text-muted": "rgba(255,255,255,0.40)",
        },
    },
];

// ── Context ────────────────────────────────────────────────────────────────
interface ThemeContextValue {
    theme: Theme;
    setTheme: (id: ThemeId) => void;
    themes: Theme[];
}

const ThemeContext = createContext<ThemeContextValue>({
    theme: THEMES[0],
    setTheme: () => { },
    themes: THEMES,
});

export function useTheme() {
    return useContext(ThemeContext);
}

// ── Provider ───────────────────────────────────────────────────────────────
function applyTheme(theme: Theme) {
    const root = document.documentElement;
    // Set data attribute for CSS selectors
    root.setAttribute("data-theme", theme.id);
    // Apply all CSS variables
    Object.entries(theme.vars).forEach(([k, v]) => root.style.setProperty(k, v));
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [themeId, setThemeId] = useState<ThemeId>(() => {
        const saved = localStorage.getItem("masmax-theme") as ThemeId | null;
        return saved && THEMES.find((t) => t.id === saved) ? saved : "dark";
    });

    const theme = THEMES.find((t) => t.id === themeId) ?? THEMES[0];

    // Apply vars on mount + whenever theme changes
    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    const setTheme = useCallback((id: ThemeId) => {
        setThemeId(id);
        localStorage.setItem("masmax-theme", id);
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
            {children}
        </ThemeContext.Provider>
    );
}
