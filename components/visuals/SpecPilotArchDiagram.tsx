const AGENT_FILL = 'rgba(var(--accent-rgb), 0.06)';
const AGENT_STROKE = 'rgba(var(--accent-rgb), 0.45)';

export function SpecPilotArchDiagram() {
  return (
    <div className="arch-frame">
      <div className="arch-bar">
        <span className="arch-bar-dot" />
        <span className="arch-bar-dot" />
        <span className="arch-bar-dot" />
        <span style={{ marginLeft: 4 }}>specpilot · architecture.flow</span>
        <span className="arch-bar-status">● 4 agents</span>
      </div>
      <div className="arch-body">
        <svg
          viewBox="0 0 960 360"
          role="img"
          aria-labelledby="specpilot-arch-title"
          style={{ width: '100%', minWidth: 640, height: 'auto', color: 'var(--d-text-1)' }}
        >
          <title id="specpilot-arch-title">SpecPilot Architecture</title>
          <defs>
            <marker
              id="sp-arrow"
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

          {/* Input */}
          <g>
            <rect
              x="20"
              y="140"
              width="138"
              height="64"
              rx="10"
              fill="var(--d-bg-2)"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <text
              x="89"
              y="168"
              textAnchor="middle"
              fontSize="13"
              fill="var(--d-text-0)"
              fontWeight={500}
              fontFamily="var(--font-sans)"
            >
              議事録 / Input
            </text>
            <text
              x="89"
              y="186"
              textAnchor="middle"
              fontSize="11"
              fill="var(--d-text-2)"
              fontFamily="var(--font-mono)"
              letterSpacing="0.04em"
            >
              transcript.md
            </text>
          </g>

          <line
            x1="160"
            y1="172"
            x2="194"
            y2="172"
            stroke="currentColor"
            strokeWidth="1.4"
            markerEnd="url(#sp-arrow)"
          />

          {/* Multi-agent Pipeline */}
          <g>
            <rect
              x="198"
              y="36"
              width="306"
              height="284"
              rx="14"
              fill="none"
              stroke={AGENT_STROKE}
              strokeWidth="1.2"
              strokeDasharray="4 4"
            />
            <text
              x="220"
              y="26"
              fontSize="10.5"
              fill="var(--accent)"
              fontFamily="var(--font-mono)"
              letterSpacing="0.12em"
            >
              §A AGENT PIPELINE
            </text>

            {[
              { y: 64, name: 'Extractor', sub: 'Claude · 抽出' },
              { y: 132, name: 'Question', sub: 'GPT-4o · 未決事項' },
              { y: 200, name: 'Designer', sub: 'Gemini · 設計化' },
              { y: 268, name: 'Linter', sub: 'Claude · 検証' },
            ].map((a) => (
              <g key={a.name}>
                <rect
                  x="220"
                  y={a.y - 22}
                  width="262"
                  height="52"
                  rx="8"
                  fill={AGENT_FILL}
                  stroke={AGENT_STROKE}
                  strokeWidth="1.1"
                />
                <text
                  x="238"
                  y={a.y - 2}
                  fontSize="13"
                  fill="var(--d-text-0)"
                  fontWeight={500}
                  fontFamily="var(--font-sans)"
                >
                  {a.name}
                </text>
                <text
                  x="238"
                  y={a.y + 16}
                  fontSize="11"
                  fill="var(--d-text-2)"
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.02em"
                >
                  {a.sub}
                </text>
                <circle cx="466" cy={a.y - 4} r="2.5" fill="var(--accent)" />
              </g>
            ))}
          </g>

          <line
            x1="506"
            y1="172"
            x2="540"
            y2="172"
            stroke="currentColor"
            strokeWidth="1.4"
            markerEnd="url(#sp-arrow)"
          />

          {/* Review Card */}
          <g>
            <rect
              x="544"
              y="130"
              width="186"
              height="86"
              rx="10"
              fill="var(--d-bg-2)"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <text
              x="637"
              y="160"
              textAnchor="middle"
              fontSize="13"
              fill="var(--d-text-0)"
              fontWeight={500}
              fontFamily="var(--font-sans)"
            >
              決定事項カード
            </text>
            <text
              x="637"
              y="180"
              textAnchor="middle"
              fontSize="11"
              fill="var(--d-text-2)"
              fontFamily="var(--font-mono)"
              letterSpacing="0.04em"
            >
              Human-in-the-Loop
            </text>
            <text
              x="637"
              y="198"
              textAnchor="middle"
              fontSize="10.5"
              fill="var(--d-text-3)"
              fontFamily="var(--font-mono)"
              letterSpacing="0.04em"
            >
              確定 / 仮置き / 差戻し
            </text>
          </g>

          <line
            x1="732"
            y1="172"
            x2="766"
            y2="172"
            stroke="currentColor"
            strokeWidth="1.4"
            markerEnd="url(#sp-arrow)"
          />

          {/* Output */}
          <g>
            <rect
              x="770"
              y="140"
              width="170"
              height="64"
              rx="10"
              fill={AGENT_FILL}
              stroke="var(--accent)"
              strokeWidth="1.6"
            />
            <text
              x="855"
              y="168"
              textAnchor="middle"
              fontSize="13"
              fill="var(--accent)"
              fontWeight={600}
              fontFamily="var(--font-sans)"
            >
              設計書 / vibe pack
            </text>
            <text
              x="855"
              y="186"
              textAnchor="middle"
              fontSize="11"
              fill="var(--d-text-2)"
              fontFamily="var(--font-mono)"
              letterSpacing="0.06em"
            >
              output.zip
            </text>
          </g>
        </svg>

        <div className="arch-foot">
          <span className="arch-foot-mark">{'// context'}</span>
          <span>意思決定ログ D-XXXX / ADR を全 Agent に毎回渡す</span>
          <span className="arch-foot-end">trace 9f2…a1c</span>
        </div>
      </div>
    </div>
  );
}
