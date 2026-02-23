import { useTheme } from "@/Utils/ThemeContext";
import { useEffect, useRef, useState } from "react";

export default function ThemeToggle() {
    const { theme, setTheme, themes } = useTheme();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div ref={ref} className="relative">
            {/* Trigger button */}
            <button
                onClick={() => setOpen((v) => !v)}
                aria-label="Change theme"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold font-roboto transition-all duration-200 ${open
                    ? "ring-1 text-white"
                    : "text-white/55 hover:text-white hover:bg-white/10"
                    }`}
                style={open ? {
                    background: "color-mix(in srgb, var(--accent) 15%, transparent)",
                    boxShadow: "0 0 0 1px color-mix(in srgb, var(--accent) 40%, transparent)",
                } : {}}
            >
                {/* Live colour dot */}
                <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ background: "var(--accent)" }}
                />
                {theme.label}
            </button>

            {/* Dropdown panel */}
            {open && (
                <div
                    className="absolute right-0 top-11 z-50 w-44 rounded-2xl overflow-hidden border"
                    style={{
                        background: "var(--bg-surface)",
                        borderColor: "var(--border)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                    }}
                >
                    <p
                        className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest font-roboto border-b"
                        style={{ color: "var(--text-muted)", borderColor: "var(--border)" }}
                    >
                        Theme
                    </p>

                    {themes.map((t) => {
                        const active = t.id === theme.id;
                        return (
                            <button
                                key={t.id}
                                onClick={() => { setTheme(t.id); setOpen(false); }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 transition-colors duration-150 font-roboto text-sm font-medium"
                                style={{
                                    background: active ? "color-mix(in srgb, var(--accent) 15%, transparent)" : "transparent",
                                    color: active ? "var(--accent-light)" : "rgba(255,255,255,0.65)",
                                }}
                                onMouseEnter={(e) => {
                                    if (!active) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)";
                                }}
                                onMouseLeave={(e) => {
                                    if (!active) (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                                }}
                            >
                                {/* Colour swatch */}
                                <span
                                    className="w-4 h-4 rounded-full flex-shrink-0 ring-1 ring-white/20"
                                    style={{ background: t.vars["--accent"] }}
                                />
                                <span>{t.label}</span>
                                {active && (
                                    <svg
                                        className="ml-auto w-3.5 h-3.5 flex-shrink-0"
                                        style={{ fill: "var(--accent)" }}
                                        viewBox="0 0 512 512"
                                    >
                                        <path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                                    </svg>
                                )}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
