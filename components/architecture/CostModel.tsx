"use client";

import { useMemo, useState } from "react";

/**
 * The per-request cost formula, made operable.
 *
 * Case 01 argues that a single figure like "€0.03 per request" is close to
 * meaningless without the assumptions under it, and that the durable part is
 * the formula plus the token counts, not the euro amount. Writing that down is
 * one thing; letting a reader move the inputs and watch the answer move is a
 * stronger version of the same argument.
 *
 * Prices are editable rather than hard-coded, because they date badly — the
 * defaults are hosted mid-tier pricing as of mid-2026 and should be treated as
 * a starting point to overwrite, not a reference.
 */

interface Field {
  key: keyof Inputs;
  label: string;
  hint: string;
  min: number;
  max: number;
  step: number;
  suffix?: string;
}

interface Inputs {
  inputTokens: number;
  outputTokens: number;
  inputPrice: number;
  outputPrice: number;
  retrievalCost: number;
  infraCost: number;
  modelShare: number;
  cacheHitRate: number;
  volume: number;
}

/*
 * Defaults reproduce case 01's stated cost model: ~2,500 input tokens, ~350
 * output, one retrieval query, a quarter of traffic reaching a model. They land
 * on roughly €0.028 per model-path request and €0.007 blended, against the
 * ~€0.03 and ~€0.008 that note quotes.
 *
 * Prompt caching starts at zero because case 01's formula does not include it —
 * it is a lever the reader can turn on, not part of the baseline being
 * reproduced.
 */
const DEFAULTS: Inputs = {
  inputTokens: 2500,
  outputTokens: 350,
  inputPrice: 6,
  outputPrice: 30,
  retrievalCost: 0.0008,
  infraCost: 0.0015,
  modelShare: 25,
  cacheHitRate: 0,
  volume: 40000,
};

const TOKEN_FIELDS: Field[] = [
  { key: "inputTokens", label: "Input tokens", hint: "System prompt, retrieved context and history", min: 200, max: 12000, step: 100 },
  { key: "outputTokens", label: "Output tokens", hint: "A grounded answer with a citation, not an essay", min: 50, max: 3000, step: 50 },
];

const PRICE_FIELDS: Field[] = [
  { key: "inputPrice", label: "Input price", hint: "Per million tokens", min: 0.1, max: 30, step: 0.1, suffix: "€/M" },
  { key: "outputPrice", label: "Output price", hint: "Per million tokens", min: 0.2, max: 120, step: 0.5, suffix: "€/M" },
];

const SHAPE_FIELDS: Field[] = [
  { key: "modelShare", label: "Traffic reaching a model", hint: "The rest is answered deterministically — cache, CRM lookups, booking", min: 1, max: 100, step: 1, suffix: "%" },
  { key: "cacheHitRate", label: "Prompt cache hit rate", hint: "Cached input tokens bill at roughly a tenth", min: 0, max: 90, step: 5, suffix: "%" },
  { key: "volume", label: "Inbound messages", hint: "Per month, across all channels", min: 1000, max: 500000, step: 1000 },
];

function euro(value: number, digits = 4): string {
  return `€${value.toFixed(digits)}`;
}

export function CostModel() {
  const [v, setV] = useState<Inputs>(DEFAULTS);

  const result = useMemo(() => {
    const cachedShare = v.cacheHitRate / 100;
    // Cached input tokens bill at roughly a tenth of the standard rate.
    const effectiveInputRate = v.inputPrice * (1 - cachedShare) + v.inputPrice * 0.1 * cachedShare;

    const inputCost = (v.inputTokens / 1_000_000) * effectiveInputRate;
    const outputCost = (v.outputTokens / 1_000_000) * v.outputPrice;
    const perModelRequest = inputCost + outputCost + v.retrievalCost + v.infraCost;

    const share = v.modelShare / 100;
    const blended = perModelRequest * share;
    const monthly = blended * v.volume;

    return { inputCost, outputCost, perModelRequest, blended, monthly };
  }, [v]);

  function set(key: keyof Inputs, value: number) {
    setV((prev) => ({ ...prev, [key]: value }));
  }

  function renderFields(fields: Field[], title: string) {
    return (
      <div>
        <p className="eyebrow mb-4">{title}</p>
        <div className="space-y-5">
          {fields.map((f) => (
            <label key={f.key} className="block">
              <span className="flex items-baseline justify-between gap-3">
                <span className="text-[0.875rem] text-ink">{f.label}</span>
                <span className="font-mono text-spec text-accent-deep">
                  {v[f.key].toLocaleString("en-GB")}
                  {f.suffix ? ` ${f.suffix}` : ""}
                </span>
              </span>
              <input
                type="range"
                min={f.min}
                max={f.max}
                step={f.step}
                value={v[f.key]}
                onChange={(e) => set(f.key, Number(e.target.value))}
                className="mt-2 w-full accent-[rgb(var(--accent))]"
              />
              <span className="mt-1 block text-[0.75rem] leading-snug text-ink-muted">{f.hint}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="min-w-0 space-y-8">
        {renderFields(TOKEN_FIELDS, "Tokens per model-path request")}
        {renderFields(PRICE_FIELDS, "Model pricing — overwrite these")}
        {renderFields(SHAPE_FIELDS, "Traffic shape")}

        <button
          type="button"
          onClick={() => setV(DEFAULTS)}
          className="font-mono text-micro uppercase tracking-wide text-ink-muted underline underline-offset-4 hover:text-ink"
        >
          Reset to the case 01 assumptions
        </button>
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="frame p-5">
          <p className="eyebrow mb-4">Result</p>

          <dl className="space-y-4">
            <div>
              <dt className="font-mono text-micro uppercase tracking-[0.08em] text-ink-muted">
                Per model-path request
              </dt>
              <dd className="mt-1 font-display text-2xl text-ink">{euro(result.perModelRequest)}</dd>
            </div>
            <div>
              <dt className="font-mono text-micro uppercase tracking-[0.08em] text-ink-muted">
                Blended per inbound message
              </dt>
              <dd className="mt-1 font-display text-xl text-accent-deep">{euro(result.blended)}</dd>
              <dd className="mt-1 text-[0.75rem] leading-snug text-ink-muted">
                Because {100 - v.modelShare}% never reach a model.
              </dd>
            </div>
            <div className="border-t border-line pt-4">
              <dt className="font-mono text-micro uppercase tracking-[0.08em] text-ink-muted">
                Monthly, at this volume
              </dt>
              <dd className="mt-1 font-display text-xl text-ink">
                €{result.monthly.toLocaleString("en-GB", { maximumFractionDigits: 0 })}
              </dd>
            </div>
          </dl>

          <div className="mt-6 border-t border-line pt-4">
            <p className="eyebrow mb-2">Where it goes</p>
            <ul className="space-y-1 font-mono text-[0.6875rem] text-ink-muted">
              <li>Input · {euro(result.inputCost, 5)}</li>
              <li>Output · {euro(result.outputCost, 5)}</li>
              <li>Retrieval · {euro(v.retrievalCost, 5)}</li>
              <li>Infrastructure · {euro(v.infraCost, 5)}</li>
            </ul>
          </div>

          <p className="mt-6 border-t border-line pt-4 text-[0.75rem] leading-relaxed text-ink-muted">
            The formula and the token counts are the durable part. The euro figures are not — token prices
            have fallen consistently, so overwrite the prices rather than trusting the defaults.
          </p>
        </div>
      </aside>
    </div>
  );
}
