"use client";

import worldMap from "@svg-maps/world";
import { useEffect, useMemo, useState } from "react";
import {
  FaEnvelope,
  FaGithub,
  FaGraduationCap,
  FaLanguage,
  FaMapMarkerAlt,
  FaResearchgate,
} from "react-icons/fa";
import { SiOrcid } from "react-icons/si";
import {
  books,
  experience,
  honors,
  patents,
  publications,
  softwareCopyrights,
  type PublicationGroup,
} from "./content";

const scholarUrl =
  "https://scholar.google.com/citations?hl=zh-CN&user=jjXw5-4AAAAJ";
const visitorApiUrl =
  "https://yuang-wei-academic.philrain-cs.chatgpt.site/api/visitors";
const scholarStatsUrl =
  "https://raw.githubusercontent.com/PhilrainV/PhilrainV.github.io/google-scholar-stats/gs_data.json";

const navigation = [
  ["个人简介", "about"],
  ["教育经历", "education"],
  ["论文成果", "publications"],
  ["其他成果", "outputs"],
  ["荣誉奖项", "honors"],
  ["工作经历", "experience"],
] as const;

const interests = [
  "智能教育",
  "可解释人工智能",
  "因果模型",
  "知识追踪",
  "认知诊断",
  "大语言模型",
];

type VisitorCountry = {
  code: string;
  visits: number;
  visitors: number;
};

type RecentVisitor = {
  id: string;
  country: string;
  city: string;
  lastSeen: string;
};

type VisitorStats = {
  totalVisits: number;
  uniqueVisitors: number;
  countries: VisitorCountry[];
  recentVisitors: RecentVisitor[];
};

type ScholarStats = {
  citedby: number;
  hindex: number;
  i10index: number;
  updated?: string;
};

function HighlightedAuthors({ text }: { text: string }) {
  const parts = text.split(/(Yuang Wei|Yu’ang Wei|Wei Yuang|魏雨昂)/g);
  return (
    <>
      {parts.map((part, index) =>
        /^(Yuang Wei|Yu’ang Wei|Wei Yuang|魏雨昂)$/.test(part) ? (
          <strong className="author-self" key={`${part}-${index}`}>
            {part}
          </strong>
        ) : (
          <span key={`${part}-${index}`}>{part}</span>
        ),
      )}
    </>
  );
}

function SectionHeading({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <h2 className="section-heading" id={id}>
      {children}
    </h2>
  );
}

function ExternalLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

