/*
 * Catches the content mistakes that type checking cannot see.
 *
 * Every rule here corresponds to something that has actually gone wrong: an
 * edge label sitting on top of the node beside it, a roadmap phase count that
 * left a grey panel where a card should be, a diagram label quietly clipped by
 * the box containing it. All of them type-check perfectly and all of them are
 * only visible by looking at the page — which is exactly the check nobody does
 * after editing one line of prose.
 *
 * Run with `npm run check:content`.
 *
 * The content modules are TypeScript, so they are transpiled with the compiler
 * the project already depends on and evaluated in place. No test framework and
 * no new dependency: this has to be cheap enough that it always runs.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join, basename } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const ROOT = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const PROJECTS = join(ROOT, "content", "projects");

/* ------------------------------------------------------------ geometry ---
 *
 * These mirror the renderers. They are duplicated rather than imported
 * because the renderers are TSX modules built for the browser, and a check
 * that needs a bundler to run is a check that stops being run.
 *
 * If either component's layout constants change, change them here too — the
 * comment in each component says so.
 */

// components/diagrams/BlockDiagram.tsx
const CELL_W = 172;
const CELL_H = 78;
const GAP_X = 52;

/* Edge labels render at 9px in a monospaced face, where every character
 * advances the same 0.6em — so their width is genuinely predictable rather
 * than estimated. The label is drawn 6px past the midpoint of its connector. */
const EDGE_CHAR_W = 9 * 0.6;
const EDGE_LABEL_OFFSET = 6;

/* Node text is proportional, so these are averages measured against rendered
 * output rather than exact: a 23-character title over a 29-character sub
 * computes to 78px here and measures 76px in a browser. */
const NODE_TEXT_W = CELL_W - 24; // box padding
const TITLE_CHAR_W = 6.5; // 13px Inter, medium
const TITLE_LINE_H = 16;
const SUB_CHAR_W = 6; // 10px mono
const SUB_LINE_H = 13;
const NODE_PADDING = 16;

// components/RoadmapTimeline.tsx — the phase counts with a gapless layout
const ROADMAP_MAX_PHASES = 6;

/* ---------------------------------------------------------------- checks --- */

const problems = [];
const fail = (file, rule, detail) => problems.push({ file, rule, detail });

