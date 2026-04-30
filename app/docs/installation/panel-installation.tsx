import { useState, useRef } from "react";

const STEPS = [
  {
    id: "clone",
    title: "Clone the repository",
    icon: "git",
    description: "Pull the panel source from GitHub.",
    code: () => `git clone https://github.com/plywp/panel.git\ncd panel`,
  },
  {
    id: "deps",
    title: "Install dependencies",
    icon: "pkg",
    description:
      "Install Node.js packages using your preferred package manager.",
    code: () => `bun install --frozen-lockfile`,
  },
  {
    id: "adapter",
    title: "Configure adapter-node",
    icon: "cfg",
    description:
      "Swap adapter-auto for adapter-node so the build produces a standalone Node.js server.",
    code: () =>
      `bun x --yes sv add "sveltekit-adapter=adapter:node" --install bun`,
  },
  {
    id: "env",
    title: "Write .env",
    icon: "env",
    description:
      "Create the environment file with your database, auth, and SMTP settings.",
    code: (cfg) => `DATABASE_USER=${cfg.dbUser || "panel"}
DATABASE_PASSWORD=${cfg.dbPass || "your_db_password"}
DATABASE_HOST=${cfg.dbHost || "localhost"}
DATABASE_PORT=3306
DATABASE_NAME=${cfg.dbName || "panel"}

BETTER_AUTH_SECRET=${cfg.authSecret || "generate-a-48-char-random-secret"}

ORIGIN=${cfg.origin || "http://your-server-ip"}
BETTER_AUTH_URL=${cfg.origin || "http://your-server-ip"}

SMTP_HOST=${cfg.smtpHost || "smtp.example.com"}
SMTP_PORT=${cfg.smtpPort || "587"}
SMTP_SECURE=${cfg.smtpSecure || "false"}
SMTP_ENABLED=${cfg.smtpEnabled || "false"}
SMTP_USER=${cfg.smtpUser || ""}
SMTP_PASS=${cfg.smtpPass || ""}
SMTP_FROM="${cfg.smtpFrom || "no-reply@example.com"}"`,
  },
  {
    id: "migrate",
    title: "Run database migrations",
    icon: "db",
    description: "Apply Drizzle ORM migrations to set up all panel tables.",
    code: () => `bun run db:migrate`,
  },
  {
    id: "build",
    title: "Build for production",
    icon: "build",
    description:
      "Compile the SvelteKit app into a standalone Node.js server at build/index.js.",
    code: () => `bun run build`,
  },
  {
    id: "service",
    title: "Create systemd service",
    icon: "svc",
    description:
      "Register the panel as a system service so it starts automatically on boot.",
    code: (cfg) => `cat > /etc/systemd/system/plywp-panel.service <<'SERVICE'
[Unit]
Description=PlyWP Panel (SvelteKit / Node.js via Bun)
After=network.target mariadb.service
Wants=network.target

[Service]
Type=simple
User=plywp
WorkingDirectory=/var/www/plywp-panel
EnvironmentFile=/var/www/plywp-panel/.env
Environment=PORT=${cfg.port || "3000"}
Environment=HOST=127.0.0.1
ExecStart=/usr/local/bin/bun /var/www/plywp-panel/build/index.js
Restart=on-failure
RestartSec=5
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
SERVICE

systemctl daemon-reload
systemctl enable plywp-panel
systemctl start plywp-panel`,
  },
  {
    id: "nginx",
    title: "Configure reverse proxy",
    icon: "web",
    description:
      "Point Nginx to the panel's internal port. Includes large buffer sizes needed for better-auth session cookies.",
    code: (cfg) => `cat > /etc/nginx/sites-available/plywp.conf <<'NGINX'
server {
    listen 80;
    server_name _;

    proxy_buffer_size       128k;
    proxy_buffers           4 256k;
    proxy_busy_buffers_size 256k;

    location / {
        proxy_pass         http://127.0.0.1:${cfg.port || "3000"};
        proxy_http_version 1.1;
        proxy_set_header Upgrade    $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host               $host;
        proxy_set_header X-Real-IP          $remote_addr;
        proxy_set_header X-Forwarded-For    $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto  $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout    300s;
        proxy_send_timeout    300s;
        proxy_connect_timeout 10s;
    }
}
NGINX

rm -f /etc/nginx/sites-enabled/default
ln -sf /etc/nginx/sites-available/plywp.conf /etc/nginx/sites-enabled/plywp.conf
nginx -t && systemctl reload nginx`,
  },
  {
    id: "admin",
    title: "Create admin user",
    icon: "user",
    description: "Register the first admin account for the panel.",
    code: (cfg) => `cd /var/www/plywp-panel
ADMIN_NAME="${cfg.adminName || "Admin"}" \\
ADMIN_EMAIL="${cfg.adminEmail || "admin@example.com"}" \\
ADMIN_PASSWORD="${cfg.adminPass || "your_secure_password"}" \\
bun run add-user "${cfg.adminName || "Admin"}" "${cfg.adminEmail || "admin@example.com"}" "${cfg.adminPass || "your_secure_password"}" "admin" "${cfg.adminName || "Admin"} org"`,
  },
];

