import type { BlogPost } from "../types";

/** The craft piece — about how this site's own diagrams are built. */
const post: BlogPost = {
  slug: "an-architecture-diagram-that-type-checks",
  title: "An architecture diagram that type-checks",
  excerpt:
    "Diagrams exported as images go stale, cannot be searched, and quietly disagree with the text around them. Treating them as typed content instead is a modest amount of work with a disproportionate payoff — including catching two rendering bugs no type system could see.",
  date: "2026-07-30",
  readingTime: "8 min",
  tags: ["Documentation", "Diagrams", "TypeScript", "Craft"],
  category: "Craft",
  featured: false,
  body: [
    {
      paragraphs: [
        "Architecture diagrams are usually images. Someone draws one in a diagramming tool, exports a PNG, and drops it into a document. Six months later the system has changed, the diagram has not, and nobody can tell — because an image cannot disagree with anything. It is not wrong so much as inert.",
        "The diagrams on this site are not images. They are typed data, rendered by components at page load, and the difference turned out to be worth more than I expected when I started.",
      ],
    },
    {
      heading: "What it looks like",
      paragraphs: [
        "A diagram is an object. It has a kind, a title, a caption, a list of nodes with grid positions, and a list of edges between them. A schema defines the permitted shapes and the compiler rejects anything that does not fit.",
        "A node is roughly: an id, a label, an optional second line, a column and a row, and flags for whether it is emphasised or drawn as external. An edge is a from, a to, an optional label and whether it is dashed. That is the entire vocabulary for the block diagrams, and it is deliberately small.",
        "Adding a box is adding an object to an array. Moving one is changing two numbers. There is no drawing tool anywhere in the loop and no exported asset to keep in sync with anything.",
        "The renderer places the grid, computes connector routes that stay out of cells they do not belong to, and draws the boxes as HTML inside the SVG so text wraps and inherits the page's typography. Below a certain width it gives up on the grid entirely and renders the same structure as an ordered list, because shrinking the labels further would cost legibility.",
      ],
    },
    {
      heading: "What that buys",
      paragraphs: [
        "Four things, roughly in ascending order of how much I have come to care about them.",
      ],
      bullets: [
        "The text inside a diagram is real text. It is indexed by search, readable by a screen reader, and selectable by a reader who wants to paste a component name somewhere. An image of the same diagram is, to all of those, a blank rectangle.",
        "Colours come from the same tokens as the page, so diagrams follow light and dark themes without a second set of exports — and without the familiar experience of a white-background PNG glowing in a dark-mode article.",
        "A change shows up in a diff as a changed line rather than a replaced binary. Somebody can review it. Somebody can also see, a year later, exactly when a component was added and in which commit.",
        "A missing required field is a build error rather than a blank rectangle nobody notices until a reader mentions it.",
      ],
    },
    {
      heading: "And the thing I did not anticipate",
      paragraphs: [
        "Because the diagrams are data, they can be checked by a script. It turns out they need to be.",
        "Twice, a diagram here rendered wrongly in a way type checking cannot possibly catch, because both were perfectly valid data.",
        "The first: an edge label longer than the gap between the two boxes it sat between. Adjacent nodes on the same row are separated by 52 pixels. Labels render at 9 pixels in a monospaced face, where every character advances the same 0.6 em — so about eight characters fit. The label was \"no hard rule fired\", eighteen characters, needing around 103 pixels. It drew straight across the node it pointed at. Legible, wrong, and invisible to everything except a person looking at the page.",
        "The second: a roadmap with three phases in a two-column grid. The grid draws its hairlines by showing a line-coloured container through one-pixel gaps, which means any cell the content does not fill renders as a solid panel in the line colour. Three phases in two columns leaves one such cell in the second row — a 213-pixel grey block that reads as missing content. This one had already been half-fixed: someone had matched column counts to phase counts at the large breakpoint and not noticed that every layout still passed through two columns on the way there.",
        "Both compiled. Both passed every test. Both were only visible by opening the page and looking, which is precisely the check nobody performs after editing one line of prose in a case study.",
      ],
    },
    {
      heading: "So the constants got a second reader",
      paragraphs: [
        "The layout constants that govern the renderer now also govern a script that reads every diagram and computes whether each label fits the space it will be drawn into.",
        "It knows the cell width, the gap between cells, the character advance of the label font and where the label is offset from the connector midpoint. For an edge between neighbours on the same row it compares the label width against the gap; for anything else, against a cell width, since a diagonal edge has a gutter to sit in. For node labels it estimates wrapped line count against the box height, calibrated against measurements taken from a rendered page — a 23-character title over a 29-character sub-line computes to 78 pixels and measures 76.",
        "It also checks the things that are simply wrong rather than merely ugly: edges pointing at nodes that do not exist, two nodes occupying the same grid cell, duplicate diagram identifiers where those become page anchors, and roadmap phase counts the layout has no gapless arrangement for.",
        "About a hundred and fifty lines, runs in well under a second, and needs no test framework — it loads the content modules through the TypeScript compiler the project already depends on. That last part matters more than it sounds: a check that requires a bundler, or a browser, or a separate install, is a check that stops being run.",
        "I verified it the only way worth verifying such a thing. I reintroduced both original defects and confirmed it failed on both, with the fix in the message.",
      ],
    },
    {
      heading: "What it cannot see",
      paragraphs: [
        "It reasons about geometry from the same constants as the renderer, which makes it good at labels and grids and blind to everything else.",
        "It will not notice a connector routed through a gap that is technically empty but visually confusing. It has no opinion on whether a diagram is comprehensible, whether the abstraction level is consistent, or whether two boxes should have been one. It covers only the block diagrams, because the other kinds are laid out by flexbox and have no fixed geometry to reason about.",
        "So a new diagram still wants a look in a browser at desktop width and at 375 pixels. The script has just removed the two failure modes that were silent, which is the useful subset — the ones a human reviewer would also miss.",
      ],
    },
    {
      heading: "How this compares to the usual options",
      paragraphs: [
        "Text-based diagramming tools solve part of the same problem and are the right answer for many projects. They are diffable, they live beside the code, and there is no binary export to go stale.",
        "What they do not give you is a schema you define. Their vocabulary is theirs, so you cannot express \"this node is part of the decision core\" as a typed property and have it render consistently everywhere and be queryable. You also inherit their layout engine, which means you cannot write a check that knows the geometry — the tool knows it and does not tell you.",
        "The trade is straightforward. A general tool gives you far more diagram kinds for no maintenance. A small custom schema gives you exactly the kinds you use, rendered in your own design language, checkable by your own rules. That is worth it when a handful of diagram shapes cover almost everything you draw, and not worth it otherwise.",
      ],
    },
    {
      heading: "The honest cost",
      paragraphs: [
        "You maintain a renderer. It is a real component with real bugs, and both defects above were its bugs rather than the content's. That is the actual price: you have moved the failure from \"the picture is out of date\" to \"the picture is generated by code you own\", and code you own can be wrong in new ways.",
        "You also accept a limited vocabulary. Five kinds of diagram here, and anything outside them is not expressible. That constraint is mostly a benefit — it stops diagrams drifting into decorative shapes that mean nothing in particular — but it does mean occasionally simplifying an idea to fit the grammar, and occasionally deciding that a diagram was not worth drawing.",
        "For a one-off sketch in a document nobody will revisit, none of this is worth it. Draw the picture, export it, move on. For a diagram that has to stay true to a system for years, in a place where being quietly wrong is expensive, the arithmetic is different. And the moment a script can tell you a label will not fit before anyone sees the page, it stops being a documentation preference and starts being a correctness one.",
      ],
    },
  ],
};

export default post;
