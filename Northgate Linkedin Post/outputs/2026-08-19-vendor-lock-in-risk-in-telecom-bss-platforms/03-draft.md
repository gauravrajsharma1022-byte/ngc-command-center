# Draft — Vendor Lock-In Risk in Telecom BSS Platforms
**Scribe output | 2026-08-20 (revision 5)**

---

## Caption

The vendor lock-in that surfaces during BSS migration scoping wasn't built into the exit clause. It was built into the architecture — and standard RFP processes weren't built to surface it.

BSS modernisation decisions tend to anchor on two things: vendor feature lists and contract terms.

The lock-in accumulates somewhere neither touches — in the customisations, integrations, and workarounds stacked on billing and charging systems that, in some cases, have been running for more than two decades.

**BSS vendor lock-in is an architecture debt problem, not a contract problem — and it only becomes visible when the process layer is mapped before the vendor shortlist begins.**

**By Migration Scoping, the Architecture Has Become the Vendor**
Decades of customisations, integrations, and workarounds embedded in billing and charging logic don't accumulate in an SLA. By the time migration scoping begins, the architecture has become the vendor — regardless of what the exit clause says.

**Open API Procurement Criteria Don't Reach Where Lock-In Hides**
Proprietary dependencies live in OSS connector layers, data models, and charging logic — none of which appear on a standard procurement scorecard. Checking Open API compliance as a pass/fail scorecard item is not the same as verifying it as an architectural guarantee.

**Process-Layer Mapping Must Precede Platform Selection**
eTOM-grounded decomposition of the current BSS integration surface, before any vendor shortlist begins, reveals what's genuinely portable and what the actual switching cost is. Architecture exit ramps are designed before contract signature — not discovered after.

Open API compliance has become a standard BSS procurement requirement — recent industry research finds 71% of telcos rate it as essential. The criterion is right; the layer being verified is wrong.

The operators getting ahead of this aren't writing longer scorecards — they're mapping the BSS process layer before the vendor shortlist begins.

What's driving BSS platform decisions in your organisation right now — architecture risk, commercial pressure, or both?

#Telecom #BSS #DigitalTransformation #TechDebt #Northgate

---

## Proof anchor note

Used the 71% Open API compliance figure (EY primary source, March 2026, verified in 01-research.md — "71% of telcos deem Open API compliance essential during BSS procurement"), softly attributed as "recent industry research" with no competitor name in copy per the no-competitor-names rule. Per Sentinel's Finding 2 guidance (second pass), the proof anchor leads with the observable pattern ("Open API compliance has become a standard BSS procurement requirement") and uses the stat as quantifying evidence rather than as the primary claim — making the anchor more durable if the stat's chain of custody is ever questioned. The 56% figure remains dropped. The 71% figure appears only here, not earlier in the body, so it delivers weight at the anchor rather than recapping a figure the reader has already processed.

---

## Revision 5 change log (for Sentinel)

**Finding 1 fix (medium-low — fifth pass):** Point 1 bold header rewritten from *"Billing and Charging Logic Is Where the Lock-In Accumulates — Layer by Layer"* to *"By Migration Scoping, the Architecture Has Become the Vendor."* The previous header resolved the third-pass thesis-echo problem but landed on a different redundancy: it recapped WHERE and HOW lock-in accumulates, which the tension section's second paragraph had already established. The new header surfaces the mechanism the Point 1 body actually argues — not the location of accumulation (already known to the reader) but the consequence by the time action is taken. The anchor phrase ("the architecture has become the vendor") is lifted directly from the Point 1 body copy per Sentinel's instruction. The temporal marker ("by migration scoping") preserves the urgency of the body's "by the time migration scoping begins" without making the header redundant to its own body sentence. Body copy under Point 1 is unchanged.

**All other elements:** unchanged per Sentinel's explicit pass on hook, thesis, Points 2 and 3, proof anchor, and landing line.
