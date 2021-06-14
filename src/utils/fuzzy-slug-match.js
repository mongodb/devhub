import { addLeadingSlashIfMissing } from './add-leading-slash-if-missing';
import { addTrailingSlashIfMissing } from './add-trailing-slash-if-missing';

const ensureLeadingAndTrailingSlashes = slug =>
    addTrailingSlashIfMissing(addLeadingSlashIfMissing(slug));

// Test slugs properly by ensuring trailing and leading slashes always for
// correctness
export const fuzzySlugMatch = (initialSlug, testSlug) =>
    ensureLeadingAndTrailingSlashes(initialSlug) ===
    ensureLeadingAndTrailingSlashes(testSlug);
