import { createRoot } from "react-dom/client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { Cloud, Database, Server, ShieldCheck } from "lucide-react";
import { CircuitBoard } from "@/components/ui/circuit-board";
import { FlippingWordSwap } from "@/components/ui/flipping-word-swap";
import { GrainGradient } from "@/components/ui/grain-gradient";
import { KineticTextReveal } from "@/components/ui/kinetic-text-reveal";
import "../script.js";
import "./circuit.css";

const nodes = [
  { id: "cloud", x: 74, y: 185, label: "Cloud", icon: <Cloud size={16} />, status: "active", size: "md" },
  { id: "servers", x: 245, y: 94, label: "Servidores", icon: <Server size={18} />, status: "processing", size: "lg" },
  { id: "security", x: 245, y: 278, label: "Segurança", icon: <ShieldCheck size={16} />, status: "active", size: "md" },
  { id: "data", x: 455, y: 185, label: "Dados", icon: <Database size={18} />, status: "active", size: "lg" },
];

function HeroCircuitBoard() {
  const reduceMotion = useReducedMotion();
  const connections = [
    { from: "cloud", to: "servers", animated: !reduceMotion, pulseColor: "rgba(88, 172, 255, .95)" },
    { from: "cloud", to: "security", animated: !reduceMotion, pulseColor: "rgba(88, 172, 255, .95)" },
    { from: "servers", to: "data", animated: !reduceMotion, pulseColor: "rgba(88, 172, 255, .95)" },
    { from: "security", to: "data", animated: !reduceMotion, pulseColor: "rgba(88, 172, 255, .95)" },
  ];

  return <CircuitBoard nodes={nodes} connections={connections} width={530} height={360} variant="dark" showGrid gridColor="rgba(154, 208, 255, .1)" traceColor="rgba(123, 190, 255, .36)" nodeColor="rgba(88, 172, 255, .7)" pulseColor="rgba(88, 172, 255, .95)" pulseSpeed={2.8} traceWidth={1.5} />;
}

function SectionTitle({ text }) {
  const revealRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        revealRef.current?.play();
        observer.disconnect();
      },
      { threshold: 0.22 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={rootRef} className="kinetic-title">
      <KineticTextReveal
        ref={revealRef}
        text={text}
        autoPlay={false}
        splitBy="words"
        distance={16}
        stagger={0.035}
        blur={false}
      />
    </span>
  );
}

function ContactGrain() {
  return (
    <GrainGradient
      colorLight="#194e7f"
      colorMid="#0a2844"
      colorDark="#06101d"
      angle={-18}
      position={0.24}
      curve={0.32}
      softness={0.2}
      grain={0.09}
      grainSize={1.15}
      seed={3803}
      speed={0.18}
    />
  );
}

const mount = document.getElementById("circuit-board-root");
if (mount) createRoot(mount).render(<HeroCircuitBoard />);

const flippingWordMount = document.getElementById("flipping-word-root");
if (flippingWordMount) {
  createRoot(flippingWordMount).render(
    <FlippingWordSwap
      word1="avançada"
      word2="aderente"
      duration={360}
      stagger={38}
      className="hero-word-swap"
      toClassName="hero-word-swap-to"
    />,
  );
}

document.querySelectorAll("[data-kinetic-heading]").forEach((heading) => {
  const text = heading.dataset.kineticHeading;
  if (text) createRoot(heading).render(<SectionTitle text={text} />);
});

const contactGrainMount = document.getElementById("contact-grain-root");
if (contactGrainMount) createRoot(contactGrainMount).render(<ContactGrain />);
