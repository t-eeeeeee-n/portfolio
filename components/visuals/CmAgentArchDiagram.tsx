const SUB_AGENTS: { x: number; centerX: number; label: string; tag: string }[] = [
  { x: 60, centerX: 125, label: 'Sub 1', tag: 'Plan' },
  { x: 200, centerX: 265, label: 'Sub 2', tag: 'Validate' },
  { x: 340, centerX: 405, label: 'Sub 3', tag: 'Edit' },
  { x: 480, centerX: 545, label: 'Sub 4', tag: 'Verify' },
  { x: 620, centerX: 685, label: 'Sub 5', tag: 'Report' },
  { x: 760, centerX: 825, label: 'Sub 6', tag: 'Audit' },
];

const AGENT_FILL = 'rgba(var(--accent-rgb), 0.06)';
const AGENT_STROKE = 'rgba(var(--accent-rgb), 0.45)';

export function CmAgentArchDiagram() {
  return (
    <div className="arch-frame">
      <div className="arch-bar">
        <span className="arch-bar-dot" />
        <span className="arch-bar-dot" />
        <span className="arch-bar-dot" />
        <span style={{ marginLeft: 4 }}>cm-agent · architecture.poc</span>
        <span className="arch-bar-status">● Main + 6 Sub</span>
      </div>
      <div className="arch-body">
        <svg
          viewBox="0 0 960 460"
          role="img"
          aria-labelledby="cm-agent-arch-title"
          style={{ width: '100%', minWidth: 720, height: 'auto', color: 'var(--d-text-1)' }}
        >
          <title id="cm-agent-arch-title">CM Agent PoC Architecture</title>
          <defs>
            <marker
              id="ca-arrow"
              viewBox="0 0 10 10"
              refX="10"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
            </marker>
          </defs>

          {/* Frontend */}
          <g>
            <rect
              x="380"
              y="16"
              width="200"
              height="50"
              rx="10"
              fill="var(--d-bg-2)"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <text
              x="480"
              y="40"
              textAnchor="middle"
              fontSize="13"
              fill="var(--d-text-0)"
              fontWeight={500}
              fontFamily="var(--font-sans)"
            >
              Frontend
            </text>
            <text
              x="480"
              y="56"
              textAnchor="middle"
              fontSize="11"
              fill="var(--d-text-2)"
              fontFamily="var(--font-mono)"
              letterSpacing="0.04em"
            >
              Next.js · 自動生成 TS SDK
            </text>
          </g>
          <line
            x1="480"
            y1="66"
            x2="480"
            y2="94"
            stroke="currentColor"
            strokeWidth="1.4"
            markerEnd="url(#ca-arrow)"
          />

          {/* API Gateway */}
          <g>
            <rect
              x="312"
              y="98"
              width="336"
              height="54"
              rx="10"
              fill="var(--d-bg-2)"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <text
              x="480"
              y="122"
              textAnchor="middle"
              fontSize="13"
              fill="var(--d-text-0)"
              fontWeight={500}
              fontFamily="var(--font-sans)"
            >
              FastAPI Gateway
            </text>
            <text
              x="480"
              y="140"
              textAnchor="middle"
              fontSize="11"
              fill="var(--d-text-2)"
              fontFamily="var(--font-mono)"
              letterSpacing="0.02em"
            >
              OpenAPI = Single Source · orval で TS SDK 自動生成
            </text>
          </g>
          <line
            x1="480"
            y1="152"
            x2="480"
            y2="180"
            stroke="currentColor"
            strokeWidth="1.4"
            markerEnd="url(#ca-arrow)"
          />

          {/* Main Agent (Orchestrator) — accent-highlighted */}
          <g>
            <rect
              x="350"
              y="184"
              width="260"
              height="56"
              rx="10"
              fill={AGENT_FILL}
              stroke="var(--accent)"
              strokeWidth="1.8"
            />
            <text
              x="480"
              y="210"
              textAnchor="middle"
              fontSize="13"
              fill="var(--accent)"
              fontWeight={600}
              fontFamily="var(--font-sans)"
            >
              Main Agent · Orchestrator
            </text>
            <text
              x="480"
              y="228"
              textAnchor="middle"
              fontSize="11"
              fill="var(--d-text-2)"
              fontFamily="var(--font-mono)"
              letterSpacing="0.02em"
            >
              責務ルーティング / コンテキスト共有
            </text>
          </g>

          {/* Bus to sub-agents */}
          <line x1="480" y1="240" x2="480" y2="262" stroke="currentColor" strokeWidth="1.4" />
          <line x1="125" y1="262" x2="825" y2="262" stroke="currentColor" strokeWidth="1.4" />
          {SUB_AGENTS.map((a) => (
            <line
              key={`down-${a.label}`}
              x1={a.centerX}
              y1="262"
              x2={a.centerX}
              y2="280"
              stroke="currentColor"
              strokeWidth="1.4"
              markerEnd="url(#ca-arrow)"
            />
          ))}

          {/* Sub Agents row */}
          {SUB_AGENTS.map((a) => (
            <g key={a.label}>
              <rect
                x={a.x}
                y="282"
                width="130"
                height="58"
                rx="8"
                fill={AGENT_FILL}
                stroke={AGENT_STROKE}
                strokeWidth="1.1"
              />
              <text
                x={a.centerX}
                y="304"
                textAnchor="middle"
                fontSize="13"
                fill="var(--d-text-0)"
                fontWeight={500}
                fontFamily="var(--font-sans)"
              >
                {a.label}
              </text>
              <text
                x={a.centerX}
                y="322"
                textAnchor="middle"
                fontSize="11"
                fill="var(--d-text-2)"
                fontFamily="var(--font-mono)"
                letterSpacing="0.04em"
              >
                {a.tag}
              </text>
            </g>
          ))}

          {/* Merge back */}
          {SUB_AGENTS.map((a) => (
            <line
              key={`up-${a.label}`}
              x1={a.centerX}
              y1="340"
              x2={a.centerX}
              y2="362"
              stroke="currentColor"
              strokeWidth="1.4"
            />
          ))}
          <line x1="125" y1="362" x2="825" y2="362" stroke="currentColor" strokeWidth="1.4" />
          <line
            x1="480"
            y1="362"
            x2="480"
            y2="386"
            stroke="currentColor"
            strokeWidth="1.4"
            markerEnd="url(#ca-arrow)"
          />

          {/* Proposal flow box */}
          <g>
            <rect
              x="60"
              y="390"
              width="840"
              height="56"
              rx="10"
              fill={AGENT_FILL}
              stroke="var(--accent)"
              strokeWidth="1.6"
            />
            <text
              x="80"
              y="406"
              fontSize="10"
              fill="var(--accent)"
              fontFamily="var(--font-mono)"
              letterSpacing="0.14em"
            >
              §B PROPOSAL FLOW · HUMAN-IN-THE-LOOP
            </text>
            <text
              x="170"
              y="432"
              fontSize="13"
              fill="var(--d-text-0)"
              fontWeight={500}
              fontFamily="var(--font-sans)"
            >
              PLAN
            </text>
            <text x="240" y="432" fontSize="13" fill="var(--accent)" fontFamily="var(--font-mono)">
              →
            </text>
            <text
              x="290"
              y="432"
              fontSize="13"
              fill="var(--d-text-0)"
              fontWeight={500}
              fontFamily="var(--font-sans)"
            >
              DIFF
            </text>
            <text x="360" y="432" fontSize="13" fill="var(--accent)" fontFamily="var(--font-mono)">
              →
            </text>
            <text
              x="410"
              y="432"
              fontSize="13"
              fill="var(--d-text-0)"
              fontWeight={500}
              fontFamily="var(--font-sans)"
            >
              COMMANDS
            </text>
            <text x="538" y="432" fontSize="13" fill="var(--accent)" fontFamily="var(--font-mono)">
              →
            </text>
            <text
              x="588"
              y="432"
              fontSize="13"
              fill="var(--d-text-0)"
              fontWeight={500}
              fontFamily="var(--font-sans)"
            >
              VERIFICATION
            </text>
          </g>
        </svg>

        <div className="arch-foot">
          <span className="arch-foot-mark">{'// observability'}</span>
          <span>trace_id (W3C Trace Context) で Frontend → API → Agent → LLM → Queue まで全層貫通</span>
          <span className="arch-foot-end">trace 9f2…a1c</span>
        </div>
      </div>
    </div>
  );
}
