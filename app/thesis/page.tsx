"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Database, Cpu, GitBranch, FlaskConical, ChevronDown, BookOpen } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

interface SectionProps {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
}

function CollapsibleSection({ title, icon, children, defaultOpen = false }: SectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border border-white/10 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 md:p-6 bg-white/5 hover:bg-white/10 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-white/60">{icon}</span>
          <h2 className="text-lg md:text-xl font-mono font-semibold text-white">{title}</h2>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-white/40 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="p-4 md:p-6 border-t border-white/10"
        >
          {children}
        </motion.div>
      )}
    </div>
  )
}

export default function ThesisPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Back Link */}
      <div className="fixed top-6 left-6 z-10">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white font-mono text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
      </div>

      {/* Header */}
      <header className="pt-24 pb-12 px-6 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
                NASA-Funded Research
              </span>
              <span className="px-2 py-0.5 text-[10px] font-mono bg-amber-500/20 text-amber-400 rounded">
                In Progress
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-mono font-bold text-white mb-4">
              Dynamic Heterogeneous Flight Graphs for AAM Security
            </h1>
            <p className="text-white/60 font-mono text-sm md:text-base max-w-2xl">
              A graph neural network approach to risk modeling and security analysis for Advanced Air Mobility (AAM) systems using heterogeneous flight data.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Content */}
      <main className="px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-6">

          {/* Model Overview Section */}
          <CollapsibleSection
            title="Model Architecture"
            icon={<Cpu className="w-5 h-5" />}
            defaultOpen={true}
          >
            <div className="space-y-6">
              <p className="text-white/70 font-mono text-sm leading-relaxed">
                The model processes aircraft surveillance data combined with accident records through a multi-stage pipeline designed to predict risk scores, proximity probabilities, and potential accident linkages.
              </p>

              {/* Model Diagram */}
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <Image
                  src="/materials/Model_overview.png"
                  alt="Model Architecture Overview"
                  width={800}
                  height={600}
                  className="w-full h-auto rounded"
                />
              </div>

              {/* Pipeline Stages */}
              <div className="grid gap-4">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="text-white font-mono font-semibold mb-2">1. Input Layer</h4>
                  <p className="text-white/60 font-mono text-sm">
                    Raw features from OpenSky ADS-B data (position, velocities, timestamps, aircraft ID) combined with NTSB accident data (aircraft, time, location, descriptions). These can be interpreted as &quot;risk signals&quot; providing context for normal operations vs. accident scenarios.
                  </p>
                </div>

                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="text-white font-mono font-semibold mb-2">2. Encoder</h4>
                  <p className="text-white/60 font-mono text-sm">
                    Transforms raw features into dense embeddings, creating numerical representations of aircraft states and accident contexts.
                  </p>
                </div>

                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="text-white font-mono font-semibold mb-2">3. Heterogeneous Flight Graph</h4>
                  <p className="text-white/60 font-mono text-sm mb-3">
                    A multi-relational graph structure that captures &quot;who flew where, when, and how it ties into an accident&quot;.
                  </p>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="bg-black/30 rounded p-3">
                      <span className="text-white/80 font-mono text-xs font-semibold">Node Types:</span>
                      <ul className="text-white/50 font-mono text-xs mt-1 space-y-1">
                        <li>- Aircraft</li>
                        <li>- Flight Segments</li>
                        <li>- Airspace/Route Nodes</li>
                        <li>- Accident Nodes</li>
                      </ul>
                    </div>
                    <div className="bg-black/30 rounded p-3">
                      <span className="text-white/80 font-mono text-xs font-semibold">Relation Types:</span>
                      <ul className="text-white/50 font-mono text-xs mt-1 space-y-1">
                        <li>- Proximity (within X km/mi)</li>
                        <li>- Similar Route</li>
                        <li>- Linked to Accident</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="text-white font-mono font-semibold mb-2">4. Multi-Relational GNN Layers</h4>
                  <p className="text-white/60 font-mono text-sm mb-3">
                    Message passing framework where each node aggregates information from neighbors and applies learnable transformations. Provides &quot;summarized neighborhood behavior and risk context&quot;.
                  </p>
                  <div className="text-white/50 font-mono text-xs space-y-1">
                    <p><span className="text-white/70">Features:</span> Relation-specific transforms, Neighborhood sampling, Symmetric normalization, Skip connections, Edge dropout</p>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="text-white font-mono font-semibold mb-2">5. Relation Prediction Decoder (DistMult)</h4>
                  <p className="text-white/60 font-mono text-sm">
                    A straightforward bilinear decoder that scores how strongly two nodes are connected under each relation type. Chosen for efficiency with symmetrical data. Predicts proximity/near-misses and aircraft-to-incident linkages.
                  </p>
                </div>

                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="text-white font-mono font-semibold mb-2">6. Output</h4>
                  <p className="text-white/60 font-mono text-sm">
                    Risk scores, probability of &quot;near-miss / proximity&quot; relations, and probability of &quot;aircraft to accident&quot; links. Trained using logistic cross-entropy with negative sampling.
                  </p>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Research Patterns Section */}
          <CollapsibleSection
            title="Research Patterns"
            icon={<BookOpen className="w-5 h-5" />}
          >
            <div className="space-y-6">
              <p className="text-white/70 font-mono text-sm leading-relaxed">
                Literature review across Dynamic GNNs, Temporal Knowledge Graphs (TKGs), and dynamic heterogeneous graphs revealed three recurring architectural patterns for handling temporal graph data.
              </p>

              {/* Three Patterns Overview */}
              <div className="grid gap-4">
                {/* Pattern 1 - Not Selected */}
                <div className="bg-white/5 rounded-lg p-4 border border-white/10 opacity-60">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-mono font-semibold">Pattern 1: Snapshot-Based Dynamic Graphs</h4>
                    <span className="px-2 py-0.5 text-[10px] font-mono bg-white/10 text-white/40 rounded">Not Selected</span>
                  </div>
                  <p className="text-white/50 font-mono text-xs mb-3">
                    Dynamic graph represented as a sequence of static snapshots at fixed intervals (second, hour, day). Reuses a static GNN per snapshot with temporal smoothing/regularization.
                  </p>
                  <div className="text-white/40 font-mono text-xs">
                    <p className="mb-1"><span className="text-white/50">Example papers:</span> Kazemi et al. 2020 (Survey), HyTE (Dasgupta et al. 2018)</p>
                    <p className="text-white/50 mt-2">Limitation: Our data is irregular and large; global snapshots are too computationally complex.</p>
                  </div>
                </div>

                {/* Pattern 2 - Selected */}
                <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-mono font-semibold">Pattern 2: Event-Driven / Continuous-Time Models</h4>
                    <span className="px-2 py-0.5 text-[10px] font-mono bg-white/20 text-white rounded">Selected - Backbone</span>
                  </div>
                  <p className="text-white/60 font-mono text-xs mb-3">
                    Graphs treated as a &quot;stream of time-stamped events&quot;. Edge/node states only update when an event occurs (interactions, incidents, etc.). No fixed windows or time bins required.
                  </p>
                  <div className="text-white/50 font-mono text-xs space-y-2">
                    <div className="bg-black/30 rounded p-2">
                      <p className="text-white/80 font-semibold">Know-Evolve (Trivedi et al. 2017)</p>
                      <p className="text-white/40 mt-1">Models temporal KGs where facts happen at specific times. Entity embeddings update continuously at each event using temporal point processes. Directly handles irregular event times and multi-relational structure.</p>
                    </div>
                    <div className="bg-black/30 rounded p-2">
                      <p className="text-white/80 font-semibold">TGN - Temporal Graph Networks (Rossi et al. 2020)</p>
                      <p className="text-white/40 mt-1">Generic framework maintaining per-node memory, updating only when events occur. Time-aware message functions and attention over past events. Addresses memory staleness explicitly.</p>
                    </div>
                  </div>
                  <p className="text-white/70 font-mono text-xs mt-3">
                    Why: OpenSky + NTSB data is inherently event streams (states, proximity events, incident records). We update only nodes/edges touched by new events.
                  </p>
                </div>

                {/* Pattern 3 - Selected */}
                <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-mono font-semibold">Pattern 3: Hybrid Structural + Temporal Encoders</h4>
                    <span className="px-2 py-0.5 text-[10px] font-mono bg-white/20 text-white rounded">Selected - Encoder</span>
                  </div>
                  <p className="text-white/60 font-mono text-xs mb-3">
                    Combines structural GNN layers (who is connected to whom at a given time) with a temporal encoder (how that structure changes over time). GNN per time step + RNN/attention across steps or events.
                  </p>
                  <div className="text-white/50 font-mono text-xs space-y-2">
                    <div className="bg-black/30 rounded p-2">
                      <p className="text-white/80 font-semibold">RE-NET (Jin et al. 2020)</p>
                      <p className="text-white/40 mt-1">Treats temporal KG as sequence of snapshots, uses R-GCN over each snapshot plus GRU-based temporal encoder. Shows how to mix neighborhood aggregation + recurrent history.</p>
                    </div>
                    <div className="bg-black/30 rounded p-2">
                      <p className="text-white/80 font-semibold">HTGNN (Fan et al. 2022)</p>
                      <p className="text-white/40 mt-1">Heterogeneous temporal GNN with hierarchical aggregation: intra-relation, inter-relation, and temporal attention. Relevant for graphs where relations and their history all matter.</p>
                    </div>
                  </div>
                  <p className="text-white/70 font-mono text-xs mt-3">
                    Why: Enables relation-aware message passing over local heterogeneous neighborhoods with temporal memory summarizing past behavior and incidents.
                  </p>
                </div>
              </div>

              {/* Design Choice Summary */}
              <div className="bg-white/10 border border-white/20 rounded-lg p-4">
                <h4 className="text-white font-mono font-semibold mb-3">Combined Design Choice</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-white/70 font-mono text-xs font-semibold mb-1">Backbone: Event-Driven (Pattern 2)</p>
                    <p className="text-white/50 font-mono text-xs">Treat OpenSky + accident data as a stream of events. Node and edge memories update only when events arrive.</p>
                  </div>
                  <div>
                    <p className="text-white/70 font-mono text-xs font-semibold mb-1">Encoder: Hybrid Structural + Temporal (Pattern 3)</p>
                    <p className="text-white/50 font-mono text-xs">Run relation-specific message passing over recent-event neighborhoods, use temporal/memory module to incorporate history of behavior + past incidents.</p>
                  </div>
                </div>
              </div>

              {/* Related Aviation Papers */}
              <div>
                <h3 className="text-white font-mono font-semibold mb-3">Related Aviation/Transport Applications</h3>
                <p className="text-white/50 font-mono text-xs mb-3">
                  Existing work applies dynamic graphs to aviation but focuses on trajectory prediction rather than risk from multi-relational event streams.
                </p>
                <div className="space-y-2 text-white/40 font-mono text-xs">
                  <p>• Zhu et al. 2022 - GAT-LSTM for airport throughput prediction (65 Chinese airports)</p>
                  <p>• Xu et al. 2023 - BEGAN: Air traffic density prediction with Bayesian uncertainty</p>
                  <p>• Zeng et al. 2023 - Social Spatiotemporal GCN for aircraft trajectory in terminal airspace</p>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Data Sources Section */}
          <CollapsibleSection
            title="Data Sources"
            icon={<Database className="w-5 h-5" />}
          >
            <div className="space-y-6">
              <p className="text-white/70 font-mono text-sm leading-relaxed">
                AAM-specific data is scarce, mostly available as simulators rather than real datasets. The approach uses conventional aircraft surveillance data combined with accident records to build and validate the model.
              </p>

              {/* Aircraft Data */}
              <div>
                <h3 className="text-white font-mono font-semibold mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-white/60 rounded-full"></span>
                  Aircraft Trajectory Data
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs font-mono">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="text-left py-2 px-3 text-white/60">Dataset</th>
                        <th className="text-left py-2 px-3 text-white/60">Type</th>
                        <th className="text-left py-2 px-3 text-white/60">Coverage</th>
                        <th className="text-left py-2 px-3 text-white/60">Key Features</th>
                      </tr>
                    </thead>
                    <tbody className="text-white/50">
                      <tr className="border-b border-white/10">
                        <td className="py-2 px-3 text-white/80">OpenSky (Trino)</td>
                        <td className="py-2 px-3">Real, Global</td>
                        <td className="py-2 px-3">2014-present</td>
                        <td className="py-2 px-3">ADS-B/Mode-S, Aircraft ID, Full state vectors</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2 px-3 text-white/80">adsb.lol</td>
                        <td className="py-2 px-3">Real, Global</td>
                        <td className="py-2 px-3">2024-present</td>
                        <td className="py-2 px-3">Daily bulk ADS-B dumps, Aircraft ID</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2 px-3 text-white/80">TrajAir (CMU)</td>
                        <td className="py-2 px-3">Real</td>
                        <td className="py-2 px-3">Pittsburgh area</td>
                        <td className="py-2 px-3">Clean 3D trajectories, Weather context</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2 px-3 text-white/80">NASA ATom</td>
                        <td className="py-2 px-3">Real, Global</td>
                        <td className="py-2 px-3">2016-2018</td>
                        <td className="py-2 px-3">DC-8 research flights, 10s nav/housekeeping</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2 px-3 text-white/80">UAM-SUMO</td>
                        <td className="py-2 px-3">Synthetic, AAM</td>
                        <td className="py-2 px-3">Configurable</td>
                        <td className="py-2 px-3">Urban air-taxi simulation</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2 px-3 text-white/80">BlueSky ATM</td>
                        <td className="py-2 px-3">Synthetic</td>
                        <td className="py-2 px-3">Configurable</td>
                        <td className="py-2 px-3">ATM simulator, ATC interactions</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Accident Data */}
              <div>
                <h3 className="text-white font-mono font-semibold mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-white/60 rounded-full"></span>
                  Accident / Incident Data
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs font-mono">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="text-left py-2 px-3 text-white/60">Dataset</th>
                        <th className="text-left py-2 px-3 text-white/60">Coverage</th>
                        <th className="text-left py-2 px-3 text-white/60">Key Fields</th>
                      </tr>
                    </thead>
                    <tbody className="text-white/50">
                      <tr className="border-b border-white/10">
                        <td className="py-2 px-3 text-white/80">NTSB Aviation Database</td>
                        <td className="py-2 px-3">US, 1962-present</td>
                        <td className="py-2 px-3">Timestamp, Location, Aircraft, Phase, Injuries, Narrative, Findings</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2 px-3 text-white/80">TSB Canada</td>
                        <td className="py-2 px-3">Canada, 1995-present</td>
                        <td className="py-2 px-3">Full accident records with narratives</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2 px-3 text-white/80">NASA ASRS</td>
                        <td className="py-2 px-3">US, 1976-present</td>
                        <td className="py-2 px-3">Voluntary safety reports, Human-factors focus</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Primary Data Choice */}
              <div className="bg-white/10 border border-white/20 rounded-lg p-4">
                <h4 className="text-white font-mono font-semibold mb-2">Primary Data Selection</h4>
                <p className="text-white/60 font-mono text-sm">
                  <strong className="text-white/80">Aircraft:</strong> OpenSky Trino Historical Database - provides global ADS-B coverage with aircraft IDs for tracking proximity between aircraft.
                </p>
                <p className="text-white/60 font-mono text-sm mt-2">
                  <strong className="text-white/80">Accidents:</strong> NTSB Aviation Accident Database - comprehensive US records with linkable event IDs and registration numbers for joining with flight data.
                </p>
              </div>

              {/* Data Pipeline & Constraints */}
              <div>
                <h3 className="text-white font-mono font-semibold mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-white/60 rounded-full"></span>
                  Data Pipeline & Constraints
                </h3>

                {/* Match Rate */}
                <div className="bg-white/5 rounded-lg p-4 border border-white/10 mb-4">
                  <h4 className="text-white font-mono font-semibold mb-2">OpenSky-NTSB Match Rate: ~40%</h4>
                  <p className="text-white/50 font-mono text-xs mb-3">
                    Matching NTSB accident records to OpenSky flight telemetry via N-number → ICAO24 conversion yields limited coverage for general aviation.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs font-mono">
                      <thead>
                        <tr className="border-b border-white/20">
                          <th className="text-left py-2 px-3 text-white/60">Accident</th>
                          <th className="text-left py-2 px-3 text-white/60">Aircraft</th>
                          <th className="text-left py-2 px-3 text-white/60">Type</th>
                          <th className="text-left py-2 px-3 text-white/60">Flights Found</th>
                          <th className="text-left py-2 px-3 text-white/60">Trajectory Points</th>
                        </tr>
                      </thead>
                      <tbody className="text-white/50">
                        <tr className="border-b border-white/10">
                          <td className="py-2 px-3">CEN20LA429</td>
                          <td className="py-2 px-3">N461CM</td>
                          <td className="py-2 px-3">Cessna</td>
                          <td className="py-2 px-3 text-white/80">1</td>
                          <td className="py-2 px-3 text-white/80">2,000 ✓</td>
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="py-2 px-3">DCA21LA018</td>
                          <td className="py-2 px-3">N860DA</td>
                          <td className="py-2 px-3">Boeing</td>
                          <td className="py-2 px-3 text-white/80">2</td>
                          <td className="py-2 px-3 text-white/80">2,000 ✓</td>
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="py-2 px-3">ERA20LA342</td>
                          <td className="py-2 px-3">N8950R</td>
                          <td className="py-2 px-3">Bellanca</td>
                          <td className="py-2 px-3 text-white/40">0</td>
                          <td className="py-2 px-3 text-white/40">0</td>
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="py-2 px-3">WPR20LA332</td>
                          <td className="py-2 px-3">N5397S</td>
                          <td className="py-2 px-3">Piper</td>
                          <td className="py-2 px-3 text-white/40">0</td>
                          <td className="py-2 px-3 text-white/40">0</td>
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="py-2 px-3">CEN20LA425</td>
                          <td className="py-2 px-3">N75634</td>
                          <td className="py-2 px-3">Cessna</td>
                          <td className="py-2 px-3 text-white/40">0</td>
                          <td className="py-2 px-3 text-white/40">0</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-white/40 font-mono text-xs mt-3">
                    Small general aviation aircraft (Cessna, Piper, Bellanca) often lack ADS-B transponders required for OpenSky tracking. Commercial aircraft (Boeing, Airbus) with ADS-B are consistently matched.
                  </p>
                </div>

                {/* Technical Constraints */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <h4 className="text-white/80 font-mono text-sm font-semibold mb-2">Query Limitations</h4>
                    <ul className="text-white/50 font-mono text-xs space-y-1">
                      <li>• S3 rate limiting (503 SlowDown) on recent data</li>
                      <li>• Time windows must be small (hours, not days)</li>
                      <li>• Data is 2-3 days delayed for processed flights</li>
                      <li>• Limit results to ~2000 points per query</li>
                    </ul>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <h4 className="text-white/80 font-mono text-sm font-semibold mb-2">Technical Learnings</h4>
                    <ul className="text-white/50 font-mono text-xs space-y-1">
                      <li>• N-number → ICAO24 via icao-nnumber-converter-us</li>
                      <li>• Partition keys: hour (state vectors), day (flights)</li>
                      <li>• Raw SQL queries more reliable than high-level APIs</li>
                      <li>• Older data (2020) less rate-limited than recent</li>
                    </ul>
                  </div>
                </div>

                {/* Visualizations */}
                <h4 className="text-white font-mono font-semibold mb-3">Generated Visualizations</h4>

                {/* Proximity Graph */}
                <div className="bg-white/5 rounded-lg p-4 border border-white/10 mb-4">
                  <h5 className="text-white/80 font-mono text-sm mb-2">Aircraft Proximity Graph</h5>
                  <p className="text-white/40 font-mono text-xs mb-3">
                    LA area sample: 21 aircraft, 126 proximity edges (&lt;30km). Demonstrates spatial relationships that form the basis of proximity risk edges in the heterogeneous graph.
                  </p>
                  <Image
                    src="/materials/opensky/aircraft_proximity_graph.png"
                    alt="Aircraft Proximity Graph - LA Area"
                    width={800}
                    height={600}
                    className="w-full h-auto rounded"
                  />
                </div>

                {/* NTSB Insights */}
                <div className="bg-white/5 rounded-lg p-4 border border-white/10 mb-4">
                  <h5 className="text-white/80 font-mono text-sm mb-2">NTSB Accident Analysis</h5>
                  <p className="text-white/40 font-mono text-xs mb-3">
                    Decades of US aviation accident data: 1500-2000 accidents/year, top states CA/TX/FL, 53% result in no injuries. Provides ground truth for risk modeling.
                  </p>
                  <Image
                    src="/materials/opensky/ntsb_insights.png"
                    alt="NTSB Accident Insights"
                    width={800}
                    height={600}
                    className="w-full h-auto rounded"
                  />
                </div>

                {/* Flight Status */}
                <div className="bg-white/5 rounded-lg p-4 border border-white/10 mb-4">
                  <h5 className="text-white/80 font-mono text-sm mb-2">Flight Phase Analysis</h5>
                  <p className="text-white/40 font-mono text-xs mb-3">
                    92.2% of accidents occur in-flight vs 4.9% on ground. Flight phase codes (500-799: in-flight, 100-299: ground) enable filtering for trajectory-relevant incidents.
                  </p>
                  <Image
                    src="/materials/opensky/ntsb_flight_status.png"
                    alt="NTSB Flight Status Analysis"
                    width={800}
                    height={600}
                    className="w-full h-auto rounded"
                  />
                </div>

                {/* Matched Trajectory */}
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h5 className="text-white/80 font-mono text-sm mb-2">Matched Accident Trajectory</h5>
                  <p className="text-white/40 font-mono text-xs mb-3">
                    Example matched trajectory (CEN20LA429): 4-panel visualization showing flight path, altitude profile, vertical rate, and ground speed leading up to accident.
                  </p>
                  <Image
                    src="/materials/opensky/trajectory_CEN20LA429.png"
                    alt="Matched Accident Trajectory - CEN20LA429"
                    width={800}
                    height={600}
                    className="w-full h-auto rounded"
                  />
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Methodology Section */}
          <CollapsibleSection
            title="Methodology & Decisions"
            icon={<GitBranch className="w-5 h-5" />}
          >
            <div className="space-y-6">

              {/* Multi-relational Graphs */}
              <div>
                <h3 className="text-white font-mono font-semibold mb-3">Multi-Relational Graph Design</h3>
                <p className="text-white/60 font-mono text-sm mb-3">
                  Knowledge graphs with a single set of nodes but multiple edge types (relations). Edges are triples (head entity, relation, tail entity) → (u, r, v), enabling modeling of richer semantics like asymmetric and many-to-one relations.
                </p>
              </div>

              {/* Decoder Choice */}
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="text-white font-mono font-semibold mb-2">Decoder Selection</h4>
                <div className="grid md:grid-cols-2 gap-3 mb-3">
                  <div className="text-white/50 font-mono text-xs">
                    <span className="text-white/30">Rejected:</span>
                    <ul className="mt-1 space-y-1">
                      <li>- RESCAL: Heavier, separate matrix per relation</li>
                      <li>- TransE: Less aligned with symmetric relations</li>
                      <li>- ComplEx: More complex to implement</li>
                    </ul>
                  </div>
                  <div className="text-white/80 font-mono text-xs">
                    <span className="text-white">Selected: DistMult</span>
                    <ul className="mt-1 space-y-1 text-white/50">
                      <li>+ Straightforward with uniform data</li>
                      <li>+ Efficient, works with symmetric data</li>
                      <li>+ Interpretable relation scores</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Loss Function */}
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="text-white font-mono font-semibold mb-2">Loss Function</h4>
                <p className="text-white/60 font-mono text-sm mb-2">
                  <span className="text-white">Selected: Logistic Cross-Entropy with Negative Sampling</span>
                </p>
                <p className="text-white/50 font-mono text-xs">
                  For each observed edge, sample corrupted negatives, score with decoder, apply sigmoid, and use binary cross-entropy over labels y∈{`{0,1}`}. Trains model to assign high scores to real links and low scores to sampled non-links.
                </p>
              </div>

              {/* GNN Architecture Decisions */}
              <div>
                <h3 className="text-white font-mono font-semibold mb-3">GNN Architecture Decisions</h3>
                <div className="space-y-3">
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <h4 className="text-white/80 font-mono text-sm font-semibold">Message Passing Framework</h4>
                    <p className="text-white/50 font-mono text-xs mt-1">
                      Each node aggregates information from neighbors and applies a learnable transformation (linear layer) to update its embedding.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <h4 className="text-white/80 font-mono text-sm font-semibold">Neighborhood Aggregation</h4>
                    <p className="text-white/50 font-mono text-xs mt-1">
                      <span className="text-white/80">Symmetric normalization</span> - Adjusts aggregated values by node degree so high-degree nodes (frequent routes) don&apos;t overpower pattern detection.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <h4 className="text-white/80 font-mono text-sm font-semibold">Update Methods</h4>
                    <p className="text-white/50 font-mono text-xs mt-1">
                      <span className="text-white/80">Skip connections (primary)</span> - Preserves node-specific details while incorporating neighbor info. Gated updates reserved for complex scenarios only.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <h4 className="text-white/80 font-mono text-sm font-semibold">Training Strategy</h4>
                    <p className="text-white/50 font-mono text-xs mt-1">
                      <span className="text-white/80">Mini-batch neighborhood sampling</span> - Select batch seed nodes, sample fixed neighbors per layer. Enables efficient training on large time-expanded relational graphs without memory blow-up.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <h4 className="text-white/80 font-mono text-sm font-semibold">Inductive Capability</h4>
                    <p className="text-white/50 font-mono text-xs mt-1">
                      Model supports <span className="text-white/80">inductive learning</span> - can handle new aircraft and events unseen during training, critical for real-world AAM deployment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Technical Details Section */}
          <CollapsibleSection
            title="Raw Data Schema"
            icon={<FlaskConical className="w-5 h-5" />}
          >
            <div className="space-y-6">

              {/* OpenSky Fields */}
              <div>
                <h3 className="text-white font-mono font-semibold mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-white/60 rounded-full"></span>
                  OpenSky State Vectors
                </h3>
                <div className="bg-black/30 rounded-lg p-4 font-mono text-xs text-white/50 space-y-1">
                  <p><span className="text-white/70">time</span> - Unix timestamp (seconds since 1970-01-01 UTC)</p>
                  <p><span className="text-white/70">icao24</span> - 24-bit Mode S hex code (aircraft ID)</p>
                  <p><span className="text-white/70">lat, lon</span> - Position in decimal degrees</p>
                  <p><span className="text-white/70">velocity</span> - Ground speed in m/s</p>
                  <p><span className="text-white/70">heading</span> - Track angle (0-360, clockwise from north)</p>
                  <p><span className="text-white/70">vertrate</span> - Vertical rate in m/s (+climb, -descend)</p>
                  <p><span className="text-white/70">callsign</span> - Tail number or flight ID</p>
                  <p><span className="text-white/70">onground</span> - Boolean, aircraft on ground</p>
                  <p><span className="text-white/70">geoaltitude</span> - Geometric (GNSS) altitude in meters</p>
                  <p><span className="text-white/70">baroaltitude</span> - Barometric altitude in meters</p>
                  <p><span className="text-white/70">ntsb_no</span> - NTSB accident ID if associated (joined from NTSB)</p>
                </div>
              </div>

              {/* NTSB Fields */}
              <div>
                <h3 className="text-white font-mono font-semibold mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-white/60 rounded-full"></span>
                  NTSB Event Records
                </h3>
                <div className="bg-black/30 rounded-lg p-4 font-mono text-xs text-white/50 space-y-1">
                  <p><span className="text-white/70">ev_id</span> - Internal NTSB event ID (primary key for joins)</p>
                  <p><span className="text-white/70">ntsb_no</span> - Public NTSB accident number (e.g., WPR25LA076)</p>
                  <p><span className="text-white/70">ev_date, ev_time</span> - Local date/time of accident</p>
                  <p><span className="text-white/70">ev_city, ev_state, ev_country</span> - Location identifiers</p>
                  <p><span className="text-white/70">latitude, longitude</span> - Accident coordinates (NTSB format)</p>
                  <p><span className="text-white/70">ev_highest_injury</span> - Severity (NONE, MINR, SERI, FATL)</p>
                  <p><span className="text-white/70">apt_name, ev_nr_apt_id</span> - Nearest airport info</p>
                </div>
              </div>

              {/* NTSB Aircraft Fields */}
              <div>
                <h3 className="text-white font-mono font-semibold mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-white/60 rounded-full"></span>
                  NTSB Aircraft Records
                </h3>
                <div className="bg-black/30 rounded-lg p-4 font-mono text-xs text-white/50 space-y-1">
                  <p><span className="text-white/70">ev_id</span> - Links to event record</p>
                  <p><span className="text-white/70">Aircraft_Key</span> - Per-aircraft key (1, 2... if multiple)</p>
                  <p><span className="text-white/70">regis_no</span> - Registration / tail number (N-number)</p>
                  <p><span className="text-white/70">acft_make</span> - Manufacturer (CESSNA, BOEING, etc.)</p>
                  <p><span className="text-white/70">acft_model</span> - Model designation (172N, 767-322, etc.)</p>
                  <p><span className="text-white/70">dprt_apt_id, dest_apt_id</span> - Departure/destination airports</p>
                  <p><span className="text-white/70">icao24</span> - Derived from regis_no via N-number → ICAO24 mapping</p>
                </div>
              </div>

            </div>
          </CollapsibleSection>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-white/30 font-mono text-xs">
            Research supported by NASA | Dynamic Heterogeneous Flight Graphs for AAM Security
          </p>
        </div>
      </footer>
    </div>
  )
}
