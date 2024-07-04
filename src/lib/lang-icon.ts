import DeviconPlainBash from '~icons/devicon-plain/bash';
import DeviconPlainHtml5 from '~icons/devicon-plain/html5';
import DeviconPlainJavascript from '~icons/devicon-plain/javascript';
import DeviconPlainJson from '~icons/devicon-plain/json';
import DeviconPlainPostcss from '~icons/devicon-plain/postcss';
import DeviconPlainRust from '~icons/devicon-plain/rust';
import DeviconPlainTypescript from '~icons/devicon-plain/typescript';
import DeviconPlainYaml from '~icons/devicon-plain/yaml';
import MaterialSymbolsMarkdown from '~icons/material-symbols/markdown';
import SimpleIconsDotenv from '~icons/simple-icons/dotenv';
import SimpleIconsMdx from '~icons/simple-icons/mdx';

export const LangIcons = {
  rust: DeviconPlainRust,
  typescript: DeviconPlainTypescript,
  javascript: DeviconPlainJavascript,
  bash: DeviconPlainBash,
  sh: DeviconPlainBash,
  html: DeviconPlainHtml5,
  postcss: DeviconPlainPostcss,
  mdx: SimpleIconsMdx,
  md: MaterialSymbolsMarkdown,
  json: DeviconPlainJson,
  env: SimpleIconsDotenv,
  yaml: DeviconPlainYaml,
};

export type Language = keyof typeof LangIcons;
