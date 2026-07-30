import type { BlogPost } from "./types";

import post01 from "./posts/01-why-i-write-case-notes-about-companies-that-do-not-exist";
import post02 from "./posts/02-two-estates-when-part-of-the-system-cannot-live-in-the-cloud";
import post03 from "./posts/03-four-constraints-that-eliminate-most-architectures";
import post04 from "./posts/04-your-models-accuracy-is-a-licence-not-a-metric";
import post05 from "./posts/05-the-right-to-erasure-is-an-architecture-problem";
import post06 from "./posts/06-the-model-that-decides-is-not-the-model-that-explains";
import post07 from "./posts/07-permissions-belong-in-the-query-not-in-the-results";
import post08 from "./posts/08-nobody-asked-what-a-false-decline-costs";
import post09 from "./posts/09-an-architecture-diagram-that-type-checks";

/**
 * The blog registry — one file per post, same arrangement as the case notes.
 *
 * Posts used to live inline in this file. They outgrew it: at a few thousand
 * words each, a single module meant scrolling past four finished essays to
 * edit a fifth, and every change touched one enormous file.
 *
 * The reading order is the array order rather than the date, because these
 * were published together and the sequence is an argument: the method piece
 * explains what the site is before anything else asks to be taken seriously.
 *
 * Adding a post is two lines — write `content/posts/NN-slug.ts` exporting a
 * `BlogPost`, then import it and place it below. Nothing else changes: the
 * index page, the post template, the sitemap and the link-preview images all
 * read from here.
 *
 * `body` is optional so a post can be listed before it is written. Use that
 * sparingly. A queue of announced-and-unwritten titles costs more credibility
 * than an empty blog does — publish, then add.
 */
export const posts: BlogPost[] = [
  post01,
  post02,
  post03,
  post04,
  post05,
  post06,
  post07,
  post08,
  post09,
];
