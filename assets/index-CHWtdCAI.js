import { r as x, j as e, c as S } from "./react-vendor-BTWVIjLd.js";
import { w as v } from "./world-map-CPvcksDd.js";
import {
  F as k,
  a as C,
  b as E,
  c as $,
  d as F,
  e as y,
  S as M,
} from "./icons-vendor-CUxSbwz5.js";
(function () {
  const h = document.createElement("link").relList;
  if (h && h.supports && h.supports("modulepreload")) return;
  for (const c of document.querySelectorAll('link[rel="modulepreload"]')) j(c);
  new MutationObserver((c) => {
    for (const d of c)
      if (d.type === "childList")
        for (const i of d.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && j(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function r(c) {
    const d = {};
    return (
      c.integrity && (d.integrity = c.integrity),
      c.referrerPolicy && (d.referrerPolicy = c.referrerPolicy),
      c.crossOrigin === "use-credentials"
        ? (d.credentials = "include")
        : c.crossOrigin === "anonymous"
          ? (d.credentials = "omit")
          : (d.credentials = "same-origin"),
      d
    );
  }
  function j(c) {
    if (c.ep) return;
    c.ep = !0;
    const d = r(c);
    fetch(c.href, d);
  }
})();
const p = window.YUANG_WEI_CONTENT ?? {};
function f(a) {
  return Array.isArray(a) ? a : [];
}
const L = f(p.publications),
  o = p.profile,
  O = f(p.books),
  Y = f(p.patents),
  A = f(p.softwareCopyrights),
  P = f(p.honors),
  _ = f(p.experience),
  w = "https://yuang-wei-academic.philrain-cs.chatgpt.site/api/visitors",
  G =
    "https://raw.githubusercontent.com/PhilrainV/PhilrainV.github.io/google-scholar-stats/gs_data.json",
  V = [
    ["个人简介", "about"],
    ["教育经历", "education"],
    ["论文成果", "publications"],
    ["其他成果", "outputs"],
    ["荣誉奖项", "honors"],
    ["工作经历", "experience"],
  ];
function N({ text: a }) {
  const h = a.split(/(Yuang Wei|Yu’ang Wei|Wei Yuang|魏雨昂)/g);
  return e.jsx(e.Fragment, {
    children: h.map((r, j) =>
      /^(Yuang Wei|Yu’ang Wei|Wei Yuang|魏雨昂)$/.test(r)
        ? e.jsx(
            "strong",
            { className: "author-self", children: r },
            `${r}-${j}`,
          )
        : e.jsx("span", { children: r }, `${r}-${j}`),
    ),
  });
}
function m({ id: a, children: h }) {
  return e.jsx("h2", { className: "section-heading", id: a, children: h });
}
function l({ href: a, children: h, className: r = "" }) {
  return e.jsx("a", {
    className: r,
    href: a,
    target: "_blank",
    rel: "noreferrer",
    children: h,
  });
}
function W() {
  const [a, h] = x.useState(null),
    [r, j] = x.useState(!1);
  x.useEffect(() => {
    let i = !0;
    async function u() {
      try {
        await fetch(w, { method: "POST", mode: "cors" });
        const g = await fetch(w, { cache: "no-store", mode: "cors" });
        if (!g.ok) throw new Error("visitor statistics unavailable");
        const b = await g.json();
        i && h(b);
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
  const c = x.useMemo(
      () => new Map((a?.countries ?? []).map((i) => [i.code.toLowerCase(), i])),
      [a],
    ),
    d = Math.max(1, ...(a?.countries ?? []).map((i) => i.visits));
  return e.jsxs("div", {
    className: "visitor-dashboard",
    children: [
      e.jsxs("div", {
        className: "visitor-map-panel",
        children: [
          e.jsx("svg", {
            className: "world-map",
            viewBox: v.viewBox,
            role: "img",
            "aria-label": "网站访客世界分布地图",
            children: v.locations.map((i) => {
              const u = c.get(i.id),
                g = u ? 0.3 + (u.visits / d) * 0.7 : 0;
              return e.jsx(
                "path",
                {
                  className: u ? "country-shape has-visits" : "country-shape",
                  d: i.path,
                  style: u ? { opacity: g } : void 0,
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
          r
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
function B() {
  const [a, h] = x.useState(!1),
    [r, j] = x.useState("全部"),
    [c, d] = x.useState(!1),
    [i, u] = x.useState({
      citedby: 330,
      hindex: 11,
      i10index: 12,
      updated: "2026-08-02",
    });
  x.useEffect(() => {
    let s = !0;
    return (
      fetch(G, { cache: "no-store" })
        .then((t) => {
          if (!t.ok) throw new Error("scholar statistics unavailable");
          return t.json();
        })
        .then((t) => {
          s &&
            u((n) => ({
              citedby: Number(t.citedby ?? n.citedby),
              hindex: Number(t.hindex ?? n.hindex),
              i10index: Number(t.i10index ?? n.i10index),
              updated: t.updated ?? n.updated,
            }));
        })
        .catch(() => {}),
      () => {
        s = !1;
      }
    );
  }, []);
  const g = x.useMemo(
    () =>
      ["英文期刊论文", "中文期刊论文", "学术会议论文"]
        .filter(
          (t) =>
            r === "全部" ||
            (r === "期刊" ? t !== "学术会议论文" : t === "学术会议论文"),
        )
        .map((t) => ({ group: t, papers: L.filter((n) => n.group === t) })),
    [r],
  );
  async function b() {
    try {
      await navigator.clipboard.writeText(o.email);
    } catch {
      const s = document.createElement("textarea");
      ((s.value = o.email),
        (s.style.position = "fixed"),
        (s.style.opacity = "0"),
        document.body.appendChild(s),
        s.select(),
        document.execCommand("copy"),
        s.remove());
    }
    (d(!0), window.setTimeout(() => d(!1), 1600));
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
              children: o.name,
            }),
            e.jsxs("button", {
              className: "menu-button",
              type: "button",
              "aria-label": a ? "关闭导航" : "打开导航",
              "aria-expanded": a,
              onClick: () => h((s) => !s),
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
                V.map(([s, t]) =>
                  e.jsx(
                    "a",
                    { href: `#${t}`, onClick: () => h(!1), children: s },
                    t,
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
                src: o.avatar,
                alt: o.avatarAlt,
              }),
              e.jsxs("div", {
                className: "profile-intro",
                children: [
                  e.jsx("h1", { children: o.name }),
                  e.jsxs("p", {
                    className: "position",
                    children: [o.affiliation, " · ", o.title],
                  }),
                ],
              }),
              e.jsxs("div", {
                className: "contact-list",
                children: [
                  e.jsxs("div", {
                    className: "contact-location",
                    children: [
                      e.jsx(C, {
                        className: "contact-icon",
                        "aria-hidden": "true",
                      }),
                      o.location,
                    ],
                  }),
                  e.jsxs("button", {
                    type: "button",
                    onClick: b,
                    children: [
                      e.jsx(E, {
                        className: "contact-icon",
                        "aria-hidden": "true",
                      }),
                      c ? "邮箱已复制" : o.email,
                    ],
                  }),
                  e.jsxs(l, {
                    href: o.links.researchGate,
                    children: [
                      e.jsx($, {
                        className: "contact-icon",
                        "aria-hidden": "true",
                      }),
                      "ResearchGate",
                    ],
                  }),
                  e.jsxs(l, {
                    href: o.links.github,
                    children: [
                      e.jsx(F, {
                        className: "contact-icon",
                        "aria-hidden": "true",
                      }),
                      "GitHub",
                    ],
                  }),
                  e.jsxs(l, {
                    href: o.links.googleScholar,
                    children: [
                      e.jsx(y, {
                        className: "contact-icon scholar-mark",
                        "aria-hidden": "true",
                      }),
                      "Google Scholar",
                    ],
                  }),
                  e.jsxs(l, {
                    href: o.links.orcid,
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
              e.jsxs(l, {
                href: o.links.googleScholar,
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
                    children: o.bio.map((s) => e.jsx("p", { children: s }, s)),
                  }),
                  e.jsxs("div", {
                    className: "research-row",
                    children: [
                      e.jsx("strong", { children: "研究领域" }),
                      e.jsx("div", {
                        children: o.researchInterests.map((s) =>
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
                  e.jsxs("div", {
                    className: "education-list",
                    children: [
                      e.jsxs("article", {
                        className: "education-item",
                        children: [
                          e.jsx(l, {
                            href: "https://aiedu.ecnu.edu.cn/",
                            className: "school-logo-link",
                            children: e.jsx("img", {
                              src: "/images/ECNU_logo.png",
                              alt: "华东师范大学校徽",
                            }),
                          }),
                          e.jsx("div", {
                            className: "education-time",
                            children: "2022.06 — 2026.06",
                          }),
                          e.jsxs("div", {
                            className: "education-body",
                            children: [
                              e.jsx("h3", {
                                children: e.jsx(l, {
                                  href: "https://aiedu.ecnu.edu.cn/",
                                  children: "华东师范大学",
                                }),
                              }),
                              e.jsx("p", {
                                children:
                                  "上海智能教育研究院 · 智能教育 · 博士",
                              }),
                              e.jsxs("p", {
                                className: "education-note",
                                children: [
                                  "导师：",
                                  e.jsx(l, {
                                    href: "https://faculty.ecnu.edu.cn/_s8/jb2/main.psp",
                                    children: "江波教授",
                                  }),
                                  e.jsx("span", { children: "上海" }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      e.jsxs("article", {
                        className: "education-item",
                        children: [
                          e.jsx(l, {
                            href: "https://www.comp.nus.edu.sg/cs/",
                            className: "school-logo-link",
                            children: e.jsx("img", {
                              src: "/images/NUS_logo.png",
                              alt: "新加坡国立大学校徽",
                            }),
                          }),
                          e.jsx("div", {
                            className: "education-time",
                            children: "2024.09 — 2025.09",
                          }),
                          e.jsxs("div", {
                            className: "education-body",
                            children: [
                              e.jsx("h3", {
                                children: e.jsx(l, {
                                  href: "https://www.comp.nus.edu.sg/cs/",
                                  children: "新加坡国立大学",
                                }),
                              }),
                              e.jsx("p", {
                                children:
                                  "计算机科学系 · 人机交互 · CSC 联合培养博士",
                              }),
                              e.jsxs("p", {
                                className: "education-note",
                                children: [
                                  "导师：",
                                  e.jsx(l, {
                                    href: "https://www.comp.nus.edu.sg/cs/people/brianlim/",
                                    children: "Brian Y. Lim 副教授",
                                  }),
                                  e.jsx("span", { children: "新加坡" }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      e.jsxs("article", {
                        className: "education-item",
                        children: [
                          e.jsx(l, {
                            href: "https://dqgc.ncut.edu.cn/",
                            className: "school-logo-link",
                            children: e.jsx("img", {
                              src: "/images/NCUT_logo.png",
                              alt: "北方工业大学校徽",
                            }),
                          }),
                          e.jsx("div", {
                            className: "education-time",
                            children: "2015.09 — 2022.06",
                          }),
                          e.jsxs("div", {
                            className: "education-body",
                            children: [
                              e.jsx("h3", {
                                children: e.jsx(l, {
                                  href: "https://dqgc.ncut.edu.cn/",
                                  children: "北方工业大学",
                                }),
                              }),
                              e.jsx("p", {
                                children:
                                  "电气与控制工程学院 · 自动化学士、控制科学与工程硕士",
                              }),
                              e.jsxs("p", {
                                className: "education-note",
                                children: [
                                  "导师：",
                                  e.jsx(l, {
                                    href: "https://dqgc.ncut.edu.cn/info/1228/3137.htm",
                                    children: "徐继宁副教授",
                                  }),
                                  e.jsx("span", { children: "北京" }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
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
                              className: r === s ? "is-active" : "",
                              "aria-pressed": r === s,
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
                  g.map(({ group: s, papers: t }) =>
                    e.jsxs(
                      "div",
                      {
                        className: "publication-group",
                        children: [
                          e.jsxs("h3", {
                            className: "publication-group-title",
                            children: [
                              s,
                              e.jsx("span", { children: t.length }),
                            ],
                          }),
                          e.jsx("div", {
                            className: "publication-list",
                            children: t.map((n) =>
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
                                          children: e.jsx(N, {
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
                                              e.jsxs(l, {
                                                href: n.webpage,
                                                children: [
                                                  "网页 ",
                                                  e.jsx("span", {
                                                    "aria-hidden": "true",
                                                    children: "↗",
                                                  }),
                                                ],
                                              }),
                                            e.jsxs(l, {
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
                            children: O.map((s) =>
                              e.jsxs(
                                "li",
                                {
                                  children: [
                                    e.jsx("strong", { children: s.title }),
                                    e.jsx("span", {
                                      children: e.jsx(N, { text: s.meta }),
                                    }),
                                    s.url &&
                                      e.jsx(l, {
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
                            children: Y.map((s) =>
                              e.jsxs(
                                "li",
                                {
                                  children: [
                                    e.jsx("strong", { children: s.title }),
                                    e.jsx("span", {
                                      children: e.jsx(N, { text: s.meta }),
                                    }),
                                    s.url &&
                                      e.jsx(l, {
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
                            children: A.map((s) =>
                              e.jsxs(
                                "li",
                                {
                                  children: [
                                    e.jsx("strong", { children: s.title }),
                                    e.jsx("span", {
                                      children: e.jsx(N, { text: s.meta }),
                                    }),
                                    s.url &&
                                      e.jsx(l, {
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
                    children: P.map((s) =>
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
                    children: _.map((s) =>
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
                  e.jsx(W, {}),
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
  e.jsx(x.StrictMode, { children: e.jsx(B, {}) }),
);
