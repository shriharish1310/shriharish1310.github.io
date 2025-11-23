import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import CustomCursor from "./components/CustomCursor";
import NeuralBackground from "./components/NeuralBackground";
import { useEffect } from "react";
function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}
export function FloatingCursor() {
  useEffect(() => {
    const cursor = document.createElement("div");
    cursor.id = "cursor-glow";
    cursor.style.position = "fixed";
    cursor.style.width = "20px";
    cursor.style.height = "20px";
    cursor.style.borderRadius = "50%";
    cursor.style.pointerEvents = "none";
    cursor.style.background = "radial-gradient(circle, rgba(0,255,255,0.6) 0%, rgba(0,255,255,0) 70%)";
    cursor.style.transition = "transform 0.1s linear";
    cursor.style.zIndex = "9999";
    document.body.appendChild(cursor);

    const move = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX - 10}px,${e.clientY - 10}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return null;
}
function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <NeuralBackground />
          <CustomCursor />
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