/** Loads one content module by transpiling away its types and evaluating it. */
function loadCaseStudy(path) {
  const source = readFileSync(path, "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });
  const module = { exports: {} };
  new Function("module", "exports", outputText)(module, module.exports);
  return module.exports.default;
}

/**
 * A roadmap only lays out without gaps at a phase count the component has a
 * column mapping for. Past that it falls back to a single column, which is
 * safe but is not what anyone intended.
 */
function checkRoadmap(file, study) {
  const phases = study.roadmap?.length ?? 0;
  if (phases > ROADMAP_MAX_PHASES) {
    fail(
      file,
      "roadmap phases",
      `${phases} phases — the component maps up to ${ROADMAP_MAX_PHASES} and falls back to one column past that. ` +
        `Either split the roadmap or add a column mapping for ${phases}.`
    );
  }
}

/**
 * Two nodes on the same row in neighbouring columns are separated by exactly
 * `GAP_X`, and an edge label between them has only that gap to sit in. Longer
 * than that and it renders across the node it points at — legible, wrong, and
 * invisible to every automated check the project had before this one.
 */
function checkEdgeLabels(file, diagram) {
  const byId = new Map(diagram.nodes.map((n) => [n.id, n]));

  for (const edge of diagram.edges ?? []) {
    if (!edge.label) continue;

    const from = byId.get(edge.from);
    const to = byId.get(edge.to);
    if (!from || !to) continue;

    const width = edge.label.length * EDGE_CHAR_W + EDGE_LABEL_OFFSET;
    const sameRow = from.row === to.row;
    const adjacent = Math.abs(from.col - to.col) === 1;

    // Between neighbours on one row the only space is the gap itself.
    // Elsewhere the label sits in a gutter and may run about a cell wide.
    const available = sameRow && adjacent ? GAP_X : CELL_W;

    if (width > available) {
      fail(
        file,
        "diagram edge label",
        `"${diagram.id}": label "${edge.label}" needs ~${Math.round(width)}px and has ${available}px ` +
          `(${edge.from} → ${edge.to}). It will render over the node beside it. ` +
          `Shorten it to about ${Math.floor((available - EDGE_LABEL_OFFSET) / EDGE_CHAR_W)} characters, or move the point into the diagram caption.`
      );
    }
  }
}

/**
 * Node boxes are `foreignObject`, which clips rather than letting text spill —
 * so an over-long label does not look cramped, it silently loses its last line.
 */
function checkNodeLabels(file, diagram) {
  for (const node of diagram.nodes) {
    const titleLines = Math.ceil((node.t.length * TITLE_CHAR_W) / NODE_TEXT_W);
    const subLines = node.sub ? Math.ceil((node.sub.length * SUB_CHAR_W) / NODE_TEXT_W) : 0;
    const height =
      titleLines * TITLE_LINE_H + (subLines ? 4 + subLines * SUB_LINE_H : 0) + NODE_PADDING;

    if (height > CELL_H) {
      fail(
        file,
        "diagram node label",
        `"${diagram.id}": node "${node.id}" needs ~${Math.round(height)}px of a ${CELL_H}px box ` +
          `("${node.t}"${node.sub ? ` / "${node.sub}"` : ""}). The last line will be clipped away.`
      );
    }
  }
}

/** Edges pointing at nodes that do not exist draw nothing, silently. */
function checkEdgeTargets(file, diagram) {
  const ids = new Set(diagram.nodes.map((n) => n.id));
  for (const edge of diagram.edges ?? []) {
    for (const end of ["from", "to"]) {
      if (!ids.has(edge[end])) {
        fail(file, "diagram edge target", `"${diagram.id}": edge ${end} "${edge[end]}" matches no node.`);
      }
    }
  }
}

/** Two nodes in one grid cell render on top of each other. */
function checkNodeCollisions(file, diagram) {
  const seen = new Map();
  for (const node of diagram.nodes) {
    for (let c = node.col; c < node.col + (node.span ?? 1); c += 1) {
      const cell = `${node.row}:${c}`;
      if (seen.has(cell)) {
        fail(
          file,
          "diagram node collision",
          `"${diagram.id}": "${node.id}" and "${seen.get(cell)}" both occupy row ${node.row}, column ${c}.`
        );
      }
      seen.set(cell, node.id);
    }
  }
}

/** Diagram ids become anchors on the page, so duplicates break navigation. */
function checkDiagramIds(file, study) {
  const seen = new Set();
  for (const diagram of allDiagrams(study)) {
    if (seen.has(diagram.id)) {
      fail(file, "duplicate diagram id", `"${diagram.id}" is used more than once in this note.`);
    }
    seen.add(diagram.id);
  }
}

function allDiagrams(study) {
  return [...(study.architecture?.diagrams ?? []), study.solutionDesign?.flowDiagram].filter(Boolean);
}

/* ------------------------------------------------------------------ run --- */

const files = readdirSync(PROJECTS).filter((f) => f.startsWith("case-") && f.endsWith(".ts"));
const studies = new Map();

for (const file of files) {
  studies.set(file, loadCaseStudy(join(PROJECTS, file)));
}

const publishedSlugs = new Set([...studies.values()].map((s) => s.slug));

for (const [file, study] of studies) {
  const name = basename(file);

  checkRoadmap(name, study);
  checkDiagramIds(name, study);

  for (const diagram of allDiagrams(study)) {
    if (diagram.kind !== "blocks") continue;
    checkEdgeTargets(name, diagram);
    checkNodeCollisions(name, diagram);
    checkEdgeLabels(name, diagram);
    checkNodeLabels(name, diagram);
  }

  // A counterpart pointing at an unwritten note would render a link to a 404.
  if (study.counterpart && !publishedSlugs.has(study.counterpart.slug)) {
    fail(name, "counterpart", `points at "${study.counterpart.slug}", which is not a published note.`);
  }
}

const diagramCount = [...studies.values()].reduce((n, s) => n + allDiagrams(s).length, 0);

if (problems.length === 0) {
  console.log(`✓ ${studies.size} case notes, ${diagramCount} diagrams — nothing to report.`);
  process.exit(0);
}

console.error(`\n${problems.length} problem${problems.length === 1 ? "" : "s"}:\n`);
for (const { file, rule, detail } of problems) {
  console.error(`  ${file}`);
  console.error(`    ${rule}: ${detail}\n`);
}
process.exit(1);
