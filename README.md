# Fisher Utility Weighting (FUW)

Project website for **Token Utility for On-Policy Distillation via Local
Trust-Region Optimization**, by Narayanan Sadagopan, Yilan Chen, and Vijay Lingam.

- Website: <https://fisher-utility-weighting-opd.github.io/>
- Paper: <https://arxiv.org/abs/2610.18883>
- Published version used here: <https://arxiv.org/html/2610.18883v1>
- Website source: <https://github.com/fisher-utility-weighting-opd/fisher-utility-weighting-opd.github.io>

The site uses static HTML, CSS, native MathML, and a small BibTeX-copy script.
It has no build step, external runtime dependencies, analytics, or model calls.

## Preview

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`. Stop the server with Ctrl+C.

## Content and results

All paper content comes from **arXiv:2610.18883v1**, rather than the older local
manuscript. The site preserves the published author order, affiliations,
footnotes, abstract wording, and all displayed numerical precision.

The reverse-KL table combines the three model-pair tables in the paper
(Tables 1–3). The forward-KL table reproduces Table 7. Together they contain
216 point-estimate/uncertainty pairs across 24 method rows and six model groups.
Teacher and base references remain visible; FUW's comparison with TIDE on the
4B pair follows the paper, including TIDE's slightly higher aggregate results.

`data/paper-results.json` records the published values, protocol, source package
hash, original formatting flags, and provenance notes. It is a source snapshot;
the page renders its tables directly in HTML and does not fetch this file.

Table headings use `Avg@k` to reflect the published evaluation protocol: 16
responses on AIME24, AIME25, AMC23, and BRUMO25; eight on MATH-500, Minerva, and
OlympiadBench. Macro weights benchmarks equally, and pooled weights all 1,620
problems equally. Reverse-KL uncertainty retains the paper's bootstrap
description; forward-KL Table 7 explicitly identifies its uncertainty as SE.

Bold marks the largest trained point estimate within each model pair and
column, excluding teacher/base references. This emphasis is recomputed from
the reported numbers because a few bold flags in the published TeX are
inconsistent with its point estimates. Numerical values are unchanged.

## Figures and attribution

The paper is available under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
Abstract text, scientific content, and paper figures are attributed to
Narayanan Sadagopan, Yilan Chen, and Vijay Lingam,
[arXiv:2610.18883v1](https://arxiv.org/abs/2610.18883v1).

| Website asset | Source in the published arXiv package | Use |
| --- | --- | --- |
| `assets/cross-pair-gains.png` | `figures/fuw_cross_pair_gains.pdf` | Social preview; rasterized at 180 DPI |
| `assets/criterion-agreement.png` | `figures/criterion_equivalence_ovl_x1_pair.png` | Original main Figure 2, copied unchanged |
| `assets/favicon.svg` | Website artwork | Small FUW identifier |

The agreement figure uses uniformly weighted OPD checkpoints for
Qwen3-1.7B-Base distilled from Qwen3-14B. It compares effective-support retention
at 20% and 50% selection fractions; it does not establish identical rankings or
identical weight vectors across criteria.

## Method scope

The header uses the full paper title. The method explanation follows the flow
from student responses to local utility, normalized weights, and weighted OPD.
An explicitly illustrative three-position example shows utilities 1, 4, 9
becoming square roots 1, 2, 3 and mean-one weights 0.5, 1, 1.5. These numbers
explain the weighting operation and are separate from the experimental tables.
Detailed score computation appears in an expandable section.

The local trust-region problem derives an objective-specific utility. Its
full-vocabulary theory is distinct from practical training: reverse-KL FUW uses
the renormalized union of student/teacher top-16 supports, clipped log ratios,
square-root weighting, batch-mean-one normalization, and detached weights.
The trust region is not imposed as a training constraint. Forward-KL uses its
Pearson-chi-squared utility with the paper's separate score-clipping rule.

## Hosting

GitHub Pages serves `main` from the repository root. `.nojekyll` keeps the site
buildless. Relative asset paths support the organization-root URL. The header's
code resource remains marked as coming soon until an algorithm-code release
is supplied. BibTeX copying has a selection fallback when clipboard access is
unavailable; all paper text and results are readable without JavaScript.
