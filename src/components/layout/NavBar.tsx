import {
  AngleRightIcon,
  FilmIcon,
  MenuIcon,
  SearchIcon,
  Xicon,
} from "@/lib/icons/icons";
import { fetchSearchMovie } from "@/lib/FetchAPI";
import { getImagePath } from "@/lib/GetImagePath";
import { DetilsResult } from "@/lib/Interfaces";
import { useUser } from "@/lib/UserContext";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

interface IItems {
  [item: string]: IItem;
}

interface IItem {
  id: number;
  path: string;
  icon: React.ReactNode;
}

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navbarItems: IItems = {
    Home: { id: 0, path: "/", icon: <FilmIcon /> },
    Movies: { id: 1, path: "/movies", icon: <FilmIcon /> },
    Series: { id: 2, path: "/series", icon: <FilmIcon /> },
  };

  const { user, logout } = useUser();
  const [activeMenu, setActiveMenu] = useState(false);
  const [activeSearch, setActiveSearch] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);
  const [searchInput, setSearchInput] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [suggestions, setSuggestions] = useState<DetilsResult[]>([]);
  const [acLoading, setAcLoading] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const searchRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeDrop =
    Object.entries(navbarItems).find(
      ([, item]) => item.path === location.pathname,
    )?.[0] ?? "Home";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (activeSearch) {
      searchRef.current?.focus();
    } else {
      setSuggestions([]);
      setSearchInput("");
      setActiveIdx(-1);
    }
  }, [activeSearch]);

  useEffect(() => {
    setActiveMenu(false);
    setAvatarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
        setAvatarOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const fetchSuggestions = useCallback((query: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!query.trim()) {
      setSuggestions([]);
      setAcLoading(false);
      return;
    }
    setAcLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const results: DetilsResult[] = await fetchSearchMovie(query);
        const filtered = results
          .filter((r) => r.original_language === "en" && r.poster_path)
          .sort(
            (a, b) =>
              new Date(b.release_date).getTime() -
              new Date(a.release_date).getTime(),
          )
          .slice(0, 7);
        setSuggestions(filtered);
      } catch {
        setSuggestions([]);
      } finally {
        setAcLoading(false);
      }
    }, 300);
  }, []);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    const query = searchInput.trim();
    if (!query) return;
    setActiveSearch(false);
    navigate(`/search/${query}`, { state: { searchValue: query } });
  }

  function handleSuggestionClick(item: DetilsResult) {
    setActiveSearch(false);
    localStorage.setItem("id", item.id.toString());
    navigate(`/movie/${item.id}`);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!suggestions.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter" && activeIdx >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[activeIdx]);
    } else if (e.key === "Escape") {
      setActiveSearch(false);
    }
  }

  return (
    <>
      {/* ── Main bar ─────────────────────────────────────────────── */}
      <header
        className="w-full sticky top-0 z-40 transition-all duration-300"
        style={{
          background: scrolled
            ? "color-mix(in srgb, var(--bg-nav-scroll) 96%, transparent)"
            : "transparent",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.07)"
            : "1px solid transparent",
          backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
        }}
      >
        <div className="max-w-[90rem] mx-auto h-16 flex items-center justify-between px-4 sm:px-6 lg:px-10">
          {/* ── Left: hamburger (mobile) + logo ── */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveMenu(true)}
              className="sm:hidden -m-2.5 p-2.5 text-white/70 hover:text-white transition-colors flex-shrink-0"
              aria-label="Open menu"
            >
              <MenuIcon />
            </button>

            <button
              onClick={() => navigate("/")}
              className="font-roboto font-bold text-xl sm:text-2xl tracking-widest cursor-pointer select-none bg-clip-text text-transparent border-none bg-transparent p-0"
              aria-label="MasMax home"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, var(--accent-light) 0%, var(--accent) 60%)",
              }}
            >
              MASMAX
            </button>
          </div>

          {/* ── Center: nav links (desktop) ── */}
          <nav className="hidden sm:flex items-center gap-1 h-full">
            {Object.entries(navbarItems).map(([itemName, item]) => {
              const active = activeDrop === itemName;
              return (
                <button
                  key={itemName}
                  onClick={() => navigate(item.path)}
                  className="relative h-16 flex items-center px-4 font-roboto text-[0.85rem] font-medium tracking-wide transition-colors duration-200 group"
                  style={{ color: active ? "#fff" : "rgba(255,255,255,0.45)" }}
                  aria-current={active ? "page" : undefined}
                  onMouseEnter={(e) => {
                    if (!active)
                      (e.currentTarget as HTMLButtonElement).style.color =
                        "rgba(255,255,255,0.85)";
                  }}
                  onMouseLeave={(e) => {
                    if (!active)
                      (e.currentTarget as HTMLButtonElement).style.color =
                        "rgba(255,255,255,0.45)";
                  }}
                >
                  {itemName}
                  {/* Active underline */}
                  <span
                    className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full transition-all duration-300"
                    style={{
                      background: active ? "var(--accent)" : "transparent",
                      transform: active ? "scaleX(1)" : "scaleX(0)",
                      transformOrigin: "center",
                    }}
                  />
                  {/* Hover underline */}
                  {!active && (
                    <span
                      className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-200"
                      style={{ background: "var(--accent)" }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* ── Right: actions ── */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search */}
            <button
              onClick={() => setActiveSearch(true)}
              className="p-2.5 rounded-lg text-white/50 hover:text-white hover:bg-white/8 transition-all duration-200"
              aria-label="Search"
            >
              <SearchIcon />
            </button>

            {/* Theme toggle */}
            <ThemeToggle />

            {/* Divider */}
            <div className="hidden sm:block w-px h-5 bg-white/10 mx-1" />

            {/* Auth */}
            {user ? (
              <div ref={avatarRef} className="relative">
                <button
                  onClick={() => setAvatarOpen((v) => !v)}
                  className="flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-full transition-all duration-200 hover:bg-white/8"
                  aria-label="User menu"
                  aria-haspopup="menu"
                  aria-expanded={avatarOpen ? "true" : "false"}
                >
                  <div
                    className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 transition-all duration-200"
                    style={{
                      boxShadow: `0 0 0 2px color-mix(in srgb, var(--accent) 50%, transparent)`,
                    }}
                  >
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center text-white font-roboto font-bold text-xs"
                        style={{
                          background:
                            "linear-gradient(135deg, var(--accent), var(--accent-dark))",
                        }}
                      >
                        {(user.displayName ?? user.email ?? "U")
                          .charAt(0)
                          .toUpperCase()}
                      </div>
                    )}
                  </div>
                  <span className="hidden md:block font-roboto text-sm text-white/85 max-w-[90px] truncate">
                    {user.displayName?.split(" ")[0] ?? "Account"}
                  </span>
                  <svg
                    className="hidden md:block w-3 h-3 text-white/40 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown */}
                {avatarOpen && (
                  <div
                    role="menu"
                    aria-label="User account menu"
                    className="absolute right-0 top-12 w-56 rounded-2xl overflow-hidden z-50 border"
                    style={{
                      background: "var(--bg-surface)",
                      borderColor: "var(--border)",
                      boxShadow: "0 16px 48px rgba(0,0,0,0.6)",
                    }}
                  >
                    {/* User info header */}
                    <div
                      className="flex items-center gap-3 px-4 py-3.5 border-b"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <div
                        className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0"
                        style={{
                          boxShadow: `0 0 0 2px color-mix(in srgb, var(--accent) 50%, transparent)`,
                        }}
                      >
                        {user.photoURL ? (
                          <img
                            src={user.photoURL}
                            alt="avatar"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div
                            className="w-full h-full flex items-center justify-center text-white font-roboto font-bold text-sm"
                            style={{
                              background:
                                "linear-gradient(135deg, var(--accent), var(--accent-dark))",
                            }}
                          >
                            {(user.displayName ?? user.email ?? "U")
                              .charAt(0)
                              .toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-roboto font-semibold text-white text-sm truncate">
                          {user.displayName ?? "User"}
                        </p>
                        <p className="font-roboto text-white/55 text-xs truncate mt-0.5">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <div className="py-1">
                      <button
                        role="menuitem"
                        onClick={() => {
                          navigate("/profile");
                          setAvatarOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-roboto text-white/65 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <svg
                          className="w-4 h-4 flex-shrink-0 fill-current opacity-70"
                          viewBox="0 0 448 512"
                        >
                          <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                        </svg>
                        My Profile
                      </button>
                      <button
                        role="menuitem"
                        onClick={async () => {
                          await logout();
                          setAvatarOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-roboto text-red-400/80 hover:text-red-300 hover:bg-red-500/8 transition-colors border-t mt-1 pt-2"
                        style={{ borderColor: "var(--border)" }}
                      >
                        <svg
                          className="w-4 h-4 flex-shrink-0 fill-current opacity-70"
                          viewBox="0 0 512 512"
                        >
                          <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" />
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate("/login")}
                  className="hidden sm:block font-roboto text-sm font-medium text-white/75 hover:text-white transition-colors duration-200 px-3 py-1.5"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="font-roboto text-sm font-semibold text-white px-4 py-1.5 rounded-lg transition-all duration-200 active:scale-95"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--accent), var(--accent-dark))",
                    boxShadow:
                      "0 2px 12px color-mix(in srgb, var(--accent) 30%, transparent)",
                  }}
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ── Search overlay ───────────────────────────────────────── */}
      <div
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-200 ease-in-out ${activeSearch ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"}`}
      >
        <form
          onSubmit={handleSearchSubmit}
          role="search"
          aria-label="Search movies and series"
          className="h-16 flex items-center gap-3 px-4 sm:px-6 lg:px-10 border-b backdrop-blur-xl"
          style={{
            background:
              "color-mix(in srgb, var(--bg-nav-scroll) 97%, transparent)",
            borderColor: "rgba(255,255,255,0.08)",
          }}
        >
          <span className="flex-shrink-0 text-white/35">
            <SearchIcon />
          </span>
          <input
            ref={searchRef}
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.currentTarget.value);
              setActiveIdx(-1);
              fetchSuggestions(e.currentTarget.value);
            }}
            onKeyDown={handleKeyDown}
            type="search"
            autoComplete="off"
            aria-label="Search movies, series"
            aria-autocomplete="list"
            aria-controls="search-suggestions"
            aria-activedescendant={
              activeIdx >= 0 ? `suggestion-${activeIdx}` : undefined
            }
            className="flex-1 h-full bg-transparent outline-none font-roboto text-white text-[0.95rem] placeholder:text-white/50"
            placeholder="Search movies, series…"
          />
          {acLoading && (
            <span
              className="flex-shrink-0 w-4 h-4 border-2 border-white/15 rounded-full animate-spin"
              style={{ borderTopColor: "var(--accent)" }}
            />
          )}
          {searchInput && !acLoading && (
            <button
              type="button"
              onClick={() => {
                setSearchInput("");
                setSuggestions([]);
                searchRef.current?.focus();
              }}
              className="flex-shrink-0 text-white/35 hover:text-white/70 transition-colors"
              aria-label="Clear"
            >
              <Xicon />
            </button>
          )}
          <div className="w-px h-5 bg-white/10 flex-shrink-0" />
          <button
            type="button"
            onClick={() => setActiveSearch(false)}
            className="flex-shrink-0 font-roboto text-xs text-white/60 hover:text-white transition-colors px-2 py-1.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-white/8"
            aria-label="Close search"
          >
            ESC
          </button>
        </form>

        {suggestions.length > 0 && (
          <ul
            id="search-suggestions"
            role="listbox"
            aria-label="Search suggestions"
            className="border-b backdrop-blur-xl max-h-[min(28rem,62vh)] overflow-y-auto"
            style={{
              background:
                "color-mix(in srgb, var(--bg-nav-scroll) 98%, transparent)",
              borderColor: "rgba(255,255,255,0.06)",
            }}
          >
            {suggestions.map((item, idx) => (
              <li
                id={`suggestion-${idx}`}
                key={item.id}
                role="option"
                aria-selected={idx === activeIdx}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSuggestionClick(item)}
                className="flex items-center gap-3.5 px-4 sm:px-6 py-2.5 cursor-pointer transition-colors duration-100 border-l-2"
                style={{
                  background:
                    idx === activeIdx
                      ? "color-mix(in srgb, var(--accent) 10%, transparent)"
                      : "transparent",
                  borderLeftColor:
                    idx === activeIdx ? "var(--accent)" : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (idx !== activeIdx)
                    (e.currentTarget as HTMLLIElement).style.background =
                      "rgba(255,255,255,0.04)";
                }}
                onMouseLeave={(e) => {
                  if (idx !== activeIdx)
                    (e.currentTarget as HTMLLIElement).style.background =
                      "transparent";
                }}
              >
                <img
                  src={getImagePath(92, item.poster_path)}
                  alt=""
                  className="w-8 h-12 object-cover rounded-md flex-shrink-0 bg-white/5"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-roboto text-sm text-white font-medium truncate">
                    {item.original_title}
                  </p>
                  <p className="font-roboto text-xs text-white/35 mt-0.5">
                    {item.release_date?.slice(0, 4) ?? ""}
                  </p>
                </div>
                <span className="text-white/20 flex-shrink-0">
                  <AngleRightIcon />
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ── Mobile drawer backdrop ───────────────────────────────── */}
      {activeMenu && (
        <div
          aria-hidden="true"
          onClick={() => setActiveMenu(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        />
      )}

      {/* ── Mobile drawer ─────────────────────────────────────────── */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed z-50 top-0 left-0 h-full w-[76%] max-w-[310px] flex flex-col transition-transform duration-300 ease-in-out border-r ${activeMenu ? "translate-x-0" : "-translate-x-full"}`}
        style={{
          background: "var(--bg-surface)",
          borderColor: "var(--border)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between h-16 px-5 flex-shrink-0 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <button
            onClick={() => {
              navigate("/");
              setActiveMenu(false);
            }}
            className="font-roboto font-bold text-xl tracking-widest cursor-pointer bg-clip-text text-transparent border-none bg-transparent p-0"
            aria-label="MasMax home"
            style={{
              backgroundImage:
                "linear-gradient(135deg, var(--accent-light), var(--accent))",
            }}
          >
            MASMAX
          </button>
          <button
            onClick={() => setActiveMenu(false)}
            className="p-2.5 rounded-lg text-white/60 hover:text-white hover:bg-white/8 transition-colors"
            aria-label="Close navigation menu"
          >
            <Xicon />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto py-3">
          {Object.entries(navbarItems).map(([itemName, item]) => {
            const isActive = activeDrop === itemName;
            return (
              <button
                key={itemName}
                onClick={() => {
                  navigate(item.path);
                  setActiveMenu(false);
                }}
                aria-current={isActive ? "page" : undefined}
                className="w-full flex items-center gap-3.5 h-12 px-5 font-roboto text-[0.9rem] font-medium transition-all duration-150"
                style={{
                  color: isActive ? "#fff" : "rgba(255,255,255,0.45)",
                  background: isActive
                    ? "color-mix(in srgb, var(--accent) 10%, transparent)"
                    : "transparent",
                  borderLeft: isActive
                    ? "3px solid var(--accent)"
                    : "3px solid transparent",
                }}
                onMouseEnter={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "rgba(255,255,255,0.04)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "transparent";
                }}
              >
                <span className="w-4 h-4 flex-shrink-0 opacity-70">
                  {item.icon}
                </span>
                {itemName}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div
          className="p-5 border-t flex-shrink-0"
          style={{ borderColor: "var(--border)" }}
        >
          {user ? (
            <>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"
                  style={{
                    boxShadow: `0 0 0 2px color-mix(in srgb, var(--accent) 50%, transparent)`,
                  }}
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-white font-roboto font-bold text-sm"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--accent), var(--accent-dark))",
                      }}
                    >
                      {(user.displayName ?? user.email ?? "U")
                        .charAt(0)
                        .toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-roboto font-semibold text-white text-sm truncate">
                    {user.displayName ?? "User"}
                  </p>
                  <p className="font-roboto text-white/55 text-xs truncate">
                    {user.email}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  navigate("/profile");
                  setActiveMenu(false);
                }}
                className="w-full py-2.5 rounded-xl font-roboto font-semibold text-sm text-white transition-all duration-200"
                style={{
                  background:
                    "linear-gradient(135deg, var(--accent), var(--accent-dark))",
                }}
              >
                My Profile
              </button>
              <button
                onClick={async () => {
                  await logout();
                  setActiveMenu(false);
                }}
                className="w-full mt-2 py-2.5 rounded-xl border font-roboto font-semibold text-sm text-red-400 hover:text-red-300 hover:bg-red-500/8 transition-all duration-200"
                style={{ borderColor: "rgba(239,68,68,0.25)" }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  navigate("/register");
                  setActiveMenu(false);
                }}
                className="w-full py-2.5 rounded-xl font-roboto font-semibold text-sm text-white transition-all duration-200"
                style={{
                  background:
                    "linear-gradient(135deg, var(--accent), var(--accent-dark))",
                }}
              >
                Get Started
              </button>
              <button
                onClick={() => {
                  navigate("/login");
                  setActiveMenu(false);
                }}
                className="w-full mt-2 py-2.5 rounded-xl border font-roboto font-semibold text-sm text-white/55 hover:text-white hover:bg-white/5 transition-all duration-200"
                style={{ borderColor: "var(--border)" }}
              >
                Sign In
              </button>
            </>
          )}
        </div>
      </aside>
    </>
  );
};

export default NavBar;