const icons = {
  git: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="18" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M6 9v6M18 9a9 9 0 0 0-9 9" />
    </svg>
  ),
  pkg: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    </svg>
  ),
  cfg: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
    </svg>
  ),
  env: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="16" y2="17" />
    </svg>
  ),
  db: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  build: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  svc: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  web: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  user: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
};

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <div style={{ position: "relative", marginTop: 12 }}>
      <pre
        style={{
          background: "var(--color-background-tertiary)",
          border: "0.5px solid var(--color-border-tertiary)",
          borderRadius: "var(--border-radius-md)",
          padding: "14px 16px",
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          lineHeight: 1.7,
          overflowX: "auto",
          margin: 0,
          color: "var(--color-text-primary)",
          whiteSpace: "pre",
        }}
      >
        {code}
      </pre>
      <button
        onClick={copy}
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          background: "var(--color-background-secondary)",
          border: "0.5px solid var(--color-border-secondary)",
          borderRadius: "var(--border-radius-md)",
          padding: "3px 10px",
          fontSize: 11,
          cursor: "pointer",
          color: copied
            ? "var(--color-text-success)"
            : "var(--color-text-secondary)",
          transition: "color 0.2s",
        }}
      >
        {copied ? "copied" : "copy"}
      </button>
    </div>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  placeholder,
  type = "text",
  hint,
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <label
        htmlFor={id}
        style={{
          fontSize: 12,
          color: "var(--color-text-secondary)",
          fontWeight: 500,
        }}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ fontSize: 13 }}
      />
      {hint && (
        <span style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>
          {hint}
        </span>
      )}
    </div>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        cursor: "pointer",
        fontSize: 13,
      }}
    >
      <div
        onClick={() => onChange(!checked)}
        style={{
          width: 32,
          height: 18,
          borderRadius: 9,
          background: checked ? "#1D9E75" : "var(--color-background-secondary)",
          border: "0.5px solid var(--color-border-secondary)",
          position: "relative",
          cursor: "pointer",
          transition: "background 0.2s",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 2,
            left: checked ? 14 : 2,
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: checked ? "#fff" : "var(--color-text-tertiary)",
            transition: "left 0.2s",
          }}
        />
      </div>
      <span style={{ color: "var(--color-text-secondary)" }}>{label}</span>
    </label>
  );
}

