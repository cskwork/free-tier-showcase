#!/usr/bin/env bash
#
# cleanup-template-leftovers.sh
#
# This repo started as an auth-enabled Next.js starter, then pivoted to a
# free-tier services showcase site. The files below are leftovers from the
# original template and are no longer referenced by the showcase build.
#
# Usage:
#   bash scripts/cleanup-template-leftovers.sh           # dry-run, prints what would be deleted
#   bash scripts/cleanup-template-leftovers.sh --yes     # actually delete
#
# Idempotent — safe to re-run.

set -euo pipefail

# ---- Locate repo root (script-relative; never trusts $PWD) ------------------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# ---- Safety: refuse to run anywhere except this exact repo ------------------
SENTINEL_NAME='"name": "free-tier-showcase"'
if ! grep -qF "$SENTINEL_NAME" "$ROOT/package.json" 2>/dev/null; then
  echo "ERROR: $ROOT/package.json does not look like the free-tier-showcase repo."
  echo "       Refusing to delete anything. (Looking for sentinel: $SENTINEL_NAME)"
  exit 1
fi

# ---- Targets (relative paths only — never absolute, never with ..) ----------
# Each entry is a path that USED to exist in the auth-enabled template but is
# unused by the showcase site. rm -rf / rm -f are no-ops if the path is gone.
TARGETS=(
  # Auth + protected routes
  "app/auth"
  "app/app"
  "app/api"

  # Supabase client trio (browser/server/middleware)
  "lib/supabase"

  # Adapters that wrapped paid SDKs
  "lib/email.ts"
  "lib/env.ts"
  "lib/analytics.ts"

  # Auth middleware + Sentry instrumentation
  "middleware.ts"
  "instrumentation.ts"
  "instrumentation-client.ts"

  # Client analytics provider (Suspense + PostHog wrapper)
  "components/analytics-provider.tsx"

  # Old deployment doc — superseded by the showcase README
  "docs/deployment.md"

  # Old stack reference doc — superseded by data/services.ts (typed catalog)
  "STACK.md"
)

# ---- Validate every target stays inside ROOT --------------------------------
for t in "${TARGETS[@]}"; do
  case "$t" in
    /*|*..*) echo "ERROR: refusing absolute or parent-traversal path: $t"; exit 1 ;;
  esac
done

# ---- Mode --------------------------------------------------------------------
DRY_RUN=1
if [[ "${1:-}" == "--yes" ]]; then
  DRY_RUN=0
fi

cd "$ROOT"

echo "Repo root : $ROOT"
echo "Mode      : $([ $DRY_RUN -eq 1 ] && echo 'DRY RUN (pass --yes to actually delete)' || echo 'DELETE')"
echo

found_any=0
for t in "${TARGETS[@]}"; do
  if [[ -e "$t" ]]; then
    found_any=1
    if [[ -d "$t" ]]; then
      kind="dir "
      count=$(find "$t" -type f | wc -l | tr -d ' ')
      detail=" ($count files)"
    else
      kind="file"
      detail=""
    fi
    echo "  [$kind] $t$detail"
  fi
done

if [[ $found_any -eq 0 ]]; then
  echo "Nothing to delete — repo is already clean."
  exit 0
fi

if [[ $DRY_RUN -eq 1 ]]; then
  echo
  echo "Re-run with --yes to delete the entries above."
  exit 0
fi

echo
echo "Deleting…"
for t in "${TARGETS[@]}"; do
  if [[ -e "$t" ]]; then
    rm -rf -- "$t"
    echo "  removed $t"
  fi
done

echo "Done."
