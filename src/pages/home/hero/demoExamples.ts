export const sampleQuoteValues = { 고객명: "김민지", 금액: "150,000" };

export const quoteExample = {
  shortcut: "\\견적",
  template: "안녕하세요, {{고객명}}님.\n요청하신 작업의 견적은 {{금액}}원입니다.\n검토 후 궁금한 점은 편하게 알려주세요.",
  variables: [
    { name: "고객명", placeholder: "예: 김민지" },
    { name: "금액", placeholder: "예: 150,000" },
  ],
};

export const meetingExample = {
  shortcut: "\\회의",
  template: "안녕하세요. 다음 회의 일정을 안내드립니다.\n참석 가능 여부를 회신해 주세요.",
  variables: [],
};

export const demoTemplates = [quoteExample, meetingExample];

export type DemoTemplate = (typeof demoTemplates)[number];

export type DemoPreview = {
  template: DemoTemplate;
  values: Record<string, string>;
  before: string;
  after: string;
};

export function getDemoCommand(body: string, caret: number) {
  return body.slice(0, caret).match(/(?:^|\s)(\\[^\s\\]*)$/)?.[1];
}

export function fillDemoTemplate(template: DemoTemplate, values: Record<string, string>) {
  return template.template.replace(/\{\{\s*([^{}]+?)\s*\}\}/g,
    (placeholder, name: string) => values[name.trim()] ?? placeholder,
  );
}

export function shortenPreviewValue(value: string) {
  const characters = Array.from(value);
  return characters.length > 8 ? characters.slice(0, 8).join("") + "..." : value;
}
