import CallButton from "@/components/CallButton";
import { BUSINESS } from "@/lib/business";

/**
 * Persistent mobile call bar, pinned to the bottom of the viewport on every
 * page. Previously this lived only on the home page, which meant a visitor
 * landing on a service page from search had no one-tap call action.
 *
 * The body carries `pb-24 md:pb-0` (see globals.css) so this bar never covers
 * page content. On desktop it is hidden — the header call button takes over.
 */
export default function StickyCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-between gap-3 border-t border-slate-800 bg-slate-900 px-4 py-3 md:hidden">
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-500">
          Need an electrician?
        </p>
        <p className="truncate text-sm font-bold text-white">
          {BUSINESS.hoursSummary}
        </p>
      </div>
      <CallButton variant="compact" location="sticky-bar" label="Tap to Call" />
    </div>
  );
}
