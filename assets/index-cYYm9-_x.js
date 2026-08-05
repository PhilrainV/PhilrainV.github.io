import { r as x, j as e, c as S } from "./react-vendor-BTWVIjLd.js";
import { w as N } from "./world-map-CPvcksDd.js";
import {
  F as k,
  a as $,
  b as E,
  c as C,
  d as F,
  e as y,
  S as M,
} from "./icons-vendor-CUxSbwz5.js";
(function () {
  const d = document.createElement("link").relList;
  if (d && d.supports && d.supports("modulepreload")) return;
  for (const t of document.querySelectorAll('link[rel="modulepreload"]')) j(t);
  new MutationObserver((t) => {
    for (const o of t)
      if (o.type === "childList")
        for (const i of o.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && j(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function c(t) {
    const o = {};
    return (
      t.integrity && (o.integrity = t.integrity),
      t.referrerPolicy && (o.referrerPolicy = t.referrerPolicy),
      t.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : t.crossOrigin === "anonymous"
          ? (o.credentials = "omit")
          : (o.credentials = "same-origin"),
      o
    );
  }
  function j(t) {
    if (t.ep) return;
    t.ep = !0;
    const o = c(t);
    fetch(t.href, o);
  }
})();
const p = window.YUANG_WEI_CONTENT ?? {};
function g(a) {
  return Array.isArray(a) ? a : [];
}
const L = g(p.publications),
  l = p.profile,
  O = g(p.education),
  A = g(p.books),
  P = g(p.patents),
  Y = g(p.softwareCopyrights),
  G = g(p.honors),
  V = g(p.experience),
  w = "https://yuang-wei-academic.philrain-cs.chatgpt.site/api/visitors",
  W =
    "https://raw.githubusercontent.com/PhilrainV/PhilrainV.github.io/google-scholar-stats/gs_data.json",
  U = [
    ["个人简介", "about"],
    ["教育经历", "education"],
    ["论文成果", "publications"],
    ["其他成果", "outputs"],
    ["荣誉奖项", "honors"],
    ["工作经历", "experience"],
  ];
function f({ text: a }) {
  const d = a.split(/(Yuang Wei|Yu’ang Wei|Wei Yuang|魏雨昂)/g);
  return e.jsx(e.Fragment, {
    children: d.map((c, j) =>
      /^(Yuang Wei|Yu’ang Wei|Wei Yuang|魏雨昂)$/.test(c)
        ? e.jsx(
            "strong",
            { className: "author-self", children: c },
            `${c}-${j}`,
          )
        : e.jsx("span", { children: c }, `${c}-${j}`),
    ),
  });
}
function m({ id: a, children: d }) {
  return e.jsx("h2", { className: "section-heading", id: a, children: d });
}
function h({ href: a, children: d, className: c = "" }) {
  return e.jsx("a", {
    className: c,
    href: a,
    target: "_blank",
    rel: "noreferrer",
    children: d,
  });
}
function B() {
  const [a, d] = x.useState(null),
    [c, j] = x.useState(!1);
  x.useEffect(() => {
    let i = !0;
    async function u() {
      try {
        await fetch(w, { method: "POST", mode: "cors" });
        const b = await fetch(w, { cache: "no-store", mode: "cors" });
        if (!b.ok) throw new Error("visitor statistics unavailable");
        const v = await b.json();
        i && d(v);
      } catch {
        i && j(!0);
      }
    }
    return (
      u(),
      () => {
        i = !1;
      }
    );
  }, []);
  const t = x.useMemo(
      () => new Map((a?.countries ?? []).map((i) => [i.code.toLowerCase(), i])),
      [a],
    ),
    o = Math.max(1, ...(a?.countries ?? []).map((i) => i.visits));
  return e.jsxs("div", {
    className: "visitor-dashboard",
    children: [
      e.jsxs("div", {
        className: "visitor-map-panel",
        children: [
          e.jsx("svg", {
            className: "world-map",
            viewBox: N.viewBox,
            role: "img",
            "aria-label": "网站访客世界分布地图",
            children: N.locations.map((i) => {
              const u = t.get(i.id),
                b = u ? 0.3 + (u.visits / o) * 0.7 : 0;
              return e.jsx(
                "path",
                {
                  className: u ? "country-shape has-visits" : "country-shape",
                  d: i.path,
                  style: u ? { opacity: b } : void 0,
                  children: e.jsx("title", {
                    children: u ? `${i.name}：${u.visits} 次访问` : i.name,
                  }),
                },
                i.id,
              );
            }),
          }),
          e.jsx("p", {
            className: "map-credit",
            children: "地图数据：SVG Maps（CC BY 4.0）",
          }),
        ],
      }),
      e.jsxs("div", {
        className: "visitor-summary",
        "aria-live": "polite",
        children: [
          e.jsxs("div", {
            className: "visitor-metrics",
            children: [
              e.jsxs("div", {
                children: [
                  e.jsx("strong", { children: a?.totalVisits ?? "—" }),
                  e.jsx("span", { children: "总访问次数" }),
                ],
              }),
              e.jsxs("div", {
                children: [
                  e.jsx("strong", { children: a?.uniqueVisitors ?? "—" }),
                  e.jsx("span", { children: "独立访客" }),
                ],
              }),
              e.jsxs("div", {
                children: [
                  e.jsx("strong", { children: a?.countries.length ?? "—" }),
                  e.jsx("span", { children: "国家与地区" }),
                ],
              }),
            ],
          }),
          e.jsx("h3", { children: "最近访客" }),
          c
            ? e.jsx("p", {
                className: "visitor-empty",
                children: "访客统计暂时不可用。",
              })
            : a?.recentVisitors.length
              ? e.jsx("ol", {
                  className: "recent-visitors",
                  children: a.recentVisitors.map((i) =>
                    e.jsxs(
                      "li",
                      {
                        children: [
                          e.jsxs("span", {
                            className: "visitor-id",
                            children: ["访客 ", i.id],
                          }),
                          e.jsx("span", {
                            children:
                              [i.city, i.country].filter(Boolean).join("，") ||
                              "未知地区",
                          }),
                        ],
                      },
                      `${i.id}-${i.lastSeen}`,
                    ),
                  ),
                })
              : e.jsx("p", {
                  className: "visitor-empty",
                  children: "正在读取访客数据……",
                }),
          e.jsx("p", {
            className: "privacy-note",
            children:
              "为保护访问者隐私，仅显示匿名访客标识与大致地区，不公开完整 IP 地址。",
          }),
        ],
      }),
    ],
  });
}
function I() {
  const [a, d] = x.useState(!1),
    [c, j] = x.useState("全部"),
    [t, o] = x.useState(!1),
    [i, u] = x.useState({
      citedby: 330,
      hindex: 11,
      i10index: 12,
      updated: "2026-08-02",
    });
  x.useEffect(() => {
    let s = !0;
    return (
      fetch(W, { cache: "no-store" })
        .then((r) => {
          if (!r.ok) throw new Error("scholar statistics unavailable");
          return r.json();
        })
        .then((r) => {
          s &&
            u((n) => ({
              citedby: Number(r.citedby ?? n.citedby),
              hindex: Number(r.hindex ?? n.hindex),
              i10index: Number(r.i10index ?? n.i10index),
              updated: r.updated ?? n.updated,
            }));
        })
        .catch(() => {}),
      () => {
        s = !1;
      }
    );
  }, []);
  const b = x.useMemo(
    () =>
      ["英文期刊论文", "中文期刊论文", "学术会议论文"]
        .filter(
          (r) =>
            c === "全部" ||
            (c === "期刊" ? r !== "学术会议论文" : r === "学术会议论文"),
        )
        .map((r) => ({ group: r, papers: L.filter((n) => n.group === r) })),
    [c],
  );
  async function v() {
    try {
      await navigator.clipboard.writeText(l.email);
    } catch {
      const s = document.createElement("textarea");
      ((s.value = l.email),
        (s.style.position = "fixed"),
        (s.style.opacity = "0"),
        document.body.appendChild(s),
        s.select(),
        document.execCommand("copy"),
        s.remove());
    }
    (o(!0), window.setTimeout(() => o(!1), 1600));
  }
  return e.jsxs(e.Fragment, {
    children: [
      e.jsx("header", {
        className: "site-header",
        children: e.jsxs("div", {
          className: "header-inner",
          children: [
            e.jsx("a", {
              className: "site-title",
              href: "#about",
              "aria-label": "返回页面顶部",
              children: l.name,
            }),
            e.jsxs("button", {
              className: "menu-button",
              type: "button",
              "aria-label": a ? "关闭导航" : "打开导航",
              "aria-expanded": a,
              onClick: () => d((s) => !s),
              children: [
                e.jsx("span", {}),
                e.jsx("span", {}),
                e.jsx("span", {}),
              ],
            }),
            e.jsxs("nav", {
              className: a ? "main-nav is-open" : "main-nav",
              "aria-label": "主导航",
              children: [
                U.map(([s, r]) =>
                  e.jsx(
                    "a",
                    { href: `#${r}`, onClick: () => d(!1), children: s },
                    r,
                  ),
                ),
                e.jsxs("a", {
                  className: "language-switch",
                  href: "https://philrainv.github.io/YuangWei_EN/",
                  target: "_self",
                  "aria-label": "切换到英文主页",
                  children: [e.jsx(k, { "aria-hidden": "true" }), "English"],
                }),
              ],
            }),
          ],
        }),
      }),
      e.jsxs("main", {
        className: "page-shell",
        children: [
          e.jsxs("aside", {
            className: "profile-panel",
            "aria-label": "个人资料",
            children: [
              e.jsx("img", {
                className: "portrait",
                src: l.avatar,
                alt: l.avatarAlt,
              }),
              e.jsxs("div", {
                className: "profile-intro",
                children: [
                  e.jsx("h1", { children: l.name }),
                  e.jsxs("p", {
                    className: "position",
                    children: [l.affiliation, " · ", l.title],
                  }),
                ],
              }),
              e.jsxs("div", {
                className: "contact-list",
                children: [
                  e.jsxs("div", {
                    className: "contact-location",
                    children: [
                      e.jsx($, {
                        className: "contact-icon",
                        "aria-hidden": "true",
                      }),
                      l.location,
                    ],
                  }),
                  e.jsxs("button", {
                    type: "button",
                    onClick: v,
                    children: [
                      e.jsx(E, {
                        className: "contact-icon",
                        "aria-hidden": "true",
                      }),
                      t ? "邮箱已复制" : l.email,
                    ],
                  }),
                  e.jsxs(h, {
                    href: l.links.researchGate,
                    children: [
                      e.jsx(C, {
                        className: "contact-icon",
                        "aria-hidden": "true",
                      }),
                      "ResearchGate",
                    ],
                  }),
                  e.jsxs(h, {
                    href: l.links.github,
                    children: [
                      e.jsx(F, {
                        className: "contact-icon",
                        "aria-hidden": "true",
                      }),
                      "GitHub",
                    ],
                  }),
                  e.jsxs(h, {
                    href: l.links.googleScholar,
                    children: [
                      e.jsx(y, {
                        className: "contact-icon scholar-mark",
                        "aria-hidden": "true",
                      }),
                      "Google Scholar",
                    ],
                  }),
                  e.jsxs(h, {
                    href: l.links.orcid,
                    children: [
                      e.jsx(M, {
                        className: "contact-icon",
                        "aria-hidden": "true",
                      }),
                      "ORCID",
                    ],
                  }),
                ],
              }),
              e.jsxs(h, {
                href: l.links.googleScholar,
                className: "scholar-card",
                children: [
                  e.jsxs("div", {
                    className: "scholar-card-title",
                    children: [
                      e.jsxs("span", {
                        children: [
                          e.jsx(y, { "aria-hidden": "true" }),
                          " Google Scholar",
                        ],
                      }),
                      e.jsx("span", { "aria-hidden": "true", children: "↗" }),
                    ],
                  }),
                  e.jsxs("div", {
                    className: "scholar-metrics",
                    children: [
                      e.jsxs("div", {
                        children: [
                          e.jsx("strong", { children: i.citedby }),
                          e.jsx("span", { children: "引用" }),
                        ],
                      }),
                      e.jsxs("div", {
                        children: [
                          e.jsx("strong", { children: i.hindex }),
                          e.jsx("span", { children: "h 指数" }),
                        ],
                      }),
                      e.jsxs("div", {
                        children: [
                          e.jsx("strong", { children: i.i10index }),
                          e.jsx("span", { children: "i10 指数" }),
                        ],
                      }),
                    ],
                  }),
                  e.jsxs("small", {
                    children: [
                      "数据自动更新",
                      i.updated
                        ? ` · ${i.updated.slice(0, 10).replaceAll("-", ".")}`
                        : "",
                    ],
                  }),
                ],
              }),
            ],
          }),
          e.jsxs("div", {
            className: "main-content",
            children: [
              e.jsxs("section", {
                className: "content-section about-section",
                "aria-labelledby": "about",
                children: [
                  e.jsx(m, { id: "about", children: "个人简介" }),
                  e.jsx("div", {
                    className: "intro-text",
                    children: l.bio.map((s) => e.jsx("p", { children: s }, s)),
                  }),
                  e.jsxs("div", {
                    className: "research-row",
                    children: [
                      e.jsx("strong", { children: "研究领域" }),
                      e.jsx("div", {
                        children: l.researchInterests.map((s) =>
                          e.jsx("span", { children: s }, s),
                        ),
                      }),
                    ],
                  }),
                ],
              }),
              e.jsxs("section", {
                className: "content-section education-section",
                "aria-labelledby": "education",
                children: [
                  e.jsx(m, { id: "education", children: "教育经历" }),
                  e.jsx("div", {
                    className: "education-list",
                    children: O.map((s) =>
                      e.jsxs(
                        "article",
                        {
                          className: "education-item",
                          children: [
                            e.jsx(h, {
                              href: s.institutionUrl,
                              className: "school-logo-link",
                              children: e.jsx("img", {
                                src: s.logo,
                                alt: s.logoAlt,
                              }),
                            }),
                            e.jsx("div", {
                              className: "education-time",
                              children: s.period,
                            }),
                            e.jsxs("div", {
                              className: "education-body",
                              children: [
                                e.jsx("h3", {
                                  children: e.jsx(h, {
                                    href: s.institutionUrl,
                                    children: s.institution,
                                  }),
                                }),
                                e.jsx("p", { children: s.program }),
                                e.jsxs("p", {
                                  className: "education-note",
                                  children: [
                                    s.supervisor &&
                                      e.jsxs(e.Fragment, {
                                        children: [
                                          "导师：",
                                          s.supervisorUrl
                                            ? e.jsx(h, {
                                                href: s.supervisorUrl,
                                                children: s.supervisor,
                                              })
                                            : s.supervisor,
                                        ],
                                      }),
                                    e.jsx("span", { children: s.location }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        },
                        `${s.period}-${s.institution}`,
                      ),
                    ),
                  }),
                ],
              }),
              e.jsxs("section", {
                className: "content-section",
                "aria-labelledby": "publications",
                children: [
                  e.jsxs("div", {
                    className: "heading-with-tools",
                    children: [
                      e.jsx(m, { id: "publications", children: "论文成果" }),
                      e.jsx("div", {
                        className: "paper-filter",
                        "aria-label": "筛选论文类型",
                        children: ["全部", "期刊", "会议"].map((s) =>
                          e.jsx(
                            "button",
                            {
                              type: "button",
                              className: c === s ? "is-active" : "",
                              "aria-pressed": c === s,
                              onClick: () => j(s),
                              children: s,
                            },
                            s,
                          ),
                        ),
                      }),
                    ],
                  }),
                  e.jsxs("p", {
                    className: "publication-legend",
                    children: [
                      e.jsx("span", { children: "魏雨昂 / Yuang Wei" }),
                      " 表示本人；论文按类别及年份排列。",
                    ],
                  }),
                  b.map(({ group: s, papers: r }) =>
                    e.jsxs(
                      "div",
                      {
                        className: "publication-group",
                        children: [
                          e.jsxs("h3", {
                            className: "publication-group-title",
                            children: [
                              s,
                              e.jsx("span", { children: r.length }),
                            ],
                          }),
                          e.jsx("div", {
                            className: "publication-list",
                            children: r.map((n) =>
                              e.jsxs(
                                "article",
                                {
                                  className: n.image
                                    ? "publication-item with-image"
                                    : "publication-item",
                                  children: [
                                    n.image &&
                                      e.jsx("img", {
                                        className: "publication-image",
                                        src: n.image,
                                        alt: `${n.title} 论文实验流程图`,
                                        loading: "lazy",
                                        style: {
                                          objectFit: n.imageFit || "cover",
                                        },
                                      }),
                                    e.jsxs("div", {
                                      className: "publication-main",
                                      children: [
                                        e.jsxs("div", {
                                          className: "publication-meta",
                                          children: [
                                            e.jsx("span", {
                                              className: "venue-badge",
                                              children: n.venue,
                                            }),
                                            e.jsx("time", { children: n.year }),
                                          ],
                                        }),
                                        e.jsx("h4", { children: n.title }),
                                        e.jsx("p", {
                                          className: "publication-authors",
                                          children: e.jsx(f, {
                                            text: n.authors,
                                          }),
                                        }),
                                        e.jsx("p", {
                                          className: "publication-venue",
                                          children: n.publication,
                                        }),
                                        e.jsxs("div", {
                                          className: "publication-links",
                                          children: [
                                            n.webpage &&
                                              e.jsxs(h, {
                                                href: n.webpage,
                                                children: [
                                                  "网页 ",
                                                  e.jsx("span", {
                                                    "aria-hidden": "true",
                                                    children: "↗",
                                                  }),
                                                ],
                                              }),
                                            e.jsxs(h, {
                                              href: n.download,
                                              children: [
                                                "下载 ",
                                                e.jsx("span", {
                                                  "aria-hidden": "true",
                                                  children: "↓",
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                },
                                `${n.year}-${n.title}`,
                              ),
                            ),
                          }),
                        ],
                      },
                      s,
                    ),
                  ),
                ],
              }),
              e.jsxs("section", {
                className: "content-section",
                "aria-labelledby": "outputs",
                children: [
                  e.jsx(m, { id: "outputs", children: "其他成果" }),
                  e.jsxs("div", {
                    className: "output-columns",
                    children: [
                      e.jsxs("div", {
                        className: "output-block",
                        children: [
                          e.jsx("h3", { children: "图书" }),
                          e.jsx("ol", {
                            children: A.map((s) =>
                              e.jsxs(
                                "li",
                                {
                                  children: [
                                    e.jsx("strong", { children: s.title }),
                                    e.jsx("span", {
                                      children: e.jsx(f, { text: s.meta }),
                                    }),
                                    s.url &&
                                      e.jsx(h, {
                                        href: s.url,
                                        children: s.linkLabel ?? "查看资料 ↗",
                                      }),
                                  ],
                                },
                                s.title,
                              ),
                            ),
                          }),
                        ],
                      }),
                      e.jsxs("div", {
                        className: "output-block",
                        children: [
                          e.jsx("h3", { children: "发明专利" }),
                          e.jsx("ol", {
                            children: P.map((s) =>
                              e.jsxs(
                                "li",
                                {
                                  children: [
                                    e.jsx("strong", { children: s.title }),
                                    e.jsx("span", {
                                      children: e.jsx(f, { text: s.meta }),
                                    }),
                                    s.url &&
                                      e.jsx(h, {
                                        href: s.url,
                                        children: s.linkLabel ?? "查看资料 ↗",
                                      }),
                                  ],
                                },
                                s.title,
                              ),
                            ),
                          }),
                        ],
                      }),
                      e.jsxs("div", {
                        className: "output-block",
                        children: [
                          e.jsx("h3", { children: "软件著作权" }),
                          e.jsx("ol", {
                            children: Y.map((s) =>
                              e.jsxs(
                                "li",
                                {
                                  children: [
                                    e.jsx("strong", { children: s.title }),
                                    e.jsx("span", {
                                      children: e.jsx(f, { text: s.meta }),
                                    }),
                                    s.url &&
                                      e.jsx(h, {
                                        href: s.url,
                                        children: s.linkLabel ?? "查看资料 ↗",
                                      }),
                                  ],
                                },
                                s.title,
                              ),
                            ),
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              e.jsxs("section", {
                className: "content-section",
                "aria-labelledby": "honors",
                children: [
                  e.jsx(m, { id: "honors", children: "荣誉奖项" }),
                  e.jsx("div", {
                    className: "simple-list",
                    children: G.map((s) =>
                      e.jsxs(
                        "div",
                        {
                          children: [
                            e.jsx("time", { children: s.year }),
                            e.jsx("p", { children: s.title }),
                            s.award && e.jsx("strong", { children: s.award }),
                          ],
                        },
                        `${s.year}-${s.title}`,
                      ),
                    ),
                  }),
                ],
              }),
              e.jsxs("section", {
                className: "content-section",
                "aria-labelledby": "experience",
                children: [
                  e.jsx(m, { id: "experience", children: "工作经历" }),
                  e.jsx("div", {
                    className: "experience-list",
                    children: V.map((s) =>
                      e.jsxs(
                        "article",
                        {
                          children: [
                            e.jsx("time", { children: s.period }),
                            e.jsxs("div", {
                              children: [
                                e.jsx("h3", { children: s.organization }),
                                e.jsx("p", { children: s.role }),
                              ],
                            }),
                          ],
                        },
                        `${s.period}-${s.organization}`,
                      ),
                    ),
                  }),
                ],
              }),
              e.jsxs("section", {
                className: "content-section visitor-section",
                "aria-labelledby": "visitors",
                children: [
                  e.jsx(m, { id: "visitors", children: "访客分布" }),
                  e.jsx(B, {}),
                ],
              }),
            ],
          }),
        ],
      }),
      e.jsxs("footer", {
        className: "site-footer",
        children: [
          e.jsx("p", { children: "© 2026 魏雨昂" }),
          e.jsx("p", { children: "最后更新于 2026 年 8 月" }),
        ],
      }),
    ],
  });
}
S.createRoot(document.getElementById("root")).render(
  e.jsx(x.StrictMode, { children: e.jsx(I, {}) }),
);
