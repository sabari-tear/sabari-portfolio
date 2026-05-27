// Decap CMS Preview Templates
// These render a styled live preview in the right pane of the CMS editor.

var style = {
  page:    { fontFamily: "'Inter', sans-serif", background: "#0f172a", color: "#94a3b8", minHeight: "100vh", padding: "3rem 2.5rem", lineHeight: "1.75" },
  name:    { fontSize: "3rem", fontWeight: 700, color: "#e2e8f0", lineHeight: 1.1, marginBottom: "0.75rem" },
  role:    { fontSize: "1.25rem", fontWeight: 600, color: "#e2e8f0", marginBottom: "1rem" },
  intro:   { fontSize: "1rem", color: "#94a3b8", marginBottom: "1.5rem", maxWidth: "340px" },
  label:   { fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#94a3b8", marginBottom: "0.25rem" },
  link:    { color: "#2dd4bf", textDecoration: "none" },
  pill:    { display: "inline-block", background: "rgba(45,212,191,0.1)", color: "#2dd4bf", borderRadius: "9999px", padding: "0.2rem 0.75rem", fontSize: "0.75rem", marginRight: "0.4rem", marginBottom: "0.4rem" },
  card:    { background: "rgba(255,255,255,0.04)", borderRadius: "0.75rem", padding: "1.5rem", marginBottom: "1.5rem", border: "1px solid rgba(255,255,255,0.07)" },
  h2:      { fontSize: "1rem", fontWeight: 600, color: "#e2e8f0", marginBottom: "0.25rem" },
  muted:   { color: "#94a3b8", fontSize: "0.875rem" },
  divider: { borderTop: "1px solid rgba(255,255,255,0.08)", margin: "2rem 0" },
  section: { marginBottom: "3rem" },
  heading: { fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#64748b", marginBottom: "1.5rem" }
};

// ── Helper ─────────────────────────────────────────────────────────────────
function pills(list) {
  if (!list || !list.toJS) return null;
  return h("div", { style: { marginTop: "0.75rem" } },
    list.toJS().map(function(t, i) { return h("span", { key: i, style: style.pill }, t); })
  );
}

// ── 1. Blog Post Preview ───────────────────────────────────────────────────
var BlogPreview = createClass({
  render: function () {
    var entry = this.props.entry;
    var title   = entry.getIn(["data", "title"])   || "Post title";
    var date    = entry.getIn(["data", "date"])    || "";
    var summary = entry.getIn(["data", "summary"]) || "";
    var tags    = entry.getIn(["data", "tags"]);
    var body    = this.props.widgetFor("body");

    return h("div", { style: style.page },
      h("p", { style: Object.assign({}, style.muted, { marginBottom: "0.5rem" }) }, date),
      h("h1", { style: Object.assign({}, style.name, { fontSize: "2.25rem", marginBottom: "1rem" }) }, title),
      summary && h("p", { style: Object.assign({}, style.intro, { fontStyle: "italic", marginBottom: "1.5rem" }) }, summary),
      tags && h("div", { style: { marginBottom: "1.5rem" } },
        tags.toJS().map(function(t, i) { return h("span", { key: i, style: style.pill }, t); })
      ),
      h("hr", { style: style.divider }),
      h("div", { style: { color: "#cbd5e1" } }, body)
    );
  }
});

// ── 2. Name Card Preview ───────────────────────────────────────────────────
var IdentityPreview = createClass({
  render: function () {
    var entry   = this.props.entry;
    var site    = entry.getIn(["data", "site"]);
    var socials = entry.getIn(["data", "socialLinks"]);

    var name    = site ? site.get("name")   : "Your Name";
    var role    = site ? site.get("role")   : "Your Role";
    var intro   = site ? site.get("intro")  : "";
    var email   = site ? site.get("email")  : "";
    var phone   = site ? site.get("phone")  : "";
    var avatar  = site ? site.get("authorAvatar") : "";

    return h("div", { style: style.page },
      h("div", { style: { display: "flex", gap: "1.5rem", alignItems: "flex-start", marginBottom: "2rem" } },
        avatar && h("img", { src: avatar, style: { width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(255,255,255,0.1)" } }),
        h("div", null,
          h("h1", { style: style.name }, name),
          h("p",  { style: style.role }, role),
          h("p",  { style: style.intro }, intro)
        )
      ),
      h("hr", { style: style.divider }),
      h("div", { style: style.section },
        h("p", { style: style.heading }, "Contact"),
        email && h("p", { style: style.muted }, "✉ ", email),
        phone && h("p", { style: style.muted }, "✆ ", phone)
      ),
      socials && h("div", { style: style.section },
        h("p", { style: style.heading }, "Social Links"),
        socials.toJS().map(function(s, i) {
          return h("p", { key: i, style: { marginBottom: "0.25rem" } },
            h("a", { href: s.href, style: style.link }, s.label, " ↗")
          );
        })
      )
    );
  }
});

// ── 3. About Preview ──────────────────────────────────────────────────────
var AboutPreview = createClass({
  render: function () {
    var entry = this.props.entry;
    var aboutText = entry.getIn(["data", "aboutText"]) || "";
    var highlights = entry.getIn(["data", "aboutHighlights"]);
    var activeHighlights = highlights ? highlights.toJS().filter(function (item) { return item && item.trim().length > 0; }) : [];

    var paragraphs = aboutText
      .split(/\n\s*\n/)
      .map(function (p) { return p.trim(); })
      .filter(function (p) { return p.length > 0; });

    return h("div", { style: style.page },
      h("p", { style: style.heading }, "About"),
      paragraphs.map(function(p, i) {
        return h("p", { key: i, style: { marginBottom: "1rem", color: "#94a3b8" } }, p);
      }),
      h("hr", { style: style.divider }),
      h("p", { style: style.heading }, "Highlight Phrases"),
      activeHighlights.length > 0
        ? h("div", null,
            activeHighlights.map(function(item, i) {
              return h("span", { key: i, style: style.pill }, item);
            })
          )
        : h("p", { style: style.muted }, "No highlight phrases configured.")
    );
  }
});

// ── 4. Experience Preview ─────────────────────────────────────────────────
var ExperiencePreview = createClass({
  render: function () {
    var entry       = this.props.entry;
    var experiences = entry.getIn(["data", "experiences"]);

    return h("div", { style: style.page },
      h("p", { style: style.heading }, "Experience"),
      experiences && experiences.toJS().map(function(exp, i) {
        return h("div", { key: i, style: style.card },
          h("p", { style: Object.assign({}, style.muted, { marginBottom: "0.25rem" }) }, exp.years),
          h("p", { style: style.h2 }, exp.role,
            exp.company && h("span", { style: { color: "#2dd4bf", fontWeight: 400 } }, " @ " + exp.company)
          ),
          h("p", { style: Object.assign({}, style.muted, { marginTop: "0.75rem", marginBottom: "0.75rem" }) }, exp.description),
          exp.technologies && h("div", null,
            exp.technologies.map(function(t, j) { return h("span", { key: j, style: style.pill }, t); })
          )
        );
      })
    );
  }
});

// ── 5. Projects Preview ───────────────────────────────────────────────────
var ProjectsPreview = createClass({
  render: function () {
    var entry    = this.props.entry;
    var featured = entry.getIn(["data", "featuredProjects"]);
    var archive  = entry.getIn(["data", "archiveProjects"]);

    return h("div", { style: style.page },
      h("p", { style: style.heading }, "Featured Projects"),
      featured && featured.toJS().map(function(p, i) {
        return h("div", { key: i, style: style.card },
          p.image && h("img", { src: p.image, style: { width: "100%", height: "160px", objectFit: "cover", borderRadius: "0.5rem", marginBottom: "1rem" } }),
          h("p", { style: style.muted }, p.year),
          h("p", { style: style.h2 },
            h("a", { href: p.href, style: style.link }, p.name, " ↗"),
            p.company && h("span", { style: { color: "#94a3b8", fontWeight: 400 } }, " · " + p.company)
          ),
          h("p", { style: Object.assign({}, style.muted, { marginTop: "0.5rem" }) }, p.summary),
          p.technologies && h("div", { style: { marginTop: "0.75rem" } },
            p.technologies.map(function(t, j) { return h("span", { key: j, style: style.pill }, t); })
          )
        );
      }),
      h("hr", { style: style.divider }),
      h("p", { style: style.heading }, "Archive Projects"),
      archive && h("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" } },
        archive.toJS().map(function(p, i) {
          return h("tr", { key: i, style: { borderBottom: "1px solid rgba(255,255,255,0.06)" } },
            h("td", { style: { padding: "0.6rem 0.5rem", color: "#2dd4bf", whiteSpace: "nowrap" } }, p.year),
            h("td", { style: { padding: "0.6rem 0.5rem", color: "#e2e8f0", fontWeight: 500 } },
              p.href ? h("a", { href: p.href, style: style.link }, p.name) : p.name
            ),
            h("td", { style: { padding: "0.6rem 0.5rem", color: "#94a3b8" } }, p.company || ""),
            h("td", { style: { padding: "0.6rem 0.5rem", color: "#64748b" } },
              p.technologies ? p.technologies.slice(0, 3).join(", ") : ""
            )
          );
        })
      )
    );
  }
});

// ── 6. Settings Preview ───────────────────────────────────────────────────
var SettingsPreview = createClass({
  render: function () {
    var entry = this.props.entry;
    var seo = entry.getIn(["data", "seo"]);
    var nav = entry.getIn(["data", "navigation"]);
    var labels = entry.getIn(["data", "labels"]);

    return h("div", { style: style.page },
      h("p", { style: style.heading }, "SEO"),
      seo && h("div", { style: style.card },
        h("p", { style: style.h2 }, "Home"),
        h("p", { style: style.muted }, seo.getIn(["home", "title"]) || ""),
        h("p", { style: Object.assign({}, style.muted, { marginTop: "0.5rem" }) }, seo.getIn(["home", "description"]) || "")
      ),
      seo && h("div", { style: style.card },
        h("p", { style: style.h2 }, "Blog"),
        h("p", { style: style.muted }, seo.getIn(["blog", "title"]) || ""),
        h("p", { style: Object.assign({}, style.muted, { marginTop: "0.5rem" }) }, seo.getIn(["blog", "description"]) || "")
      ),
      seo && h("div", { style: style.card },
        h("p", { style: style.h2 }, "Archive"),
        h("p", { style: style.muted }, seo.getIn(["archive", "title"]) || ""),
        h("p", { style: Object.assign({}, style.muted, { marginTop: "0.5rem" }) }, seo.getIn(["archive", "description"]) || "")
      ),
      h("hr", { style: style.divider }),
      h("p", { style: style.heading }, "Navigation"),
      nav && h("div", { style: style.card },
        h("p", { style: style.muted }, "About: " + (nav.get("about") || "")),
        h("p", { style: style.muted }, "Experience: " + (nav.get("experience") || "")),
        h("p", { style: style.muted }, "Projects: " + (nav.get("projects") || ""))
      ),
      h("hr", { style: style.divider }),
      h("p", { style: style.heading }, "UI Labels"),
      labels && h("div", { style: style.card },
        labels.keySeq().toArray().map(function(key, i) {
          return h("p", { key: i, style: style.muted }, key + ": " + labels.get(key));
        })
      )
    );
  }
});

// ── Register all templates ─────────────────────────────────────────────────
CMS.registerPreviewTemplate("blog",       BlogPreview);
CMS.registerPreviewTemplate("identity",   IdentityPreview);
CMS.registerPreviewTemplate("about",      AboutPreview);
CMS.registerPreviewTemplate("experience", ExperiencePreview);
CMS.registerPreviewTemplate("projects",   ProjectsPreview);
CMS.registerPreviewTemplate("settings",   SettingsPreview);
