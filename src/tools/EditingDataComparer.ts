export function hasTextMeaningfulChange(original: string | null | undefined, editing: string | null | undefined): boolean {
  const bothEmpty = (original === '' || original === null) && (editing === '' || editing === null);
  const anyUndefined = original === undefined || editing === undefined;
  const valuesEqual = original === editing;

  return !valuesEqual && !anyUndefined && !bothEmpty;
}