export default function PanelInstallation() {
  const [activeStep, setActiveStep] = useState(null);
  const [completed, setCompleted] = useState(new Set());
  const [cfg, setCfg] = useState({
    origin: "",
    port: "3000",
    dbUser: "panel",
    dbPass: "",
    dbHost: "localhost",
    dbName: "panel",
    authSecret: "",
    smtpHost: "",
    smtpPort: "587",
    smtpSecure: false,
    smtpEnabled: false,
    smtpUser: "",
    smtpPass: "",
    smtpFrom: "no-reply@example.com",
    adminName: "Admin",
    adminEmail: "",
    adminPass: "",
  });
  const [showConfig, setShowConfig] = useState(false);
  const set = (k) => (v) => setCfg((prev) => ({ ...prev, [k]: v }));

  const toggleComplete = (id) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const progress = Math.round((completed.size / STEPS.length) * 100);

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "1.5rem 0" }}>
      <h2 style={{ sr: "only", display: "none" }}>
        PlyWP Panel Installation Guide
      </h2>

      {/* Header */}
      <div style={{ marginBottom: "1.5rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: 8,
          }}
        >
          <div>
            <p
              style={{
                margin: 0,
                fontSize: 11,
                color: "var(--color-text-tertiary)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              PlyWP Docs
            </p>
            <h1
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 500,
                color: "var(--color-text-primary)",
              }}
            >
              Panel installation
            </h1>
          </div>
          <button
            onClick={() => setShowConfig(!showConfig)}
            style={{
              fontSize: 13,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            {showConfig ? "Hide" : "Configure"} your values
            <span style={{ fontSize: 11 }}>{showConfig ? "▲" : "▼"}</span>
          </button>
        </div>
        <p
          style={{
            margin: 0,
            fontSize: 14,
            color: "var(--color-text-secondary)",
            lineHeight: 1.6,
          }}
        >
          Step-by-step instructions for installing PlyWP Panel on a
          Debian/Ubuntu server. Fill in your configuration above to get
          personalized commands you can copy directly.
        </p>
      </div>

      {/* Config panel */}
      {showConfig && (
        <div
          style={{
            background: "var(--color-background-primary)",
            border: "0.5px solid var(--color-border-tertiary)",
            borderRadius: "var(--border-radius-lg)",
            padding: "1.25rem",
            marginBottom: "1.5rem",
          }}
        >
          <p style={{ margin: "0 0 1rem", fontSize: 13, fontWeight: 500 }}>
            Your configuration
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 12,
              marginBottom: 16,
            }}
          >
            <Field
              label="Panel public URL (ORIGIN)"
              id="origin"
              value={cfg.origin}
              onChange={set("origin")}
              placeholder="http://your-server-ip"
              hint="Must match exactly what users visit"
            />
            <Field
              label="Internal port"
              id="port"
              value={cfg.port}
              onChange={set("port")}
              placeholder="3000"
            />
          </div>

          <p
            style={{
              margin: "1rem 0 0.75rem",
              fontSize: 12,
              fontWeight: 500,
              color: "var(--color-text-secondary)",
              borderTop: "0.5px solid var(--color-border-tertiary)",
              paddingTop: 12,
            }}
          >
            Database
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 12,
              marginBottom: 16,
            }}
          >
            <Field
              label="DB user"
              id="dbUser"
              value={cfg.dbUser}
              onChange={set("dbUser")}
              placeholder="panel"
            />
            <Field
              label="DB password"
              id="dbPass"
              value={cfg.dbPass}
              onChange={set("dbPass")}
              placeholder="strong password"
              type="password"
            />
            <Field
              label="DB host"
              id="dbHost"
              value={cfg.dbHost}
              onChange={set("dbHost")}
              placeholder="localhost"
            />
            <Field
              label="DB name"
              id="dbName"
              value={cfg.dbName}
              onChange={set("dbName")}
              placeholder="panel"
            />
          </div>

          <p
            style={{
              margin: "1rem 0 0.75rem",
              fontSize: 12,
              fontWeight: 500,
              color: "var(--color-text-secondary)",
              borderTop: "0.5px solid var(--color-border-tertiary)",
              paddingTop: 12,
            }}
          >
            Auth
          </p>
          <Field
            label="BETTER_AUTH_SECRET (48 chars random)"
            id="authSecret"
            value={cfg.authSecret}
            onChange={set("authSecret")}
            placeholder="leave blank to generate automatically"
            hint="Generated by installer if empty"
          />

          <p
            style={{
              margin: "1rem 0 0.75rem",
              fontSize: 12,
              fontWeight: 500,
              color: "var(--color-text-secondary)",
              borderTop: "0.5px solid var(--color-border-tertiary)",
              paddingTop: 12,
            }}
          >
            SMTP
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 12,
              marginBottom: 12,
            }}
          >
            <Field
              label="SMTP host"
              id="smtpHost"
              value={cfg.smtpHost}
              onChange={set("smtpHost")}
              placeholder="smtp.example.com"
            />
            <Field
              label="SMTP port"
              id="smtpPort"
              value={cfg.smtpPort}
              onChange={set("smtpPort")}
              placeholder="587"
            />
            <Field
              label="SMTP user"
              id="smtpUser"
              value={cfg.smtpUser}
              onChange={set("smtpUser")}
              placeholder="you@example.com"
            />
            <Field
              label="SMTP from"
              id="smtpFrom"
              value={cfg.smtpFrom}
              onChange={set("smtpFrom")}
              placeholder="no-reply@example.com"
            />
          </div>
          <div
            style={{
              display: "flex",
              gap: 20,
              flexWrap: "wrap",
              marginBottom: 4,
            }}
          >
            <Toggle
              label="SMTP enabled"
              checked={cfg.smtpEnabled}
              onChange={set("smtpEnabled")}
            />
            <Toggle
              label="SMTP TLS (secure)"
              checked={cfg.smtpSecure}
              onChange={set("smtpSecure")}
            />
          </div>

          <p
            style={{
              margin: "1rem 0 0.75rem",
              fontSize: 12,
              fontWeight: 500,
              color: "var(--color-text-secondary)",
              borderTop: "0.5px solid var(--color-border-tertiary)",
              paddingTop: 12,
            }}
          >
            First admin user
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 12,
            }}
          >
            <Field
              label="Name"
              id="adminName"
              value={cfg.adminName}
              onChange={set("adminName")}
              placeholder="Admin"
            />
            <Field
              label="Email"
              id="adminEmail"
              value={cfg.adminEmail}
              onChange={set("adminEmail")}
              placeholder="admin@example.com"
            />
            <Field
              label="Password (min 8 chars)"
              id="adminPass"
              value={cfg.adminPass}
              onChange={set("adminPass")}
              placeholder="••••••••"
              type="password"
            />
          </div>
        </div>
      )}

      {/* Progress bar */}
      <div style={{ marginBottom: "1.5rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 6,
          }}
        >
          <span style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>
            {completed.size} of {STEPS.length} steps complete
          </span>
          <span
            style={{
              fontSize: 12,
              fontWeight: 500,
              color:
                progress === 100
                  ? "var(--color-text-success)"
                  : "var(--color-text-secondary)",
            }}
          >
            {progress}%
          </span>
        </div>
        <div
          style={{
            height: 4,
            background: "var(--color-background-secondary)",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: progress === 100 ? "#1D9E75" : "#378ADD",
              borderRadius: 2,
              transition: "width 0.3s ease",
            }}
          />
        </div>
      </div>

      {/* Steps */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {STEPS.map((step, idx) => {
          const isOpen = activeStep === step.id;
          const isDone = completed.has(step.id);
          return (
            <div
              key={step.id}
              style={{
                background: "var(--color-background-primary)",
                border: `0.5px solid ${isDone ? "var(--color-border-success)" : "var(--color-border-tertiary)"}`,
                borderRadius: "var(--border-radius-lg)",
                overflow: "hidden",
                transition: "border-color 0.2s",
              }}
            >
              {/* Step header */}
              <div
                onClick={() => setActiveStep(isOpen ? null : step.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "14px 16px",
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                {/* Step number / checkmark */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleComplete(step.id);
                  }}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: isDone
                      ? "#1D9E75"
                      : "var(--color-background-secondary)",
                    border: `0.5px solid ${isDone ? "#1D9E75" : "var(--color-border-secondary)"}`,
                    fontSize: 11,
                    fontWeight: 500,
                    cursor: "pointer",
                    color: isDone ? "#fff" : "var(--color-text-secondary)",
                    transition: "all 0.2s",
                  }}
                  title="Mark as complete"
                >
                  {isDone ? (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    idx + 1
                  )}
                </div>

                {/* Icon */}
                <span
                  style={{ color: "var(--color-text-tertiary)", flexShrink: 0 }}
                >
                  {icons[step.icon]}
                </span>

                {/* Title + desc */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {step.title}
                  </span>
                  {!isOpen && (
                    <span
                      style={{
                        fontSize: 12,
                        color: "var(--color-text-tertiary)",
                        marginLeft: 8,
                      }}
                    >
                      {step.description}
                    </span>
                  )}
                </div>

                {/* Chevron */}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-text-tertiary)"
                  strokeWidth="2"
                  style={{
                    transform: isOpen ? "rotate(180deg)" : "none",
                    transition: "transform 0.2s",
                    flexShrink: 0,
                  }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>

              {/* Step body */}
              {isOpen && (
                <div
                  style={{
                    padding: "0 16px 16px",
                    borderTop: "0.5px solid var(--color-border-tertiary)",
                  }}
                >
                  <p
                    style={{
                      fontSize: 13,
                      color: "var(--color-text-secondary)",
                      margin: "12px 0 4px",
                      lineHeight: 1.6,
                    }}
                  >
                    {step.description}
                  </p>

                  {step.id === "env" && !showConfig && (
                    <p
                      style={{
                        fontSize: 12,
                        color: "var(--color-text-tertiary)",
                        marginBottom: 8,
                      }}
                    >
                      Tip: click "Configure your values" above to fill in your
                      real credentials — the code block will update
                      automatically.
                    </p>
                  )}

                  <CodeBlock code={step.code(cfg)} />

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: 12,
                    }}
                  >
                    <button
                      onClick={() => {
                        toggleComplete(step.id);
                        if (!isDone) setActiveStep(STEPS[idx + 1]?.id ?? null);
                      }}
                      style={{ fontSize: 12 }}
                    >
                      {isDone ? "Mark incomplete" : "Mark complete →"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Prerequisites note */}
      <div
        style={{
          marginTop: "1.5rem",
          background: "var(--color-background-secondary)",
          borderRadius: "var(--border-radius-md)",
          padding: "1rem 1.25rem",
          fontSize: 13,
          color: "var(--color-text-secondary)",
          lineHeight: 1.7,
        }}
      >
        <p
          style={{
            margin: "0 0 4px",
            fontWeight: 500,
            color: "var(--color-text-primary)",
            fontSize: 13,
          }}
        >
          Prerequisites
        </p>
        MariaDB must be running and the{" "}
        <code
          style={{
            fontSize: 11,
            background: "var(--color-background-tertiary)",
            padding: "1px 5px",
            borderRadius: 4,
          }}
        >
          panel
        </code>{" "}
        database + user must exist before running migrations. Bun and Nginx
        should be installed. Run the full PlyWP installer script for a fully
        automated setup, or follow each step above manually.
      </div>

      {progress === 100 && (
        <div
          style={{
            marginTop: "1rem",
            background: "var(--color-background-success)",
            border: "0.5px solid var(--color-border-success)",
            borderRadius: "var(--border-radius-md)",
            padding: "1rem 1.25rem",
            fontSize: 13,
            color: "var(--color-text-success)",
            lineHeight: 1.7,
          }}
        >
          All steps complete. Open{" "}
          <strong>{cfg.origin || "http://your-server-ip"}</strong> in your
          browser to access the panel.
        </div>
      )}
    </div>
  );
}
