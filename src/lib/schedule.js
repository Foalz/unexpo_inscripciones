export function blocksClash(a, b) {
  return a.day === b.day && Math.max(a.start, b.start) < Math.min(a.end, b.end)
}

export function hasClashAgainst(existing, candidates) {
  for (const c of candidates) {
    for (const e of existing) {
      if (blocksClash(e, c)) return true
    }
  }
  return false
}
