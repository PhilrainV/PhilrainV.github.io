import { r as h, j as e, c as E } from "./react-vendor-BTWVIjLd.js";
import { w as b } from "./world-map-CPvcksDd.js";
import {
  F as S,
  a as C,
  b as A,
  c as $,
  d as k,
  e as v,
  S as M,
} from "./icons-vendor-CUxSbwz5.js";
(function () {
  const d = document.createElement("link").relList;
  if (d && d.supports && d.supports("modulepreload")) return;
  for (const l of document.querySelectorAll('link[rel="modulepreload"]')) u(l);
  new MutationObserver((l) => {
    for (const o of l)
      if (o.type === "childList")
        for (const i of o.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && u(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function r(l) {
    const o = {};
    return (
      l.integrity && (o.integrity = l.integrity),
      l.referrerPolicy && (o.referrerPolicy = l.referrerPolicy),
      l.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : l.crossOrigin === "anonymous"
          ? (o.credentials = "omit")
          : (o.credentials = "same-origin"),
      o
    );
  }
  function u(l) {
    if (l.ep) return;
    l.ep = !0;
    const o = r(l);
    fetch(l.href, o);
  }
})();
const p = window.YUANG_WEI_CONTENT ?? {};
function g(a) {
  return Array.isArray(a) ? a : [];
}
const F = g(p.publications),
  I = g(p.books),
  P = g(p.patents),
  L = g(p.softwareCopyrights),
  O = g(p.honors),
  Y = g(p.experience),
  y = "https://scholar.google.com/citations?hl=zh-CN&user=jjXw5-4AAAAJ",
  w = "https://yuang-wei-academic.philrain-cs.chatgpt.site/api/visitors",
  _ =
    "https://raw.githubusercontent.com/PhilrainV/PhilrainV.github.io/google-scholar-stats/gs_data.json",
  V = [
    ["个人简介", "about"],
    ["教育经历", "education"],
    ["论文成果", "publications"],
    ["其他成果", "outputs"],
    ["荣誉奖项", "honors"],
    ["工作经历", "experience"],
  ],
  W = [
    "智能教育",
    "可解释人工智能",
    "因果模型",
    "知识追踪",
    "认知诊断",
    "大语言模型",
  ];
function f({ text: a }) {
  const d = a.split(/(Yuang Wei|Yu’ang Wei|Wei Yuang|魏雨昂)/g);
  return e.jsx(e.Fragment, {
    children: d.map((r, u) =>
      /^(Yuang Wei|Yu’ang Wei|Wei Yuang|魏雨昂)$/.test(r)
        ? e.jsx(
            "strong",
            { className: "author-self", children: r },
            `${r}-${u}`,
          )
        : e.jsx("span", { children: r }, `${r}-${u}`),
    ),
  });
}
function j({ id: a, children: d }) {
  return e.jsx("h2", { className: "section-heading", id: a, children: d });
}
function t({ href: a, children: d, className: r = "" }) {
  return e.jsx("a", {
    className: r,
    href: a,
    target: "_blank",
    rel: "noreferrer",
    children: d,
  });
}
function T() {
  const [a, d] = h.useState(null),
    [r, u] = h.useState(!1);
  h.useEffect(() => {
    let i = !0;
    async function x() {
      try {
        await fetch(w, { method: "POST", mode: "cors" });
        const m = await fetch(w, { cache: "no-store", mode: "cors" });
        if (!m.ok) throw new Error("visitor statistics unavailable");
        const N = await m.json();
        i && d(N);
      } catch {
        i && u(!0);
      }
    }
    return (
      x(),
      () => {
        i = !1;
      }
    );
  }, []);
  const l = h.useMemo(
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
            viewBox: b.viewBox,
            role: "img",
            "aria-label": "网站访客世界分布地图",
            children: b.locations.map((i) => {
              const x = l.get(i.id),
                m = x ? 0.3 + (x.visits / o) * 0.7 : 0;
              return e.jsx(
                "path",
                {
                  className: x ? "country-shape has-visits" : "country-shape",
                  d: i.path,
                  style: x ? { opacity: m } : void 0,
                  children: e.jsx("title", {
                    children: x ? `${i.name}：${x.visits} 次访问` : i.name,
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
  const [a, d] = h.useState(!1),
    [r, u] = h.useState("全部"),
    [l, o] = h.useState(!1),
    [i, x] = h.useState({
      citedby: 330,
      hindex: 11,
      i10index: 12,
      updated: "2026-08-02",
    });
  h.useEffect(() => {
    let s = !0;
    return (
      fetch(_, { cache: "no-store" })
        .then((n) => {
          if (!n.ok) throw new Error("scholar statistics unavailable");
          return n.json();
        })
        .then((n) => {
          s &&
            x((c) => ({
              citedby: Number(n.citedby ?? c.citedby),
              hindex: Number(n.hindex ?? c.hindex),
              i10index: Number(n.i10index ?? c.i10index),
              updated: n.updated ?? c.updated,
            }));
        })
        .catch(() => {}),
      () => {
        s = !1;
      }
    );
  }, []);
  const m = h.useMemo(
    () =>
      ["英文期刊论文", "中文期刊论文", "学术会议论文"]
        .filter(
          (n) =>
            r === "全部" ||
            (r === "期刊" ? n !== "学术会议论文" : n === "学术会议论文"),
        )
        .map((n) => ({ group: n, papers: F.filter((c) => c.group === n) })),
    [r],
  );
  async function N() {
    const s = "philrain@foxmail.com";
    try {
      await navigator.clipboard.writeText(s);
    } catch {
      const n = document.createElement("textarea");
      ((n.value = s),
        (n.style.position = "fixed"),
        (n.style.opacity = "0"),
        document.body.appendChild(n),
        n.select(),
        document.execCommand("copy"),
        n.remove());
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
              children: "魏雨昂",
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
                V.map(([s, n]) =>
                  e.jsx(
                    "a",
                    { href: `#${n}`, onClick: () => d(!1), children: s },
                    n,
                  ),
                ),
                e.jsxs("a", {
                  className: "language-switch",
                  href: "https://philrainv.github.io/YuangWei_EN/",
                  target: "_self",
                  "aria-label": "切换到英文主页",
                  children: [e.jsx(S, { "aria-hidden": "true" }), "English"],
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
                src: "/images/weiyuang.png",
                alt: "魏雨昂的个人照片",
              }),
              e.jsxs("div", {
                className: "profile-intro",
                children: [
                  e.jsx("h1", { children: "魏雨昂" }),
                  e.jsx("p", {
                    className: "position",
                    children: "华中师范大学人工智能教育学部 · 讲师",
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
                      "武汉，中国",
                    ],
                  }),
                  e.jsxs("button", {
                    type: "button",
                    onClick: N,
                    children: [
                      e.jsx(A, {
                        className: "contact-icon",
                        "aria-hidden": "true",
                      }),
                      l ? "邮箱已复制" : "philrain@foxmail.com",
                    ],
                  }),
                  e.jsxs(t, {
                    href: "https://www.researchgate.net/profile/Yuang-Wei",
                    children: [
                      e.jsx($, {
                        className: "contact-icon",
                        "aria-hidden": "true",
                      }),
                      "ResearchGate",
                    ],
                  }),
                  e.jsxs(t, {
                    href: "https://github.com/PhilrainV",
                    children: [
                      e.jsx(k, {
                        className: "contact-icon",
                        "aria-hidden": "true",
                      }),
                      "GitHub",
                    ],
                  }),
                  e.jsxs(t, {
                    href: y,
                    children: [
                      e.jsx(v, {
                        className: "contact-icon scholar-mark",
                        "aria-hidden": "true",
                      }),
                      "Google Scholar",
                    ],
                  }),
                  e.jsxs(t, {
                    href: "https://orcid.org/0000-0002-8187-4011",
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
              e.jsxs(t, {
                href: y,
                className: "scholar-card",
                children: [
                  e.jsxs("div", {
                    className: "scholar-card-title",
                    children: [
                      e.jsxs("span", {
                        children: [
                          e.jsx(v, { "aria-hidden": "true" }),
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
                  e.jsx(j, { id: "about", children: "个人简介" }),
                  e.jsxs("div", {
                    className: "intro-text",
                    children: [
                      e.jsxs("p", {
                        children: [
                          "我博士毕业于中国上海的",
                          e.jsx("strong", {
                            children: "华东师范大学上海智能教育研究院",
                          }),
                          "智能教育专业，导师为",
                          e.jsx(t, {
                            href: "https://faculty.ecnu.edu.cn/_s8/jb2/main.psp",
                            children: "江波教授",
                          }),
                          "。现任华中师范大学人工智能教育学部讲师，正在开展一些有趣且有意义的智能教育研究，已发表 20+ 篇学术论文（包含合作）。",
                        ],
                      }),
                      e.jsxs("p", {
                        children: [
                          "担任 ",
                          e.jsx("em", { children: "Computers & Education" }),
                          "、",
                          e.jsx("em", {
                            children: "Education and Information Technologies",
                          }),
                          "、",
                          e.jsx("em", {
                            children: "Information Processing & Management",
                          }),
                          "、",
                          e.jsx("em", {
                            children:
                              "IEEE Transactions on Emerging Topics in Computing",
                          }),
                          "、",
                          e.jsx("em", {
                            children:
                              "International Journal of Artificial Intelligence in Education",
                          }),
                          "、",
                          e.jsx("em", { children: "Knowledge-Based Systems" }),
                          "、",
                          e.jsx("em", {
                            children:
                              "Humanities & Social Sciences Communications",
                          }),
                          " ",
                          "等期刊，以及 NeurIPS、AAAI、KDD、ICASSP、AIED、EDM 等会议审稿人。",
                        ],
                      }),
                      e.jsx("p", {
                        children:
                          "如果您对我的研究感兴趣，欢迎随时联系我！我们一起开展研究、发表论文。",
                      }),
                    ],
                  }),
                  e.jsxs("div", {
                    className: "research-row",
                    children: [
                      e.jsx("strong", { children: "研究领域" }),
                      e.jsx("div", {
                        children: W.map((s) =>
                          e.jsx("span", { children: s }, s),
                        ),
                      }),
                    ],
                  }),
                ],
              }),
              e.jsxs("section", {
                className: "content-section",
                "aria-labelledby": "education",
                children: [
                  e.jsx(j, { id: "education", children: "教育经历" }),
                  e.jsxs("div", {
                    className: "education-list",
                    children: [
                      e.jsxs("article", {
                        className: "education-item",
                        children: [
                          e.jsx(t, {
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
                                children: e.jsx(t, {
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
                                  e.jsx(t, {
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
                          e.jsx(t, {
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
                                children: e.jsx(t, {
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
                                  e.jsx(t, {
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
                          e.jsx(t, {
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
                                children: e.jsx(t, {
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
                                  e.jsx(t, {
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
                      e.jsx(j, { id: "publications", children: "论文成果" }),
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
                              onClick: () => u(s),
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
                  m.map(({ group: s, papers: n }) =>
                    e.jsxs(
                      "div",
                      {
                        className: "publication-group",
                        children: [
                          e.jsxs("h3", {
                            className: "publication-group-title",
                            children: [
                              s,
                              e.jsx("span", { children: n.length }),
                            ],
                          }),
                          e.jsx("div", {
                            className: "publication-list",
                            children: n.map((c) =>
                              e.jsxs(
                                "article",
                                {
                                  className: c.image
                                    ? "publication-item with-image"
                                    : "publication-item",
                                  children: [
                                    c.image &&
                                      e.jsx("img", {
                                        className: "publication-image",
                                        src: c.image,
                                        alt: `${c.title} 论文实验流程图`,
                                        loading: "lazy",
                                        style: {
                                          objectFit: c.imageFit || "cover",
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
                                              children: c.venue,
                                            }),
                                            e.jsx("time", { children: c.year }),
                                          ],
                                        }),
                                        e.jsx("h4", { children: c.title }),
                                        e.jsx("p", {
                                          className: "publication-authors",
                                          children: e.jsx(f, {
                                            text: c.authors,
                                          }),
                                        }),
                                        e.jsx("p", {
                                          className: "publication-venue",
                                          children: c.publication,
                                        }),
                                        e.jsxs("div", {
                                          className: "publication-links",
                                          children: [
                                            c.webpage &&
                                              e.jsxs(t, {
                                                href: c.webpage,
                                                children: [
                                                  "网页 ",
                                                  e.jsx("span", {
                                                    "aria-hidden": "true",
                                                    children: "↗",
                                                  }),
                                                ],
                                              }),
                                            e.jsxs(t, {
                                              href: c.download,
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
                                `${c.year}-${c.title}`,
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
                  e.jsx(j, { id: "outputs", children: "其他成果" }),
                  e.jsxs("div", {
                    className: "output-columns",
                    children: [
                      e.jsxs("div", {
                        className: "output-block",
                        children: [
                          e.jsx("h3", { children: "图书" }),
                          e.jsx("ol", {
                            children: I.map((s) =>
                              e.jsxs(
                                "li",
                                {
                                  children: [
                                    e.jsx("strong", { children: s.title }),
                                    e.jsx("span", {
                                      children: e.jsx(f, { text: s.meta }),
                                    }),
                                    s.url &&
                                      e.jsx(t, {
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
                                      e.jsx(t, {
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
                            children: L.map((s) =>
                              e.jsxs(
                                "li",
                                {
                                  children: [
                                    e.jsx("strong", { children: s.title }),
                                    e.jsx("span", {
                                      children: e.jsx(f, { text: s.meta }),
                                    }),
                                    s.url &&
                                      e.jsx(t, {
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
                  e.jsx(j, { id: "honors", children: "荣誉奖项" }),
                  e.jsx("div", {
                    className: "simple-list",
                    children: O.map((s) =>
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
                  e.jsx(j, { id: "experience", children: "工作经历" }),
                  e.jsx("div", {
                    className: "experience-list",
                    children: Y.map((s) =>
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
                  e.jsx(j, { id: "visitors", children: "访客分布" }),
                  e.jsx(T, {}),
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
E.createRoot(document.getElementById("root")).render(
  e.jsx(h.StrictMode, { children: e.jsx(B, {}) }),
);