function VisitorMap() {
  const [stats, setStats] = useState<VisitorStats | null>(null);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    let active = true;

    async function registerAndLoad() {
      try {
        await fetch(visitorApiUrl, { method: "POST", mode: "cors" });
        const response = await fetch(visitorApiUrl, {
          cache: "no-store",
          mode: "cors",
        });
        if (!response.ok) throw new Error("visitor statistics unavailable");
        const data = (await response.json()) as VisitorStats;
        if (active) setStats(data);
      } catch {
        if (active) setUnavailable(true);
      }
    }

    registerAndLoad();
    return () => {
      active = false;
    };
  }, []);

  const visitsByCountry = useMemo(
    () =>
      new Map(
        (stats?.countries ?? []).map((item) => [item.code.toLowerCase(), item]),
      ),
    [stats],
  );
  const maxVisits = Math.max(
    1,
    ...(stats?.countries ?? []).map((item) => item.visits),
  );

  return (
    <div className="visitor-dashboard">
      <div className="visitor-map-panel">
        <svg
          className="world-map"
          viewBox={worldMap.viewBox}
          role="img"
          aria-label="网站访客世界分布地图"
        >
          {worldMap.locations.map(
            (location: { id: string; name: string; path: string }) => {
              const country = visitsByCountry.get(location.id);
              const intensity = country
                ? 0.3 + (country.visits / maxVisits) * 0.7
                : 0;
              return (
                <path
                  className={
                    country ? "country-shape has-visits" : "country-shape"
                  }
                  d={location.path}
                  key={location.id}
                  style={country ? { opacity: intensity } : undefined}
                >
                  <title>
                    {country
                      ? `${location.name}：${country.visits} 次访问`
                      : location.name}
                  </title>
                </path>
              );
            },
          )}
        </svg>
        <p className="map-credit">地图数据：SVG Maps（CC BY 4.0）</p>
      </div>

      <div className="visitor-summary" aria-live="polite">
        <div className="visitor-metrics">
          <div>
            <strong>{stats?.totalVisits ?? "—"}</strong>
            <span>总访问次数</span>
          </div>
          <div>
            <strong>{stats?.uniqueVisitors ?? "—"}</strong>
            <span>独立访客</span>
          </div>
          <div>
            <strong>{stats?.countries.length ?? "—"}</strong>
            <span>国家与地区</span>
          </div>
        </div>
        <h3>最近访客</h3>
        {unavailable ? (
          <p className="visitor-empty">访客统计暂时不可用。</p>
        ) : stats?.recentVisitors.length ? (
          <ol className="recent-visitors">
            {stats.recentVisitors.map((visitor) => (
              <li key={`${visitor.id}-${visitor.lastSeen}`}>
                <span className="visitor-id">访客 {visitor.id}</span>
                <span>
                  {[visitor.city, visitor.country].filter(Boolean).join("，") ||
                    "未知地区"}
                </span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="visitor-empty">正在读取访客数据……</p>
        )}
        <p className="privacy-note">
          为保护访问者隐私，仅显示匿名访客标识与大致地区，不公开完整 IP 地址。
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [paperFilter, setPaperFilter] = useState<"全部" | "期刊" | "会议">(
    "全部",
  );
  const [emailCopied, setEmailCopied] = useState(false);
  const [scholarMetrics, setScholarMetrics] = useState<ScholarStats>({
    citedby: 330,
    hindex: 11,
    i10index: 12,
    updated: "2026-08-02",
  });

  useEffect(() => {
    let active = true;

    fetch(scholarStatsUrl, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("scholar statistics unavailable");
        return response.json() as Promise<Partial<ScholarStats>>;
      })
      .then((data) => {
        if (!active) return;
        setScholarMetrics((current) => ({
          citedby: Number(data.citedby ?? current.citedby),
          hindex: Number(data.hindex ?? current.hindex),
          i10index: Number(data.i10index ?? current.i10index),
          updated: data.updated ?? current.updated,
        }));
      })
      .catch(() => undefined);

    return () => {
      active = false;
    };
  }, []);

  const groupedPublications = useMemo(() => {
    const groups: PublicationGroup[] = [
      "英文期刊论文",
      "中文期刊论文",
      "学术会议论文",
    ];
    return groups
      .filter(
        (group) =>
          paperFilter === "全部" ||
          (paperFilter === "期刊"
            ? group !== "学术会议论文"
            : group === "学术会议论文"),
      )
      .map((group) => ({
        group,
        papers: publications.filter((paper) => paper.group === group),
      }));
  }, [paperFilter]);

  async function copyEmail() {
    const email = "philrain@foxmail.com";
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const helper = document.createElement("textarea");
      helper.value = email;
      helper.style.position = "fixed";
      helper.style.opacity = "0";
      document.body.appendChild(helper);
      helper.select();
      document.execCommand("copy");
      helper.remove();
    }
    setEmailCopied(true);
    window.setTimeout(() => setEmailCopied(false), 1600);
  }

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <a className="site-title" href="#about" aria-label="返回页面顶部">
            魏雨昂
          </a>
          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen ? "关闭导航" : "打开导航"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
          <nav
            className={menuOpen ? "main-nav is-open" : "main-nav"}
            aria-label="主导航"
          >
            {navigation.map(([label, id]) => (
              <a href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
            <a
              className="language-switch"
              href="https://philrainv.github.io/YuangWei_EN/"
              target="_self"
              aria-label="切换到英文主页"
            >
              <FaLanguage aria-hidden="true" />
              English
            </a>
          </nav>
        </div>
      </header>

      <main className="page-shell">
        <aside className="profile-panel" aria-label="个人资料">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="portrait"
            src="/images/weiyuang.png"
            alt="魏雨昂的个人照片"
          />
          <div className="profile-intro">
            <h1>魏雨昂</h1>
            <p className="position">华中师范大学人工智能教育学部 · 讲师</p>
          </div>

          <div className="contact-list">
            <div className="contact-location">
              <FaMapMarkerAlt className="contact-icon" aria-hidden="true" />
              武汉，中国
            </div>
            <button type="button" onClick={copyEmail}>
              <FaEnvelope className="contact-icon" aria-hidden="true" />
              {emailCopied ? "邮箱已复制" : "philrain@foxmail.com"}
            </button>
            <ExternalLink href="https://www.researchgate.net/profile/Yuang-Wei">
              <FaResearchgate className="contact-icon" aria-hidden="true" />
              ResearchGate
            </ExternalLink>
            <ExternalLink href="https://github.com/PhilrainV">
              <FaGithub className="contact-icon" aria-hidden="true" />
              GitHub
            </ExternalLink>
            <ExternalLink href={scholarUrl}>
              <FaGraduationCap
                className="contact-icon scholar-mark"
                aria-hidden="true"
              />
              Google Scholar
            </ExternalLink>
            <ExternalLink href="https://orcid.org/0000-0002-8187-4011">
              <SiOrcid className="contact-icon" aria-hidden="true" />
              ORCID
            </ExternalLink>
          </div>

          <ExternalLink href={scholarUrl} className="scholar-card">
            <div className="scholar-card-title">
              <span>
                <FaGraduationCap aria-hidden="true" /> Google Scholar
              </span>
              <span aria-hidden="true">↗</span>
            </div>
            <div className="scholar-metrics">
              <div>
                <strong>{scholarMetrics.citedby}</strong>
                <span>引用</span>
              </div>
              <div>
                <strong>{scholarMetrics.hindex}</strong>
                <span>h 指数</span>
              </div>
              <div>
                <strong>{scholarMetrics.i10index}</strong>
                <span>i10 指数</span>
              </div>
            </div>
            <small>
              数据自动更新
              {scholarMetrics.updated
                ? ` · ${scholarMetrics.updated.slice(0, 10).replaceAll("-", ".")}`
                : ""}
            </small>
          </ExternalLink>
        </aside>

        <div className="main-content">
          <section
            className="content-section about-section"
            aria-labelledby="about"
          >
            <SectionHeading id="about">个人简介</SectionHeading>
            <div className="intro-text">
              <p>
                我博士毕业于中国上海的
                <strong>华东师范大学上海智能教育研究院</strong>
                智能教育专业，导师为
                <ExternalLink href="https://faculty.ecnu.edu.cn/_s8/jb2/main.psp">
                  江波教授
                </ExternalLink>
                。现任华中师范大学人工智能教育学部讲师，正在开展一些有趣且有意义的智能教育研究，已发表
                20+ 篇学术论文（包含合作）。
              </p>
              <p>
                担任 <em>Computers & Education</em>、
                <em>Education and Information Technologies</em>、
                <em>Information Processing & Management</em>、
                <em>IEEE Transactions on Emerging Topics in Computing</em>、
                <em>
                  International Journal of Artificial Intelligence in Education
                </em>
                、<em>Knowledge-Based Systems</em>、
                <em>Humanities & Social Sciences Communications</em>{" "}
                等期刊，以及 NeurIPS、AAAI、KDD、ICASSP、AIED、EDM
                等会议审稿人。
              </p>
              <p>
                如果您对我的研究感兴趣，欢迎随时联系我！我们一起开展研究、发表论文。
              </p>
            </div>
            <div className="research-row">
              <strong>研究领域</strong>
              <div>
                {interests.map((interest) => (
                  <span key={interest}>{interest}</span>
                ))}
              </div>
            </div>
          </section>

          <section className="content-section" aria-labelledby="education">
            <SectionHeading id="education">教育经历</SectionHeading>
            <div className="education-list">
              <article className="education-item">
                <ExternalLink
                  href="https://aiedu.ecnu.edu.cn/"
                  className="school-logo-link"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/ECNU_logo.png" alt="华东师范大学校徽" />
                </ExternalLink>
                <div className="education-time">2022.06 — 2026.06</div>
                <div className="education-body">
                  <h3>
                    <ExternalLink href="https://aiedu.ecnu.edu.cn/">
                      华东师范大学
                    </ExternalLink>
                  </h3>
                  <p>上海智能教育研究院 · 智能教育 · 博士</p>
                  <p className="education-note">
                    导师：
                    <ExternalLink href="https://faculty.ecnu.edu.cn/_s8/jb2/main.psp">
                      江波教授
                    </ExternalLink>
                    <span>上海</span>
                  </p>
                </div>
              </article>
              <article className="education-item">
                <ExternalLink
                  href="https://www.comp.nus.edu.sg/cs/"
                  className="school-logo-link"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/NUS_logo.png" alt="新加坡国立大学校徽" />
                </ExternalLink>
                <div className="education-time">2024.09 — 2025.09</div>
                <div className="education-body">
                  <h3>
                    <ExternalLink href="https://www.comp.nus.edu.sg/cs/">
                      新加坡国立大学
                    </ExternalLink>
                  </h3>
                  <p>计算机科学系 · 人机交互 · CSC 联合培养博士</p>
                  <p className="education-note">
                    导师：
                    <ExternalLink href="https://www.comp.nus.edu.sg/cs/people/brianlim/">
                      Brian Y. Lim 副教授
                    </ExternalLink>
                    <span>新加坡</span>
                  </p>
                </div>
              </article>
              <article className="education-item">
                <ExternalLink
                  href="https://dqgc.ncut.edu.cn/"
                  className="school-logo-link"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/NCUT_logo.png" alt="北方工业大学校徽" />
                </ExternalLink>
                <div className="education-time">2015.09 — 2022.06</div>
                <div className="education-body">
                  <h3>
                    <ExternalLink href="https://dqgc.ncut.edu.cn/">
                      北方工业大学
                    </ExternalLink>
                  </h3>
                  <p>电气与控制工程学院 · 自动化学士、控制科学与工程硕士</p>
                  <p className="education-note">
                    导师：
                    <ExternalLink href="https://dqgc.ncut.edu.cn/info/1228/3137.htm">
                      徐继宁副教授
                    </ExternalLink>
                    <span>北京</span>
                  </p>
                </div>
              </article>
            </div>
          </section>

          <section className="content-section" aria-labelledby="publications">
            <div className="heading-with-tools">
              <SectionHeading id="publications">论文成果</SectionHeading>
              <div className="paper-filter" aria-label="筛选论文类型">
                {(["全部", "期刊", "会议"] as const).map((item) => (
                  <button
                    type="button"
                    key={item}
                    className={paperFilter === item ? "is-active" : ""}
                    aria-pressed={paperFilter === item}
                    onClick={() => setPaperFilter(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <p className="publication-legend">
              <span>魏雨昂 / Yuang Wei</span> 表示本人；论文按类别及年份排列。
            </p>

            {groupedPublications.map(({ group, papers }) => (
              <div className="publication-group" key={group}>
                <h3 className="publication-group-title">
                  {group}
                  <span>{papers.length}</span>
                </h3>
                <div className="publication-list">
                  {papers.map((paper) => (
                    <article
                      className={
                        paper.image
                          ? "publication-item with-image"
                          : "publication-item"
                      }
                      key={`${paper.year}-${paper.title}`}
                    >
                      {paper.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          className="publication-image"
                          src={paper.image}
                          alt={`${paper.title} 论文实验流程图`}
                          loading="lazy"
                          style={{ objectFit: paper.imageFit || "cover" }}
                        />
                      )}
                      <div className="publication-main">
                        <div className="publication-meta">
                          <span className="venue-badge">{paper.venue}</span>
                          <time>{paper.year}</time>
                        </div>
                        <h4>{paper.title}</h4>
                        <p className="publication-authors">
                          <HighlightedAuthors text={paper.authors} />
                        </p>
                        <p className="publication-venue">{paper.publication}</p>
                        <div className="publication-links">
                          {paper.webpage && (
                            <ExternalLink href={paper.webpage}>
                              网页 <span aria-hidden="true">↗</span>
                            </ExternalLink>
                          )}
                          <ExternalLink href={paper.download}>
                            下载 <span aria-hidden="true">↓</span>
                          </ExternalLink>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </section>

          <section className="content-section" aria-labelledby="outputs">
            <SectionHeading id="outputs">其他成果</SectionHeading>
            <div className="output-columns">
              <div className="output-block">
                <h3>图书</h3>
                <ol>
                  {books.map((item) => (
                    <li key={item.title}>
                      <strong>{item.title}</strong>
                      <span>
                        <HighlightedAuthors text={item.meta} />
                      </span>
                      {item.url && (
                        <ExternalLink href={item.url}>
                          {item.linkLabel ?? "查看资料 ↗"}
                        </ExternalLink>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="output-block">
                <h3>发明专利</h3>
                <ol>
                  {patents.map((item) => (
                    <li key={item.title}>
                      <strong>{item.title}</strong>
                      <span>
                        <HighlightedAuthors text={item.meta} />
                      </span>
                      {item.url && (
                        <ExternalLink href={item.url}>
                          {item.linkLabel ?? "查看资料 ↗"}
                        </ExternalLink>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="output-block">
                <h3>软件著作权</h3>
                <ol>
                  {softwareCopyrights.map((item) => (
                    <li key={item.title}>
                      <strong>{item.title}</strong>
                      <span>
                        <HighlightedAuthors text={item.meta} />
                      </span>
                      {item.url && (
                        <ExternalLink href={item.url}>
                          {item.linkLabel ?? "查看资料 ↗"}
                        </ExternalLink>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          <section className="content-section" aria-labelledby="honors">
            <SectionHeading id="honors">荣誉奖项</SectionHeading>
            <div className="simple-list">
              {honors.map((item) => (
                <div key={`${item.year}-${item.title}`}>
                  <time>{item.year}</time>
                  <p>{item.title}</p>
                  {item.award && <strong>{item.award}</strong>}
                </div>
              ))}
            </div>
          </section>

          <section className="content-section" aria-labelledby="experience">
            <SectionHeading id="experience">工作经历</SectionHeading>
            <div className="experience-list">
              {experience.map((item) => (
                <article key={`${item.period}-${item.organization}`}>
                  <time>{item.period}</time>
                  <div>
                    <h3>{item.organization}</h3>
                    <p>{item.role}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section
            className="content-section visitor-section"
            aria-labelledby="visitors"
          >
            <SectionHeading id="visitors">访客分布</SectionHeading>
            <VisitorMap />
          </section>
        </div>
      </main>

      <footer className="site-footer">
        <p>© 2026 魏雨昂</p>
        <p>最后更新于 2026 年 8 月</p>
      </footer>
    </>
  );
}
