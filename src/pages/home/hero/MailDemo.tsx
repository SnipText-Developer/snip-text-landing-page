import "./MailDemo.css";
import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { LogoMark } from "pages/shared/Brand";
import {
  demoTemplates, fillDemoTemplate, getDemoCommand, quoteExample,
  type DemoPreview, type DemoTemplate,
} from "./demoExamples";

export default function MailDemo({ onPreviewChange }: {
  onPreviewChange: (preview: DemoPreview | null) => void;
}) {
  const [body, setBody] = useState("");
  const [caret, setCaret] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [composing, setComposing] = useState(false);
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState<DemoTemplate | null>(null);
  const [inserted, setInserted] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});
  const [invalid, setInvalid] = useState<string>();
  const editor = useRef<HTMLTextAreaElement>(null);
  const popup = useRef<HTMLDivElement>(null);
  const mirror = useRef<HTMLDivElement>(null);
  const marker = useRef<HTMLSpanElement>(null);
  const restoreCaret = useRef<number | null>(null);
  const resumeList = useRef(false);
  const lastInsertion = useRef<{ template: DemoTemplate; values: Record<string, string>; text: string } | null>(null);

  const command = getDemoCommand(body, caret);
  const query = command?.slice(1).normalize("NFC").toLocaleLowerCase() ?? "";
  const matches = demoTemplates.filter(({ shortcut }) =>
    shortcut.slice(1).normalize("NFC").toLocaleLowerCase().startsWith(query),
  );
  const listOpen = !selected && !dismissed && !composing && command !== undefined;
  const open = listOpen || selected !== null;

  useLayoutEffect(() => {
    if (selected) {
      popup.current?.querySelector("input")?.focus();
    } else if (restoreCaret.current !== null) {
      editor.current?.focus();
      editor.current?.setSelectionRange(restoreCaret.current, restoreCaret.current);
      restoreCaret.current = null;
      if (resumeList.current) {
        popup.current?.querySelector<HTMLButtonElement>('[aria-selected="true"]')?.focus();
        resumeList.current = false;
      }
    }
  }, [selected, body]);

  useLayoutEffect(() => {
    const area = editor.current;
    const panel = popup.current;
    const text = mirror.current;
    const cursor = marker.current;
    if (!open || !area || !panel || !text || !cursor) return;
    function position() {
      if (!area || !panel || !text || !cursor) return;
      text.style.width = area.clientWidth + "px";
      const caretX = cursor.offsetLeft - area.scrollLeft;
      const caretY = cursor.offsetTop + cursor.offsetHeight - area.scrollTop;
      panel.style.left = Math.max(0, Math.min(caretX, area.clientWidth - panel.offsetWidth)) + "px";
      panel.style.top = Math.max(0, Math.min(caretY, area.clientHeight)) + 6 + "px";
    }
    position();
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(position);
    observer?.observe(area);
    observer?.observe(panel);
    area.addEventListener("scroll", position);
    window.addEventListener("resize", position);
    return () => {
      observer?.disconnect();
      area.removeEventListener("scroll", position);
      window.removeEventListener("resize", position);
    };
  }, [open, selected, body, caret]);

  useEffect(() => {
    if (!open) return;
    function closeOutside(event: PointerEvent) {
      const target = event.target;
      if (!(target instanceof Node) || target === editor.current || popup.current?.contains(target)) return;
      setSelected(null);
      setComposing(false);
      setDismissed(true);
    }
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [open]);

  function publishTemplate(template: DemoTemplate, nextValues: Record<string, string>) {
    if (command === undefined) return;
    onPreviewChange({
      template,
      values: nextValues,
      before: body.slice(0, caret - command.length),
      after: body.slice(caret),
    });
  }

  function insert(template: DemoTemplate, nextValues: Record<string, string>) {
    if (command === undefined) return;
    const text = fillDemoTemplate(template, nextValues);
    lastInsertion.current = { template, values: nextValues, text };
    const start = caret - command.length;
    publishTemplate(template, nextValues);
    const nextCaret = start + text.length;
    restoreCaret.current = nextCaret;
    setBody(body.slice(0, start) + text + body.slice(caret));
    setCaret(nextCaret);
    setSelected(null);
    setDismissed(true);
    setInserted(true);
  }

  function choose(template: DemoTemplate) {
    if (template.variables.length === 0) {
      insert(template, {});
      return;
    }
    setInvalid(undefined);
    setValues({});
    setInserted(false);
    setSelected(template);
    publishTemplate(template, {});
  }

  function handleListKey(event: KeyboardEvent) {
    if (!listOpen || event.nativeEvent.isComposing || event.keyCode === 229) return;
    if (event.key === "Escape") {
      event.preventDefault();
      return;
    }
    if (matches.length === 0) return;
    if (event.key === "Enter") {
      event.preventDefault();
      if (!event.repeat) choose(matches[active] ?? matches[0]);
    } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
      const direction = event.key === "ArrowDown" ? 1 : -1;
      const next = (active + direction + matches.length) % matches.length;
      setActive(next);
      popup.current?.querySelectorAll<HTMLButtonElement>('[role="option"]')[next]?.focus();
    }
  }

  return (
    <section className="shortcut-demo" id="demo" aria-labelledby="demo-title">
      <header className="demo-header">
        <LogoMark size={24} />
        <h2 id="demo-title">새 메일</h2>
      </header>
      <div className="demo-content">
        <div className="demo-subject"><span>제목</span> 메일 작성 체험</div>
        <div className="demo-form">
          <label htmlFor="demo-body">메일 본문</label>
          <div className="demo-editor">
            <textarea
              ref={editor}
              id="demo-body"
              className="demo-editor-text"
              rows={6}
              value={body}
              readOnly={selected !== null}
              placeholder="여기에 역슬래시(\)를 입력해 보세요."
              aria-describedby="demo-hint"
              aria-controls={listOpen ? "demo-template-list" : undefined}
              spellCheck={false}
              onChange={(event) => {
                const nextBody = event.target.value;
                const nextCaret = event.target.selectionStart;
                const nextCommand = getDemoCommand(nextBody, nextCaret);
                const keyword = nextCommand?.slice(1).normalize("NFC").toLocaleLowerCase();
                const template = keyword
                  ? demoTemplates.find(({ shortcut }) => shortcut.slice(1).startsWith(keyword))
                  : undefined;
                setBody(nextBody);
                setCaret(nextCaret);
                const previous = lastInsertion.current;
                const start = nextCommand === undefined && previous
                  ? nextBody.lastIndexOf(previous.text)
                  : -1;
                if (previous && start >= 0) {
                  onPreviewChange({
                    template: previous.template,
                    values: previous.values,
                    before: nextBody.slice(0, start),
                    after: nextBody.slice(start + previous.text.length),
                  });
                } else {
                  if (!nextBody) lastInsertion.current = null;
                  onPreviewChange(nextBody ? {
                    template: template ?? quoteExample,
                    values: {},
                    before: nextCommand === undefined
                      ? nextBody + (nextBody.endsWith("\n") ? "" : "\n")
                      : nextBody.slice(0, nextCaret - nextCommand.length),
                    after: nextCommand === undefined ? "" : nextBody.slice(nextCaret),
                  } : null);
                }
                setActive(0);
                setDismissed(false);
                setInserted(false);
              }}
              onSelect={(event) => {
                if (selected || event.target !== document.activeElement) return;
                const nextCaret = event.currentTarget.selectionStart;
                if (nextCaret !== caret) {
                  setCaret(nextCaret);
                  setActive(0);
                }
              }}
              onCompositionStart={() => setComposing(true)}
              onCompositionEnd={() => setComposing(false)}
              onKeyDown={handleListKey}
            />
            {open && (
              <>
                <div ref={mirror} className="demo-editor-text demo-caret-mirror" aria-hidden="true">
                  {body.slice(0, caret)}<span ref={marker}>&#8203;</span>{body.slice(caret)}
                </div>
                <div
                  ref={popup}
                  className={selected ? "mini-popup-demo mini-popup-variable" : "mini-popup-demo"}>
                  {selected ? (
                    <>
                      <div className="mini-popup-heading">변수 입력</div>
                      <form
                        noValidate
                        onKeyDown={(event) => {
                          if (event.nativeEvent.isComposing || event.keyCode === 229) return;
                          if (event.key === "Escape") {
                            event.preventDefault();
                            restoreCaret.current = caret;
                            resumeList.current = true;
                            setSelected(null);
                          }
                        }}
                        onSubmit={(event) => {
                          event.preventDefault();
                          if (composing) return;
                          const missing = selected.variables.find(({ name }) => !values[name]?.trim());
                          if (missing) {
                            setInvalid(missing.name);
                            const field = event.currentTarget.elements.namedItem(missing.name);
                            if (field instanceof HTMLInputElement) field.focus();
                            return;
                          }
                          insert(selected, values);
                        }}>
                        <div className="mini-popup-fields">
                          {selected.variables.map(({ name }) => (
                            <label key={name}>
                              {name}
                              <input
                                name={name}
                                required
                                placeholder={name + " 입력"}
                                aria-invalid={invalid === name || undefined}
                                value={values[name] ?? ""}
                                onCompositionStart={() => setComposing(true)}
                                onCompositionEnd={() => setComposing(false)}
                                onChange={(event) => {
                                  const value = event.target.value;
                                  const nextValues = { ...values, [name]: value };
                                  setValues(nextValues);
                                  publishTemplate(selected, nextValues);
                                  if (invalid === name && value.trim()) setInvalid(undefined);
                                }}
                              />
                              {invalid === name && <span role="alert">{name} 값을 입력해 주세요.</span>}
                            </label>
                          ))}
                          <p>모든 입력칸을 채워 주세요.</p>
                        </div>
                        <div className="mini-popup-footer">
                          <button type="submit">Enter 삽입</button>
                          <span> · Tab 다음 항목 · Esc 닫기</span>
                        </div>
                      </form>
                    </>
                  ) : (
                    <>
                      <div className="mini-popup-heading">{query ? "검색 결과" : "최근 사용"}</div>
                      <div
                        id="demo-template-list"
                        role="listbox"
                        aria-label={query ? "검색 결과" : "최근 사용"}
                        onKeyDown={handleListKey}>
                        {matches.map((template, index) => (
                          <button
                            key={template.shortcut}
                            className="mini-popup-option"
                            type="button"
                            role="option"
                            aria-selected={active === index}
                            tabIndex={active === index ? 0 : -1}
                            onMouseDown={(event) => event.preventDefault()}
                            onFocus={() => setActive(index)}
                            onPointerMove={() => setActive(index)}
                            onClick={() => choose(template)}>
                            <strong>{template.shortcut}</strong>
                            <span>{template.template.replace(/\s+/g, " ")}</span>
                            {active === index && <i aria-hidden="true" />}
                          </button>
                        ))}
                        {matches.length === 0 && <p className="mini-popup-empty" role="status">검색 결과가 없습니다.</p>}
                      </div>
                      <div className="mini-popup-footer">↑↓ 이동 · Enter 선택</div>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
          <p className="demo-hint" id="demo-hint">
            <code>\</code>를 입력해 최근 사용 목록을 열거나, <code>\견적</code>으로 검색해 보세요.
          </p>
        </div>
        {inserted && (
          <div className="demo-actions">
            <p className="demo-hint" role="status">메일 본문에 템플릿을 넣었습니다.</p>
            <button
              type="button"
              className="demo-secondary"
              onClick={() => {
                setBody("");
                onPreviewChange(null);
                lastInsertion.current = null;
                setCaret(0);
                setInserted(false);
                editor.current?.focus();
              }}>
              다시 체험하기
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
