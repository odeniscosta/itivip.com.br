import { createRoot } from "react-dom/client";
import { useReducedMotion } from "framer-motion";
import { Cloud, Database, Server, ShieldCheck } from "lucide-react";
import { CircuitBoard } from "@/components/ui/circuit-board";
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

const mount = document.getElementById("circuit-board-root");
if (mount) createRoot(mount).render(<HeroCircuitBoard />);
