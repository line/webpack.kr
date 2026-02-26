// Import External Dependencies
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Import Components
import Contributors from "../Contributors/Contributors.jsx";
import Link from "../Link/Link.jsx";
import Markdown from "../Markdown/Markdown.jsx";
import PageLinks from "../PageLinks/PageLinks.jsx";
import { placeholderString } from "../Placeholder/Placeholder.jsx";
import Translators from "../Translators/Translators.jsx";
import AdjacentPages from "./AdjacentPages.jsx";

// Load Styling
import "./Page.scss";

export default function Page(props) {
  const {
    title,
    contributors = [],
    translators = [],
    related = [],
    previous,
    next,
    ...rest
  } = props;

  const isDynamicContent = props.content instanceof Promise;
  const [content, setContent] = useState(
    isDynamicContent
      ? placeholderString()
      : () => props.content.default || props.content,
  );
  const [contentLoaded, setContentLoaded] = useState(!isDynamicContent);

  useEffect(() => {
    if (props.content instanceof Promise) {
      props.content
        .then((mod) => {
          setContent(() => mod.default || mod);
          setContentLoaded(true);
        })
        .catch(() => setContent("Error loading content."));
    }
  }, [props.content]);

  const { hash, pathname } = useLocation();

  useEffect(() => {
    let observer;
    if (contentLoaded) {
      if (hash) {
        const target = document.querySelector("#md-content");
        // two cases here
        // 1. server side rendered page, so hash target is already there
        if (document.querySelector(hash)) {
          document.querySelector(hash).scrollIntoView();
        } else {
          // 2. dynamic loaded content
          // we need to observe the dom change to tell if hash exists
          observer = new MutationObserver(() => {
            const element = document.querySelector(hash);
            if (element) {
              element.scrollIntoView();
            }
          });
          observer.observe(target, {
            childList: true,
            attributes: false,
            subtree: false,
          });
        }
      } else {
        window.scrollTo(0, 0);
      }
    }
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [contentLoaded, pathname, hash]);

  const numberOfContributors = contributors.length;
  const loadRelated = contentLoaded && related && related.length !== 0;
  const loadContributors =
    contentLoaded && contributors && numberOfContributors !== 0;
  const loadTranslators =
    contentLoaded && translators && translators.length !== 0;

  let contentRender;

  if (typeof content === "function") {
    contentRender = content({}).props.children;
  } else {
    contentRender = (
      <div
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    );
  }
  return (
    <main id="main-content" className="page">
      <Markdown>
        <h1>{title}</h1>

        {rest.thirdParty ? (
          <div className="italic my-[20px]">
            <strong className="font-bold">면책 사항:</strong> {title} 은/는
            커뮤니티 구성원에 의해 유지되는 서드파티 패키지로 webpack과 동일한
            지원, 보안 정책 또는 라이선스가 없을 수 있으며 webpack에 의해 관리
            및 유지되지 않습니다.
          </div>
        ) : null}

        <div id="md-content">{contentRender}</div>

        {loadRelated && (
          <div className="print:hidden">
            <h2>Further Reading</h2>
            <ul>
              {related.map((link, index) => (
                <li key={index}>
                  <Link to={link.url}>{link.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <PageLinks page={rest} />

        {(previous || next) && (
          <AdjacentPages previous={previous} next={next} />
        )}

        {loadContributors && (
          <div data-testid="contributors" className="print:hidden">
            <h2 className="!font-sans !font-normal">
              {numberOfContributors}{" "}
              {numberOfContributors === 1 ? "Contributor" : "Contributors"}
            </h2>
            <Contributors contributors={contributors} />
          </div>
        )}

        {loadTranslators && (
          <div className="translators__section">
            <hr />
            <h3>Translators</h3>
            <Translators translators={translators} />
          </div>
        )}
      </Markdown>
    </main>
  );
}

Page.propTypes = {
  title: PropTypes.string,
  contributors: PropTypes.array,
  translators: PropTypes.array,
  related: PropTypes.array,
  previous: PropTypes.object,
  next: PropTypes.object,
  content: PropTypes.oneOfType([
    PropTypes.shape({
      // eslint-disable-next-line unicorn/no-thenable
      then: PropTypes.func.isRequired,
      default: PropTypes.string,
    }),
  ]),
};
