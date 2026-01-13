export type PatternType = 'snapshot' | 'event-driven' | 'hybrid';

export interface Citation {
  id: string;
  authors: string;
  year: number;
  title: string;
  venue?: string;
  description: string;
  pattern: PatternType;
  isPrimary: boolean;
  url: string;
}

export interface CitationCategory {
  id: string;
  title: string;
  citations: Citation[];
}

export const citationCategories: CitationCategory[] = [
  {
    id: 'surveys',
    title: 'Surveys & Taxonomies',
    citations: [
      {
        id: 'feng-2024',
        authors: 'Feng et al.',
        year: 2024,
        title: 'A Comprehensive Survey of Dynamic Graph Neural Networks',
        description: 'Review of 81 DGNN models with taxonomy covering DTDGs (snapshots) and CTDGs (continuous events). Identifies heterogeneous as open challenge.',
        pattern: 'hybrid',
        isPrimary: false,
        url: 'https://arxiv.org/abs/2405.00476'
      },
      {
        id: 'kazemi-2020',
        authors: 'Kazemi et al.',
        year: 2020,
        title: 'Representation Learning for Dynamic Graphs: A Survey',
        venue: 'JMLR',
        description: 'Foundational 73-page survey using encoder-decoder framework. Covers dynamic KGs and heterogeneous information networks.',
        pattern: 'snapshot',
        isPrimary: false,
        url: 'https://arxiv.org/abs/1905.11485'
      },
      {
        id: 'cai-2023',
        authors: 'Cai et al.',
        year: 2023,
        title: 'Temporal Knowledge Graph Completion: A Survey',
        venue: 'IJCAI-23',
        description: 'First comprehensive TKG survey with six-category taxonomy. Flight networks as TKGs with entities (airports, airlines, flights) directly maps to this taxonomy.',
        pattern: 'event-driven',
        isPrimary: false,
        url: 'https://www.ijcai.org/proceedings/2023/0734.pdf'
      },
      {
        id: 'wang-2022',
        authors: 'Wang et al.',
        year: 2022,
        title: 'A Survey on Heterogeneous Graph Embedding',
        venue: 'IEEE Trans. Big Data',
        description: 'Critical reference with section on Dynamic HG Embedding. DyHAN/DyHATR methods use hierarchical attention applicable to flight graphs.',
        pattern: 'snapshot',
        isPrimary: false,
        url: 'https://arxiv.org/abs/2011.14867'
      },
      {
        id: 'longa-2023',
        authors: 'Longa et al.',
        year: 2023,
        title: 'Graph Neural Networks for Temporal Graphs',
        venue: 'TMLR',
        description: 'Formalizes temporal graph learning settings. Provides vocabulary to justify choosing between snapshot-based and continuous-time modeling for OpenSky-style irregular data.',
        pattern: 'hybrid',
        isPrimary: false,
        url: 'https://arxiv.org/abs/2302.01018'
      },
      {
        id: 'barros-2021',
        authors: 'Barros et al.',
        year: 2021,
        title: 'A Survey on Embedding Dynamic Graphs',
        venue: 'ACM Computing Surveys',
        description: 'Covers incremental and streaming embedding strategies suitable for large-scale, evolving aviation graphs built from OpenSky and accident data.',
        pattern: 'event-driven',
        isPrimary: false,
        url: 'https://dl.acm.org/doi/10.1145/3483595'
      }
    ]
  },
  {
    id: 'tkg-methods',
    title: 'Dynamic Multi-Relational / TKG Methods',
    citations: [
      {
        id: 'trivedi-2017',
        authors: 'Trivedi et al.',
        year: 2017,
        title: 'Know-Evolve: Deep Temporal Reasoning for Dynamic KGs',
        venue: 'ICML',
        description: 'Models fact occurrence as multivariate temporal point process. Excellent for irregular aviation events—point processes ideal for flight arrivals, delays at arbitrary continuous times.',
        pattern: 'event-driven',
        isPrimary: true,
        url: 'https://arxiv.org/abs/1705.05742'
      },
      {
        id: 'dasgupta-2018',
        authors: 'Dasgupta et al.',
        year: 2018,
        title: 'HyTE: Hyperplane-based Temporally aware KG Embedding',
        venue: 'EMNLP',
        description: 'Associates each timestamp with a hyperplane for temporal reasoning. Handles time-varying fact validity (e.g., seasonal flight schedules).',
        pattern: 'snapshot',
        isPrimary: false,
        url: 'https://aclanthology.org/D18-1225/'
      },
      {
        id: 'jin-2020',
        authors: 'Jin et al.',
        year: 2020,
        title: 'RE-NET: Autoregressive Structure Inference over TKGs',
        venue: 'EMNLP',
        description: 'GRU + R-GCN for TKG sequences. Highly relevant—neighborhood aggregator captures structural dependencies (shared airports); autoregressive formulation predicts future states.',
        pattern: 'hybrid',
        isPrimary: true,
        url: 'https://arxiv.org/abs/1904.05530'
      },
      {
        id: 'li-2021',
        authors: 'Li et al.',
        year: 2021,
        title: 'RE-GCN: Evolutional Representation Learning',
        venue: 'SIGIR',
        description: 'Relation-aware GCN + GRU with static entity constraints. 82x speedup enables large aviation networks. Static constraints perfect for inherent aircraft/airport properties.',
        pattern: 'hybrid',
        isPrimary: false,
        url: 'https://arxiv.org/abs/2104.10353'
      },
      {
        id: 'han-2021',
        authors: 'Han et al.',
        year: 2021,
        title: 'TANGO: Learning Neural ODEs for Forecasting on TKGs',
        venue: 'EMNLP',
        description: 'First Neural ODEs for multi-relational GCNs. Explicitly handles irregular/asynchronous data; graph transition layer maps to flight additions/cancellations.',
        pattern: 'event-driven',
        isPrimary: false,
        url: 'https://aclanthology.org/2021.emnlp-main.658/'
      },
      {
        id: 'wu-2020',
        authors: 'Wu et al.',
        year: 2020,
        title: 'TeMP: Temporal Message Passing for TKG Completion',
        venue: 'EMNLP',
        description: 'GNN message passing + temporal encoder with frequency-based gating. Robust to sparse and irregular event patterns in flight graphs.',
        pattern: 'hybrid',
        isPrimary: false,
        url: 'https://aclanthology.org/2020.emnlp-main.462/'
      },
      {
        id: 'zhu-2021-cygnet',
        authors: 'Zhu et al.',
        year: 2021,
        title: 'CyGNet: Learning from History with Copy-Generation',
        venue: 'AAAI',
        description: 'Time-aware copy mechanism for recurring patterns. Could link current flight graph state to past high-risk patterns and provide interpretable risk alerts.',
        pattern: 'snapshot',
        isPrimary: false,
        url: 'https://ojs.aaai.org/index.php/AAAI/article/view/16604'
      }
    ]
  },
  {
    id: 'heterogeneous-methods',
    title: 'Dynamic Heterogeneous Graph Methods',
    citations: [
      {
        id: 'fan-2022',
        authors: 'Fan et al.',
        year: 2022,
        title: 'HTGNN: Heterogeneous Temporal Graph Neural Network',
        venue: 'SDM',
        description: 'Hierarchical aggregation: intra-relation → inter-relation → temporal. Could model flights connecting aircraft to airports with weather context; relation-aware edge handling.',
        pattern: 'hybrid',
        isPrimary: true,
        url: 'https://arxiv.org/abs/2110.13889'
      },
      {
        id: 'yang-2020',
        authors: 'Yang et al.',
        year: 2020,
        title: 'DyHAN: Dynamic Heterogeneous Graph Embedding',
        venue: 'ECIR',
        description: 'Three-level hierarchical attention: node-level, edge-level, temporal-level. Well-suited for weighting aircraft relevance, balancing routes vs. weather edges.',
        pattern: 'hybrid',
        isPrimary: false,
        url: 'https://link.springer.com/chapter/10.1007/978-3-030-45442-5_53'
      },
      {
        id: 'xue-2021',
        authors: 'Xue et al.',
        year: 2021,
        title: 'DyHATR: Hierarchical Attention and Temporal RNN',
        venue: 'ECML-PKDD',
        description: 'RNN captures temporal patterns (daily/weekly schedules, evolving weather); hierarchical attention handles aircraft-airport-weather node types.',
        pattern: 'hybrid',
        isPrimary: false,
        url: 'https://arxiv.org/abs/2004.01024'
      },
      {
        id: 'cikm-2023',
        authors: 'CIKM 2023',
        year: 2023,
        title: 'STHN: Simplifying Temporal Heterogeneous Network',
        description: 'Continuous-time with type encoding + relative time encoding. Transformer with patching for long histories. Type encoding distinguishes flight vs. weather vs. operational edges.',
        pattern: 'event-driven',
        isPrimary: false,
        url: 'https://dl.acm.org/doi/10.1145/3583780.3615059'
      },
      {
        id: 'didi-2020',
        authors: 'DiDi Research',
        year: 2020,
        title: 'Dynamic Heterogeneous GNN for Real-time Event Prediction',
        venue: 'KDD',
        description: 'Event-driven graph construction with real-time environmental context. Directly applicable—mirrors flight network needs where each flight has dynamic environmental context.',
        pattern: 'event-driven',
        isPrimary: false,
        url: 'https://www.kdd.org/kdd2020/accepted-papers'
      },
      {
        id: 'kumar-2019',
        authors: 'Kumar et al.',
        year: 2019,
        title: 'JODIE: Predicting Dynamic Embedding Trajectory',
        venue: 'KDD',
        description: "Coupled RNNs for bipartite temporal networks. Could forecast how a flight's risk state evolves between irregular OpenSky messages and interactions with airspace.",
        pattern: 'event-driven',
        isPrimary: false,
        url: 'https://cs.stanford.edu/~srijan/pubs/jodie-kdd2019.pdf'
      }
    ]
  },
  {
    id: 'general-gnn',
    title: 'General Dynamic GNN Methods',
    citations: [
      {
        id: 'rossi-2020',
        authors: 'Rossi et al.',
        year: 2020,
        title: 'TGN: Temporal Graph Networks',
        venue: 'ICML Workshop',
        description: 'Generic framework with memory modules, message functions, memory updater, and temporal graph attention. Unifies JODIE, TGAT, DyRep. High potential for irregular aircraft updates.',
        pattern: 'event-driven',
        isPrimary: true,
        url: 'https://arxiv.org/abs/2006.10637'
      },
      {
        id: 'xu-2020',
        authors: 'Xu et al.',
        year: 2020,
        title: 'TGAT: Inductive Representation Learning on Temporal Graphs',
        venue: 'ICLR',
        description: "Temporal graph attention with functional time encoding (Bochner's theorem). Elegant time encoding for irregular observations; inductive to unseen nodes.",
        pattern: 'event-driven',
        isPrimary: false,
        url: 'https://arxiv.org/abs/2002.07962'
      },
      {
        id: 'pareja-2020',
        authors: 'Pareja et al.',
        year: 2020,
        title: 'EvolveGCN: Evolving Graph Convolutional Networks',
        venue: 'AAAI',
        description: 'RNN evolves GNN weight matrices rather than node embeddings. Handles changing node sets (aircraft entering/leaving airspace).',
        pattern: 'hybrid',
        isPrimary: false,
        url: 'https://arxiv.org/abs/1902.10191'
      },
      {
        id: 'sankar-2020',
        authors: 'Sankar et al.',
        year: 2020,
        title: 'DySAT: Deep Neural Representation via Self-Attention',
        venue: 'WSDM',
        description: 'Joint self-attention along structural (within snapshots) and temporal (across snapshots) dimensions. Principled dual-attention architecture.',
        pattern: 'hybrid',
        isPrimary: false,
        url: 'https://arxiv.org/abs/1812.09430'
      },
      {
        id: 'trivedi-2019',
        authors: 'Trivedi et al.',
        year: 2019,
        title: 'DyRep: Learning Representations over Dynamic Graphs',
        venue: 'ICLR',
        description: 'Couples temporal point processes with neural embedding updates. Distinguishes transient proximity events from persistent structural relations.',
        pattern: 'event-driven',
        isPrimary: false,
        url: 'https://openreview.net/forum?id=HyePrhR5KX'
      },
      {
        id: 'you-2022',
        authors: 'You et al.',
        year: 2022,
        title: 'ROLAND: Graph Learning Framework for Dynamic Graphs',
        venue: 'KDD',
        description: 'Converts any static GNN to dynamic via hierarchical node states. Scales to 56M edges; meta-learning aids adaptation to new patterns.',
        pattern: 'snapshot',
        isPrimary: false,
        url: 'https://arxiv.org/abs/2208.07239'
      }
    ]
  },
  {
    id: 'aviation',
    title: 'Aviation & Transportation Applications',
    citations: [
      {
        id: 'zhu-2022-gat',
        authors: 'Zhu et al.',
        year: 2022,
        title: 'GAT-LSTM for Short-Term Nationwide Airport Throughput Prediction',
        description: 'GAT-LSTM predicts throughput for 65 Chinese airports. Directly relevant—demonstrates GNNs on air traffic with ADS-B data; integrates weather and scheduled demand.',
        pattern: 'hybrid',
        isPrimary: true,
        url: 'https://www.frontiersin.org/journals/artificial-intelligence/articles/10.3389/frai.2022.884485/full'
      },
      {
        id: 'xu-2023',
        authors: 'Xu et al.',
        year: 2023,
        title: 'BEGAN: Air Traffic Density Prediction Using Bayesian Ensemble GAT',
        description: 'P-GAT + LSTM with Bayesian uncertainty for gridded airspace near KATL, KMCO. Highly relevant for terminal operations and safety-critical predictions.',
        pattern: 'hybrid',
        isPrimary: false,
        url: 'https://www.sciencedirect.com/science/article/pii/S0968090X23002140'
      },
      {
        id: 'zeng-2023',
        authors: 'Zeng et al.',
        year: 2023,
        title: 'S-STGCNN: Aircraft Trajectory Prediction for Terminal Airspace',
        description: 'Social Spatiotemporal GCN with DTW clustering. Directly applicable—models aircraft-to-aircraft interactions as graph edges at 5-second ADS-B intervals.',
        pattern: 'hybrid',
        isPrimary: false,
        url: 'https://arc.aiaa.org/doi/10.2514/1.I011181'
      },
      {
        id: 'huang-2025',
        authors: 'Huang et al.',
        year: 2025,
        title: 'Dynamic Multi-Graph Convolutional for Airport Arrival Flow',
        venue: 'Aerospace',
        description: 'Multiple relation graphs with adaptive fusion and temporal attention. Directly informs how to construct multiple relation layers (proximity, shared routes, shared airlines).',
        pattern: 'hybrid',
        isPrimary: false,
        url: 'https://doi.org/10.3390/aerospace12050395'
      },
      {
        id: 'liang-2022',
        authors: 'Liang et al.',
        year: 2022,
        title: 'ST-MRGNN: Multi-Relational Spatiotemporal GNN',
        venue: 'Transportation Research Part C',
        description: 'Multi-relational framework for multimodal transport. Highly transferable—could model aircraft types, flight phases, airspace sectors with cross-modal attention.',
        pattern: 'hybrid',
        isPrimary: false,
        url: 'https://arxiv.org/abs/2112.08078'
      }
    ]
  }
];

// Computed counts
export const patternCounts = {
  snapshot: citationCategories.flatMap(c => c.citations).filter(c => c.pattern === 'snapshot').length,
  'event-driven': citationCategories.flatMap(c => c.citations).filter(c => c.pattern === 'event-driven').length,
  hybrid: citationCategories.flatMap(c => c.citations).filter(c => c.pattern === 'hybrid').length,
  get total() { return this.snapshot + this['event-driven'] + this.hybrid; }
};

// URL display helper
export function getDisplayUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    let display = urlObj.hostname.replace('www.', '');
    const path = urlObj.pathname;
    if (path && path !== '/') {
      const shortPath = path.length > 20 ? path.substring(0, 17) + '...' : path;
      display += shortPath;
    }
    return display;
  } catch {
    return url;
  }
}
